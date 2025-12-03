import Button from "../components/atoms/Button";
import Logo from "../components/atoms/Logo";

const LandingPage = () => {
  return (
    <div className="relative z-10 h-screen flex justify-center items-center bg-[url('./landing-page-bg.jpg')] bg-cover bg-center text-text-light-primary font-lato text-center p-8 after:bg-black/60 after:absolute after:inset-0 after:-z-10">
      <div className="max-w-xl">
        <Logo />
        <h1 className="text-4xl font-bold my-5 md:text-6xl">
          Film & Serial TV tanpa batas, dan lebih banyak lagi
        </h1>
        <p className="mb-10 text-text-light-secondary md:text-xl">
          Platform streaming terlengkap dengan berbagai pilihan film dan serial
          TV.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Button
            type="button"
            value="Masuk"
            variant="secondary"
            className="w-full"
            handleClick={() => (window.location.href = "/auth/login")}
          />
          <Button
            type="button"
            value="Daftar"
            variant="transparent"
            className="w-full"
            handleClick={() => (window.location.href = "/auth/register")}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
