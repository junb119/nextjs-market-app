"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/register", body);
      // console.log(data);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="grid h-[calc(100vh_-_56px)] place-items-center">
      <form
        className="flex flex-col justify-center gap-4 min-w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl">Register</h1>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button label="Register" />
        <div className="text-center">
          <p className="text-gray-400">
            Already a member?{" "}
            <Link href="/auth/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
