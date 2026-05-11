"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { apiClient } from "@/lib/api";
import { findCountry, findState, locationCatalog } from "@/lib/locations";
import type { PetDetail } from "@/lib/types";

const featuredListingConfig = {
  cost: process.env.NEXT_PUBLIC_FEATURED_COST ?? "$10 pesitos",
  duration: process.env.NEXT_PUBLIC_FEATURED_DURATION ?? "1 mes",
  paymentAccount: process.env.NEXT_PUBLIC_FEATURED_PAYMENT_ACCOUNT ?? "2222222222",
  voucherPhone:
    process.env.NEXT_PUBLIC_FEATURED_VOUCHER_PHONE ?? "22222332323",
  limit:
    process.env.NEXT_PUBLIC_FEATURED_LIMIT_MESSAGE ??
    "la plataforma solo admite hasta 4 mascotas destacadas o pendientes de aprobacion al mismo tiempo.",
};

const featuredVoucherPhoneHref = `https://wa.me/${featuredListingConfig.voucherPhone.replace(/\D/g, "")}`;

interface PetFormProps {
  mode: "create" | "edit";
  pet?: PetDetail;
}

interface PetFormValues {
  name: string;
  species: string;
  age: string;
  gender: string;
  size: string;
  country: string;
  state: string;
  city: string;
  status: string;
  description: string;
  healthStatus: string;
  personality: string;
  requirements: string;
  story: string;
  urgent: boolean;
  featuredRequested: boolean;
  vaccinated: boolean;
  sterilized: boolean;
  dewormed: boolean;
}

type PetFormErrors = Partial<Record<keyof PetFormValues, string>>;

function joinValues(values?: string[]) {
  return values?.join(", ") ?? "";
}

function joinLines(values?: string[]) {
  return values?.join("\n") ?? "";
}

function parseLocation(location?: string) {
  if (!location) {
    return { country: "", state: "", city: "" };
  }

  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 3) {
    const [city, state, country] = parts;
    return { country, state, city };
  }

  if (parts.length === 2) {
    const [city, state] = parts;
    return { country: "", state, city };
  }

  return { country: "", state: "", city: parts[0] ?? "" };
}

function formatLocation(values: Pick<PetFormValues, "country" | "state" | "city">) {
  return [values.city, values.state, values.country].filter(Boolean).join(", ");
}

function createInitialValues(pet?: PetDetail): PetFormValues {
  const location = parseLocation(pet?.location);

  return {
    name: pet?.name ?? "",
    species: pet?.species ?? "",
    age: pet?.age ?? "",
    gender: pet?.gender ?? "",
    size: pet?.size ?? "",
    country: pet?.country ?? location.country,
    state: pet?.state ?? location.state,
    city: pet?.city ?? location.city,
    status: pet?.status ?? "available",
    description: pet?.description ?? "",
    healthStatus: pet?.health.medicalNotes ?? "",
    personality: joinValues(pet?.personality),
    requirements: joinLines(pet?.requirements),
    story: pet?.story ?? "",
    urgent: pet?.urgent ?? false,
    featuredRequested: pet?.featured ?? false,
    vaccinated: pet?.health.vaccinated ?? true,
    sterilized: pet?.health.sterilized ?? false,
    dewormed: pet?.health.dewormed ?? true,
  };
}

function validateValues(values: PetFormValues) {
  const errors: PetFormErrors = {};

  if (!values.name.trim()) errors.name = "Escribe el nombre de la mascota.";
  if (!values.species) errors.species = "Selecciona la especie.";
  if (!values.age.trim()) errors.age = "Escribe la edad.";
  if (!values.gender) errors.gender = "Selecciona el genero.";
  if (!values.size) errors.size = "Selecciona el tamano.";
  if (!values.country) errors.country = "Selecciona el pais.";
  if (!values.state) errors.state = "Selecciona el estado o provincia.";
  if (!values.city) errors.city = "Selecciona la ciudad.";
  if (!values.status) errors.status = "Selecciona el estado.";
  if (!values.description.trim()) errors.description = "Escribe una descripcion breve.";
  if (!values.healthStatus.trim()) {
    errors.healthStatus = "Escribe el estado de salud o notas medicas.";
  }
  if (!values.personality.trim()) errors.personality = "Describe la personalidad.";
  if (!values.requirements.trim()) errors.requirements = "Escribe al menos un requisito.";

  return errors;
}

