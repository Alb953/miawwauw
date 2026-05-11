export type PetSpecies = "dog" | "cat";

export type PetGender = "male" | "female";

export type PetSize = "small" | "medium" | "large";

export type PetStatus = "available" | "in_process" | "adopted";

export type PetAgeGroup = "cachorro" | "joven" | "adulto";

export interface RescuerInfo {
  name: string;
  organization: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface PetSummary {
  id: string;
  name: string;
  species: PetSpecies;
  speciesLabel: string;
  age: string;
  ageGroup: PetAgeGroup;
  gender: PetGender;
  genderLabel: string;
  size: PetSize;
  sizeLabel: string;
  location: string;
  country?: string;
  state?: string;
  city?: string;
  status: PetStatus;
  statusLabel: string;
  featured: boolean;
  featuredUntil?: string;
  featuredDaysRemaining?: number;
  urgent: boolean;
  description: string;
  image: string;
}

export interface PetDetail extends PetSummary {
  images: string[];
  imageUrls?: string[];
  story: string;
  personality: string[];
  requirements: string[];
  health: {
    vaccinated: boolean;
    sterilized: boolean;
    dewormed: boolean;
    medicalNotes: string;
  };
  supportMessage: string;
  rescuer: RescuerInfo;
}
