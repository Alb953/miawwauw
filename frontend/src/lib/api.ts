import { mockAdminDashboard, mockContributions, mockReports } from "@/data/mockAdmin";
import { mockApplications } from "@/data/mockApplications";
import { mockPets } from "@/data/mockPets";
import type {
  PetAgeGroup,
  PetDetail,
  PetGender,
  PetSize,
  PetSpecies,
  PetStatus,
} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
const IS_MOCK_API = API_BASE_URL.length === 0;
const AUTH_TOKEN_KEY = "amw_auth_token";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: string[];
}

type BackendPetRecord = {
  id: string;
  owner_id: string;
  name: string;
  species: PetSpecies;
  age: string;
  gender: PetGender;
  size: PetSize | null;
  location: string;
  country: string | null;
  state: string | null;
  city: string | null;
  health_status: string;
  sterilized: boolean;
  personality: string;
  description: string;
  requirements: string;
  status: PetStatus;
  is_urgent: boolean;
  is_featured: boolean;
  featured_until: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type BackendPetImageRecord = {
  id: string;
  pet_id: string;
  image_url: string;
  cloudinary_public_id: string | null;
  is_main: boolean;
  created_at: string;
};

type BackendPetDetailRecord = BackendPetRecord & {
  pet_images?: BackendPetImageRecord[];
};

type BackendAuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "adopter" | "rescuer" | "admin";
};

type BackendAuthSession = {
  user: BackendAuthUser;
  token: string;
};

type BackendAdminDashboardPayload = {
  stats: {
    users: number;
    pets: number;
    applications: number;
    complaints: number;
    reports: number;
    contributions: number;
    featuredPets: number;
    pendingComplaints: number;
    pendingFeaturedRequests: number;
    pendingReports: number;
    pendingContributions: number;
  };
};

