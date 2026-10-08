const fs = require('fs');

const extractProse = (filepath) => {
  const html = fs.readFileSync(filepath, 'utf8');
  const startTag = 'prose-slate';
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) return '<p>Content missing</p>';
  
  let contentStart = html.indexOf('>', startIndex) + 1;
  let contentEnd = html.indexOf('</div></section>', contentStart);
  if (contentEnd === -1) contentEnd = html.indexOf('</main>', contentStart); // fallback
  
  // Clean up class attributes and unclosed tags if any
  let cleanHTML = html.slice(contentStart, contentEnd)
      .replace(/class=/g, 'className=')
      .replace(/<br>/g, '<br/>')
      .replace(/<hr>/g, '<hr/>')
      .replace(/<!--.*?-->/g, '') // remove html comments
      .replace(/&/g, '&amp;') // Quick fix for unescaped ampersands inside JSX (optional but helpful)
      .replace(/&amp;amp;/g, '&amp;'); // Just in case
      
  return cleanHTML;
};

const pp = extractProse('C:/Users/dcs/.gemini/antigravity/brain/5989f3c9-4648-4998-924b-69f3190c9a6f/.system_generated/steps/444/content.md');
const tc = extractProse('C:/Users/dcs/.gemini/antigravity/brain/5989f3c9-4648-4998-924b-69f3190c9a6f/.system_generated/steps/445/content.md');
const im = extractProse('C:/Users/dcs/.gemini/antigravity/brain/5989f3c9-4648-4998-924b-69f3190c9a6f/.system_generated/steps/446/content.md');

const jsx = `import React from 'react';

export const PrivacyContent = () => (
  <div className="legal-prose" dangerouslySetInnerHTML={{ __html: \`${pp.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
);

export const TermsContent = () => (
  <div className="legal-prose" dangerouslySetInnerHTML={{ __html: \`${tc.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
);

export const ImprintContent = () => (
  <div className="legal-prose" dangerouslySetInnerHTML={{ __html: \`${im.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
);
`;

fs.writeFileSync('src/pages/LegalContent.tsx', jsx);
console.log('LegalContent.tsx generated successfully.');
