"use client";

import { useState } from "react";

import { AdoptionApplicationForm } from "@/components/forms/AdoptionApplicationForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PetDetail } from "@/lib/types";

interface AdoptionCtaProps {
  pet: PetDetail;
}

export function AdoptionCta({ pet }: AdoptionCtaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <Card className="space-y-5">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">
              Rescatista responsable
            </h2>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
              Esta mascota es acompanada por una persona u organizacion que dara
              seguimiento a la adopcion.
            </p>
          </div>

          <div className="space-y-3 text-sm text-[var(--color-muted)]">
            <p>
              <span className="font-semibold text-[var(--color-text)]">Nombre:</span>{" "}
              {pet.rescuer.name}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-text)]">
                Organizacion:
              </span>{" "}
              {pet.rescuer.organization}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-text)]">Ciudad:</span>{" "}
              {pet.rescuer.city}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-text)]">Telefono:</span>{" "}
              {pet.rescuer.phone}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-text)]">Correo:</span>{" "}
              {pet.rescuer.email}
            </p>
          </div>
        </Card>

        {pet.status !== "adopted" ? (
          <Card className="space-y-5 bg-[var(--color-bg-soft)]">
            <div>
              <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                Quieres adoptar a {pet.name}?
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                Ya puedes iniciar contacto directo con el rescatista y completar
                una solicitud de adopcion desde la plataforma.
              </p>
            </div>
            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Iniciar proceso de adopcion
            </Button>
          </Card>
        ) : (
          <Card className="space-y-4 bg-[var(--color-bg-soft)]">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">
              Esta mascota ya fue adoptada
            </h2>
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Ya no recibe nuevas solicitudes, pero su historia sigue visible como
              ejemplo de adopcion responsable.
            </p>
          </Card>
        )}
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,17,31,0.62)] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Solicitud de adopcion"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.9rem] bg-white p-3 sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white text-xl text-[var(--color-text)] shadow-sm"
                aria-label="Cerrar solicitud de adopcion"
              >
                X
              </button>
            </div>
            <AdoptionApplicationForm
              petId={pet.id}
              petName={pet.name}
              onSuccess={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
