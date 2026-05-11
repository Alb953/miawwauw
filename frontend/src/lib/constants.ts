export const SITE_NAME = "Adopta Miauw Wau";

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/mascotas", label: "Mascotas" },
  { href: "/adopcion-responsable", label: "Cómo funciona" },
  { href: "/apoyar", label: "Apoyar" },
] as const;

export const FOOTER_GROUPS = [
  {
    title: "Explorar",
    links: [
      { href: "/", label: "Inicio" },
      { href: "/mascotas", label: "Mascotas" },
      { href: "/destacar", label: "Mascotas destacadas" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "/adopcion-responsable", label: "Adopción responsable" },
      { href: "/quejas", label: "Quejas" },
      { href: "/contacto", label: "Normas y politicas" },
      { href: "/registro", label: "Crear cuenta" },
    ],
  },
  {
    title: "Apoyo",
    links: [
      { href: "/apoyar", label: "Apoyo voluntario" },
      { href: "/login", label: "Iniciar sesión" },
      { href: "/panel/rescatista", label: "Panel de rescatista" },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { href: "#instagram", label: "Instagram" },
  { href: "#facebook", label: "Facebook" },
  { href: "#whatsapp", label: "WhatsApp" },
] as const;

export const SPECIES_OPTIONS = [
  { value: "all", label: "Todas las especies" },
  { value: "dog", label: "Perritos" },
  { value: "cat", label: "Gatitos" },
] as const;

export const AGE_OPTIONS = [
  { value: "all", label: "Todas las edades" },
  { value: "cachorro", label: "Cachorro" },
  { value: "joven", label: "Joven" },
  { value: "adulto", label: "Adulto" },
] as const;

export const GENDER_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "male", label: "Macho" },
  { value: "female", label: "Hembra" },
] as const;

export const SIZE_OPTIONS = [
  { value: "all", label: "Todos los tamaños" },
  { value: "small", label: "Pequeño" },
  { value: "medium", label: "Mediano" },
  { value: "large", label: "Grande" },
] as const;

export const STATUS_OPTIONS = [
  { value: "all", label: "Todos los estados" },
  { value: "available", label: "Disponible" },
  { value: "in_process", label: "En proceso" },
] as const;
