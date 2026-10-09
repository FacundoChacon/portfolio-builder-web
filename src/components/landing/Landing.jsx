import { useCatalog } from '../../hooks/useCatalog'
import { Wizard } from '../wizard/Wizard'
import { ContactSection } from './ContactSection'
import { DiscountsSection } from './DiscountsSection'
import { EntitiesSection } from './EntitiesSection'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { HowItWorks } from './HowItWorks'
import { PaymentSection } from './PaymentSection'
import { ProjectTypesSection } from './ProjectTypesSection'
import { ServicesSection } from './ServicesSection'
import { Showcase } from './Showcase'

export function Landing() {
  const { catalog, loading, error } = useCatalog()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />

        {loading && <p className="px-4 py-4 text-center text-sm text-gray-500">Cargando catálogo…</p>}
        {error && (
          <p role="alert" className="mx-auto max-w-5xl px-4 py-3 text-sm text-amber-800">
            {error}
          </p>
        )}

        {catalog && (
          <>
            <ProjectTypesSection catalog={catalog} />
            <EntitiesSection catalog={catalog} />
            <ServicesSection catalog={catalog} />
            <PaymentSection catalog={catalog} />
            <DiscountsSection catalog={catalog} />
          </>
        )}

        <section id="wizard" className="border-t border-indigo-100 bg-indigo-50/40 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <Wizard />
          </div>
        </section>

        <Showcase />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}