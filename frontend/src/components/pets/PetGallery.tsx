import type { PetDetail } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneBySpecies = {
  dog: "bg-[linear-gradient(180deg,#fff2e3_0%,#f7d4ab_100%)]",
  cat: "bg-[linear-gradient(180deg,#fff3ea_0%,#ffd8c9_100%)]",
};

interface PetGalleryProps {
  pet: PetDetail;
}

function isImageUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}

export function PetGallery({ pet }: PetGalleryProps) {
  const mainImage = pet.imageUrls?.[0] ?? pet.image;
  const galleryImages = pet.imageUrls?.length ? pet.imageUrls : pet.images;

  return (
    <section className="space-y-4">
      <div
        className={cn(
          "relative flex min-h-[380px] items-end justify-center overflow-hidden rounded-[2rem] p-8",
          toneBySpecies[pet.species],
        )}
      >
        <div className="absolute inset-x-10 top-8 h-28 rounded-full bg-white/45 blur-3xl" />
        <div className="absolute -bottom-10 h-36 w-56 rounded-full bg-white/55 blur-2xl" />
        <div className="relative w-full">
          {isImageUrl(mainImage) ? (
            <img
              src={mainImage}
              alt={`Foto principal de ${pet.name}`}
              className="h-[340px] w-full rounded-[1.6rem] object-cover shadow-[0_16px_50px_rgba(35,17,31,0.18)]"
            />
          ) : (
            <div className="text-center text-[10rem] leading-none sm:text-[12rem]">{mainImage}</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={`${pet.id}-${index}`}
            className={cn(
              "flex min-h-28 items-center justify-center overflow-hidden rounded-[1.4rem] border bg-white text-5xl shadow-sm",
              index === 0 && "border-[var(--color-primary)] bg-[var(--color-bg-soft)]",
            )}
          >
            {isImageUrl(image) ? (
              <img
                src={image}
                alt={`Foto ${index + 1} de ${pet.name}`}
                className="h-full min-h-28 w-full object-cover"
              />
            ) : (
              image
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
