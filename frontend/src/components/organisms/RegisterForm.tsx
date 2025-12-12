import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import InputAuth from "../atoms/InputAuth";
import Button from "../atoms/Button";
import useRegister from "../../hooks/useRegister";
import { useEffect } from "react";
import Alert from "../atoms/Alert";

const RegisterFormSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password tidak sama",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(
      RegisterFormSchema
    ) as Resolver<RegisterFormSchemaType>,
  });

  const { registerUser, registerSuccess, registerError, registerLoading } =
    useRegister();

  const onSubmit = (data: any) => {
    registerUser(data.username, data.password);
  };

  useEffect(() => {
    if (registerSuccess) window.location.href = "/auth/login";
  }, [registerSuccess]);

  return (
    <>
      {registerError && <Alert message={registerError} variant="error" />}
      {registerSuccess && <Alert message={registerSuccess} variant="success" />}
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
              className={`mb-2 ${
                formState.errors.password ? "border-error" : ""
              }`}
            />
          </label>
          <p className="text-error">{formState.errors.password?.message}</p>
        </div>
        <div className="mb-5">
          <label>
            <p>Ulangi Kata Sandi</p>
            <InputAuth
              type="password"
              placeholder="Masukkan kata sandi"
              rest={{ ...register("confirmPassword") }}
              error={formState.errors.confirmPassword ? true : false}
              className="mb-2"
            />
          </label>
          <p
            className={`text-error ${
              formState.errors.confirmPassword ? "mb-5" : "hidden"
            }`}
          >
            {formState.errors.confirmPassword?.message}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-text-light-secondary">
              Sudah Punya Akun?
              <Link to="/auth/login" className="text-text-light-primary">
                {" "}
                Masuk
              </Link>
            </p>
          </div>
        </div>
        <Button
          value={registerLoading ? "Loading..." : "Daftar"}
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
              <p>Daftar dengan Google</p>
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

export default RegisterForm;
