'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  // Helper function to safely get translation with fallback
  const getTranslation = (path: string, fallback: string) => {
    try {
      const keys = path.split('.');
      let value: any = t;
      for (const key of keys) {
        value = value?.[key];
      }
      return value || fallback;
    } catch {
      return fallback;
    }
  };

  const legal = t.legal?.privacyPolicy;
  const fallbackTitle = 'Privacy Policy';
  const fallbackSubtitle = 'Last updated: January 2025';

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
              {/* 1. General Provisions */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section1Title || '1. General Provisions'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {legal?.section1Intro || '1.1. The Company processes personal data in accordance with:'}
                  </p>
                  <p className="text-white/90 mb-4">
                    {legal?.section1Law || 'Law of the Republic of Moldova No.133 of 08.07.2011 "On Personal Data Protection"'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{legal?.section1Principles || 'Principles of legality, good faith, and confidentiality'}</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-2">
                    {legal?.section1Purpose || '1.2. Personal data is processed exclusively for:'}
                  </p>
                  <p className="text-white/80">
                    {legal?.section1PurposeText || 'Providing car rental services and improving service quality.'}
                  </p>
                </div>
              </div>

              {/* 2. Personal Data We Collect */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section2Title || '2. Personal Data We Collect'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{legal?.firstName || 'First name'}</li>
                    <li>{legal?.lastName || 'Last name'}</li>
                    <li>{legal?.phoneNumber || 'Phone number'}</li>
                    <li>{legal?.emailAddress || 'Email address'}</li>
                    <li>{legal?.driverLicense || 'Driver\'s license data'}</li>
                    <li>{legal?.passportIdnp || 'Passport data / IDNP (when signing a rental agreement)'}</li>
                    <li>{legal?.dateOfBirth || 'Date of birth'}</li>
                    <li>{legal?.residentialAddress || 'Residential address'}</li>
                    <li>{legal?.bookingInformation || 'Vehicle booking information'}</li>
                    <li>{legal?.ipAndDevice || 'IP address, cookies, browser and device data'}</li>
                  </ul>
                </div>
              </div>

              {/* 3. Purposes of Personal Data Processing */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section3Title || '3. Purposes of Personal Data Processing'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{legal?.purpose1 || 'Concluding and executing car rental agreements'}</li>
                    <li>{legal?.purpose2 || 'Customer identification'}</li>
                    <li>{legal?.purpose3 || 'Communication with customers (calls, SMS, email, messengers)'}</li>
                    <li>{legal?.purpose4 || 'Online booking processing'}</li>
                    <li>{legal?.purpose5 || 'Compliance with legal and accounting obligations'}</li>
                    <li>{legal?.purpose6 || 'Service quality improvement'}</li>
                    <li>{legal?.purpose7 || 'Fraud prevention'}</li>
                    <li>{legal?.purpose8 || 'Compliance with legislation of the Republic of Moldova'}</li>
                  </ul>
                </div>
              </div>

              {/* 4. Legal Grounds for Processing */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section4Title || '4. Legal Grounds for Processing'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{legal?.ground1 || 'Data subject consent'}</li>
                    <li>{legal?.ground2 || 'Necessity to perform a contract'}</li>
                    <li>{legal?.ground3 || 'Legal obligations'}</li>
                    <li>{legal?.ground4 || 'Legitimate interests of Company within the limits of law'}</li>
                  </ul>
                </div>
              </div>

              {/* 5. Data Storage and Protection */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section5Title || '5. Data Storage and Protection'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {legal?.section51 || '5.1. Personal data is stored no longer than necessary to achieve processing purposes or as required by law.'}
                  </p>
                  <p className="text-white/90 mb-2">
                    {legal?.section52Intro || '5.2. The Company implements appropriate technical and organizational measures to protect personal data from:'}
                  </p>
                  <p className="text-white/80">
                    {legal?.section52 || 'Unauthorized access, loss, alteration, and disclosure.'}
                  </p>
                </div>
              </div>

              {/* 6. Transfer of Personal Data to Third Parties */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section6Title || '6. Transfer of Personal Data to Third Parties'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {legal?.section61Intro || '6.1. Personal data is not transferred to third parties except:'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                    <li>{legal?.transfer1 || 'At the request of state authorities of the Republic of Moldova'}</li>
                    <li>{legal?.transfer2 || 'To banks and payment systems (for payments)'}</li>
                    <li>{legal?.transfer3 || 'To insurance companies'}</li>
                    <li>{legal?.transfer4 || 'In cases provided by law'}</li>
                  </ul>
                  <p className="text-white/80">
                    {legal?.section62 || '6.2. Data transfer is limited to minimum necessary scope.'}
                  </p>
                </div>
              </div>

              {/* 7. Rights of Data Subject */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section7Title || '7. Rights of Data Subject'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {legal?.section7Intro || 'Users have the right to:'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{legal?.right1 || 'Obtain information about their personal data'}</li>
                    <li>{legal?.right2 || 'Request correction of inaccurate data'}</li>
                    <li>{legal?.right3 || 'Withdraw consent for data processing'}</li>
                    <li>{legal?.right4 || 'Request deletion of data where permitted by law'}</li>
                    <li>{legal?.right5 || 'File complaints with authorized supervisory authorities'}</li>
                  </ul>
                  <p className="text-white/70 mt-4 italic">
                    {legal?.section7Contact || 'Requests can be sent using the contact details below.'}
                  </p>
                </div>
              </div>

              {/* 8. Cookies and Technical Data */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section8Title || '8. Cookies and Technical Data'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {legal?.section81Intro || '8.1. The website uses cookies for:'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4 mb-4">
                    <li>{legal?.cookie1 || 'Proper website functionality'}</li>
                    <li>{legal?.cookie2 || 'Analytics'}</li>
                    <li>{legal?.cookie3 || 'User experience improvement'}</li>
                  </ul>
                  <p className="text-white/90 mb-2">
                    {legal?.section82Intro || '8.2. Users may disable cookies in browser settings,'}
                  </p>
                  <p className="text-white/80">
                    {legal?.section82 || 'which may affect website functionality.'}
                  </p>
                </div>
              </div>

              {/* 9. Changes to Privacy Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section9Title || '9. Changes to Privacy Policy'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {legal?.section91 || '9.1. The Company reserves the right to modify this Privacy Policy.'}
                  </p>
                  <p className="text-white/80">
                    {legal?.section92 || '9.2. The current version is always available on the website.'}
                  </p>
                </div>
              </div>

              {/* 10. Contact Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {legal?.section10Title || '10. Contact Information'}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="space-y-4 text-white/90">
                    <div>
                      <p className="font-semibold text-primary mb-2">
                        {legal?.companyName || 'Company Name'}
                      </p>
                      <p>Zimbrean Garage S.R.L.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {legal?.legalAddress || 'Legal address:'}
                      </p>
                      <p className="text-white/70">ул. Митрополит Дософтей, 1</p>
                      <p className="text-white/70">Кишинёв, Молдова MD-2001</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {legal?.emailLabel || 'Email:'}
                      </p>
                      <a
                        href="mailto:info@zimbrean.md"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        info@zimbrean.md
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">
                        {legal?.phoneLabel || 'Phone:'}
                      </p>
                      <p className="text-white/70">+373 69 123 456</p>
                    </div>
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
