import { type JSX } from "react";

type Props = {
  selected: string;
  value: string;
  children: JSX.Element;
  title: string;
  className?: string;
  rest?: any;
  readOnly?: boolean;
};

const RadioButtonPayment = ({
  selected,
  value,
  children,
  title,
  className,
  rest,
  readOnly,
}: Props) => {
  return (
    <label
      className={`flex gap-3 items-center p-3 border border-text-light-primary rounded-md cursor-pointer text-sm md:text-base ${className}`}
    >
      <input
        type="radio"
        className="sr-only"
        checked={selected === value}
        {...rest}
        value={value}
        readOnly={readOnly}
      />

      {/* Custom Checkbox */}
      <span
        className={`inline-block relative size-5 rounded-full ${
          selected === value
            ? "border-2 border-b-text-light-primary"
            : "border border-text-light-secondary"
        }`}
      >
        {selected === value && (
          <span className="absolute size-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></span>
        )}
      </span>

      {children}
      <p>{title}</p>
    </label>
  );
};

export default RadioButtonPayment;
