"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { apiClient } from "@/lib/api";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

interface AdoptionApplicationFormProps {
  petId: string;
  petName: string;
  onSuccess?: () => void;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  housingType: string;
  otherPets: string;
  adoptedBefore: string;
  reason: string;
  followUpAccepted: boolean;
  requirementsAccepted: boolean;
  termsAccepted: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  housingType: "",
  otherPets: "",
  adoptedBefore: "",
  reason: "",
  followUpAccepted: false,
  requirementsAccepted: false,
  termsAccepted: false,
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

function validate(values: FormValues) {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Escribe tu nombre completo.";
  if (!values.email.trim()) errors.email = "Escribe tu correo electronico.";
  if (!values.phone.trim()) errors.phone = "Escribe tu telefono.";
  if (!values.city.trim()) errors.city = "Escribe tu ciudad.";
  if (!values.housingType) errors.housingType = "Selecciona tu tipo de vivienda.";
  if (!values.otherPets) errors.otherPets = "Indica si tienes otras mascotas.";
  if (!values.adoptedBefore) errors.adoptedBefore = "Indica si has adoptado antes.";
  if (!values.reason.trim() || values.reason.trim().length < 20) {
    errors.reason = "Cuentanos un poco mas sobre por que quieres adoptar.";
  }
  if (!values.followUpAccepted) {
    errors.followUpAccepted = "Debes aceptar el seguimiento posterior a la adopcion.";
  }
  if (!values.requirementsAccepted) {
    errors.requirementsAccepted = "Debes aceptar los requisitos de adopcion.";
  }
  if (!values.termsAccepted) {
    errors.termsAccepted = "Debes aceptar los terminos y politicas de la plataforma.";
  }

  return errors;
}

export function AdoptionApplicationForm({
  petId,
  petName,
  onSuccess,
}: AdoptionApplicationFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      await showErrorAlert(
        "Completa la verificacion antispam",
        "Resuelve la verificacion antes de enviar la solicitud.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.applications.submit({
        petId,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        housingType: values.housingType as "house" | "apartment",
        otherPets: values.otherPets as "true" | "false",
        adoptedBefore: values.adoptedBefore as "true" | "false",
        reason: values.reason.trim(),
        followUpAccepted: values.followUpAccepted,
        requirementsAccepted: values.requirementsAccepted,
        termsAccepted: values.termsAccepted,
        turnstileToken,
      });

      setErrors({});
      setValues(initialValues);
      setTurnstileToken("");
      await showSuccessAlert("Solicitud enviada", response.message);
      onSuccess?.();
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos enviar tu solicitud. Intenta de nuevo.";
      await showErrorAlert("No pudimos enviar tu solicitud", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Solicitud de adopcion
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Completa este formulario para que el rescatista conozca mejor tu hogar y tu interes en
          adoptar a {petName}.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Nombre completo
            </span>
            <Input
              value={values.fullName}
              onChange={(event) => updateValue("fullName", event.target.value)}
              placeholder="Tu nombre completo"
            />
            {errors.fullName ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.fullName}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Correo electronico
            </span>
            <Input
              type="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              placeholder="tu@correo.com"
            />
            {errors.email ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.email}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Telefono
            </span>
            <Input
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              placeholder="Tu numero de contacto"
            />
            {errors.phone ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.phone}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Ciudad</span>
            <Input
              value={values.city}
              onChange={(event) => updateValue("city", event.target.value)}
              placeholder="Donde vives?"
            />
            {errors.city ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.city}</p>
            ) : null}
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Tipo de vivienda
            </span>
            <Select
              value={values.housingType}
              onChange={(event) => updateValue("housingType", event.target.value)}
              options={[
                { value: "", label: "Selecciona una opcion" },
                { value: "apartment", label: "Departamento" },
                { value: "house", label: "Casa" },
              ]}
            />
            {errors.housingType ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.housingType}</p>
            ) : null}
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Tienes otras mascotas?
            </span>
            <Select
              value={values.otherPets}
              onChange={(event) => updateValue("otherPets", event.target.value)}
              options={[
                { value: "", label: "Selecciona una opcion" },
                { value: "true", label: "Si" },
                { value: "false", label: "No" },
              ]}
            />
            {errors.otherPets ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.otherPets}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Has adoptado antes?
            </span>
            <Select
              value={values.adoptedBefore}
              onChange={(event) => updateValue("adoptedBefore", event.target.value)}
              options={[
                { value: "", label: "Selecciona una opcion" },
                { value: "true", label: "Si" },
                { value: "false", label: "No" },
              ]}
            />
            {errors.adoptedBefore ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.adoptedBefore}</p>
            ) : null}
          </label>
        </div>

        <label className="space-y-2">
          <span className="block text-sm font-semibold text-[var(--color-text)]">
            Por que quieres adoptar esta mascota?
          </span>
          <Textarea
            rows={5}
            value={values.reason}
            onChange={(event) => updateValue("reason", event.target.value)}
            placeholder={`Cuentanos por que te gustaria adoptar a ${petName}.`}
          />
          {errors.reason ? (
            <p className="text-xs text-[var(--color-secondary)]">{errors.reason}</p>
          ) : null}
        </label>

        <div className="space-y-4 rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4">
          <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
            <input
              type="checkbox"
              checked={values.followUpAccepted}
              onChange={(event) => updateValue("followUpAccepted", event.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
            />
            <span>Aceptas seguimiento despues de la adopcion?</span>
          </label>
          {errors.followUpAccepted ? (
            <p className="text-xs text-[var(--color-secondary)]">{errors.followUpAccepted}</p>
          ) : null}

          <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
            <input
              type="checkbox"
              checked={values.requirementsAccepted}
              onChange={(event) => updateValue("requirementsAccepted", event.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
            />
            <span>Aceptas los requisitos de adopcion?</span>
          </label>
          {errors.requirementsAccepted ? (
            <p className="text-xs text-[var(--color-secondary)]">{errors.requirementsAccepted}</p>
          ) : null}

          <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
            <input
              type="checkbox"
              checked={values.termsAccepted}
              onChange={(event) => updateValue("termsAccepted", event.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
            />
            <span>
              Declaro que lei y acepto los{" "}
              <a
                href="/contacto"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
              >
                terminos, el aviso de privacidad y las politicas de la plataforma
              </a>
              .
            </span>
          </label>
          {errors.termsAccepted ? (
            <p className="text-xs text-[var(--color-secondary)]">{errors.termsAccepted}</p>
          ) : null}
        </div>

        {turnstileSiteKey ? (
          <div className="space-y-2">
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

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </Button>
      </form>
    </Card>
  );
}
