import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const infoSections = [
  {
    title: "Terminos y condiciones",
    description:
      "Al usar la plataforma, cada persona acepta proporcionar informacion veraz, actuar con respeto y no utilizar el sitio para fraude, venta irregular de mascotas, acoso, spam o suplantacion. Adopta Miauw Wau puede moderar, ocultar o retirar publicaciones, solicitudes o cuentas cuando detecte incumplimientos, riesgos para la comunidad o informacion engañosa. Limitacion de responsabilidad: Miauw Wau no sera responsable por acuerdos, promesas, pagos, entregas, traslados, condiciones medicas, comportamiento futuro de la mascota o conflictos entre usuarios, salvo cuando exista responsabilidad directa atribuible a la administracion de la plataforma conforme a la legislacion aplicable.",
  },
  {
    title: "Aviso de privacidad",
    description:
      "Los datos compartidos en registro, solicitudes de adopcion, quejas y formularios internos se utilizan para operar la plataforma, facilitar el contacto entre las partes, revisar casos administrativos y reforzar la seguridad del servicio. La informacion personal no debe difundirse fuera de los fines operativos, de seguimiento o moderacion.",
  },
  {
    title: "Reglas de publicacion",
    description:
      "Toda publicacion debe corresponder a una mascota real, incluir fotografias adecuadas y contener datos claros sobre salud, ubicacion y proceso de adopcion. No se permiten publicaciones duplicadas, ofensivas, manipuladas, con fines ajenos al bienestar animal o con informacion falsa sobre disponibilidad, identidad o condiciones de entrega.",
  },
  {
    title: "Politica de apoyo voluntario",
    description:
      "Los apoyos voluntarios y solicitudes de visibilidad destacada ayudan al mantenimiento tecnico y operativo del proyecto. Ningun aporte garantiza aprobacion automatica, trato preferencial fuera de las reglas o resultados de adopcion. La activacion, rechazo o correccion de estos apoyos depende de validacion administrativa.",
  },
  {
    title: "Adopcion responsable",
    description:
      "La plataforma promueve adopciones informadas, con seguimiento y compromiso real. Antes de adoptar, la persona interesada debe evaluar tiempo, espacio, estabilidad, gastos veterinarios, seguridad del hogar y disposicion para acompañar la adaptacion de la mascota. El bienestar animal y la idoneidad del hogar tienen prioridad sobre la rapidez del proceso.",
  },
  {
    title: "Reportar una publicacion",
    description:
      "Si detectas datos sospechosos, maltrato, fraude, lenguaje inapropiado, publicaciones falsas o conductas que pongan en riesgo a la comunidad, puedes reportarlo para revision interna. Los reportes deben enviarse de buena fe, con informacion clara y sin usar este canal para hostigamiento o denuncias falsas.",
  },
] as const;

export default function ContactoPage() {
  return (
    <main className="bg-soft-radial flex-1 py-10">
      <section className="page-shell space-y-8">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,#fff8f1_0%,#f7ede5_52%,#fffdf9_100%)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)] shadow-sm">
                Normas y politicas
              </span>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-5xl leading-none font-semibold text-[var(--color-text)]">
                  Conoce las reglas, politicas y criterios de uso de la plataforma.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                  Aqui reunimos la informacion principal para participar en Adopta Miauw Wau con claridad,
                  seguridad, responsabilidad y respeto hacia la comunidad y las mascotas.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-white/85 p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]">
                  Comunidad segura
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  Reglas para publicar, adoptar, apoyar y participar de forma honesta y respetuosa.
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-white/85 p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                  Proteccion y seguimiento
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  Criterios sobre privacidad, moderacion, reportes y apoyo voluntario dentro del proyecto.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {infoSections.map((section) => (
            <Card key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-[var(--color-text)]">
                {section.title}
              </h2>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {section.description}
              </p>
            </Card>
          ))}
        </section>

        <Card className="flex flex-col gap-4 bg-[var(--color-bg-soft)] md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">
              Necesitas reportar algo o consultar el proceso?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
              Puedes enviar una queja para revision administrativa o volver a consultar el proceso de adopcion responsable antes de continuar.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/quejas" size="lg">
              Ir a quejas
            </Button>
            <Button href="/adopcion-responsable" variant="secondary" size="lg">
              Ver adopcion responsable
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
