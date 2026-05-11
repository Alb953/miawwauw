"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { apiClient, type AuthUser, type BankInfo } from "@/lib/api";
import type { PetDetail } from "@/lib/types";

export default function DestacarPage() {
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [rescuerPets, setRescuerPets] = useState<PetDetail[]>([]);
  const [petId, setPetId] = useState("");
  const [amount, setAmount] = useState("10");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [referenceNote, setReferenceNote] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPageData() {
      try {
        const [info, user] = await Promise.all([apiClient.bankInfo.get(), apiClient.auth.me()]);

        if (cancelled) {
          return;
        }

        setBankInfo(info);
        setCurrentUser(user);

        if (user?.role === "rescatista") {
          const dashboard = await apiClient.rescuer.dashboard();

          if (!cancelled) {
            setRescuerPets(dashboard.pets);
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar la informacion para destacar una mascota.",
          );
        }
      }
    }

    void loadPageData();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const parsedAmount = Number(amount);

    if (currentUser?.role !== "rescatista") {
      setError("Necesitas iniciar sesion como rescatista para solicitar visibilidad destacada.");
      return;
    }

    if (!petId) {
      setError("Selecciona la mascota que quieres destacar.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Escribe un monto valido para registrar la solicitud.");
      return;
    }

    if (!accountHolderName.trim()) {
      setError("Escribe el nombre de quien realizo la transferencia.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await apiClient.contributions.create({
        contributionType: "featured_listing",
        petId,
        amount: parsedAmount,
        accountHolderName: accountHolderName.trim(),
        bankName: bankName.trim() || undefined,
        referenceNote: referenceNote.trim() || undefined,
        featuredDays: 30,
      });

      setSuccessMessage(
        `Registramos tu solicitud con folio ${result.contributionId}. El equipo la revisara antes de activar el destacado.`,
      );
      setPetId("");
      setAmount("10");
      setAccountHolderName("");
      setBankName("");
      setReferenceNote("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No pudimos registrar la solicitud de destacado.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-soft-radial flex-1 pb-16 pt-10">
      <section className="page-shell space-y-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(35,17,31,0.08)]">
          <span className="inline-flex rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]">
            Visibilidad destacada
          </span>
          <h1 className="mt-5 text-5xl leading-none font-semibold text-[var(--color-text)]">
            Destaca una mascota
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            Prioriza casos importantes dentro del catalogo y registra la contribucion
            para que el equipo admin pueda activarla manualmente.
          </p>
        </div>

        {error ? (
          <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
            {error}
          </Card>
        ) : null}

        {successMessage ? (
          <Card className="rounded-[1.4rem] bg-[var(--color-primary-soft)] text-sm leading-7 text-[var(--color-primary-dark)]">
            {successMessage}
          </Card>
        ) : null}

        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <Card className="space-y-5">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">
              Como funciona
            </h2>
            <ul className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              <li>1. Elige la mascota que quieres destacar.</li>
              <li>2. Realiza la transferencia a la cuenta activa de la plataforma.</li>
              <li>3. Registra aqui la solicitud para que el equipo la confirme.</li>
              <li>4. Al validarse, la mascota recibira visibilidad prioritaria.</li>
            </ul>

            <div className="rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4 text-sm leading-7 text-[var(--color-muted)]">
              <p>
                <strong className="text-[var(--color-text)]">Titular:</strong>{" "}
                {bankInfo?.accountHolder ?? "Cargando..."}
              </p>
              <p>
                <strong className="text-[var(--color-text)]">Banco:</strong>{" "}
                {bankInfo?.bank ?? "Cargando..."}
              </p>
              <p>
                <strong className="text-[var(--color-text)]">Cuenta:</strong>{" "}
                {bankInfo?.accountNumber ?? "Cargando..."}
              </p>
              <p>
                <strong className="text-[var(--color-text)]">CLABE:</strong>{" "}
                {bankInfo?.clabe ?? "Cargando..."}
              </p>
            </div>
          </Card>

          <Card className="space-y-5 bg-[linear-gradient(180deg,#fff9f2_0%,#ffe8d7_100%)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Costo sugerido
              </p>
              <p className="mt-2 text-5xl font-semibold text-[var(--color-text)]">
                $10 MXN
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Esta solicitud contempla 30 dias de visibilidad destacada tras la validacion manual.
              </p>
            </div>

            {currentUser?.role !== "rescatista" ? (
              <div className="rounded-[1.4rem] bg-white/85 p-4 text-sm leading-7 text-[var(--color-text)]">
                Inicia sesion como rescatista para elegir una mascota real y registrar
                esta solicitud.
              </div>
            ) : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--color-text)]">
                  Mascota a destacar
                </span>
                <Select
                  value={petId}
                  onChange={(event) => setPetId(event.target.value)}
                  options={[
                    { value: "", label: "Selecciona una mascota" },
                    ...rescuerPets.map((pet) => ({
                      value: pet.id,
                      label: `${pet.name} · ${pet.location}`,
                    })),
                  ]}
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--color-text)]">
                  Monto transferido
                </span>
                <Input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  placeholder="10"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--color-text)]">
                  Nombre de quien transfirio
                </span>
                <Input
                  value={accountHolderName}
                  onChange={(event) => setAccountHolderName(event.target.value)}
                  placeholder="Nombre completo"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--color-text)]">
                  Banco de origen
                </span>
                <Input
                  value={bankName}
                  onChange={(event) => setBankName(event.target.value)}
                  placeholder="Ej. Nu, BBVA, Santander"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-semibold text-[var(--color-text)]">
                  Nota o referencia
                </span>
                <Textarea
                  rows={4}
                  value={referenceNote}
                  onChange={(event) => setReferenceNote(event.target.value)}
                  placeholder="Puedes dejar una referencia de la transferencia o una nota para el equipo."
                />
              </label>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registrando solicitud..." : "Registrar solicitud"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