export function PetForm({ mode, pet }: PetFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PetFormValues>(() => createInitialValues(pet));
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<PetFormErrors>({});
  const [imageError, setImageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue<Key extends keyof PetFormValues>(key: Key, value: PetFormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  function handleCountryChange(country: string) {
    setValues((current) => ({
      ...current,
      country,
      state: "",
      city: "",
    }));
    setErrors((current) => ({
      ...current,
      country: undefined,
      state: undefined,
      city: undefined,
    }));
    setSubmitError("");
  }

  function handleStateChange(state: string) {
    setValues((current) => ({
      ...current,
      state,
      city: "",
    }));
    setErrors((current) => ({
      ...current,
      state: undefined,
      city: undefined,
    }));
    setSubmitError("");
  }

  const selectedCountry = values.country ? findCountry(values.country) : undefined;
  const selectedState =
    values.country && values.state ? findState(values.country, values.state) : undefined;
  const countryOptions = [
    { value: "", label: "Selecciona un pais" },
    ...locationCatalog.map((country) => ({
      value: country.name,
      label: country.name,
    })),
  ];
  const stateOptions = [
    {
      value: "",
      label: selectedCountry
        ? "Selecciona un estado o provincia"
        : "Primero selecciona un pais",
    },
    ...(selectedCountry?.states.map((state) => ({
      value: state.name,
      label: state.name,
    })) ?? []),
  ];
  const cityOptions = [
    {
      value: "",
      label: selectedState ? "Selecciona una ciudad" : "Primero selecciona un estado o provincia",
    },
    ...(selectedState?.cities.map((city) => ({
      value: city,
      label: city,
    })) ?? []),
  ];

  if (values.country && !countryOptions.some((option) => option.value === values.country)) {
    countryOptions.push({
      value: values.country,
      label: `${values.country} (actual)`,
    });
  }

  if (values.state && !stateOptions.some((option) => option.value === values.state)) {
    stateOptions.push({
      value: values.state,
      label: `${values.state} (actual)`,
    });
  }

  if (values.city && !cityOptions.some((option) => option.value === values.city)) {
    cityOptions.push({
      value: values.city,
      label: `${values.city} (actual)`,
    });
  }

  const hasExistingImages = Boolean(pet?.imageUrls?.length);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateValues(values);
    const requiresImage = mode === "create" || !hasExistingImages;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setImageError("");
      setSuccessMessage("");
      return;
    }

    if (requiresImage && selectedImages.length === 0) {
      setImageError("Debes subir al menos una foto de la mascota.");
      setSuccessMessage("");
      return;
    }

    setIsSubmitting(true);
    setImageError("");
    setSubmitError("");

    try {
      const payload = {
        name: values.name.trim(),
        species: values.species,
        age: values.age.trim(),
        gender: values.gender,
        size: values.size,
        location: formatLocation(values),
        country: values.country,
        state: values.state,
        city: values.city,
        health_status: values.healthStatus.trim(),
        sterilized: values.sterilized,
        personality: values.personality.trim(),
        description: values.description.trim(),
        requirements: values.requirements.trim(),
        status: values.status,
        is_urgent: values.urgent,
        is_featured: false,
      };

      const savedPet =
        mode === "create"
          ? await apiClient.pets.create(payload)
          : await apiClient.pets.update(pet!.id, payload);

      let featuredRequestCreated = false;
      let featuredRequestAlreadyPending = false;
      const shouldCreateFeaturedRequest =
        values.featuredRequested && !pet?.featured && !savedPet.featured;

      if (shouldCreateFeaturedRequest) {
        try {
          await apiClient.contributions.create({
            contributionType: "featured_listing",
            petId: savedPet.id,
            amount: 10,
            featuredDays: 30,
            referenceNote:
              mode === "create"
                ? "Solicitud creada automaticamente desde el registro de mascota."
                : "Solicitud creada automaticamente desde la edicion de mascota.",
          });
          featuredRequestCreated = true;
        } catch (featuredError) {
          const featuredErrorMessage =
            featuredError instanceof Error ? featuredError.message : "";

          if (
            featuredErrorMessage.includes(
              "Ya existe una solicitud pendiente de visibilidad destacada",
            )
          ) {
            featuredRequestAlreadyPending = true;
          } else {
            throw featuredError;
          }
        }
      }

      if (selectedImages.length > 0) {
        try {
          await apiClient.pets.images(savedPet.id, selectedImages);
        } catch (imageError) {
          setSuccessMessage(
            mode === "create"
              ? featuredRequestCreated
                ? "La mascota se registro y la solicitud de destacado quedo pendiente, pero no pudimos subir las fotos a Cloudinary."
                : featuredRequestAlreadyPending
                  ? "La mascota se registro correctamente. Ya existia una solicitud pendiente de destacado para esta mascota, pero no pudimos subir las fotos a Cloudinary."
                  : "La mascota se registro correctamente, pero no pudimos subir las fotos a Cloudinary."
              : featuredRequestCreated
                ? "Los cambios se guardaron y la solicitud de destacado quedo pendiente, pero no pudimos subir las fotos a Cloudinary."
                : featuredRequestAlreadyPending
                  ? "Los cambios se guardaron. Ya existia una solicitud pendiente de destacado para esta mascota, pero no pudimos subir las fotos a Cloudinary."
                  : "Los cambios se guardaron, pero no pudimos subir las fotos a Cloudinary.",
          );
          setSubmitError(
            imageError instanceof Error
              ? imageError.message
              : "No pudimos subir las fotos seleccionadas.",
          );
          router.push(`/panel/rescatista/mascotas/${savedPet.id}/editar`);
          router.refresh();
          return;
        }
      }

      setSuccessMessage(
        mode === "create"
          ? featuredRequestCreated
            ? "La mascota se registro y la solicitud de visibilidad destacada quedo pendiente de aprobacion."
            : featuredRequestAlreadyPending
              ? "La mascota se registro correctamente. Ya existia una solicitud pendiente de visibilidad destacada para esta mascota."
              : "La mascota se registro correctamente en la base de datos."
          : featuredRequestCreated
            ? "Los cambios de la mascota se guardaron y la solicitud de visibilidad destacada quedo pendiente de aprobacion."
            : featuredRequestAlreadyPending
              ? "Los cambios de la mascota se guardaron. Ya existia una solicitud pendiente de visibilidad destacada para esta mascota."
              : "Los cambios de la mascota se guardaron correctamente.",
      );

      if (mode === "create") {
        setValues(createInitialValues());
      } else {
        setValues(createInitialValues(savedPet));
      }
      setSelectedImages([]);

      router.push(`/mascotas/${savedPet.id}`);
      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No pudimos guardar la mascota. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          {mode === "create" ? "Registrar nueva mascota" : `Editar a ${pet?.name}`}
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          {mode === "create"
            ? "Completa la informacion esencial para guardar una mascota real en la plataforma."
            : "Actualiza la informacion del perfil y guarda los cambios reales en la plataforma."}
        </p>
      </div>

      {successMessage ? (
        <div className="rounded-[1.4rem] bg-[var(--color-primary-soft)] px-5 py-4 text-sm leading-7 text-[var(--color-primary-dark)]">
          {successMessage}
        </div>
      ) : null}

      {submitError ? (
        <div className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 px-5 py-4 text-sm leading-7 text-[var(--color-secondary)]">
          {submitError}
        </div>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Nombre</span>
            <Input
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              placeholder="Nombre de la mascota"
            />
            {errors.name ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.name}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Especie</span>
            <Select
              value={values.species}
              onChange={(event) => updateValue("species", event.target.value)}
              options={[
                { value: "", label: "Selecciona una especie" },
                { value: "dog", label: "Perrito" },
                { value: "cat", label: "Gatito" },
              ]}
            />
            {errors.species ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.species}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Edad</span>
            <Input
              value={values.age}
              onChange={(event) => updateValue("age", event.target.value)}
              placeholder="Ej. 8 meses"
            />
            {errors.age ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.age}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Genero</span>
            <Select
              value={values.gender}
              onChange={(event) => updateValue("gender", event.target.value)}
              options={[
                { value: "", label: "Selecciona un genero" },
                { value: "male", label: "Macho" },
                { value: "female", label: "Hembra" },
              ]}
            />
            {errors.gender ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.gender}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Tamano</span>
            <Select
              value={values.size}
              onChange={(event) => updateValue("size", event.target.value)}
              options={[
                { value: "", label: "Selecciona un tamano" },
                { value: "small", label: "Pequeno" },
                { value: "medium", label: "Mediano" },
                { value: "large", label: "Grande" },
              ]}
            />
            {errors.size ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.size}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Pais</span>
            <Select
              value={values.country}
              onChange={(event) => handleCountryChange(event.target.value)}
              options={countryOptions}
            />
            {errors.country ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.country}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Estado / Provincia
            </span>
            <Select
              value={values.state}
              onChange={(event) => handleStateChange(event.target.value)}
              disabled={!selectedCountry}
              options={stateOptions}
            />
            {errors.state ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.state}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">Ciudad</span>
            <Select
              value={values.city}
              onChange={(event) => updateValue("city", event.target.value)}
              disabled={!selectedState}
              options={cityOptions}
            />
            {errors.city ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.city}</p>
            ) : null}
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Estado de adopcion
            </span>
            <Select
              value={values.status}
              onChange={(event) => updateValue("status", event.target.value)}
              options={[
                { value: "", label: "Selecciona un estado" },
                { value: "available", label: "Disponible" },
                { value: "in_process", label: "En proceso" },
                { value: "adopted", label: "Adoptado" },
              ]}
            />
            {errors.status ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.status}</p>
            ) : null}
          </label>
        </div>

        <label className="space-y-2">
          <span className="block text-sm font-semibold text-[var(--color-text)]">
            Descripcion breve
          </span>
          <Textarea
            rows={4}
            value={values.description}
            onChange={(event) => updateValue("description", event.target.value)}
            placeholder="Resumen breve para el listado publico."
          />
          {errors.description ? (
            <p className="text-xs text-[var(--color-secondary)]">{errors.description}</p>
          ) : null}
        </label>

        <Card className="space-y-4 bg-[var(--color-bg-soft)]">
          <h3 className="text-2xl font-semibold text-[var(--color-text)]">
            Informacion de salud
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={values.vaccinated}
                onChange={(event) => updateValue("vaccinated", event.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Vacunado</span>
            </label>

            <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={values.sterilized}
                onChange={(event) => updateValue("sterilized", event.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Esterilizado</span>
            </label>

            <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
              <input
                type="checkbox"
                checked={values.dewormed}
                onChange={(event) => updateValue("dewormed", event.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
              />
              <span>Desparasitado</span>
            </label>
          </div>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Estado de salud o notas medicas
            </span>
            <Textarea
              rows={3}
              value={values.healthStatus}
              onChange={(event) => updateValue("healthStatus", event.target.value)}
              placeholder="Observaciones veterinarias o pendientes de salud."
            />
            {errors.healthStatus ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.healthStatus}</p>
            ) : null}
          </label>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Personalidad
            </span>
            <Textarea
              rows={4}
              value={values.personality}
              onChange={(event) => updateValue("personality", event.target.value)}
              placeholder="Ej. Jugueton, noble, sociable, tranquilo"
            />
            <p className="text-xs text-[var(--color-muted)]">
              Separa cada rasgo con comas.
            </p>
            {errors.personality ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.personality}</p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Requisitos de adopcion
            </span>
            <Textarea
              rows={4}
              value={values.requirements}
              onChange={(event) => updateValue("requirements", event.target.value)}
              placeholder="Escribe un requisito por linea."
            />
            <p className="text-xs text-[var(--color-muted)]">
              Usa una linea por cada requisito.
            </p>
            {errors.requirements ? (
              <p className="text-xs text-[var(--color-secondary)]">{errors.requirements}</p>
            ) : null}
          </label>
        </div>

        <label className="space-y-2">
          <span className="block text-sm font-semibold text-[var(--color-text)]">
            Su historia
          </span>
          <Textarea
            rows={6}
            value={values.story}
            onChange={(event) => updateValue("story", event.target.value)}
            placeholder="Cuenta como fue el rescate, su contexto y lo que necesita para adaptarse."
          />
        </label>

        <Card className="space-y-4 bg-[var(--color-bg-soft)]">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[var(--color-text)]">
              Fotos de la mascota
            </h3>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Estas imagenes se enviaran al backend y se subiran a Cloudinary.
              Puedes seleccionar varias a la vez.
            </p>
            <p className="text-xs font-semibold text-[var(--color-secondary)]">
              Debes subir al menos una foto para guardar la mascota.
            </p>
          </div>

          {mode === "edit" && pet?.imageUrls?.length ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Fotos actuales
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {pet.imageUrls.map((imageUrl, index) => (
                  <div
                    key={`${pet.id}-existing-${index}`}
                    className="overflow-hidden rounded-[1.2rem] border bg-white shadow-sm"
                  >
                    <img
                      src={imageUrl}
                      alt={`Foto actual ${index + 1} de ${pet.name}`}
                      className="h-36 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <label className="space-y-2">
            <span className="block text-sm font-semibold text-[var(--color-text)]">
              Selecciona imagenes
            </span>
            <Input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => {
                setSelectedImages(Array.from(event.target.files ?? []));
                setImageError("");
                setSubmitError("");
              }}
            />
            <p className="text-xs text-[var(--color-muted)]">
              Formatos permitidos: JPG, PNG y WEBP. La carga real se procesa en Cloudinary.
            </p>
            {imageError ? (
              <p className="text-xs text-[var(--color-secondary)]">{imageError}</p>
            ) : null}
          </label>

          {selectedImages.length > 0 ? (
            <div className="rounded-[1.2rem] bg-white p-4 text-sm leading-7 text-[var(--color-muted)]">
              <p className="font-semibold text-[var(--color-text)]">
                {selectedImages.length} imagen(es) seleccionada(s)
              </p>
              <ul className="mt-2 space-y-1">
                {selectedImages.map((image) => (
                  <li key={`${image.name}-${image.size}`}>{image.name}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {mode === "edit" && !pet?.imageUrls?.length ? (
            <div className="rounded-[1.2rem] bg-white p-4 text-sm leading-7 text-[var(--color-muted)]">
              Esta mascota aun no tiene fotos subidas a Cloudinary.
            </div>
          ) : null}
        </Card>

        <div className="grid gap-4 rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4 md:grid-cols-2">
          <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
            <input
              type="checkbox"
              checked={values.urgent}
              onChange={(event) => {
                const isChecked = event.target.checked;
                updateValue("urgent", isChecked);

                if (isChecked && values.featuredRequested) {
                  updateValue("featuredRequested", false);
                }
              }}
              className="mt-1 h-4 w-4 accent-[var(--color-secondary)]"
            />
            <span>Marcar como caso urgente</span>
          </label>

          <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
            <input
              type="checkbox"
              checked={values.featuredRequested}
              onChange={(event) => {
                const isChecked = event.target.checked;
                updateValue("featuredRequested", isChecked);

                if (isChecked && values.urgent) {
                  updateValue("urgent", false);
                }
              }}
              className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
            />
            <span>Solicitar visibilidad destacada</span>
          </label>
        </div>

        {values.featuredRequested ? (
          <Card className="space-y-4 bg-[linear-gradient(180deg,#fff9f2_0%,#ffe8d7_100%)]">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-[var(--color-text)]">
                Solicitud de visibilidad destacada
              </h3>
              <div className="rounded-[1.2rem] bg-white/90 p-4 text-sm leading-7 text-[var(--color-muted)]">
                <p>
                  <strong className="text-[var(--color-text)]">Costo:</strong>{" "}
                  {featuredListingConfig.cost}
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">Duracion:</strong>{" "}
                  {featuredListingConfig.duration}
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">Cuenta para pago:</strong>{" "}
                  {featuredListingConfig.paymentAccount}
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">Enviar baucher al num celular:</strong>{" "}
                  <a
                    href={featuredVoucherPhoneHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
                  >
                    {featuredListingConfig.voucherPhone}
                  </a>
                </p>
                <p>
                  <strong className="text-[var(--color-text)]">Limite:</strong>{" "}
                  {featuredListingConfig.limit}
                </p>
              </div>
            </div>
          </Card>
        ) : null}

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting
            ? "Guardando..."
            : mode === "create"
              ? "Guardar mascota"
              : "Guardar cambios"}
        </Button>
      </form>
    </Card>
  );
}
