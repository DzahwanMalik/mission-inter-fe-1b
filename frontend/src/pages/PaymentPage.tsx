import { useEffect, useState } from "react";
import SubscriptionCard from "../components/molecules/SubscriptionCard";
import useGetData from "../hooks/useGetData";
import { useParams } from "react-router";
import Visa from "../components/atoms/svg/Visa";
import MasterCard from "../components/atoms/svg/MasterCard";
import JCB from "../components/atoms/svg/JCB";
import AmericanExpress from "../components/atoms/svg/AmericanExpress";
import BCAVirtualAccount from "../components/atoms/svg/BCAVirtualAccount";
import Button from "../components/atoms/Button";
import formatRupiah from "../utils/formatRupiah";
import RadioButtonPayment from "../components/molecules/RadioButtonPayment";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BCAVirtualAccountPaymentForm from "../components/molecules/BCAVirtualAccountPaymentForm";
import generateCode from "../utils/generateCode";

const formSchema = z.object({
  payment_method: z.enum(["debit", "bca_virtual_account"]),
});

type FormSchema = z.infer<typeof formSchema>;

const PaymentPage = () => {
  const [code, setCode] = useState<string | null>(null);

  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const selected = watch("payment_method");
  const { getSubscription, subscription } = useGetData();

  const subscriptionId = useParams().id;

  useEffect(() => {
    getSubscription(subscriptionId!);
  }, []);

  const adminFee = 3000;

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    setCode(generateCode());
    setPaymentMethod(data.payment_method);
  };

  return (
    <main className="px-5 md:px-0 py-5 md:py-10 flex flex-col gap-5 md:gap-10 text-text-light-primary">
      <div className="max-w-[1444px] m-auto w-full flex flex-col gap-5">
        <h2 className="text-xl md:text-3xl font-semibold">
          Ringkasan Pembayaran
        </h2>
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
          <SubscriptionCard
            id={subscription?.id!}
            chipValue={subscription?.name!}
            price={subscription?.price!}
            account={subscription?.account!}
            quality={subscription?.quality!}
            handleClick={() => {}}
            className="w-full md:w-1/3"
          />
          {!paymentMethod && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 items-center justify-center w-full"
            >
              <div className="w-full flex flex-col gap-3 justify-center">
                <h3 className="font-semibold">Metode Pembayaran</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                  <RadioButtonPayment
                    selected={selected}
                    value="debit"
                    children={
                      <>
                        <Visa />
                        <MasterCard />
                        <JCB />
                        <AmericanExpress />
                      </>
                    }
                    title="Kartu Debit / Kredit"
                    className="w-full"
                    rest={register("payment_method")}
                  />
                  <RadioButtonPayment
                    selected={selected}
                    value="bca_virtual_account"
                    children={<BCAVirtualAccount />}
                    title="BCA Virtual Account"
                    className="w-full"
                    rest={register("payment_method")}
                  />
                </div>
              </div>
              <label className="w-full flex flex-col gap-3 justify-center">
                <h3 className="font-semibold">Kode Voucher (Jika Ada)</h3>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Masukkan Kode Voucher"
                    className="p-3 border border-text-light-primary rounded-md w-full"
                  />
                  <Button value="Gunakan" variant="secondary" type="button" />
                </div>
              </label>
              <div className="w-full flex flex-col gap-3 justify-center">
                <h3 className="font-semibold">Ringkasan Transaksi</h3>
                <div className="flex flex-col gap-2 text-sm w-full md:w-1/2 text-text-light-secondary">
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
              <div className="w-full">
                <Button value="Bayar" variant="primary" type="submit" />
              </div>
            </form>
          )}
          {paymentMethod === "bca_virtual_account" && (
            <BCAVirtualAccountPaymentForm
              subscription={subscription!}
              adminFee={adminFee}
              code={code!}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
