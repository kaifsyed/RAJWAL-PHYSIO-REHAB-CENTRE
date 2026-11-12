import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
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

        <a
          href="https://wa.me/919606114273"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed right-[58px] bottom-[90px] z-50 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:bg-green-600 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
          <span className="sr-only">Chat with us on WhatsApp</span>
        </a>
        <a
          href="tel:+919606114273"
          aria-label="Call us"
          className="fixed right-[58px] bottom-[32px] z-50 w-12 h-12 rounded-full bg-deep-teal flex items-center justify-center text-white shadow-lg hover:bg-dark-teal hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="sr-only">Call us</span>
        </a>
      </body>
    </html>
  );
}
