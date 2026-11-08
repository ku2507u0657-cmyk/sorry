import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "outline" | "solid" | "light";

const variants: Record<Variant, { surface: string; sweep: string }> = {
  outline: {
    surface: "border border-burgundy/35 text-burgundy hover:text-ivory focus-visible:outline-burgundy",
    sweep: "bg-burgundy",
  },
  solid: {
    surface: "bg-burgundy text-ivory focus-visible:outline-burgundy",
    sweep: "bg-wine",
  },
  light: {
    surface: "border border-ivory/40 text-ivory hover:text-wine focus-visible:outline-ivory",
    sweep: "bg-ivory",
  },
};

function buttonClass(variant: Variant, className: string) {
  return `group relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5 text-base transition-colors duration-500 ease-soft focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant].surface} ${className}`;
}

interface FaceProps {
  variant: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

function Face({ variant, icon, children }: FaceProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-soft group-hover:scale-y-100 ${variants[variant].sweep}`}
      />
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-500 ease-soft group-hover:translate-x-1">{icon}</span>
      ) : null}
    </>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

export function Button({
  variant = "outline",
  icon,
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      <Face variant={variant} icon={icon}>
        {children}
      </Face>
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: ReactNode;
}

export function ButtonLink({
  variant = "outline",
  icon,
  className = "",
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const external = href ? /^https?:/i.test(href) : false;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={buttonClass(variant, className)}
      {...rest}
    >
      <Face variant={variant} icon={icon}>
        {children}
      </Face>
    </a>
  );
}
