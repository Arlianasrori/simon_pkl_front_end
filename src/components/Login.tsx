"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  textBody: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    setApiError(null);

    fetch("http://localhost:2008/auth/all/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.log(errorData.msg);
            
            throw new Error(errorData.msg);
          });
        }
        return response.json();
      })
      .then((result) => {
        console.log("Login success", result);
        console.log(result.data);

        if(result.data.role === "siswa"){
          window.location.href = "/siswa/";
        }else if(result.data.role === "admin"){
          window.location.href = "/admin/";
        }
        else if(result.data.role === "guru pembimbing"){
          window.location.href = "/guru/";
        }
        else if(result.data.role === "pembimbing dudi"){
          window.location.href = "/dudi/";
        }
        
      })
      .catch((error) => {
        console.log(`${JSON.stringify(error.message)}`);
        
        setApiError(error.message.toUpperCase());
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center items-center relative w-screen h-screen bg-[url('/images/LoginBG.png')] bg-cover bg-center bg-no-repeat">
      <div className="bg-white p-8 rounded-3xl">
        <h1 className="text-accentColor text-4xl font-bold mb-7">Login</h1>
        <div className="flex  items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="mb-10">
              <label className="block mb-2 text-accentColor" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Input your Username"
                className="bg-lightGray p-4 w-[22vw] rounded-full"
                {...register("textBody")}
              />
              <p className="text-red-500">{errors.textBody?.message}</p>
            </div>
            <div className="">
              <label className="block mb-2 text-accentColor" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Input your password"
                className="bg-lightGray p-4 w-[22vw] rounded-full"
                {...register("password")}
                
              />
              <p className="text-red-500 mt-3">{errors.password?.message}</p>
            </div>

            {apiError && <p className="text-red-500 w-[15vw] mx-2 mt-5">{apiError}</p>}

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-accentColor px-28 p-4 mt-12 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
