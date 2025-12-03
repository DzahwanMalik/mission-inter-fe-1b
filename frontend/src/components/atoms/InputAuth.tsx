type InputAuthProps = {
  label?: string;
  type: string;
  placeholder: string;
  rest?: any;
  className?: string;
  error?: boolean;
};

const InputAuth = ({
  placeholder,
  type,
  rest,
  className,
  error,
}: InputAuthProps) => {
  return (
    <input
      type={type}
      className={`w-full border mt-2 px-3 py-2 rounded-full ${className} ${
        error ? "border-error" : "border-outline-border"
      }`}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default InputAuth;
