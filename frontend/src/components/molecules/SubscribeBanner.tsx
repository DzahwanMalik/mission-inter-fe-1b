import Button from "../atoms/Button";

const SubscribeBanner = () => {
  return (
    <div className="p-5 bg-extra-bg rounded-lg flex flex-col gap-7">
      <div className="flex items-center gap-5">
        <div className="basis-2/3 md:basis-1/4">
          <img src="/warning.png" alt="" className="w-full" />
        </div>
        <div className="text-text-light-primary flex flex-col gap-3">
          <h3 className="font-semibold text-xl">Berlangganan</h3>
          <p className="">
            Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
          </p>
        </div>
      </div>
      <div className="self-end">
        <Button type="button" value={"Mulai Berlangganan"} variant="tertiary" />
      </div>
    </div>
  );
};

export default SubscribeBanner;
