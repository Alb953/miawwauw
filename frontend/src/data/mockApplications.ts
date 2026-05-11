export interface MockApplication {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  city: string;
  submittedAt: string;
  status: "nueva" | "en_revision" | "aprobada";
}

export const mockApplications: MockApplication[] = [
  {
    id: "app-001",
    petId: "max",
    petName: "Max",
    applicantName: "Carla Méndez",
    city: "Zapopan",
    submittedAt: "Hace 2 horas",
    status: "nueva",
  },
  {
    id: "app-002",
    petId: "luna",
    petName: "Luna",
    applicantName: "Rafael Torres",
    city: "Ciudad de México",
    submittedAt: "Ayer",
    status: "en_revision",
  },
  {
    id: "app-003",
    petId: "bruno",
    petName: "Bruno",
    applicantName: "Daniela Cruz",
    city: "Puebla",
    submittedAt: "Hace 3 días",
    status: "aprobada",
  },
];