type BackendComplaintRecord = {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "pending" | "reviewed" | "resolved";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

type BackendReportRecord = {
  id: string;
  reporter_id: string | null;
  pet_id: string | null;
  reported_user_id: string | null;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

type BackendContributionRecord = {
  id: string;
  user_id: string | null;
  pet_id: string | null;
  contribution_type: "donation" | "featured_listing" | "veterinary_partner" | "sponsorship";
  amount: number;
  status: "pending" | "confirmed" | "rejected";
  bank_name: string | null;
  account_holder_name: string | null;
  reference_note: string | null;
  proof_image_url: string | null;
  proof_cloudinary_public_id: string | null;
  admin_notes: string | null;
  featured_days: number | null;
  created_at: string;
  confirmed_at: string | null;
};

type BackendBankInfoRecord = {
  id: string;
  bank_name: string;
  account_holder_name: string;
  clabe: string | null;
  card_number: string | null;
  instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type BackendRescuerDashboardPayload = {
  rescuer: {
    id: string;
    name: string;
  };
  stats: {
    pets: number;
    applications: number;
    urgent: number;
    featured: number;
  };
  quick_notes: string[];
  pets: BackendPetRecord[];
  applications: Array<{
    id: string;
    pet_id: string;
    pet_name: string;
    adopter_id: string | null;
    applicant_name: string;
    city: string;
    status: "new" | "under_review" | "approved" | "rejected" | "cancelled" | "completed";
    created_at: string;
  }>;
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "adoptante" | "rescatista" | "admin";
}

export interface AuthSession {
  user: AuthUser;
  message: string;
  token?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "adoptante" | "rescatista";
  termsAccepted: boolean;
  turnstileToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface PetListFilters {
  species?: string;
  age?: string;
  gender?: string;
  size?: string;
  location?: string;
  country?: string;
  state?: string;
  city?: string;
  status?: string;
  urgent?: boolean;
}

export interface PetCreateInput {
  name: string;
  species: string;
  age: string;
  gender: string;
  size?: string;
  location: string;
  country?: string;
  state?: string;
  city?: string;
  health_status: string;
  sterilized: boolean;
  personality: string;
  description: string;
  requirements: string;
  status: string;
  is_urgent: boolean;
  is_featured: boolean;
}

export type PetUpdateInput = Partial<PetCreateInput>;

export interface AdoptionApplicationInput {
  petId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  housingType: "house" | "apartment";
  otherPets: "true" | "false";
  adoptedBefore: "true" | "false";
  reason: string;
  followUpAccepted: boolean;
  requirementsAccepted: boolean;
  termsAccepted: boolean;
  turnstileToken?: string;
}

export interface BankInfo {
  accountHolder: string;
  bank: string;
  accountNumber: string;
  clabe: string;
  note: string;
}

export interface ContributionCreateInput {
  contributionType: "donation" | "featured_listing" | "veterinary_partner" | "sponsorship";
  amount: number;
  petId?: string;
  bankName?: string;
  accountHolderName?: string;
  referenceNote?: string;
  featuredDays?: number;
}

export interface ReportInput {
  subject: string;
  reason: string;
}

export interface ComplaintInput {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  website?: string;
  formLoadedAt: number;
  turnstileToken?: string;
}

export interface AdminDashboardData {
  stats: Array<{
    id: string;
    label: string;
    value: string;
    note: string;
  }>;
  quickActions: string[];
}

export interface AdminReportRecord {
  id: string;
  subject: string;
  reason: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface AdminContributionRecord {
  id: string;
  contributor: string;
  concept: string;
  amount: string;
  status: "Pendiente" | "Verificada" | "Rechazada";
  createdAt: string;
}

export interface AdminComplaintRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Pendiente" | "En revision" | "Resuelta";
  adminNotes: string;
  createdAt: string;
}

export interface AdminUserDetailRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  verifiedLabel: string;
  activeLabel: string;
  createdAt: string;
}

export interface AdminPetDetailRecord {
  id: string;
  name: string;
  speciesLabel: string;
  location: string;
  statusLabel: string;
  activeLabel: string;
  createdAt: string;
}

export interface AdminApplicationDetailRecord {
  id: string;
  petName: string;
  applicantName: string;
  email: string;
  city: string;
  statusLabel: string;
  submittedAt: string;
}

export interface RescuerDashboardData {
  rescuerName: string;
  stats: Array<{
    id: string;
    label: string;
    value: string;
    note: string;
  }>;
  quickNotes: string[];
}

export interface RescuerApplicationRecord {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  city: string;
  submittedAt: string;
  status: "nueva" | "en_revision" | "aprobada";
}

type BackendApplicationRecord = {
  id: string;
  pet_id: string;
  adopter_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  home_type: "house" | "apartment";
  owns_or_rents: "owns" | "rents" | null;
  has_other_pets: boolean;
  adopted_before: boolean;
  reason: string;
  accepts_followup: boolean;
  accepts_requirements: boolean;
  status: "new" | "under_review" | "approved" | "rejected" | "cancelled" | "completed";
  created_at: string;
  updated_at: string;
};

export interface RescuerApplicationDetail {
  id: string;
  petId: string;
  applicantName: string;
  email: string;
  phone: string;
  city: string;
  housingTypeLabel: string;
  ownershipLabel: string;
  otherPetsLabel: string;
  adoptedBeforeLabel: string;
  reason: string;
  followUpAccepted: boolean;
  requirementsAccepted: boolean;
  statusLabel: string;
  submittedAt: string;
}

function buildUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

function readStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function storeAuthToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearAuthToken() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = readStoredToken();
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as ApiEnvelope<T> | T;

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `La solicitud a ${path} fallo con estado ${response.status}.`;

    throw new Error(message);
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "success" in payload &&
    "data" in payload
  ) {
    return payload.data as T;
  }

  return payload as T;
}

function mockDelay<T>(data: T, ms = 150): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

function findMockPet(id: string) {
  return mockPets.find((pet) => pet.id === id) ?? null;
}

function inferAgeGroup(age: string): PetAgeGroup {
  const normalizedAge = age.toLowerCase();

  if (normalizedAge.includes("mes") || normalizedAge.includes("cachorro")) {
    return "cachorro";
  }

  if (normalizedAge.includes("ano") || normalizedAge.includes("año")) {
    const firstNumber = Number.parseInt(normalizedAge, 10);

    if (!Number.isNaN(firstNumber) && firstNumber <= 2) {
      return "joven";
    }
  }

  return "adulto";
}

function normalizeList(value: string, fallback: string[]) {
  const items = value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);

  return items.length > 0 ? items : fallback;
}

const speciesLabelMap: Record<PetSpecies, string> = {
  dog: "Perrito",
  cat: "Gatita",
};

const genderLabelMap: Record<PetGender, string> = {
  male: "Macho",
  female: "Hembra",
};

const sizeLabelMap: Record<PetSize, string> = {
  small: "Pequena",
  medium: "Mediano",
  large: "Grande",
};

const statusLabelMap: Record<PetStatus, string> = {
  available: "Disponible",
  in_process: "En proceso",
  adopted: "Adoptado",
};

