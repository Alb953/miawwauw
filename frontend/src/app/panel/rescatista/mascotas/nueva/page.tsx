import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PetForm } from "@/components/dashboard/PetForm";

export default function NuevaMascotaPage() {
  return (
    <DashboardShell
      title="Registrar una mascota"
      description="Crea un nuevo perfil con la información esencial para iniciar la difusión y el proceso de adopción responsable."
    >
      <PetForm mode="create" />
    </DashboardShell>
  );
}
