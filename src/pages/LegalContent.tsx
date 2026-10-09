import React from 'react';
import { ShieldCheck, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';
import { COMPANY } from '../config/company';

const termsData = [
  { title: "1. Service", content: "We provide online courses and educational materials through our platform. The Service is provided 'as is' and 'as available' without any warranties of any kind. We reserve the right to modify, suspend, or discontinue the Service at any time without notice." },
  { title: "2. User Agreement", content: "By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the terms, then you may not access the Service. You must provide accurate and complete information when creating an account." },
  { title: "3. Your License", content: "We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for your personal, non-commercial educational purposes. You may not copy, modify, distribute, sell, or lease any part of our Services or included software." },
  { title: "4. Support Services", content: `Support is provided primarily via email and our dedicated support portal. You can contact ${COMPANY.name} at ${COMPANY.supportEmail}. We strive to respond to all inquiries within 24-48 business hours.` },
  { title: "5. Fees and Payment", content: "Certain aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to the pricing and payment terms. We may add new services for additional fees and charges, or amend fees and charges for existing services, at any time in our sole discretion." },
  { title: "6. Cancellation", content: "You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing cycle. You will continue to have access to the Service through the end of your billing period." },
  { title: "7. Refund Policy", content: `All courses and educational content offered through this website are delivered digitally and access is typically granted immediately upon purchase. By completing a purchase, you acknowledge that immediate access affects your eligibility for a refund.\n\nYou may request a refund within 14 days of your initial purchase, provided that you have not substantially accessed or completed the course materials. Requests are assessed on a case-by-case basis and are not automatically guaranteed.\n\nRefund requests must be submitted in writing to ${COMPANY.supportEmail}, including your order number and the reason for the request. We aim to respond to all refund requests within 5 business days.` },
  { title: "8. Right to Terminate", content: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms." },
  { title: "9. Your Responsibilities", content: "You are responsible for all activities that occur under your account. You agree not to share your account credentials with third parties, use the Service for any illegal or unauthorized purpose, attempt to hack, destabilize, or adapt the Service, or transmit any worms, viruses, or destructive code." },
  { title: "10. Suspension/Discontinuation", content: "We reserve the right at any time to modify or discontinue, temporarily or permanently, the Service or any part thereof with or without notice." },
  { title: "11. Dispute Resolution", content: `If you have a complaint or dispute regarding a purchase, charge, or your use of the services, you agree to first contact us at ${COMPANY.supportEmail} so that we may attempt to resolve the matter directly. We aim to acknowledge complaints within 24 hours and to reach a resolution within 5 business days.` },
  { title: "12. Governing Law", content: "These Terms, and any dispute or claim arising out of or in connection with them or the services provided through this website, shall be governed by and construed in accordance with the laws of Cyprus, without regard to its conflict of law provisions." },
  { title: "13. Copyright", content: "All content, features, and functionality are and will remain the exclusive property of the Academy and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent." },
  { title: "14. Links to Other Websites", content: "Our Service may contain links to third-party web sites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services." },
  { title: "15. Trademarks", content: "The company name, logo, and related names, product names, service names, designs, and slogans are trademarks of the Company or its affiliates or licensors." },
  { title: "16. Force Majeure", content: "We shall not be liable for any failure or delay in performance under these Terms resulting from acts beyond our reasonable control, including war, terrorism, riots, embargoes, fire, floods, accidents, strikes, or shortages of transportation, fuel, energy, labor, or materials." },
  { title: "17. Disclaimer of Warranties", content: "Your use of the Service is at your sole risk. The Service is provided on an AS IS and AS AVAILABLE basis. The Service is provided without warranties of any kind, whether express or implied." },
  { title: "18. Age Restriction", content: "The Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using any of the Company, you warrant and represent that you are at least eighteen (18) years of age." },
  { title: "19. General Provisions", content: "These Terms shall be governed and construed in accordance with the laws of Cyprus, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights." }
];

const privacyData = [
  { title: "1. Consent to Privacy Policy", content: "By accessing and using our Site and Services, you acknowledge that you have read and agree to this Privacy Policy." },
  { title: "2. Information Collection", content: "We collect registration data, including email address, password, first name, last name, phone number, and payment details.\nWe collect usage data, including information about your browser, network, or device.\nWe collect marketing data related to communication and other interaction campaigns.\nLegal bases include contract performance, legitimate interests, and compliance with legal obligations such as accounting and tax requirements.\nYou may request access to, correction of, or deletion of your data, restrict processing, or object to processing, especially marketing. We will honor such requests unless an overriding legal obligation applies." },
  { title: "3. Information Use", content: "We use information for processing payment transactions, customizing services, ads, and recommendations, contacting you and responding to requests, conducting research and improving services, preventing fraud, and ensuring security." },
  { title: "4. Information Sharing and Disclosure", content: "We will not disclose your personally identifiable information except when required by law, to our service providers, in connection with corporate transactions, or with your explicit consent or at your direction.\nWe may share aggregate, anonymous information with partners, advertisers, or content distributors." },
  { title: "5. Changing or Deleting Your Information", content: "You may review, update, correct, or delete your personal information by contacting us. We may retain your data for legally required recordkeeping purposes." },
  { title: "6. Use of Cookies", content: "The merchant uses cookies, web beacons, device fingerprinting, and similar technologies for functionality, analytics, personalization, and advertising.\nTypes of cookies used include strictly necessary cookies, performance cookies, functional cookies, and targeting or advertising cookies." },
  { title: "7. Behavioral Advertising", content: "We may use cookies and online identifiers for behavioral advertising. We follow industry standards like Network Advertising Initiative.\nYou can manage cookies via browser settings, but some site functions may not work if cookies are disabled." },
  { title: "8. Changes and Updates", content: "We may periodically update this Privacy Policy. We will notify you by posting the modified terms on site. Your continued use implies agreement." },
  { title: "9. Contact", content: `Questions, comments, and requests regarding this Privacy Policy are welcomed and should be addressed to ${COMPANY.name}, ${COMPANY.address}, or by email at ${COMPANY.supportEmail}` }
];

const imprintData = [
  { title: "Company Information", content: `**Company Name:** ${COMPANY.name}\n**Registered Address:** ${COMPANY.address}\n**Represented by / Director:** ${COMPANY.director}`, icon: <BookOpen className="w-5 h-5 text-pink-500" /> },
  { title: "Registration and Tax Information", content: `**Company Registration Number:** ${COMPANY.registrationNumber}\n**VAT Registration Number:** ${COMPANY.vatNumber}`, icon: <ShieldCheck className="w-5 h-5 text-pink-500" /> },
  { title: "Contact", content: `**Email:** ${COMPANY.supportEmail}`, icon: <HelpCircle className="w-5 h-5 text-pink-500" /> },
  { title: "Responsible for Website Content", content: `${COMPANY.name}\n${COMPANY.address}`, icon: <AlertCircle className="w-5 h-5 text-pink-500" /> },
  { title: "Disclaimer", content: "The information provided on this website is for general informational purposes only. While we make every effort to keep the content accurate and up to date, we do not accept liability for any errors, omissions, or outdated information.\n\nThis imprint is provided for transparency and legal disclosure purposes. For any questions regarding the website or company information, please contact us using the email address listed above.", icon: <AlertCircle className="w-5 h-5 text-pink-500" /> }
];

// Reusable animated card block
const InfoCard = ({ title, content, index, icon }: any) => {
  return (
    <div className="group relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-50 to-transparent rounded-tr-3xl rounded-bl-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="flex items-start gap-4 relative z-10">
        {icon ? (
          <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
            {index + 1}
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
          <div className="space-y-4">
            {content.split('\\n').map((paragraph: string, i: number) => {
              // Very basic bold parsing for imprint (**bold**)
              const parts = paragraph.split(/\\*\\*(.*?)\\*\\*/g);
              return (
                <p key={i} className="text-[15px] leading-relaxed text-slate-500 font-medium">
                  {parts.map((part, j) => (j % 2 === 1 ? <strong key={j} className="text-slate-900">{part}</strong> : part))}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyContent = () => (
  <div className="space-y-6">
    <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <h2 className="text-2xl font-bold mb-2">Privacy & Cookie Policy</h2>
      <p className="text-slate-400">{COMPANY.name} is committed to protecting your privacy and personal data.</p>
    </div>
    
    <div className="grid gap-6">
      {privacyData.map((item, i) => (
        <InfoCard key={i} index={i} title={item.title} content={item.content} />
      ))}
    </div>
  </div>
);

export const TermsContent = () => (
  <div className="space-y-6">
    <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <h2 className="text-2xl font-bold mb-2">Terms of Use</h2>
      <p className="text-slate-400">Please read these Terms and Conditions carefully before using our website and services operated by {COMPANY.name}.</p>
    </div>

    <div className="grid gap-6">
      {termsData.map((item, i) => (
        <InfoCard key={i} index={i} title={item.title} content={item.content} />
      ))}
    </div>
  </div>
);

export const ImprintContent = () => (
  <div className="space-y-6">
    <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <h2 className="text-2xl font-bold mb-2">Imprint & Legal Disclosure</h2>
      <p className="text-slate-400">Official company information, registration details, and legal disclosures for transparency.</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-6">
      {imprintData.map((item, i) => (
        <div key={i} className={item.title === "Disclaimer" ? "sm:col-span-2" : ""}>
          <InfoCard icon={item.icon} title={item.title} content={item.content} />
        </div>
      ))}
    </div>
  </div>
);