function mapBackendPetToDetail(pet: BackendPetRecord | BackendPetDetailRecord): PetDetail {
  const mockMatch = findMockPet(pet.id);
  const ageGroup = mockMatch?.ageGroup ?? inferAgeGroup(pet.age);
  const size = pet.size ?? mockMatch?.size ?? "medium";
  const realImageUrls =
    "pet_images" in pet && Array.isArray(pet.pet_images)
      ? pet.pet_images
          .slice()
          .sort((a, b) => Number(b.is_main) - Number(a.is_main))
          .map((image) => image.image_url)
          .filter(Boolean)
      : [];
  const fallbackImages =
    mockMatch?.images ?? (pet.species === "dog" ? ["🐶", "🦴", "🎾"] : ["🐱", "🧶", "🛏️"]);
  const fallbackImage = mockMatch?.image ?? (pet.species === "dog" ? "🐶" : "🐱");

  return {
    id: pet.id,
    name: pet.name,
    species: pet.species,
    speciesLabel: speciesLabelMap[pet.species],
    age: pet.age,
    ageGroup,
    gender: pet.gender,
    genderLabel: genderLabelMap[pet.gender],
    size,
    sizeLabel: sizeLabelMap[size],
    location: pet.location,
    country: pet.country ?? undefined,
    state: pet.state ?? undefined,
    city: pet.city ?? undefined,
    status: pet.status,
    statusLabel: statusLabelMap[pet.status],
    featured: pet.is_featured,
    featuredUntil: pet.featured_until ?? undefined,
    featuredDaysRemaining: getFeaturedDaysRemaining(pet.featured_until),
    urgent: pet.is_urgent,
    description: pet.description,
    image: realImageUrls[0] ?? fallbackImage,
    images: realImageUrls.length > 0 ? realImageUrls : fallbackImages,
    imageUrls: realImageUrls.length > 0 ? realImageUrls : undefined,
    story:
      mockMatch?.story ??
      `${pet.name} esta buscando una nueva oportunidad en un hogar responsable. ${pet.description}`,
    personality: normalizeList(
      pet.personality,
      mockMatch?.personality ?? ["Carinoso", "Noble", "En adaptacion"],
    ),
    requirements: normalizeList(
      pet.requirements,
      mockMatch?.requirements ?? [
        "Entrevista previa",
        "Seguimiento responsable",
        "Compromiso veterinario",
      ],
    ),
    health: mockMatch?.health ?? {
      vaccinated: true,
      sterilized: pet.sterilized,
      dewormed: true,
      medicalNotes: pet.health_status,
    },
    supportMessage:
      mockMatch?.supportMessage ??
      `Tu apoyo ayuda a mejorar la visibilidad y el cuidado continuo de ${pet.name}.`,
    rescuer:
      mockMatch?.rescuer ?? {
        name: "Rescatista de la plataforma",
        organization: "Adopta Miauw Wau",
        city: pet.location,
        phone: "Disponible al contactar",
        whatsapp: "",
        email: "contacto@adoptamiauwmau.com",
      },
  };
}

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getFeaturedDaysRemaining(featuredUntil: string | null) {
  if (!featuredUntil) {
    return undefined;
  }

  const expiryDate = new Date(featuredUntil);

  if (Number.isNaN(expiryDate.getTime())) {
    return undefined;
  }

  const differenceInMs = expiryDate.getTime() - Date.now();

  if (differenceInMs <= 0) {
    return 0;
  }

  return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
}

function mapBackendRoleToFrontendRole(role: BackendAuthUser["role"]): AuthUser["role"] {
  switch (role) {
    case "adopter":
      return "adoptante";
    case "rescuer":
      return "rescatista";
    default:
      return "admin";
  }
}

function mapBackendAuthUser(user: BackendAuthUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    role: mapBackendRoleToFrontendRole(user.role),
  };
}

function mapBackendDashboard(data: BackendAdminDashboardPayload): AdminDashboardData {
  return {
    stats: [
      {
        id: "pets",
        label: "Total de mascotas registradas",
        value: String(data.stats.pets),
        note: "Perfiles publicados en la plataforma",
      },
      {
        id: "users",
        label: "Usuarios registrados",
        value: String(data.stats.users),
        note: "Adoptantes, rescatistas y admins",
      },
      {
        id: "applications",
        label: "Solicitudes registradas",
        value: String(data.stats.applications),
        note: "Casos enviados por posibles adoptantes",
      },
      {
        id: "complaints",
        label: "Quejas pendientes",
        value: String(data.stats.pendingComplaints),
        note: "Mensajes que necesitan seguimiento",
      },
      {
        id: "reports",
        label: "Reportes pendientes",
        value: String(data.stats.pendingReports),
        note: "Casos que requieren moderacion",
      },
      {
        id: "featured",
        label: "Mascotas destacadas",
        value: String(data.stats.featuredPets),
        note: "Con visibilidad prioritaria vigente",
      },
      {
        id: "pending_featured",
        label: "Solicitudes de destacado pendientes",
        value: String(data.stats.pendingFeaturedRequests),
        note: "Esperando aprobacion administrativa",
      },
      {
        id: "contributions",
        label: "Contribuciones pendientes",
        value: String(data.stats.pendingContributions),
        note: "Esperando confirmacion manual",
      },
    ],
    quickActions: [
      "Revisar reportes pendientes y resolver los casos mas urgentes.",
      "Confirmar contribuciones manuales para activar destacados.",
      "Supervisar la salud general de la plataforma desde un solo panel.",
    ],
  };
}

