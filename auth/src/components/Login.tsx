import React, { useState } from "react";
import * as Yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import { FcGoogle as FcGoogleIcon } from "react-icons/fc";
import { IconBaseProps } from "react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { yupResolver } from "@hookform/resolvers/yup";
import ButtonLoading from "./ButtonLoading";
import { auth, db, provider } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const FcGoogle = FcGoogleIcon as React.FC<IconBaseProps>;
const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

interface AuthState {
    email: string;
    password: string;
}

interface LoginProps {
    onLoginSuccess: () => void;
    onClickRegister: () => void;
    onLoginFail: () => void;
    onGoogleLoginFail: () => void;
}

function Login({
    onLoginSuccess,
    onClickRegister,
    onLoginFail,
    onGoogleLoginFail,
}: LoginProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({
        defaultValues: {},
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (values: AuthState) => {
        setLoading(true);
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const res = await getDoc(doc(db, "customers", user.uid));
            const tempUser = {
                ...res.data(),
                uid: user.uid,
                loginMethod: "account",
            };
            localStorage.setItem("user", JSON.stringify(tempUser));
            window.parent.postMessage({ type: "set-user", user: tempUser });
            onLoginSuccess();
        } catch (error) {
            console.error("Login error:", error);
            onLoginFail();
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userResponse = result.user;
            const user = {
                display_name: userResponse.displayName,
                email: userResponse.email,
                phone_number: userResponse.phoneNumber,
                token: await userResponse.getIdToken(),
                uid: userResponse.uid,
                loginMethod: "google",
            };
            localStorage.setItem("user", JSON.stringify(user));
            window.parent.postMessage({ type: "set-user", user });
            onLoginSuccess();
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            onGoogleLoginFail();
        }
    };

    return (
        <form
            className="min-h-[600px] relative w-full px-5 pb-6 pt-14 text-sm md:mx-auto md:min-h-[800px] md:w-1/2 lg:flex lg:min-h-[600px] lg:w-full lg:bg-login-bg lg:bg-no-repeat lg:justify-end"
            onSubmit={form.handleSubmit(handleSubmitForm)}
        >
            <img
                src="/images/bg-login.avif"
                alt="bg-img"
                className="absolute hidden lg:top-0 lg:left-0 lg:w-full lg:h-[600px] lg:block z-[-999] object-cover"
            />
            <div className="lg:ml-10 lg:h-fit lg:w-[400px] lg:bg-white lg:px-5 lg:py-8 3xl:ml-0 lg:mr-[15%]">
                <label className="font-bold" htmlFor="email">
                    Account:
                </label>
                <Input
                    className="mt-1 text-sm focus-within:border-primary focus-visible:ring-0"
                    id="email"
                    placeholder="Enter your email or member ID"
                    {...form.register("email")}
                />
                {form.formState.errors.email && (
                    <div className="mt-1 text-red-600">
                        {form.formState.errors.email.message}
                    </div>
                )}
                <div className="mt-4">
                    <label className="font-bold" htmlFor="password">
                        Password:
                    </label>
                </div>
                <Input
                    className="mt-1 text-sm focus-within:border-primary focus-visible:ring-0"
                    id="password"
                    type="password"
                    placeholder="Enter your email or member ID"
                    {...form.register("password")}
                />
                {form.formState.errors.password && (
                    <div className="mt-1 text-red-600">
                        {form.formState.errors.password.message}
                    </div>
                )}
                <Button
                    type="submit"
                    variant={"default"}
                    className="mt-6 w-full text-white"
                >
                    {loading ? <ButtonLoading /> : "Sign in"}
                </Button>
                <div className="mt-6 text-center text-xs text-[#999999]">
                    Or sign in with
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <div
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white shadow-2xl"
                        onClick={handleGoogleSignIn}
                    >
                        {
                            FcGoogle({
                                className: "h-6 w-6 text-white",
                            }) as JSX.Element
                        }
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center text-center">
                    <div className="text-[#999999]">
                        {`Don't have an account?`}{" "}
                        <Button
                            variant={"link"}
                            className="text-primary px-0"
                            type="button"
                            onClick={onClickRegister}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;
