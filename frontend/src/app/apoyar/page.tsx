"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/Card";
import { apiClient, type BankInfo } from "@/lib/api";

export default function ApoyarPage() {
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBankInfo() {
      try {
        const info = await apiClient.bankInfo.get();

        if (!cancelled) {
          setBankInfo(info);
        }
      } catch (loadError) {
        if (!cancelled) {
          console.error(loadError);
        }
      }
    }

    void loadBankInfo();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="bg-soft-radial flex-1 pb-16 pt-10">
      <section className="page-shell space-y-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(35,17,31,0.08)]">
          <span className="inline-flex rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]">
            Apoyo voluntario
          </span>
          <h1 className="mt-5 text-5xl leading-none font-semibold text-[var(--color-text)]">
            Apoya la plataforma
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            Tu apoyo ayuda a mantener la plataforma, difundir mas mascotas y sostener
            las herramientas que usan rescatistas y adoptantes responsables.
          </p>
        </div>

        <Card className="space-y-5">
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">
            Datos para transferencia
          </h2>
          <div className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
            <p>
              <strong className="text-[var(--color-text)]">Pago via Spei a la cuenta:</strong>
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Titular:</strong> Alberto Gonzalez
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Cuenta:</strong> 6381 8000 0144 6569 58
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Banco:</strong> Banco Nu
            </p>
          </div>

          <div className="rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4 text-sm leading-7 text-[var(--color-muted)]">
            {bankInfo?.note ?? "Realiza tu transferencia usando estos datos."}
          </div>
        </Card>
      </section>
    </main>
  );
}