function mapBackendComplaint(complaint: BackendComplaintRecord): AdminComplaintRecord {
  const statusMap: Record<BackendComplaintRecord["status"], AdminComplaintRecord["status"]> = {
    pending: "Pendiente",
    reviewed: "En revision",
    resolved: "Resuelta",
  };

  return {
    id: complaint.id,
    fullName: complaint.full_name,
    email: complaint.email,
    phone: complaint.phone ?? "No disponible",
    subject: complaint.subject,
    message: complaint.message,
    status: statusMap[complaint.status],
    adminNotes: complaint.admin_notes ?? "",
    createdAt: formatRelativeDate(complaint.created_at),
  };
}

function mapBackendReport(report: BackendReportRecord): AdminReportRecord {
  const statusMap: Record<BackendReportRecord["status"], string> = {
    pending: "Pendiente",
    reviewed: "En revision",
    resolved: "Resuelto",
  };

  return {
    id: report.id,
    subject: report.pet_id
      ? `Reporte sobre mascota ${report.pet_id.slice(0, 8)}`
      : report.reported_user_id
        ? `Reporte sobre usuario ${report.reported_user_id.slice(0, 8)}`
        : "Reporte general",
    reason: report.reason,
    status: statusMap[report.status],
    priority: report.status === "pending" ? "Alta" : "Media",
    createdAt: formatRelativeDate(report.created_at),
  };
}

function mapBackendContribution(contribution: BackendContributionRecord): AdminContributionRecord {
  const conceptMap: Record<BackendContributionRecord["contribution_type"], string> = {
    donation: "Apoyo voluntario",
    featured_listing: "Mascota destacada",
    veterinary_partner: "Aliado veterinario",
    sponsorship: "Patrocinio",
  };

  const statusMap: Record<
    BackendContributionRecord["status"],
    AdminContributionRecord["status"]
  > = {
    pending: "Pendiente",
    confirmed: "Verificada",
    rejected: "Rechazada",
  };

  return {
    id: contribution.id,
    contributor:
      contribution.account_holder_name ??
      contribution.bank_name ??
      "Contribuyente sin nombre",
    concept: conceptMap[contribution.contribution_type],
    amount: `$${contribution.amount} MXN`,
    status: statusMap[contribution.status],
    createdAt: formatRelativeDate(contribution.created_at),
  };
}

function mapBackendAdminUser(user: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "adopter" | "rescuer" | "admin";
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}): AdminUserDetailRecord {
  const roleMap: Record<typeof user.role, string> = {
    adopter: "Adoptante",
    rescuer: "Rescatista",
    admin: "Admin",
  };

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? "No disponible",
    role: roleMap[user.role],
    verifiedLabel: user.is_verified ? "Verificado" : "Pendiente",
    activeLabel: user.is_active ? "Activo" : "Inactivo",
    createdAt: formatRelativeDate(user.created_at),
  };
}

function mapBackendAdminPet(pet: BackendPetRecord): AdminPetDetailRecord {
  return {
    id: pet.id,
    name: pet.name,
    speciesLabel: speciesLabelMap[pet.species],
    location: pet.location,
    statusLabel: statusLabelMap[pet.status],
    activeLabel: pet.is_active ? "Activa" : "Oculta",
    createdAt: formatRelativeDate(pet.created_at),
  };
}

function mapBackendAdminApplication(application: BackendApplicationRecord & { pet_name?: string }): AdminApplicationDetailRecord {
  const statusMap: Record<BackendApplicationRecord["status"], string> = {
    new: "Nueva",
    under_review: "En revision",
    approved: "Aprobada",
    rejected: "Rechazada",
    cancelled: "Cancelada",
    completed: "Completada",
  };

  return {
    id: application.id,
    petName: application.pet_name ?? "Mascota no disponible",
    applicantName: application.full_name,
    email: application.email,
    city: application.city,
    statusLabel: statusMap[application.status],
    submittedAt: formatRelativeDate(application.created_at),
  };
}

function mapBackendBankInfo(bankInfo: BackendBankInfoRecord | null): BankInfo {
  if (!bankInfo) {
    return {
      accountHolder: "Adopta Miauw Wau",
      bank: "Informacion pendiente",
      accountNumber: "No disponible",
      clabe: "No disponible",
      note: "Aun no hay una cuenta bancaria activa configurada.",
    };
  }

  return {
    accountHolder: bankInfo.account_holder_name,
    bank: bankInfo.bank_name,
    accountNumber: bankInfo.card_number ?? "No disponible",
    clabe: bankInfo.clabe ?? "No disponible",
    note:
      bankInfo.instructions ??
      "Registra tu contribucion despues de realizar la transferencia para que el equipo pueda validarla.",
  };
}

