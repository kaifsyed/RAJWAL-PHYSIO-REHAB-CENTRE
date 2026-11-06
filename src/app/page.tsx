import { Hero } from "@/components/sections/hero";
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { AboutUs } from "@/components/sections/about";
import { OurServices } from "@/components/sections/services";
import { HomePhysiotherapy } from "@/components/sections/home-physiotherapy";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { OurTeam } from "@/components/sections/team";
import { ClinicGallery } from "@/components/sections/gallery";
import { PatientTestimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-stretch justify-start">
      <Hero />
      <TrustIndicators />
      <AboutUs />
      <OurServices />
      <HomePhysiotherapy />
      <WhyChooseUs />
      <OurTeam />
      <ClinicGallery />
      <PatientTestimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
