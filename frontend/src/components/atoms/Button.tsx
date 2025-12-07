type Variant = "primary" | "secondary" | "tertiary" | "primaryOutline" | "secondaryOutline" | "transparent";

type Props = {
  value: any;
  variant?: Variant;
  handleClick?: () => void;
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
};

const Button = ({
  value,
  variant = "primary",
  handleClick,
  className,
  type,
}: Props) => {
  const baseStyle =
    "px-5 py-2 rounded-full cursor-pointer transition-colors duration-300 ease-in-out";

  const variantStyles: Record<Variant, string> = {
    primary: "bg-primary text-text-light-primary hover:bg-primary-300",
    secondary: "bg-paper-bg text-text-light-primary hover:bg-extra-bg",
    tertiary: "bg-body-bg text-text-light-primary hover:bg-paper-bg",
    primaryOutline: "border border-primary text-primary hover:bg-primary hover:text-text-light-primary",
    secondaryOutline: "border border-text-light-secondary text-text-light-secondary hover:bg-extra-bg hover:text-text-light-primary",
    transparent: "bg-transparent text-text-light-primary hover:bg-paper-bg",
  };
  
  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className || ""}`}
      onClick={handleClick}
      type={type}
    >
      {value}
    </button>
  );
};

export default Button;
