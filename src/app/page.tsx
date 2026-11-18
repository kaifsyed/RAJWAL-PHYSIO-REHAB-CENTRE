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
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME, LOGO_PATH } from "@/lib/site";
import { PHONE_NUMBER, MAPS_LINK, SOCIAL_LINKS } from "@/lib/config";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { FAQS } from "@/lib/faqs";

const SITE = SITE_URL;
const ORG_ID = `${SITE}#organization`;
const WEBSITE_ID = `${SITE}#website`;
const PERSON_ID = `${SITE}#founder`;

const SOCIAL_PROFILES = SOCIAL_LINKS.filter((s) => s.name !== "Email").map((s) => s.url);
const EMAIL =
  SOCIAL_LINKS.find((s) => s.name === "Email")?.handle ?? "prajwalphysio@gmail.com";

const SERVICES = [
  ...SERVICE_CATEGORIES.map((c) => ({
    "@type": "Service" as const,
    name: c.label,
    serviceType: "Physiotherapy",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Doddaballapura, Bengaluru Rural, Bengaluru" },
  })),
  {
    "@type": "Service" as const,
    name: "Home Physiotherapy",
    serviceType: "Home Physiotherapy",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Within 20 km of the clinic" },
  },
];

const homepageGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": ORG_ID,
      medicalSpecialty: "https://schema.org/Physiotherapy",
      name: SITE_NAME,
      alternateName: "PRAJWAL PHYSIOTHERAPY",
      description:
        "Physiotherapy and rehabilitation centre in Doddaballapura, Karnataka, offering orthopaedic, sports, neurological and home physiotherapy.",
      url: SITE,
      logo: `${SITE_URL}${LOGO_PATH}`,
      image: `${SITE_URL}/images/hero/exterior.webp`,
      telephone: `+91${PHONE_NUMBER}`,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Near LIC Office, Opposite Ashith Motors, Ayyappa Swami Temple Road, beside Bank of Baroda, D Cross",
        addressLocality: "Doddaballapura",
        addressRegion: "Karnataka",
        postalCode: "561203",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.3026751,
        longitude: 77.5441521,
      },
      hasMap: MAPS_LINK,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "16:00",
        },
      ],
      areaServed: [
        { "@type": "Place", name: "Doddaballapura" },
        { "@type": "AdministrativeArea", name: "Bengaluru Rural district, Karnataka" },
        { "@type": "City", name: "Bengaluru, Karnataka" },
      ],
      sameAs: SOCIAL_PROFILES,
      founder: { "@id": PERSON_ID },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+91${PHONE_NUMBER}`,
        contactType: "appointment bookings",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Physiotherapy & Rehabilitation Services",
        itemListElement: SERVICES,
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "PRAJWAL PHYSIOTHERAPY",
      alternateName: SITE_NAME,
      url: SITE,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "PRAJWAL L NAIK",
      honorificPrefix: "Dr.",
      jobTitle: "Owner & Founder",
      worksFor: { "@id": ORG_ID },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Harsha Institutions of Physiotherapy",
      },
      description:
        "Physiotherapist (PT, MIAP) and Owner & Founder of PRAJWAL PHYSIOTHERAPY REHAB CENTRE.",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}#webpage`,
      url: SITE,
      name: "Physiotherapy Clinic in Doddaballapura | PRAJWAL",
      description:
        "Prajwal Physiotherapy Rehab Centre offers orthopaedic, sports, neurological and home physiotherapy in Doddaballapura, Karnataka.",
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/hero/exterior.webp`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}#faq`,
      isPartOf: { "@id": `${SITE}#webpage` },
      about: { "@id": ORG_ID },
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-stretch justify-start">
      <JsonLd data={homepageGraph} />
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