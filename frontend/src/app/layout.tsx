import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import { SessionTimeoutGuard } from "@/components/auth/SessionTimeoutGuard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";
import "sweetalert2/dist/sweetalert2.min.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Adopta Miauw Wau",
  description: "Plataforma para encontrar perritos y gatitos en adopción responsable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunitoSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionTimeoutGuard />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