function mapBackendRescuerDashboard(data: BackendRescuerDashboardPayload): RescuerDashboardData {
  return {
    rescuerName: data.rescuer.name,
    stats: [
      {
        id: "pets",
        label: "Mis mascotas registradas",
        value: String(data.stats.pets),
        note: "Perfiles activos y visibles",
      },
      {
        id: "applications",
        label: "Solicitudes recibidas",
        value: String(data.stats.applications),
        note: "Pendientes y en seguimiento",
      },
      {
        id: "urgent",
        label: "Casos urgentes",
        value: String(data.stats.urgent),
        note: "Necesitan difusion inmediata",
      },
      {
        id: "featured",
        label: "Mascotas destacadas",
        value: String(data.stats.featured),
        note: "Con visibilidad prioritaria",
      },
    ],
    quickNotes: data.quick_notes,
  };
}

function mapBackendRescuerApplication(
  application: BackendRescuerDashboardPayload["applications"][number],
): RescuerApplicationRecord {
  const statusMap: Record<
    BackendRescuerDashboardPayload["applications"][number]["status"],
    RescuerApplicationRecord["status"]
  > = {
    new: "nueva",
    under_review: "en_revision",
    approved: "aprobada",
    rejected: "en_revision",
    cancelled: "en_revision",
    completed: "aprobada",
  };

  return {
    id: application.id,
    petId: application.pet_id,
    petName: application.pet_name,
    applicantName: application.applicant_name,
    city: application.city,
    submittedAt: formatRelativeDate(application.created_at),
    status: statusMap[application.status],
  };
}

function mapBackendApplicationDetail(
  application: BackendApplicationRecord,
): RescuerApplicationDetail {
  const statusMap: Record<BackendApplicationRecord["status"], string> = {
    new: "Nueva",
    under_review: "En revision",
    approved: "Aprobada",
    rejected: "Rechazada",
    cancelled: "Cancelada",
    completed: "Completada",
  };

  return {
    id: application.id,
    petId: application.pet_id,
    applicantName: application.full_name,
    email: application.email,
    phone: application.phone,
    city: application.city,
    housingTypeLabel: application.home_type === "house" ? "Casa" : "Departamento",
    ownershipLabel:
      application.owns_or_rents === "owns"
        ? "Propia"
        : application.owns_or_rents === "rents"
          ? "Rentada"
          : "No especificada",
    otherPetsLabel: application.has_other_pets ? "Si" : "No",
    adoptedBeforeLabel: application.adopted_before ? "Si" : "No",
    reason: application.reason,
    followUpAccepted: application.accepts_followup,
    requirementsAccepted: application.accepts_requirements,
    statusLabel: statusMap[application.status],
    submittedAt: formatRelativeDate(application.created_at),
  };
}

const mockUser: AuthUser = {
  id: "user-demo",
  name: "Mariana Lopez",
  email: "mariana@huellitasrescate.mx",
  phone: "55 1234 5678",
  role: "rescatista",
};

