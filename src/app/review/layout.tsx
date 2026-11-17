import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Google Review Assistant | PRAJWAL PHYSIOTHERAPY",
  description:
    "Generate a personalized Google review for PRAJWAL PHYSIOTHERAPY REHAB CENTRE in Doddaballapura.",
  robots: { index: false, follow: false },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
