'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CookiesPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0D0D0D] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.legal.cookiesPolicy.title}
            </h1>
            <p className="text-lg text-white/70">{t.legal.cookiesPolicy.subtitle}</p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-[#121212] py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-invert prose-white max-w-none space-y-8">
              {/* Introduction */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-white/90">
                  {t.legal.cookiesPolicy.intro}
                </p>
              </div>

              {/* 1. What Are Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section1Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {t.legal.cookiesPolicy.section1Text}
                  </p>
                  <p className="text-white/80">
                    {t.legal.cookiesPolicy.section1Detail}
                  </p>
                </div>
              </div>

              {/* 2. Types of Cookies Used */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section2Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {t.legal.cookiesPolicy.section2Intro}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {t.legal.cookiesPolicy.necessaryCookies}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {t.legal.cookiesPolicy.necessaryText}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-white/70 ml-4">
                        <li>{t.legal.cookiesPolicy.necessary1}</li>
                        <li>{t.legal.cookiesPolicy.necessary2}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {t.legal.cookiesPolicy.functionalCookies}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {t.legal.cookiesPolicy.functionalText}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-white/70 ml-4">
                        <li>{t.legal.cookiesPolicy.functional1}</li>
                        <li>{t.legal.cookiesPolicy.functional2}</li>
                        <li>{t.legal.cookiesPolicy.functional3}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {t.legal.cookiesPolicy.analyticsCookies}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {t.legal.cookiesPolicy.analyticsText}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-white/70 ml-4">
                        <li>{t.legal.cookiesPolicy.analytics1}</li>
                        <li>{t.legal.cookiesPolicy.analytics2}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {t.legal.cookiesPolicy.marketingCookies}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {t.legal.cookiesPolicy.marketingText}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-white/70 ml-4">
                        <li>{t.legal.cookiesPolicy.marketing1}</li>
                        <li>{t.legal.cookiesPolicy.marketing2}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. How We Use Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section3Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{t.legal.cookiesPolicy.usage1}</li>
                    <li>{t.legal.cookiesPolicy.usage2}</li>
                    <li>{t.legal.cookiesPolicy.usage3}</li>
                    <li>{t.legal.cookiesPolicy.usage4}</li>
                    <li>{t.legal.cookiesPolicy.usage5}</li>
                  </ul>
                </div>
              </div>

              {/* 4. Cookie Management */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section4Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {t.legal.cookiesPolicy.section4Intro}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {t.legal.cookiesPolicy.manageBrowser}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {t.legal.cookiesPolicy.manageBrowserText}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-white/70 ml-4">
                        <li>{t.legal.cookiesPolicy.manage1}</li>
                        <li>{t.legal.cookiesPolicy.manage2}</li>
                        <li>{t.legal.cookiesPolicy.manage3}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {t.legal.cookiesPolicy.disablingEffects}
                      </h3>
                      <p className="text-white/80 mb-2">
                        {t.legal.cookiesPolicy.disableText}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-white/70 ml-4">
                        <li>{t.legal.cookiesPolicy.disable1}</li>
                        <li>{t.legal.cookiesPolicy.disable2}</li>
                        <li>{t.legal.cookiesPolicy.disable3}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Third-Party Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section5Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {t.legal.cookiesPolicy.section5Intro}
                  </p>
                  <p className="text-white/80 mb-4">
                    {t.legal.cookiesPolicy.thirdParty1}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
                    <li>{t.legal.cookiesPolicy.thirdParty2}</li>
                    <li>{t.legal.cookiesPolicy.thirdParty3}</li>
                    <li>{t.legal.cookiesPolicy.thirdParty4}</li>
                  </ul>
                </div>
              </div>

              {/* 6. Updates to This Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section6Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {t.legal.cookiesPolicy.section6Intro}
                  </p>
                  <p className="text-white/80">
                    {t.legal.cookiesPolicy.section6Text}
                  </p>
                </div>
              </div>

              {/* 7. Contact Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t.legal.cookiesPolicy.section7Title}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="space-y-2 text-white/90">
                    <p>
                      {t.legal.cookiesPolicy.contactIntro}{' '}
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
