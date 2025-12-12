import { CheckIcon } from "@heroicons/react/20/solid";
import Chip from "../atoms/Chip";
import Button from "../atoms/Button";
import formatRupiah from "../../utils/formatRupiah";

type Props = {
  id: number;
  chipValue: string;
  price: number;
  account: number;
  quality: string;
  handleClick: (id: number) => void;
  className?: string;
};

type Benefit = {
  value: string;
};

const SubscriptionCard = ({
  id,
  chipValue,
  price,
  account,
  quality,
  handleClick,
  className,
}: Props) => {
  const benefits: Benefit[] = [
    {
      value: "Tidak ada iklan",
    },
    {
      value: `Kualitas ${quality}`,
    },
    {
      value: "Download Konten Pilihan",
    },
  ];

  return (
    <div
      className={`p-8 bg-linear-to-r from-[#5370D4] to-[#192DB7] rounded-xl flex flex-col gap-10 text-text-light-primary ${className}`}
    >
      <Chip
        value={chipValue}
        variant="secondary"
        size="large"
        className="w-fit"
      />
      <p>
        Mulai dari {formatRupiah(price)}/bulan {account} Akun
      </p>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index} className="flex gap-3 items-center">
            <CheckIcon className="size-5" />
            <p>{benefit.value}</p>
          </li>
        ))}
      </ul>
      <span className="h-px bg-text-light-secondary/50"></span>
      <div className="flex flex-col text-center gap-3">
        <Button
          type="button"
          value="Langganan"
          variant="primaryDark"
          className="font-semibold py-4"
          handleClick={() => handleClick(id)}
        />
        <p>Syarat dan Ketentuan Berlaku</p>
      </div>
    </div>
  );
};

export default SubscriptionCard;
