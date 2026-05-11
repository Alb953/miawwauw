import { type UploadApiResponse, v2 as cloudinary } from "cloudinary";

import { env } from "./env";
import { ApiError } from "../utils/ApiError";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export const uploadBufferToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(
            new ApiError(500, "No fue posible subir la imagen a Cloudinary", [
              error?.message ?? "Respuesta invalida de Cloudinary",
            ]),
          );
          return;
        }

        resolve(result);
      },
    );

    stream.end(file.buffer);
  });
};
