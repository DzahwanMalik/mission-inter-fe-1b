import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import type Subscription from "../../types/subscription";
import formatRupiah from "../../utils/formatRupiah";
import Button from "../atoms/Button";
import BCAVirtualAccount from "../atoms/svg/BCAVirtualAccount";
import RadioButtonPayment from "./RadioButtonPayment";
import copyText from "../../utils/copyText";

type Props = {
  subscription: Subscription;
  adminFee: number;
  code: string;
};

const BCAVirtualAccountPaymentForm = ({
  subscription,
  adminFee,
  code,
}: Props) => {
  const paymentSteps = [
    "Buka Aplikasi BCA Mobile Banking atau akses BCA Internet Banking.",
    "Login ke akun anda",
    'Pilih menu "Transfer" atau "Pembayaran.',
    'Pilih opsi "Virtual Account" atau "Virtual Account Number".',
    "Masukkan nomor virtual account dan jumlah pembayaran, lalu konfirmasikan pembayaran.",
  ];

  return (
    <form
      onSubmit={() => alert("Fitur Belum Tersedia Hehe...")}
      className="flex flex-col gap-5 items-center justify-center w-full"
    >
      <div className="w-full flex flex-col gap-3 justify-center">
        <h3 className="font-semibold">Metode Pembayaran</h3>
        <div className="flex flex-col justify-center gap-3">
          <RadioButtonPayment
            selected="bca_virtual_account"
            value="bca_virtual_account"
            title="BCA Virtual Account"
            readOnly={true}
            children={<BCAVirtualAccount />}
            className="md:w-full w-fit"
          />
          <div className="flex flex-col gap-2 text-sm w-full text-text-light-secondary">
            <div className="flex justify-between">
              <span>Tanggal Pembelian</span>
              <span>
                {new Date().toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Kode Pembelian</span>
              <span className="flex gap-2 items-center">
                {code}
                <DocumentDuplicateIcon
                  className="size-5 text-primary cursor-pointer"
                  onClick={() => {
                    copyText(code);
                    alert("Kode pembelian berhasil disalin");
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 justify-center">
        <h3 className="font-semibold">Ringkasan Transaksi</h3>
        <div className="flex flex-col gap-2 text-sm w-full text-text-light-secondary">
          <div className="flex justify-between">
            <span>Paket Premium {subscription?.name}</span>
            <span>{formatRupiah(subscription?.price!)}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Admin</span>
            <span>{formatRupiah(adminFee)}</span>
          </div>
          <div className="flex justify-between text-text-light-primary font-semibold text-base">
            <span>Total Pembayaran</span>
            <span>{formatRupiah(subscription?.price! + adminFee)}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 justify-center">
        <h3 className="font-semibold">Tata Cara Pembayaran</h3>
        <div className="flex flex-col gap-2 text-sm w-full text-text-light-secondary">
          <ol className="list-decimal pl-4">
            {paymentSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="w-full">
        <Button value="Bayar" variant="primary" type="submit" />
      </div>
    </form>
  );
};

export default BCAVirtualAccountPaymentForm;
