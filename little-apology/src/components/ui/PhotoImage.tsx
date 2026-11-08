import { useState } from "react";
import { imageUrl } from "../../lib/assets";

interface PhotoImageProps {
  file: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function PhotoImage({ file, alt, className = "", priority = false }: PhotoImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`bg-[linear-gradient(135deg,var(--color-champagne),var(--color-blush))] ${className}`}
      />
    );
  }

  return (
    <img
      src={imageUrl(file)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
