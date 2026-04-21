import Image from "next/image";

type GalleryImage = {
  alt: string;
  src: string;
};

type ImageMarqueeProps = {
  images: readonly GalleryImage[];
  reverse?: boolean;
};

export function ImageMarquee({ images, reverse = false }: ImageMarqueeProps) {
  const railImages = [...images, ...images];

  return (
    <div className="media-marquee" data-direction={reverse ? "reverse" : "forward"}>
      <div className="media-marquee-track">
        {railImages.map((image, index) => (
          <figure className="media-marquee-card" key={`${image.src}-${index}`}>
            <Image
              alt={image.alt}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
              fill
              sizes="(min-width: 1280px) 22rem, (min-width: 768px) 40vw, 72vw"
              src={image.src}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
