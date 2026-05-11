import multer from "multer";

import { ApiError } from "../utils/ApiError";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSizeInBytes = 5 * 1024 * 1024;

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSizeInBytes,
    files: 6,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        new ApiError(400, "Solo se permiten imagenes JPG, JPEG, PNG o WEBP"),
      );
      return;
    }

    callback(null, true);
  },
});
