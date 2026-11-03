import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { MessageCircle } from "lucide-react";
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
  title: "PRAJWAL PHYSIO REHAB CENTRE",
  description: "Physiotherapy and rehabilitation centre in Doddaballapura, Karnataka.",
  metadataBase: new URL("https://prajwalphysiorehab.com"),
  openGraph: {
    title: "PRAJWAL PHYSIO REHAB CENTRE",
    description: "Physiotherapy and rehabilitation centre in Doddaballapura, Karnataka.",
    type: "website",
    locale: "en_IN",
    siteName: "PRAJWAL PHYSIO REHAB CENTRE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    "name": "PRAJWAL PHYSIO REHAB CENTRE",
    "description": "Physiotherapy and rehabilitation centre in Doddaballapura, Karnataka.",
    "url": "https://prajwalphysiorehab.com/",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}

        <a
          href="https://wa.me/919606114273"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed left-4 bottom-4 z-50 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:bg-green-600 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
          <span className="sr-only">Chat with us on WhatsApp</span>
        </a>
      </body>
    </html>
  );
}
