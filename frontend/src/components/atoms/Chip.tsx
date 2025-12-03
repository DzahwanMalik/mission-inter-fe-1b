import type React from "react";

type Variant = "primary" | "secondary" | "primaryOutline" | "secondaryOutline";
type Size = "small" | "medium" | "large";

type LogoProps = {
  value: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

const Chip = ({
  value,
  variant = "primary",
  size = "medium",
  className,
}: LogoProps) => {
  const baseStyle = "px-3 py-2 rounded-full flex items-center";

  const variants: Record<Variant, string> = {
    primary: "bg-primary text-text-light-primary",
    secondary: "bg-extra-bg text-text-light-primary",
    primaryOutline: "border border-primary text-primary",
    secondaryOutline: "border border-text-light-secondary text-text-light-secondary",
  };

  const sizes: Record<Size, string> = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-xl",
  };

  return (
    <div
      className={`${baseStyle} ${className} ${variants[variant]} ${sizes[size]}`}
    >
      {value}
    </div>
  );
};

export default Chip;
