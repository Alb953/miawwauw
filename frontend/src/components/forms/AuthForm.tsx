"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { apiClient } from "@/lib/api";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { getPanelRouteByRole } from "@/lib/routes";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
  sessionExpired?: boolean;
}

interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues extends LoginValues {
  name: string;
  phone: string;
  role: string;
  termsAccepted: boolean;
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>;
type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const initialLoginValues: LoginValues = {
  email: "",
  password: "",
};

const initialRegisterValues: RegisterValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "",
  termsAccepted: false,
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

function validateLogin(values: LoginValues) {
  const errors: LoginErrors = {};

  if (!values.email.trim()) errors.email = "Escribe tu correo electronico.";
  if (!values.password.trim()) errors.password = "Escribe tu contrasena.";

  return errors;
}

function validateRegister(values: RegisterValues) {
  const errors: RegisterErrors = {};

  if (!values.name.trim()) errors.name = "Escribe tu nombre.";
  if (!values.email.trim()) errors.email = "Escribe tu correo electronico.";
  if (!values.password.trim() || values.password.trim().length < 8) {
    errors.password = "La contrasena debe tener al menos 8 caracteres.";
  }
  if (!values.phone.trim()) errors.phone = "Escribe tu telefono.";
  if (!values.role) errors.role = "Selecciona tu rol.";
  if (!values.termsAccepted) {
    errors.termsAccepted = "Debes aceptar los terminos y politicas de la plataforma.";
  }

  return errors;
}

function getRedirectByRole(role: "adoptante" | "rescatista" | "admin") {
  return getPanelRouteByRole(role);
}

function AuthArtwork({ mode }: { mode: AuthMode }) {
  return (
    <div className="relative hidden overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#fff8f1_0%,#f8ecdf_100%)] p-8 lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.7),transparent_24%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)] shadow-sm">
            {mode === "login" ? "Bienvenida de vuelta" : "Tu cuenta empieza aqui"}
          </span>
          <h2 className="text-5xl leading-none font-semibold text-[var(--color-text)]">
            {mode === "login"
              ? "Vuelve a conectar con una historia de adopcion."
              : "Unete a una comunidad que cuida y acompana."}
          </h2>
          <p className="max-w-md text-lg leading-8 text-[var(--color-muted)]">
            {mode === "login"
              ? "Accede a tus solicitudes, revisa perfiles y da seguimiento a tus proximos pasos."
              : "Crea tu cuenta para adoptar, publicar mascotas y formar parte de una red responsable."}
          </p>
        </div>

        <div className="flex items-end justify-center gap-6 pt-10">
          <div className="rounded-[2rem] bg-white/60 px-6 py-5 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="text-[6rem] leading-none">🐶</div>
          </div>
          <div className="rounded-[2rem] bg-white/65 px-6 py-5 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="text-[5rem] leading-none">🐱</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthForm({ mode, sessionExpired = false }: AuthFormProps) {
  const router = useRouter();
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [registerValues, setRegisterValues] = useState(initialRegisterValues);
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerTurnstileToken, setRegisterTurnstileToken] = useState("");

  const isLogin = mode === "login";

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateLogin(loginValues);

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await apiClient.auth.login(loginValues);
      const currentUser = await apiClient.auth.me();

      setLoginErrors({});
      setLoginValues(initialLoginValues);
      await showSuccessAlert("Sesion iniciada", session.message);

      router.push(getRedirectByRole(currentUser?.role ?? session.user.role));
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos iniciar sesion. Intenta de nuevo.";
      await showErrorAlert("No pudimos iniciar sesion", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateRegister(registerValues);

    if (Object.keys(errors).length > 0) {
      setRegisterErrors(errors);
      return;
    }

    if (turnstileSiteKey && !registerTurnstileToken) {
      await showErrorAlert(
        "Completa la verificacion antispam",
        "Resuelve la verificacion antes de crear tu cuenta.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await apiClient.auth.register({
        name: registerValues.name,
        email: registerValues.email,
        password: registerValues.password,
        phone: registerValues.phone,
        role: registerValues.role as "adoptante" | "rescatista",
        termsAccepted: registerValues.termsAccepted,
        turnstileToken: registerTurnstileToken,
      });
      const currentUser = await apiClient.auth.me();

      setRegisterErrors({});
      setRegisterValues(initialRegisterValues);
      setRegisterTurnstileToken("");
      await showSuccessAlert("Cuenta creada", session.message);

      router.push(getRedirectByRole(currentUser?.role ?? session.user.role));
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos crear tu cuenta. Intenta de nuevo.";
      await showErrorAlert("No pudimos crear tu cuenta", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-soft-radial flex-1 py-10">
      <section className="page-shell">
        <div className="grid gap-8 rounded-[2rem] bg-white p-6 shadow-[0_20px_70px_rgba(35,17,31,0.08)] lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <AuthArtwork mode={mode} />

          <Card className="border-0 p-0 shadow-none">
            <div className="space-y-6 rounded-[1.75rem] border bg-white p-6 sm:p-8">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]">
                  {isLogin ? "Acceso seguro" : "Registro de cuenta"}
                </span>
                <div>
                  <h1 className="text-4xl font-semibold text-[var(--color-text)]">
                    {isLogin ? "Iniciar sesion" : "Crear una cuenta"}
                  </h1>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {isLogin
                      ? "Ingresa con tu correo para continuar y revisar tus avances en la plataforma."
                      : "Completa tus datos para crear una cuenta real como rescatista."}
                  </p>
                </div>
              </div>

              {sessionExpired ? (
                <div className="rounded-[1.4rem] bg-[var(--color-bg-soft)] px-5 py-4 text-sm leading-7 text-[var(--color-text)]">
                  Tu sesion expiro por inactividad. Inicia sesion de nuevo para continuar.
                </div>
              ) : null}

              {isLogin ? (
                <form className="space-y-5" onSubmit={handleLoginSubmit} noValidate>
                  <label className="space-y-2">
                    <span className="block text-sm font-semibold text-[var(--color-text)]">
                      Correo electronico
                    </span>
                    <Input
                      type="email"
                      value={loginValues.email}
                      onChange={(event) => {
                        setLoginValues((current) => ({
                          ...current,
                          email: event.target.value,
                        }));
                        setLoginErrors((current) => ({ ...current, email: undefined }));
                      }}
                      placeholder="tu@correo.com"
                    />
                    {loginErrors.email ? (
                      <p className="text-xs text-[var(--color-secondary)]">{loginErrors.email}</p>
                    ) : null}
                  </label>

                  <label className="space-y-2">
                    <span className="block text-sm font-semibold text-[var(--color-text)]">
                      Contrasena
                    </span>
                    <Input
                      type="password"
                      value={loginValues.password}
                      onChange={(event) => {
                        setLoginValues((current) => ({
                          ...current,
                          password: event.target.value,
                        }));
                        setLoginErrors((current) => ({
                          ...current,
                          password: undefined,
                        }));
                      }}
                      placeholder="Tu contrasena"
                    />
                    {loginErrors.password ? (
                      <p className="text-xs text-[var(--color-secondary)]">
                        {loginErrors.password}
                      </p>
                    ) : null}
                  </label>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Ingresando..." : "Ingresar"}
                  </Button>
                </form>
              ) : (
                <form className="space-y-5" onSubmit={handleRegisterSubmit} noValidate>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                      <span className="block text-sm font-semibold text-[var(--color-text)]">
                        Nombre
                      </span>
                      <Input
                        value={registerValues.name}
                        onChange={(event) => {
                          setRegisterValues((current) => ({
                            ...current,
                            name: event.target.value,
                          }));
                          setRegisterErrors((current) => ({
                            ...current,
                            name: undefined,
                          }));
                        }}
                        placeholder="Tu nombre completo"
                      />
                      {registerErrors.name ? (
                        <p className="text-xs text-[var(--color-secondary)]">
                          {registerErrors.name}
                        </p>
                      ) : null}
                    </label>

                    <label className="space-y-2">
                      <span className="block text-sm font-semibold text-[var(--color-text)]">
                        Correo electronico
                      </span>
                      <Input
                        type="email"
                        value={registerValues.email}
                        onChange={(event) => {
                          setRegisterValues((current) => ({
                            ...current,
                            email: event.target.value,
                          }));
                          setRegisterErrors((current) => ({
                            ...current,
                            email: undefined,
                          }));
                        }}
                        placeholder="tu@correo.com"
                      />
                      {registerErrors.email ? (
                        <p className="text-xs text-[var(--color-secondary)]">
                          {registerErrors.email}
                        </p>
                      ) : null}
                    </label>

                    <label className="space-y-2">
                      <span className="block text-sm font-semibold text-[var(--color-text)]">
                        Telefono
                      </span>
                      <Input
                        value={registerValues.phone}
                        onChange={(event) => {
                          setRegisterValues((current) => ({
                            ...current,
                            phone: event.target.value,
                          }));
                          setRegisterErrors((current) => ({
                            ...current,
                            phone: undefined,
                          }));
                        }}
                        placeholder="Tu numero de contacto"
                      />
                      {registerErrors.phone ? (
                        <p className="text-xs text-[var(--color-secondary)]">
                          {registerErrors.phone}
                        </p>
                      ) : null}
                    </label>

                    <label className="space-y-2">
                      <span className="block text-sm font-semibold text-[var(--color-text)]">
                        Contrasena
                      </span>
                      <Input
                        type="password"
                        value={registerValues.password}
                        onChange={(event) => {
                          setRegisterValues((current) => ({
                            ...current,
                            password: event.target.value,
                          }));
                          setRegisterErrors((current) => ({
                            ...current,
                            password: undefined,
                          }));
                        }}
                        placeholder="Crea una contrasena"
                      />
                      {registerErrors.password ? (
                        <p className="text-xs text-[var(--color-secondary)]">
                          {registerErrors.password}
                        </p>
                      ) : null}
                    </label>

                    <label className="space-y-2">
                      <span className="block text-sm font-semibold text-[var(--color-text)]">
                        Rol
                      </span>
                      <Select
                        value={registerValues.role}
                        onChange={(event) => {
                          setRegisterValues((current) => ({
                            ...current,
                            role: event.target.value,
                          }));
                          setRegisterErrors((current) => ({
                            ...current,
                            role: undefined,
                          }));
                        }}
                        options={[
                          { value: "", label: "Selecciona un rol" },
                          { value: "rescatista", label: "Rescatista" },
                        ]}
                      />
                      {registerErrors.role ? (
                        <p className="text-xs text-[var(--color-secondary)]">
                          {registerErrors.role}
                        </p>
                      ) : null}
                    </label>
                  </div>

                  <div className="rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4">
                    <label className="flex gap-3 text-sm leading-7 text-[var(--color-text)]">
                      <input
                        type="checkbox"
                        checked={registerValues.termsAccepted}
                        onChange={(event) => {
                          setRegisterValues((current) => ({
                            ...current,
                            termsAccepted: event.target.checked,
                          }));
                          setRegisterErrors((current) => ({
                            ...current,
                            termsAccepted: undefined,
                          }));
                        }}
                        className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
                      />
                      <span>
                        Declaro que lei y acepto los{" "}
                        <Link
                          href="/contacto"
                          className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                        >
                          terminos, el aviso de privacidad y las politicas de la plataforma
                        </Link>
                        .
                      </span>
                    </label>
                    {registerErrors.termsAccepted ? (
                      <p className="mt-2 text-xs text-[var(--color-secondary)]">
                        {registerErrors.termsAccepted}
                      </p>
                    ) : null}
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                  </Button>

                  {turnstileSiteKey ? (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[var(--color-text)]">
                        Verificacion antispam
                      </p>
                      <TurnstileWidget
                        onSuccess={(token) => setRegisterTurnstileToken(token)}
                        onExpired={() => setRegisterTurnstileToken("")}
                        onError={() => setRegisterTurnstileToken("")}
                      />
                    </div>
                  ) : null}
                </form>
              )}

              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {isLogin ? "Todavia no tienes cuenta?" : "Ya tienes cuenta?"}{" "}
                <Link
                  href={isLogin ? "/registro" : "/login"}
                  className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                >
                  {isLogin ? "Registrate aqui" : "Inicia sesion"}
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