export const apiClient = {
  config: {
    baseUrl: API_BASE_URL,
    isMockApi: IS_MOCK_API,
  },

  auth: {
    async register(payload: RegisterPayload): Promise<AuthSession> {
      if (IS_MOCK_API) {
        return mockDelay({
          user: { ...mockUser, name: payload.name, email: payload.email, phone: payload.phone, role: payload.role },
          message: "Registro mock completado correctamente.",
          token: "mock-token",
        });
      }

      const session = await request<BackendAuthSession>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          terms_accepted: payload.termsAccepted,
          turnstile_token: payload.turnstileToken,
        }),
      });
      storeAuthToken(session.token);
      return {
        user: mapBackendAuthUser(session.user),
        token: session.token,
        message: "Registro completado correctamente.",
      };
    },

    async login(payload: LoginPayload): Promise<AuthSession> {
      if (IS_MOCK_API) {
        return mockDelay({
          user: { ...mockUser, email: payload.email },
          message: "Inicio de sesion mock completado correctamente.",
          token: "mock-token",
        });
      }

      const session = await request<BackendAuthSession>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      storeAuthToken(session.token);
      return {
        user: mapBackendAuthUser(session.user),
        token: session.token,
        message: "Inicio de sesion completado correctamente.",
      };
    },

    async me(): Promise<AuthUser | null> {
      if (IS_MOCK_API) {
        return mockDelay(mockUser);
      }

      const token = readStoredToken();
      if (!token) {
        return null;
      }

      try {
        const user = await request<BackendAuthUser>("/auth/me");
        return mapBackendAuthUser(user);
      } catch {
        clearAuthToken();
        return null;
      }
    },

    async logout(): Promise<{ message: string }> {
      if (IS_MOCK_API) {
        clearAuthToken();
        return mockDelay({ message: "Sesion mock cerrada correctamente." });
      }

      try {
        return await request<{ message: string }>("/auth/logout", {
          method: "POST",
        });
      } finally {
        clearAuthToken();
      }
    },
  },

  pets: {
    async list(filters?: PetListFilters): Promise<PetDetail[]> {
      if (IS_MOCK_API) {
        return mockDelay(mockPets);
      }

      const params = new URLSearchParams();
      Object.entries(filters ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });
      const suffix = params.toString() ? `?${params.toString()}` : "";
      const pets = await request<BackendPetRecord[]>(`/pets${suffix}`);
      return pets.map(mapBackendPetToDetail);
    },

    async detail(id: string): Promise<PetDetail | null> {
      if (IS_MOCK_API) {
        return mockDelay(findMockPet(id));
      }

      const pet = await request<BackendPetDetailRecord>(`/pets/${id}`);
      return mapBackendPetToDetail(pet);
    },

    async create(payload: PetCreateInput): Promise<PetDetail> {
      if (IS_MOCK_API) {
        return mockDelay(mockPets[0]);
      }

      const pet = await request<BackendPetRecord>("/pets", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      return mapBackendPetToDetail(pet);
    },

    async update(id: string, payload: PetUpdateInput): Promise<PetDetail> {
      if (IS_MOCK_API) {
        return mockDelay(findMockPet(id) ?? mockPets[0]);
      }

      const pet = await request<BackendPetRecord>(`/pets/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      return mapBackendPetToDetail(pet);
    },

    async remove(id: string): Promise<{ id: string; message: string }> {
      if (IS_MOCK_API) {
        return mockDelay({
          id,
          message: "Mascota mock eliminada correctamente.",
        });
      }

      await request<BackendPetRecord>(`/pets/${id}`, {
        method: "DELETE",
      });

      return {
        id,
        message: "Mascota eliminada correctamente.",
      };
    },

    async images(id: string, files: File[]): Promise<{ message: string; petId: string; imageUrls: string[] }> {
      if (IS_MOCK_API) {
        return mockDelay({
          message: "Imagenes mock actualizadas correctamente.",
          petId: id,
          imageUrls: files.map((file) => file.name),
        });
      }

      const token = readStoredToken();
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(buildUrl(`/pets/${id}/images`), {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const payload = (await response.json()) as ApiEnvelope<BackendPetImageRecord[]> | { message?: string };
      if (!response.ok) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "message" in payload &&
          typeof payload.message === "string"
            ? payload.message
            : "No pudimos subir las imagenes de la mascota.";
        throw new Error(message);
      }

      const imageUrls =
        typeof payload === "object" &&
        payload !== null &&
        "data" in payload &&
        Array.isArray(payload.data)
          ? payload.data.map((image) => image.image_url)
          : [];

      return {
        message: "Imagenes cargadas correctamente.",
        petId: id,
        imageUrls,
      };
    },
  },

  applications: {
    async submit(payload: AdoptionApplicationInput): Promise<{ message: string; applicationId: string }> {
      if (IS_MOCK_API) {
        return mockDelay({ message: "Solicitud mock enviada correctamente.", applicationId: "app-demo" });
      }

      const application = await request<{ id: string }>("/applications", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
          termsAccepted: payload.termsAccepted,
          turnstile_token: payload.turnstileToken,
        }),
      });
      return {
        message: "Solicitud enviada correctamente.",
        applicationId: application.id,
      };
    },

    async detail(applicationId: string): Promise<RescuerApplicationDetail> {
      if (IS_MOCK_API) {
        const mockApplication = mockApplications.find((application) => application.id === applicationId);

        return mockDelay({
          id: applicationId,
          petId: mockApplication?.petId ?? "pet-demo",
          applicantName: mockApplication?.applicantName ?? "Persona interesada",
          email: "persona@correo.com",
          phone: "55 0000 0000",
          city: mockApplication?.city ?? "Ciudad no disponible",
          housingTypeLabel: "Casa",
          ownershipLabel: "No especificada",
          otherPetsLabel: "No",
          adoptedBeforeLabel: "No",
          reason: "Quiero brindar un hogar estable, tiempo, cuidados y seguimiento responsable a esta mascota.",
          followUpAccepted: true,
          requirementsAccepted: true,
          statusLabel:
            mockApplication?.status === "aprobada"
              ? "Aprobada"
              : mockApplication?.status === "en_revision"
                ? "En revision"
                : "Nueva",
          submittedAt: mockApplication?.submittedAt ?? "Fecha no disponible",
        });
      }

      const application = await request<BackendApplicationRecord>(`/applications/${applicationId}`);
      return mapBackendApplicationDetail(application);
    },
  },

  bankInfo: {
    async get(): Promise<BankInfo> {
      if (IS_MOCK_API) {
        return mockDelay({
          accountHolder: "Adopta Miauw Wau",
          bank: "Banco Demo",
          accountNumber: "1234567890",
          clabe: "012345678901234567",
          note: "Contribucion voluntaria para administracion y mantenimiento.",
        });
      }

      const bankInfo = await request<BackendBankInfoRecord | null>("/bank-info");
      return mapBackendBankInfo(bankInfo);
    },
  },

  contributions: {
    async create(payload: ContributionCreateInput): Promise<{ message: string; contributionId: string }> {
      if (IS_MOCK_API) {
        return mockDelay({ message: "Contribucion mock registrada correctamente.", contributionId: "contribution-demo" });
      }

      const contribution = await request<{ id: string }>("/contributions", {
        method: "POST",
        body: JSON.stringify({
          pet_id: payload.petId,
          contribution_type: payload.contributionType,
          amount: payload.amount,
          bank_name: payload.bankName,
          account_holder_name: payload.accountHolderName,
          reference_note: payload.referenceNote,
          featured_days: payload.featuredDays,
        }),
      });
      return {
        message: "Contribucion registrada correctamente.",
        contributionId: contribution.id,
      };
    },
  },

  complaints: {
    async submit(payload: ComplaintInput): Promise<{ message: string; complaintId: string }> {
      if (IS_MOCK_API) {
        return mockDelay({ message: "Queja mock enviada correctamente.", complaintId: "complaint-demo" });
      }

      const complaint = await request<{ id: string }>("/complaints", {
        method: "POST",
          body: JSON.stringify({
            full_name: payload.fullName,
            email: payload.email,
            phone: payload.phone?.trim() || undefined,
            subject: payload.subject,
            message: payload.message,
            website: payload.website,
            form_loaded_at: payload.formLoadedAt,
            turnstile_token: payload.turnstileToken,
          }),
        });

      return {
        message: "Queja enviada correctamente.",
        complaintId: complaint.id,
      };
    },
  },

  rescuer: {
    async dashboard(): Promise<{
      dashboard: RescuerDashboardData;
      pets: PetDetail[];
      applications: RescuerApplicationRecord[];
    }> {
      if (IS_MOCK_API) {
        const { mockRescuerDashboard } = await import("@/data/mockDashboard");
        return mockDelay({
          dashboard: mockRescuerDashboard,
          pets: mockPets,
          applications: mockApplications,
        });
      }

      const payload = await request<BackendRescuerDashboardPayload>("/rescuer/dashboard");
      return {
        dashboard: mapBackendRescuerDashboard(payload),
        pets: payload.pets.map(mapBackendPetToDetail),
        applications: payload.applications.map(mapBackendRescuerApplication),
      };
    },
  },

  admin: {
    async dashboard(): Promise<AdminDashboardData> {
      if (IS_MOCK_API) {
        return mockDelay(mockAdminDashboard);
      }

      const dashboard = await request<BackendAdminDashboardPayload>("/admin/dashboard");
      return mapBackendDashboard(dashboard);
    },

    async reports(): Promise<AdminReportRecord[]> {
      if (IS_MOCK_API) {
        return mockDelay(mockReports as AdminReportRecord[]);
      }

      const reports = await request<BackendReportRecord[]>("/admin/reports");
      return reports.map(mapBackendReport);
    },

    async updateReportStatus(
      reportId: string,
      payload: { status: "pending" | "reviewed" | "resolved"; adminNotes?: string },
    ): Promise<AdminReportRecord> {
      if (IS_MOCK_API) {
        return mockDelay({
          id: reportId,
          subject: "Reporte general",
          reason: "Revision demo",
          status: payload.status === "resolved" ? "Resuelto" : payload.status === "reviewed" ? "En revision" : "Pendiente",
          priority: payload.status === "pending" ? "Alta" : "Media",
          createdAt: formatRelativeDate(new Date().toISOString()),
        });
      }

      const report = await request<BackendReportRecord>(`/admin/reports/${reportId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: payload.status,
          admin_notes: payload.adminNotes,
        }),
      });
      return mapBackendReport(report);
    },

    async contributions(): Promise<AdminContributionRecord[]> {
      if (IS_MOCK_API) {
        return mockDelay(mockContributions as AdminContributionRecord[]);
      }

      const contributions = await request<BackendContributionRecord[]>("/admin/contributions");
      return contributions.map(mapBackendContribution);
    },

    async complaints(): Promise<AdminComplaintRecord[]> {
      if (IS_MOCK_API) {
        return mockDelay([
          {
            id: "complaint-demo",
            fullName: "Persona demo",
            email: "persona@demo.com",
            phone: "55 0000 0000",
            subject: "Seguimiento pendiente",
            message: "Necesito ayuda con un caso registrado en la plataforma.",
            status: "Pendiente",
            adminNotes: "",
            createdAt: formatRelativeDate(new Date().toISOString()),
          },
        ]);
      }

      const complaints = await request<BackendComplaintRecord[]>("/admin/complaints");
      return complaints.map(mapBackendComplaint);
    },

    async updateComplaintStatus(
      complaintId: string,
      payload: { status: "pending" | "reviewed" | "resolved"; adminNotes?: string },
    ): Promise<AdminComplaintRecord> {
      if (IS_MOCK_API) {
        return mockDelay({
          id: complaintId,
          fullName: "Persona demo",
          email: "persona@demo.com",
          phone: "55 0000 0000",
          subject: "Seguimiento pendiente",
          message: "Necesito ayuda con un caso registrado en la plataforma.",
          status:
            payload.status === "resolved"
              ? "Resuelta"
              : payload.status === "reviewed"
                ? "En revision"
                : "Pendiente",
          adminNotes: payload.adminNotes ?? "",
          createdAt: formatRelativeDate(new Date().toISOString()),
        });
      }

      const complaint = await request<BackendComplaintRecord>(`/admin/complaints/${complaintId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: payload.status,
          admin_notes: payload.adminNotes,
        }),
      });

      return mapBackendComplaint(complaint);
    },

    async users(): Promise<AdminUserDetailRecord[]> {
      if (IS_MOCK_API) {
        return mockDelay([
          {
            id: "user-demo",
            name: "Mariana Lopez",
            email: "mariana@demo.com",
            phone: "55 1234 5678",
            role: "Rescatista",
            verifiedLabel: "Verificado",
            activeLabel: "Activo",
            createdAt: formatRelativeDate(new Date().toISOString()),
          },
        ]);
      }

      const users = await request<
        Array<{
          id: string;
          name: string;
          email: string;
          phone: string | null;
          role: "adopter" | "rescuer" | "admin";
          is_verified: boolean;
          is_active: boolean;
          created_at: string;
        }>
      >("/admin/users");
      return users.map(mapBackendAdminUser);
    },

    async pets(): Promise<AdminPetDetailRecord[]> {
      if (IS_MOCK_API) {
        return mockDelay(mockPets.slice(0, 3).map((pet) => ({
          id: pet.id,
          name: pet.name,
          speciesLabel: pet.speciesLabel,
          location: pet.location,
          statusLabel: pet.statusLabel,
          activeLabel: "Activa",
          createdAt: formatRelativeDate(new Date().toISOString()),
        })));
      }

      const pets = await request<BackendPetRecord[]>("/admin/pets");
      return pets.map(mapBackendAdminPet);
    },

    async applications(): Promise<AdminApplicationDetailRecord[]> {
      if (IS_MOCK_API) {
        return mockDelay([
          {
            id: "application-demo",
            petName: "Luna",
            applicantName: "Persona interesada",
            email: "persona@demo.com",
            city: "Puebla",
            statusLabel: "Nueva",
            submittedAt: formatRelativeDate(new Date().toISOString()),
          },
        ]);
      }

      const applications = await request<Array<BackendApplicationRecord & { pet_name?: string }>>(
        "/admin/applications",
      );
      return applications.map(mapBackendAdminApplication);
    },

    async confirmContribution(
      contributionId: string,
      payload?: { adminNotes?: string; featuredDays?: number },
    ): Promise<AdminContributionRecord> {
      if (IS_MOCK_API) {
        return mockDelay({
          id: contributionId,
          contributor: "Contribuyente demo",
          concept: "Mascota destacada",
          amount: "$10 MXN",
          status: "Verificada",
          createdAt: formatRelativeDate(new Date().toISOString()),
        });
      }

      const contribution = await request<BackendContributionRecord>(
        `/admin/contributions/${contributionId}/confirm`,
        {
          method: "PATCH",
          body: JSON.stringify({
            admin_notes: payload?.adminNotes,
            featured_days: payload?.featuredDays,
          }),
        },
      );
      return mapBackendContribution(contribution);
    },

    async rejectContribution(
      contributionId: string,
      payload: { adminNotes: string },
    ): Promise<AdminContributionRecord> {
      if (IS_MOCK_API) {
        return mockDelay({
          id: contributionId,
          contributor: "Contribuyente demo",
          concept: "Mascota destacada",
          amount: "$10 MXN",
          status: "Rechazada",
          createdAt: formatRelativeDate(new Date().toISOString()),
        });
      }

      const contribution = await request<BackendContributionRecord>(
        `/admin/contributions/${contributionId}/reject`,
        {
          method: "PATCH",
          body: JSON.stringify({
            admin_notes: payload.adminNotes,
          }),
        },
      );
      return mapBackendContribution(contribution);
    },
  },
};
