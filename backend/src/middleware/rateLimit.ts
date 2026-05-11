import rateLimit from "express-rate-limit";

const defaultMessage = "Demasiadas solicitudes. Intenta nuevamente en unos minutos.";

export const createRateLimiter = (windowMs: number, max: number, message = defaultMessage) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message,
      errors: [],
    },
  });
};

export const standardApiRateLimiter = createRateLimiter(15 * 60 * 1000, 200);
export const authRateLimiter = createRateLimiter(15 * 60 * 1000, 10, "Has alcanzado el limite temporal para autenticacion.");
export const applicationRateLimiter = createRateLimiter(60 * 60 * 1000, 15, "Has enviado demasiadas solicitudes de adopcion.");
export const complaintsRateLimiter = createRateLimiter(60 * 60 * 1000, 5, "Has enviado demasiadas quejas. Intenta nuevamente mas tarde.");
export const reportsRateLimiter = createRateLimiter(60 * 60 * 1000, 20, "Has enviado demasiados reportes.");
