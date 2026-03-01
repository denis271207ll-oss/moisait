'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsOfServicePage() {
  const { t } = useLanguage();

  const legal = t.legal?.termsOfService;
  const fallbackTitle = 'Terms of Service';
  const fallbackSubtitle = 'Last updated: January 2025';

  // Helper to get translation or fallback
  const get = (key: string, fallback: string) => legal?.[key as keyof typeof legal] || fallback;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0D0D0D] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {legal?.title || fallbackTitle}
            </h1>
            <p className="text-lg text-white/70">{legal?.subtitle || fallbackSubtitle}</p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#121212] py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-invert prose-white max-w-none space-y-8">
              {/* Introduction */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-white/90">
                  {get('intro', 'Welcome to the ZIMBREAN RENT CAR website. These Terms of Service govern the use of our website and related services.')}
                </p>
              </div>

              {/* 1. General Rules of Website Usage */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section1Title', '1. General Rules of Website Usage')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section1Intro', 'By using our website, you agree to comply with the following rules:')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('section11', 'Use the website only for lawful purposes')}</li>
                    <li>{get('section12', 'Do not take actions that violate applicable laws or regulations')}</li>
                    <li>{get('section13', 'Do not upload or transmit viruses, malware, or any code that may harm the website operation')}</li>
                    <li>{get('section14', 'Do not attempt to gain unauthorized access to the website or user accounts')}</li>
                    <li>{get('section15', 'Do not send spam or unsolicited messages through our forms')}</li>
                    <li>{get('section16', 'Do not use automated tools to access the site without prior permission')}</li>
                    <li>{get('section17', 'Do not copy or reproduce any copyright-protected content without permission')}</li>
                  </ul>
                </div>
              </div>

              {/* 2. User Responsibilities */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section2Title', '2. User Responsibilities')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section2Intro', 'Users are obligated to:')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('responsibility1', 'Ensure the accuracy of information provided')}</li>
                    <li>{get('responsibility2', 'Maintain the confidentiality of their account and passwords')}</li>
                    <li>{get('responsibility3', 'Immediately notify us of any unauthorized access to their account')}</li>
                    <li>{get('responsibility4', 'Not use the website for any illegal purposes')}</li>
                    <li>{get('responsibility5', 'Comply with all applicable laws and regulations')}</li>
                    <li>{get('responsibility6', 'Do not infringe the rights of third parties')}</li>
                    <li>{get('responsibility7', 'Do not upload content that infringes copyrights or other intellectual property rights')}</li>
                  </ul>
                </div>
              </div>

              {/* 3. Limitation of Liability */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section3Title', '3. Limitation of Liability')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section3Intro', 'To the extent permitted by law, the Company shall not be liable for:')}
                  </p>
                  <p className="text-white/80 mb-4">
                    {get('liability1', 'Direct, indirect, incidental or consequential damages arising from the use or inability to use the website')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('liability2', 'Loss of data or profit')}</li>
                    <li>{get('liability3', 'Website security breach due to user actions')}</li>
                    <li>{get('liability4', 'Website downtime or unavailability for reasons beyond our control')}</li>
                    <li>{get('liability5', 'Any actions of third parties using the website')}</li>
                  </ul>
                </div>
              </div>

              {/* 4. Intellectual Property Notice */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section4Title', '4. Intellectual Property Notice')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section4Intro', 'All content on the website, including text, graphics, logos, images, and software code is protected by copyright and other intellectual property laws.')}
                  </p>
                  <p className="text-white/80 mb-4">{get('ip1', 'All content is the property of Zimbrean Garage S.R.L. or its licensors.')}</p>
                  <p className="text-white/80 mb-4">{get('ip2', 'Copying, reproducing, distributing, or creating derivative works without express written permission is prohibited.')}</p>
                  <p className="text-white/80 mb-4">{get('ip3', 'ZIMBREAN RENT CAR logos and trademarks are protected as trademarks.')}</p>
                  <p className="text-white/80">{get('ip4', 'Any unauthorized use constitutes copyright infringement and other intellectual property rights violations.')}</p>
                </div>
              </div>

              {/* 5. Termination of Service */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section5Title', '5. Termination of Service')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section5Intro', 'The Company reserves the right to limit or terminate access to the website at any time and for any reason:')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('termination1', 'User violation of any provision of this Agreement')}</li>
                    <li>{get('termination2', 'Need for technical website maintenance')}</li>
                    <li>{get('termination3', 'Upon request of state authorities')}</li>
                  </ul>
                </div>
              </div>

              {/* 6. Modifications to Terms */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section6Title', '6. Modifications to Terms')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section6Intro', 'The Company reserves the right to modify this Agreement.')}
                  </p>
                  <p className="text-white/80">
                    {get('section6Text', 'Changes become effective immediately upon publication on the website. Continued use after changes constitutes acceptance of updated terms.')}
                  </p>
                </div>
              </div>

              {/* 7. Contact Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section7Title', '7. Contact Information')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="space-y-2 text-white/90">
                    <p>
                      {get('contactIntro', 'For any questions regarding this Agreement, please contact us at')}{' '}
                      <a
                        href="mailto:info@zimbrean.md"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        info@zimbrean.md
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
