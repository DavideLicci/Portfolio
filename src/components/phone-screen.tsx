import Image from "next/image";

type PhoneScreenProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

// Screenshot di un'app dentro una cornice da telefono (gli screenshot sono 860×1864).
export function PhoneScreen({ src, alt, sizes, className = "" }: PhoneScreenProps) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border-4 border-[#20283a] bg-black shadow-2xl shadow-black/50 ${className}`}
    >
      <Image src={src} alt={alt} width={860} height={1864} sizes={sizes} className="h-auto w-full" />
    </div>
  );
}
