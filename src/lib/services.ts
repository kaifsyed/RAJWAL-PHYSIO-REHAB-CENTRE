export interface ServiceItem {
  label: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "orthopaedic",
    label: "Orthopaedic & Pain Rehabilitation",
    icon: "Bone",
    services: [
      { label: "Osteoarthritis (OA) Knee" },
      { label: "Lower Back Pain" },
      { label: "Tennis Elbow" },
      { label: "Muscle Strain" },
      { label: "Disc Bulge / Sciatica" },
      { label: "Frozen Shoulder" },
      { label: "Muscular Injuries / Rotator Cuff" },
      { label: "Cervical Radiculopathy" },
      { label: "Ligament Injuries (ACL, Meniscus)" },
      { label: "Plantar Fasciitis" },
      { label: "Postural Fracture Rehabilitation" },
      { label: "Ankle Sprain" },
    ],
  },
  {
    id: "sports",
    label: "Sports Rehabilitation",
    icon: "Activity",
    services: [
      { label: "Sports Injuries" },
      { label: "Injury Recovery" },
      { label: "Functional Rehabilitation" },
    ],
  },
  {
    id: "neurological",
    label: "Neurological Rehabilitation",
    icon: "Brain",
    services: [
      { label: "Stroke Rehabilitation" },
      { label: "Spinal Cord Injury" },
      { label: "Parkinson's Disease" },
      { label: "Cerebral Palsy" },
      { label: "Bell's Palsy / Facial Palsy" },
      { label: "Diabetic Neuropathy" },
      { label: "Guillain-Barré Syndrome" },
      { label: "Brachial Plexus Injury" },
    ],
  },
  {
    id: "electrotherapy",
    label: "Electrotherapy",
    icon: "Zap",
    services: [
      { label: "IFT" },
      { label: "TENS" },
      { label: "Ultrasound Therapy" },
    ],
  },
  {
    id: "specialised",
    label: "Specialised Care",
    icon: "Heart",
    services: [
      { label: "Paediatric Physiotherapy" },
      { label: "Geriatric Physiotherapy" },
      { label: "Home Care Available" },
    ],
  },
];
