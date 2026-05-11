import { AuthForm } from "@/components/forms/AuthForm";

interface LoginPageProps {
  searchParams?: Promise<{
    reason?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};

  return <AuthForm mode="login" sessionExpired={params.reason === "session-expired"} />;
}
