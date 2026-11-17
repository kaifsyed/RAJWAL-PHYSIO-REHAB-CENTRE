import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { FloatingContactButtons } from "@/components/layout/floating-contact-buttons";
import { SITE_URL, LOGO_PATH } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Physiotherapy Clinic in Doddaballapura | PRAJWAL",
  description: "Prajwal Physiotherapy Rehab Centre offers orthopaedic, sports, neurological and home physiotherapy in Doddaballapura, Karnataka.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "https://prajwalphysio.in/" },
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PRAJWAL PHYSIOTHERAPY",
    title: "PRAJWAL Physiotherapy | Doddaballapura",
    description: "Expert physiotherapy and rehabilitation care in Doddaballapura. Personalised treatment and convenient home physiotherapy visits.",
    url: "https://prajwalphysio.in/",
    images: [
      {
        url: "https://prajwalphysio.in/images/hero/exterior.webp",
        width: 1200,
        height: 630,
        alt: "PRAJWAL PHYSIOTHERAPY REHAB CENTRE clinic exterior",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRAJWAL Physiotherapy | Doddaballapura",
    description: "Expert physiotherapy and rehabilitation care in Doddaballapura. Personalised treatment and convenient home physiotherapy visits.",
    images: ["https://prajwalphysio.in/images/hero/exterior.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "medicalSpecialty": "https://schema.org/Physiotherapy",
    "name": "PRAJWAL PHYSIOTHERAPY REHAB CENTRE",
    "logo": `${SITE_URL}${LOGO_PATH}`,
    "description": "Physiotherapy and rehabilitation centre in Doddaballapura, Karnataka.",
    "url": `${SITE_URL}`,
    "telephone": "+919606114273",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near LIC Office, Opposite Ashith Motors, Ayyappa Swami Temple Road, beside Bank of Baroda, D Cross",
      "addressLocality": "Doddaballapura",
      "addressRegion": "Karnataka",
      "postalCode": "561203",
      "addressCountry": "IN",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "16:00",
      },
    ],
    "sameAs": ["https://maps.app.goo.gl/3uyYc1RfiRZw4Av69"],
    "areaServed": {
      "@type": "Place",
      "name": "Doddaballapura, Karnataka, India",
    },
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
<head>
        <Script
          id="gtm-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NXJFRSVC');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "name": "PRAJWAL PHYSIOTHERAPY", "alternateName": "PRAJWAL PHYSIOTHERAPY REHAB CENTRE", "url": "https://prajwalphysio.in" }) }}
        />
        <meta name="google-adsense-account" content="ca-pub-9712335918078727" />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NXJFRSVC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Navbar />
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
