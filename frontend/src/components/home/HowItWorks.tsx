const steps = [
  {
    number: "1",
    title: "Explora",
    description:
      "Encuentra mascotas cerca de ti y revisa cuál puede ser tu compañera ideal.",
    accent: "bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]",
    icon: "🔎",
  },
  {
    number: "2",
    title: "Postúlate",
    description:
      "Envía una solicitud para que el rescatista conozca mejor tu hogar.",
    accent: "bg-[var(--color-secondary-soft)] text-[var(--color-secondary)]",
    icon: "📝",
  },
  {
    number: "3",
    title: "Conoce",
    description:
      "Habla con el rescatista y empieza una nueva historia juntos.",
    accent: "bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]",
    icon: "🤝",
  },
];

export function HowItWorks() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-4xl font-semibold text-[var(--color-text)]">
          ¿Cómo funciona la adopción?
        </h2>
        <p className="mt-2 text-[var(--color-muted)]">
          Un proceso claro, amable y pensado para encontrar el mejor match.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <article
            key={step.number}
            className="surface-card flex gap-4 rounded-[1.6rem] p-5"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${step.accent}`}
            >
              {step.icon}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold text-[var(--color-text)]">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {step.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
