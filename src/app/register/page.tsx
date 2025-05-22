"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";

const schema = yup.object().shape({
    textBody: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
});

export default function Login () {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center relative w-screen h-screen bg-[url('/images/LoginBG.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white p-8 rounded-3xl">
                <h1 className="text-accentColor text-4xl font-bold mb-7">Login</h1>
                <div className="flex items-center justify-center">
                    <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-10">
                            <label className="block mb-2 text-accentColor" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="username"
                                className="bg-lightGray p-4 pr-28 rounded-full"
                                {...register("textBody")}
                            />
                            <p className="text-red-500">{errors.textBody?.message}</p>
                        </div>
                        <div className="">
                            <label className="block mb-2 text-accentColor" htmlFor="id">
                                Password
                            </label>
                            <input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="******"
                                className="bg-lightGray p-4 pr-28 rounded-full"
                                {...register("password")}
                            />
                            <Image
                                src={
                                    passwordVisible
                                        ? "/images/eye-open.svg"
                                        : "/images/eye-closed.svg"
                                }
                                width={30}
                                height={30}
                                alt="Toggle visibility"
                                className="ml-[85%] mt-[-13%] cursor-pointer"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            />
                            <p className="text-red-500 mt-3">{errors.password?.message}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button className="text-white bg-accentColor px-28 p-4 mt-12 rounded-full">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
 Login;
