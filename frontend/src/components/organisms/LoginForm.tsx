import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import InputAuth from "../atoms/InputAuth";
import Button from "../atoms/Button";
import useLogin from "../../hooks/useLogin";
import { useEffect } from "react";
import Alert from "../atoms/Alert";
import useUser from "../../hooks/useUsername";

const loginFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

type loginFormSchemaType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginFormSchema) as Resolver<loginFormSchemaType>,
  });

  const { setUser } = useUser();

  const { loginUser, loginSuccess, loginError, loginLoading, userData } =
    useLogin();

  const onSubmit = (data: loginFormSchemaType) => {
    loginUser(data.username, data.password);
  };
  
  useEffect(() => {
    if (loginSuccess) {
      setUser(userData || null);
      window.location.href = `/${userData?.username}`;
    }
  }, [loginSuccess]);

  return (
    <>
      {loginError && <Alert message={loginError} variant="error" />}
      {loginSuccess && <Alert message={loginSuccess} variant="success" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-start text-xs w-full md:text-sm"
      >
        <div className="mb-5">
          <label>
            <p>Username</p>
            <InputAuth
              type="text"
              placeholder="Masukkan username"
              rest={{ ...register("username") }}
              error={formState.errors.username ? true : false}
              className={`mb-2 ${
                formState.errors.username ? "border-error" : ""
              }`}
            />
          </label>
          <p className="text-error">{formState.errors.username?.message}</p>
        </div>
        <div className="mb-5">
          <label>
            <p>Kata Sandi</p>
            <InputAuth
              type="password"
              placeholder="Masukkan kata sandi"
              rest={{ ...register("password") }}
              error={formState.errors.password ? true : false}
              className="mb-2"
            />
          </label>
          <p
            className={`text-error ${
              formState.errors.password ? "mb-5" : "hidden"
            }`}
          >
            {formState.errors.password?.message}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-text-light-secondary">
              Belum Punya Akun?
              <Link to="/auth/register" className="text-text-light-primary">
                {" "}
                Daftar
              </Link>
            </p>
            <Link
              to="/auth/forgot-password"
              className="text-text-light-primary"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
        </div>
        <Button
          value={loginLoading ? "Loading ..." : "Masuk"}
          variant="secondary"
          type="submit"
          className="w-full outline-1 outline-outline-border"
        />
        <div className="flex gap-6 justify-center items-center my-3">
          <div className="flex-1 border-t border-outline-border"></div>
          <span className="text-text-light-disabled">Atau</span>
          <div className="flex-1 border-t border-outline-border"></div>
        </div>
        <Button
          value={
            <span className="flex justify-center items-center">
              <img
                src="../google-icon.png"
                alt="google-icon"
                className="mr-2"
                width={"15px"}
              />
              <p>{loginLoading ? "Loading ..." : "Masuk"}</p>
            </span>
          }
          variant="transparent"
          type="button"
          className="w-full outline-1 outline-outline-border"
          handleClick={() => alert("Fitur belum tersedia")}
        />
      </form>
    </>
  );
};

export default LoginForm;
