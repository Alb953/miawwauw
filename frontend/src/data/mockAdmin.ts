export const mockAdminDashboard = {
  stats: [
    {
      id: "pets",
      label: "Total de mascotas registradas",
      value: "47",
      note: "Perfiles publicados en la plataforma",
    },
    {
      id: "adopted",
      label: "Mascotas adoptadas",
      value: "18",
      note: "Historias cerradas con éxito",
    },
    {
      id: "users",
      label: "Usuarios registrados",
      value: "129",
      note: "Adoptantes y rescatistas activos",
    },
    {
      id: "rescuers",
      label: "Rescatistas activos",
      value: "22",
      note: "Con perfiles verificados o en revisión",
    },
    {
      id: "reports",
      label: "Reportes pendientes",
      value: "6",
      note: "Casos que requieren moderación",
    },
    {
      id: "featured",
      label: "Mascotas destacadas",
      value: "9",
      note: "Con visibilidad prioritaria vigente",
    },
    {
      id: "contributions",
      label: "Contribuciones pendientes",
      value: "4",
      note: "Esperando confirmación manual",
    },
    {
      id: "actions",
      label: "Acciones rápidas",
      value: "3",
      note: "Flujos frecuentes del día",
    },
  ],
  quickActions: [
    "Revisar reportes con prioridad alta.",
    "Confirmar contribuciones manuales del día.",
    "Validar nuevas solicitudes de visibilidad destacada.",
  ],
};

export const mockReports = [
  {
    id: "rep-001",
    subject: "Perfil duplicado de Luna",
    reason: "Posible publicación repetida por otro usuario.",
    status: "Pendiente",
    priority: "Alta",
    createdAt: "Hace 3 horas",
  },
  {
    id: "rep-002",
    subject: "Información desactualizada",
    reason: "La mascota figura disponible, pero ya fue adoptada.",
    status: "En revisión",
    priority: "Media",
    createdAt: "Ayer",
  },
  {
    id: "rep-003",
    subject: "Contenido sospechoso",
    reason: "Faltan datos mínimos y la descripción es inconsistente.",
    status: "Pendiente",
    priority: "Alta",
    createdAt: "Hace 2 días",
  },
];

export const mockContributions = [
  {
    id: "cont-001",
    contributor: "Mónica Reyes",
    concept: "Apoyo voluntario",
    amount: "$250 MXN",
    status: "Pendiente",
    createdAt: "Hoy",
  },
  {
    id: "cont-002",
    contributor: "Carlos Peña",
    concept: "Mascota destacada",
    amount: "$180 MXN",
    status: "Verificada",
    createdAt: "Ayer",
  },
  {
    id: "cont-003",
    contributor: "Ana García",
    concept: "Apoyo voluntario",
    amount: "$500 MXN",
    status: "Pendiente",
    createdAt: "Hace 2 días",
  },
];
