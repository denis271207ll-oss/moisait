'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RentalTermsPage() {
  const { t } = useLanguage();

  const legal = t.legal?.rentalTerms;
  const fallbackTitle = 'Rental Terms';
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
                  {get('intro', 'These rental terms govern car rental through ZIMBREAN RENT CAR. By booking a vehicle, you agree to these terms.')}
                </p>
              </div>

              {/* 1. Basic Rental Conditions */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section1Title', '1. Basic Rental Conditions')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section1Intro', 'A car rental is considered confirmed upon:')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('condition1', 'Signing of the rental agreement')}</li>
                    <li>{get('condition2', 'Full or partial payment of rental and deposit')}</li>
                    <li>{get('condition3', 'Presentation of valid driving license')}</li>
                    <li>{get('condition4', 'Presentation of valid passport or IDNP')}</li>
                    <li>{get('condition5', 'Vehicle insurance arrangement')}</li>
                    <li>{get('condition6', 'Receiving vehicle keys')}</li>
                    <li>{get('condition7', 'Checking the technical condition of the vehicle')}</li>
                    <li>{get('condition8', 'Signing the handover protocol')}</li>
                  </ul>
                </div>
              </div>

              {/* 2. Driver Requirements */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section2Title', '2. Driver Requirements')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section2Intro', 'To rent a vehicle, the driver must meet the following requirements:')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('driverRequirement1', 'Age of at least 21 years')}</li>
                    <li>{get('driverRequirement2', 'Driving experience of at least 2 years')}</li>
                    <li>{get('driverRequirement3', 'Valid driving license of the appropriate category')}</li>
                    <li>{get('driverRequirement4', 'Valid passport or IDNP')}</li>
                    <li>{get('driverRequirement5', 'Driving license in Latin script (for foreign citizens)')}</li>
                    <li>{get('driverRequirement6', 'International driving permit (if required)')}</li>
                  </ul>
                </div>
              </div>

              {/* 3. Payment and Deposit Rules */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section3Title', '3. Payment and Deposit Rules')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section3Intro', 'Payment and deposit must be paid before the rental begins.')}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {get('paymentMethods', 'Payment Methods')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                        <li>{get('payment1', 'Cash')}</li>
                        <li>{get('payment2', 'Bank card')}</li>
                        <li>{get('payment3', 'Bank transfer')}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {get('depositRules', 'Deposit Rules')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                        <li>{get('deposit1', 'Deposit amount depends on vehicle category')}</li>
                        <li>{get('deposit2', 'Deposit is returned after rental completion if no damages occurred')}</li>
                        <li>{get('deposit3', 'Deposit is not used to pay for rental')}</li>
                        <li>{get('deposit4', 'Deposit may be withheld to cover repair, fuel, or fine expenses')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Liability and Penalties */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section4Title', '4. Liability and Penalties')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section4Intro', 'The renter is responsible for:')}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {get('liabilityTitle', 'Renter Liability')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                        <li>{get('liability1', 'Vehicle damage, including scratches, dents, and serious damage')}</li>
                        <li>{get('liability2', 'Loss or damage to keys, documents, or accessories')}</li>
                        <li>{get('liability3', 'Traffic violations resulting in fines')}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {get('penaltiesTitle', 'Fines and Sanctions')}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                        <li>{get('penalty1', 'Fines for exceeding rental period are paid additionally')}</li>
                        <li>{get('penalty2', 'Fines for violating rental conditions')}</li>
                        <li>{get('penalty3', 'Fuel expenses upon return with empty tank')}</li>
                        <li>{get('penalty4', 'Car wash expenses upon return in excessively dirty condition')}</li>
                        <li>{get('penalty5', 'Sanctions for violating rental rules may lead to early termination')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Vehicle Return Conditions */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section5Title', '5. Vehicle Return Conditions')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section5Intro', 'Upon returning the vehicle, the renter must:')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('return1', 'Return the vehicle to the agreed location and time')}</li>
                    <li>{get('return2', 'Return the vehicle in the same technical condition it was received')}</li>
                    <li>{get('return3', 'Refuel to the same level as upon receipt')}</li>
                    <li>{get('return4', 'Clean the vehicle of personal items and trash')}</li>
                    <li>{get('return5', 'Surrender all keys and documents')}</li>
                    <li>{get('return6', 'Allow technical condition inspection')}</li>
                    <li>{get('return7', 'Sign the return protocol')}</li>
                  </ul>
                </div>
              </div>

              {/* 6. Insurance */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {get('section6Title', '6. Insurance')}
                </h2>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-white/90 mb-4">
                    {get('section6Intro', 'All vehicles are insured in accordance with the legislation of the Republic of Moldova.')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
                    <li>{get('insurance1', 'Basic insurance is included in the rental cost')}</li>
                    <li>{get('insurance2', 'The renter is responsible for losses not covered by insurance')}</li>
                    <li>{get('insurance3', 'Additional insurance is available for an extra fee')}</li>
                    <li>{get('insurance4', 'The renter is obliged to comply with insurance conditions')}</li>
                  </ul>
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
                      {get('contactIntro', 'For any questions regarding rental conditions, please contact us at')}{' '}
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
