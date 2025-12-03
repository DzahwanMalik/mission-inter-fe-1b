import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "../../hooks/useUsername";
import Alert from "../atoms/Alert";
import useUpdate from "../../hooks/useUpdate";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  avatar: z
    .custom<FileList>()
    .optional()
    .transform((fileList) =>
      fileList && fileList.length > 0 ? (fileList[0] as File) : undefined
    )
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Tipe file harus jpg, jpeg, atau png",
    })
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Ukuran file maksimal 2MB"
    ),
});

type FormSchema = z.infer<typeof formSchema>;

const EditProfileForm = () => {
  const [img, setImg] = useState<string>("/profile.png");

  const { user, setUser } = useUser();

  const { register, handleSubmit, reset, formState } = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as any,
  });

  const {
    updateUserProfile,
    updateLoading,
    updateError,
    updateSuccess,
    updatedUser,
  } = useUpdate();

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImg(URL.createObjectURL(file));
  };

  const onSubmit = (data: FormSchema) => {
    updateUserProfile(data, user!.id);
  };

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        password: user.password,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    setImg(user?.avatar ?? "/profile.png");
  }, [user]);

  useEffect(() => {
    if (updateSuccess) {
      setUser(updatedUser);
    }
  }, [updateSuccess, updateError, setUser, user]);

  return (
    <>
      {updateError && <Alert message={updateError} variant="error" />}
      {updateSuccess && <Alert message={updateSuccess} variant="success" />}
      {formState.errors.avatar && (
        <Alert message={formState.errors.avatar?.message} variant="error" />
      )}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-text-light-primary text-2xl font-semibold">
          Profil Saya
        </h2>
        <div className="flex gap-5 items-center">
          <div className="size-20 rounded-full overflow-hidden md:size-30">
            <img
              src={img}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="cursor-pointer px-3 py-2 rounded-full transition-colors duration-300 ease-in-out border border-primary text-primary text-sm text-center hover:bg-primary hover:text-text-light-primary">
              <span>Ubah Foto</span>
              <input
                type="file"
                {...register("avatar")}
                className="sr-only"
                onChange={handlePreviewImage}
              />
            </label>
            <div className="flex items-center gap-2">
              <svg
                width="16"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0L16 6V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H10ZM14 18V7H9V2H2V18H14ZM8 10L12 14H9.5V17H6.5V14H4L8 10Z"
                  fill="#C1C2C4"
                />
              </svg>
              <p className="text-text-light-secondary text-sm">Maksimal 2 MB</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-white">
          <InputField label="Nama Pengguna" type="text" {...register("username")} />
          <InputField
            label="Kata Sandi"
            type="password"
            {...register("password")}
          />
        </div>
        <Button
          type="submit"
          value={updateLoading ? "Loading..." : "Simpan"}
          variant="primary"
          className="md:w-fit"
        />
      </form>
    </>
  );
};

export default EditProfileForm;
