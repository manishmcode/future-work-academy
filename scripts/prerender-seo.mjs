/**
 * Runs after `react-scripts build`. Writes build/<route>/index.html for every public route with that
 * route's title, meta tags, canonical, Open Graph/X tags and one nested WebPage JSON-LD block baked into
 * the HTML, so crawlers and schema validators that don't run JavaScript still see them.
 *
 * Route data comes from src/seo/routes.ts and src/seo/structuredData.ts (transpiled on the fly),
 * so the client-side <Seo /> component and the prerendered HTML can't drift apart.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const templatePath = path.join(buildDir, 'index.html');

const loadSeoModules = () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fwa-seo-'));
  const sources = ['config/company.ts', 'seo/routes.ts', 'seo/structuredData.ts'];

  for (const relative of sources) {
    const source = fs.readFileSync(path.join(root, 'src', relative), 'utf8');
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, esModuleInterop: true },
    });
    const outFile = path.join(outDir, relative.replace(/\.ts$/, '.js'));
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, outputText);
  }

  return {
    company: require(path.join(outDir, 'config/company.js')).COMPANY,
    routes: require(path.join(outDir, 'seo/routes.js')),
    structuredData: require(path.join(outDir, 'seo/structuredData.js')),
  };
};

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

const routeHeadTags = [
  /<title>[\s\S]*?<\/title>/g,
  /<meta name="description"[^>]*>/g,
  /<meta name="robots"[^>]*>/g,
  /<link rel="canonical"[^>]*>/g,
  /<meta property="og:[^"]*"[^>]*>/g,
  /<meta name="twitter:[^"]*"[^>]*>/g,
  /<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,
];

const heroPreloadTag = /<link rel="preload" as="image"[^>]*>/g;

const { company, routes, structuredData } = loadSeoModules();
const template = fs.readFileSync(templatePath, 'utf8');
const heroPreload = (template.match(heroPreloadTag) ?? []).join('');

const renderPage = (config) => {
  const url = routes.canonicalUrl(config.path);
  const imageAlt = config.ogImageAlt ?? routes.DEFAULT_IMAGE_ALT;
  const schema = structuredData.buildStructuredData(config);

  const head = [
    `<title>${escapeText(config.title)}</title>`,
    `<meta name="description" content="${escapeAttr(config.description)}"/>`,
    `<meta name="robots" content="${config.noindex ? 'noindex, follow' : 'index, follow'}"/>`,
    `<link rel="canonical" href="${escapeAttr(url)}"/>`,
    `<meta property="og:title" content="${escapeAttr(config.title)}"/>`,
    `<meta property="og:description" content="${escapeAttr(config.description)}"/>`,
    `<meta property="og:url" content="${escapeAttr(url)}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${escapeAttr(company.brandName)}"/>`,
    `<meta property="og:image" content="${escapeAttr(company.ogImageUrl)}"/>`,
    `<meta property="og:image:width" content="${company.ogImageWidth}"/>`,
    `<meta property="og:image:height" content="${company.ogImageHeight}"/>`,
    `<meta property="og:image:alt" content="${escapeAttr(imageAlt)}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${escapeAttr(config.title)}"/>`,
    `<meta name="twitter:description" content="${escapeAttr(config.description)}"/>`,
    `<meta name="twitter:image" content="${escapeAttr(company.ogImageUrl)}"/>`,
    `<meta name="twitter:image:alt" content="${escapeAttr(imageAlt)}"/>`,
    config.path === '/' ? heroPreload : '',
    `<script type="application/ld+json" data-route-schema="true">${jsonLd(schema)}</script>`,
  ].join('');

  let html = template;
  for (const pattern of [...routeHeadTags, heroPreloadTag]) html = html.replace(pattern, '');
  return html.replace('</head>', `${head}</head>`);
};

for (const config of Object.values(routes.publicRoutes)) {
  const outFile =
    config.path === '/' ? templatePath : path.join(buildDir, config.path.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, renderPage(config));
  console.log(`Prerendered SEO head: ${path.relative(root, outFile)}`);
}
