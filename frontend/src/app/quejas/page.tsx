"use client";

import { useEffect, useState } from "react";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type ComplaintFormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
};

const initialFormState: ComplaintFormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

export default function QuejasPage() {
  const [form, setForm] = useState<ComplaintFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formLoadedAt, setFormLoadedAt] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  function updateField<K extends keyof ComplaintFormState>(field: K, value: ComplaintFormState[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.fullName.trim().length < 3) {
      setError("Escribe tu nombre completo.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Escribe un correo electronico valido.");
      return;
    }

    if (form.subject.trim().length < 5) {
      setError("Escribe un asunto mas claro para la queja.");
      return;
    }

    if (form.message.trim().length < 20) {
      setError("Describe la queja con un poco mas de detalle.");
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setError("Completa la verificacion antispam antes de enviar tu queja.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.complaints.submit({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        website: form.website,
        formLoadedAt,
        turnstileToken,
      });

      setForm(initialFormState);
      setFormLoadedAt(Date.now());
      setTurnstileToken("");
      await showSuccessAlert(
        "Queja enviada",
        "Tu mensaje ya fue recibido y el equipo lo revisara lo antes posible.",
      );
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No pudimos enviar tu queja en este momento.";
      setError(message);
      await showErrorAlert("No pudimos enviar tu queja", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-soft-radial flex-1 pb-16 pt-10">
      <section className="page-shell grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(35,17,31,0.08)]">
          <span className="inline-flex rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]">
            Quejas
          </span>
          <h1 className="mt-5 text-5xl leading-none font-semibold text-[var(--color-text)]">
            Queremos escuchar tu experiencia
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            Si encontraste un problema en la plataforma, recibiste un trato inadecuado
            o necesitas dejar una inconformidad, puedes enviarla aqui para revision
            administrativa.
          </p>
        </div>

        <Card className="space-y-4">
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">
            Antes de enviar tu queja
          </h2>
          <div className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
            <p>Describe claramente lo ocurrido.</p>
            <p>Incluye datos de contacto para que podamos responderte.</p>
            <p>Si tu caso involucra una mascota o un usuario, mencionalo en el mensaje.</p>
          </div>
        </Card>

        <Card className="space-y-5 xl:col-span-2">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">
              Formulario de quejas
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
              El equipo administrativo revisa estos mensajes manualmente.
            </p>
          </div>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="complaint-full-name">
                Nombre completo
              </label>
              <Input
                id="complaint-full-name"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Escribe tu nombre"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="complaint-email">
                Correo electronico
              </label>
              <Input
                id="complaint-email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="tu-correo@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="complaint-phone">
                Telefono
              </label>
              <Input
                id="complaint-phone"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Opcional"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="complaint-subject">
                Asunto
              </label>
              <Input
                id="complaint-subject"
                value={form.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                placeholder="Resume el motivo de tu queja"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="sr-only" htmlFor="complaint-website">
                Sitio web
              </label>
              <Input
                id="complaint-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] top-auto h-px w-px opacity-0"
                aria-hidden="true"
                value={form.website}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-[var(--color-text)]" htmlFor="complaint-message">
                Mensaje
              </label>
              <Textarea
                id="complaint-message"
                rows={7}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Explica lo ocurrido con el mayor detalle posible"
              />
            </div>

            {turnstileSiteKey ? (
              <div className="space-y-2 md:col-span-2">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  Verificacion antispam
                </p>
                <TurnstileWidget
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpired={() => setTurnstileToken("")}
                  onError={() => setTurnstileToken("")}
                />
              </div>
            ) : null}

            {error ? (
              <div className="md:col-span-2 rounded-[1.2rem] bg-[var(--color-secondary)]/10 px-4 py-3 text-sm text-[var(--color-secondary)]">
                {error}
              </div>
            ) : null}

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar queja"}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
