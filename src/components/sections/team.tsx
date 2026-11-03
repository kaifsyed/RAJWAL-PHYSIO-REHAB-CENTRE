"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  designation?: string;
  qualification?: string;
  contact?: string;
  image?: string;
  color: "deep-teal" | "sage-green";
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. PRAJWAL L NAIK",
    designation: "Owner & Founder",
    qualification: "PT (MIAP)",
    image: "/images/team/founder.png",
    color: "deep-teal",
  },
  {
    name: "Dr. BHAVANA R",
    designation: "PT",
    color: "sage-green",
  },
  {
    name: "Dr. ARJUN",
    designation: "Nutrition & Dietetics",
    image: "/images/team/nutritionist.png",
    color: "sage-green",
  },
];

export function OurTeam() {
  return (
    <section id="team" className="bg-white">
      <Container className="py-8 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
            Our Team
          </span>
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
            Meet Our Team
          </h2>
          <p className="text-muted-text leading-relaxed text-lg">
            Dedicated professionals supporting your journey towards better
            movement and wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => {
            const bgColor =
              member.color === "deep-teal"
                ? "bg-deep-teal/10 text-deep-teal"
                : "bg-sage-green/10 text-sage-green";
            const borderColor =
              member.color === "deep-teal"
                ? "border-deep-teal/20"
                : "border-sage-green/20";
            return (
              <div
                key={member.name}
                className={cn(
                  "flex flex-col items-center justify-center p-8 rounded-xl border",
                  borderColor,
                  "bg-white hover:bg-charcoal/2 transition-colors",
                )}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 overflow-hidden border border-charcoal/10">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 64px, 64px"
                      priority={member.name === "PRAJWAL L NAIK"}
                    />
                  ) : (
                    <div className={cn(
                      "flex items-center justify-center w-full h-full",
                      bgColor,
                    )}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="mb-1 text-lg font-semibold text-charcoal">
                  {member.name}
                </h3>
                {member.designation && (
                  <p className="mb-2 text-sm font-medium text-muted-text">
                    {member.designation}
                  </p>
                )}
                {member.qualification && (
                  <p className="mb-2 text-xs text-muted-text uppercase tracking-wider">
                    {member.qualification}
                  </p>
                )}
                {member.contact && (
                  <p className="text-sm text-muted-text">
                    {member.contact}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default OurTeam;
