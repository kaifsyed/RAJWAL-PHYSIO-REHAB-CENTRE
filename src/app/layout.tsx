import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { FloatingContactButtons } from "@/components/layout/floating-contact-buttons";
import { SITE_URL } from "@/lib/site";
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

const SITE = SITE_URL;

export const metadata = {
  title: "Physiotherapy Clinic in Doddaballapura | PRAJWAL",
  description:
    "Prajwal Physiotherapy Rehab Centre offers orthopaedic, sports, neurological and home physiotherapy in Doddaballapura, serving Bengaluru Rural and nearby areas.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PRAJWAL PHYSIOTHERAPY",
    title: "PRAJWAL Physiotherapy | Doddaballapura",
    description:
      "Expert physiotherapy and rehabilitation care in Doddaballapura. Personalised treatment and convenient home physiotherapy visits.",
    url: SITE,
    images: [
      {
        url: `${SITE_URL}/images/hero/exterior.webp`,
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
    description:
      "Expert physiotherapy and rehabilitation care in Doddaballapura. Personalised treatment and convenient home physiotherapy visits.",
    images: [`${SITE_URL}/images/hero/exterior.webp`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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