import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

type Variant = "success" | "error";

type Props = {
  message: string | undefined;
  variant: Variant;
  className?: string;
};

const Alert = ({ message, variant, className }: Props) => {
  const variants: Record<Variant, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`${variants[variant]} fixed top-10 left-1/2 -translate-x-1/2 py-2 px-4 text-white rounded-md z-50 text-sm font-semibold animate-fadeDown ${className}`}
    >
      <div className="flex gap-2 items-center">
        <span>
          {variant === "success" ? (
            <CheckIcon className="size-5" />
          ) : (
            <XMarkIcon className="size-5" />
          )}
        </span>
        {message}
      </div>
    </div>
  );
};

export default Alert;
