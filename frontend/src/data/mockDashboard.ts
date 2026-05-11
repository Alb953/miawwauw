import { mockApplications } from "@/data/mockApplications";
import { mockPets } from "@/data/mockPets";

export const mockRescuerDashboard = {
  rescuerName: "Mariana López",
  stats: [
    {
      id: "pets",
      label: "Mis mascotas registradas",
      value: mockPets.length.toString(),
      note: "Perfiles activos y visibles",
    },
    {
      id: "applications",
      label: "Solicitudes recibidas",
      value: mockApplications.length.toString(),
      note: "Pendientes y en seguimiento",
    },
    {
      id: "urgent",
      label: "Casos urgentes",
      value: mockPets.filter((pet) => pet.urgent).length.toString(),
      note: "Necesitan difusión inmediata",
    },
    {
      id: "featured",
      label: "Mascotas destacadas",
      value: mockPets.filter((pet) => pet.featured).length.toString(),
      note: "Con visibilidad prioritaria",
    },
  ],
  quickNotes: [
    "Mantén actualizada la disponibilidad de cada mascota.",
    "Las solicitudes nuevas deben revisarse dentro de las primeras 24 horas.",
    "Puedes marcar un caso urgente o solicitar visibilidad destacada.",
  ],
};
