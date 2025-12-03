import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type Props = {
  label: string;
  type: string;
};

const InputField = ({ label, type, ...rest }: Props) => {
  const [disabled, setDisabled] = useState(true);

  const handleEdit = () => {
    setDisabled(false);
  };

  return (
    <label>
      <span className="text-sm font-medium text-text-light-secondary inline-block mb-2">
        {" "}
        {label}{" "}
      </span>

      <div className="relative">
        <input
          type={type}
          className="mt-0.5 py-2 px-3 w-full rounded border border-outline-border bg-paper-bg text-text-light-primary focus:outline-outline-border"
          {...rest}
          disabled={type === "file" ? false : disabled}
        />

        <span
          className="absolute top-1/2 right-3 -translate-y-1/2 text-text-light-primary cursor-pointer"
          onClick={handleEdit}
        >
          <PencilIcon className="size-4" />
        </span>
      </div>
    </label>
  );
};

export default InputField;
