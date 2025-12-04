import Logo from "../components/atoms/Logo";
import AuthContainer from "../components/molecules/AuthContainer";
import LoginForm from "../components/organisms/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative z-10 h-screen flex justify-center items-center bg-[url('../login-bg.jpg')] bg-cover bg-center text-text-light-primary font-lato text-center p-8 after:bg-black/60 after:absolute after:inset-0 after:-z-10">
      <AuthContainer>
        <Logo size="large" className="md:block hidden" />
        <Logo size="medium" className="md:hidden block" />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold md:text-2xl">Masuk</h1>
          <h2 className="text-xs text-text-light-secondary md:text-sm">
            Selamat Datang Kembali!
          </h2>
        </div>
        <LoginForm />
      </AuthContainer>
    </div>
  );
};

export default LoginPage;
