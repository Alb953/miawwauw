export const ROUTES = {
  inicio: "/",
  mascotas: "/mascotas",
  registro: "/registro",
  login: "/login",
  apoyar: "/apoyar",
  destacar: "/destacar",
  quejas: "/quejas",
  adopcionResponsable: "/adopcion-responsable",
  contacto: "/contacto",
  panelRescatista: "/panel/rescatista",
  panelAdoptanteSolicitudes: "/panel/adoptante/solicitudes",
  admin: "/admin",
  adminReportes: "/admin/reportes",
  adminQuejas: "/admin/quejas",
  adminContribuciones: "/admin/contribuciones",
} as const;

export function getPanelRouteByRole(role: "adoptante" | "rescatista" | "admin") {
  if (role === "admin") {
    return ROUTES.admin;
  }

  if (role === "rescatista") {
    return ROUTES.panelRescatista;
  }

  return ROUTES.panelAdoptanteSolicitudes;
}
