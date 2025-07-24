import React, { useState } from "react";

import * as Yup from "yup";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

import ButtonLoading from "@/components/ButtonLoading";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/ui/select";
import { auth, db } from "@/lib/firebase";

import { yupResolver } from "@hookform/resolvers/yup";

import countries from "../../country.json";
import { createUserWithEmailAndPassword } from "firebase/auth";

const schema = Yup.object().shape({
    country_id: Yup.string().required("Country is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
        .required("Confirm password is required")
        .oneOf(
            [Yup.ref("password")],
            "Confirm password and password must match"
        ),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone_code: Yup.string().required("Phone code is required"),
    phone_number: Yup.string().required("Phone number is required"),
    terms: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required("You must accept the terms and conditions"),
});

interface RegistrationForm {
    country_id: string;
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    phone_code: string;
    phone_number: string;
    terms: boolean;
}

interface RegistrationProps {
    onRegisterSuccess: () => void;
    onRegisterFail: () => void;
}

function Registration({
    onRegisterSuccess,
    onRegisterFail,
}: RegistrationProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const getCountries = () => {
        return countries.map((item) => {
            const { countryCode, countryName, ...rest } = item;

            return {
                icon: (
                    <img
                        src={`https://s.alicdn.com/@u/mobile/g/common/flags/1.0.0/assets/${countryCode.toLocaleLowerCase()}.png`}
                        alt={`country-icon-${countryCode.toLocaleLowerCase()}`}
                        className="w-7 h-5"
                    />
                ),
                value: countryCode,
                label: decodeURIComponent(countryName.replace(/\+/g, " ")),
                ...rest,
            };
        });
    };
    const listCountry = getCountries();
    const form = useForm({
        defaultValues: {
            country_id: listCountry?.[0]?.value,
            email: "",
            password: "",
            confirm_password: "",
            first_name: "",
            last_name: "",
            phone_code: listCountry?.[0]?.phoneCode,
            phone_number: "",
            terms: false,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmitForm = async (values: RegistrationForm) => {
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            if (user) {
                const appendCustomer = {
                    country_id: values.country_id,
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    phone_code: values.phone_code,
                    phone_number: values.phone_number,
                };
                await setDoc(doc(db, "customers", user.uid), appendCustomer);
                localStorage.setItem("uid", user.uid);
                setLoading(false);
            }
            onRegisterSuccess();
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            onRegisterFail();
        }
    };

    return (
        <div className="min-h-[600px] px-5 py-10 text-sm md:px-28 lg:mx-auto lg:max-w-screen-md lg:py-20">
            <form
                className="relative flex flex-col gap-y-4 rounded-2xl p-6"
                onSubmit={form.handleSubmit(handleSubmitForm)}
            >
                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <div className="registrationField">
                    <label
                        htmlFor="select_country"
                        className="registrationLabel"
                    >
                        <span className="mr-1 text-red-700">*</span>Country/
                        Region:
                    </label>
                    <CustomSelect
                        options={listCountry}
                        placeholder="Select a country"
                        id="select_country"
                        defaultValue={listCountry?.[0]?.value}
                        onValueChange={(item: string) => {
                            form.setValue(
                                "phone_code",
                                listCountry.find(
                                    (country) => country.value === item
                                )?.phoneCode!
                            );
                        }}
                        {...form.register("country_id")}
                    />
                    {form.formState.errors.country_id && (
                        <div className="text-red-600">
                            {form.formState.errors.country_id.message}
                        </div>
                    )}
                </div>
                <div className="registrationField">
                    <label
                        htmlFor="email"
                        className={`registrationLabel ${
                            form.formState.errors.email ? "md:-mt-5" : ""
                        }`}
                    >
                        <span className="mr-1 text-red-700">*</span>Email:
                    </label>
                    <div className={`w-full`}>
                        <Input
                            placeholder="Your email will be set as account name"
                            id="email"
                            className="text-sm"
                            {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.email.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="registrationField">
                    <label
                        htmlFor="password"
                        className={`registrationLabel ${
                            form.formState.errors.password ? "md:-mt-5" : ""
                        }`}
                    >
                        <span className="mr-1 text-red-700">*</span>Password:
                    </label>
                    <div className="w-full">
                        <Input
                            placeholder="Set the login password"
                            id="password"
                            className="text-sm"
                            type="password"
                            {...form.register("password")}
                        />
                        {form.formState.errors.password && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.password.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="registrationField">
                    <label
                        htmlFor="confirm_password"
                        className={`registrationLabel ${
                            form.formState.errors.confirm_password
                                ? "md:-mt-5"
                                : ""
                        }`}
                    >
                        <span className="mr-1 text-red-700">*</span>Confirm
                        password
                    </label>
                    <div className="w-full">
                        <Input
                            placeholder="Enter your login password again to continue"
                            id="confirm_password"
                            className="text-sm"
                            type="password"
                            {...form.register("confirm_password")}
                        />
                        {form.formState.errors.confirm_password && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.confirm_password.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="registrationField">
                    <label
                        htmlFor="first_name"
                        className={`registrationLabel ${
                            form.formState.errors.first_name ||
                            form.formState.errors.last_name
                                ? "md:-mt-5"
                                : ""
                        }`}
                    >
                        <span className="mr-1 text-red-700">*</span>Full name
                    </label>
                    <div className="flex items-start gap-x-2 md:w-full">
                        <div className="w-1/2">
                            <Input
                                placeholder="Enter your first name"
                                id="first_name"
                                className="text-sm"
                                type="text"
                                {...form.register("first_name")}
                            />
                            {form.formState.errors.first_name && (
                                <div className="mt-1 text-red-600">
                                    {form.formState.errors.first_name.message}
                                </div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <Input
                                placeholder="Enter your last name"
                                id="last_name"
                                className="text-sm"
                                type="text"
                                {...form.register("last_name")}
                            />
                            {form.formState.errors.last_name && (
                                <div className="mt-1 text-red-600">
                                    {form.formState.errors.last_name.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="registrationField">
                    <label
                        htmlFor="phone_number"
                        className={`registrationLabel ${
                            form.formState.errors.phone_number ? "md:-mt-5" : ""
                        }`}
                    >
                        <span className="mr-1 text-red-700">*</span>Tel
                    </label>
                    <div className="flex items-start gap-x-2 md:w-full">
                        <Input
                            placeholder="Code"
                            className="w-1/4 text-sm"
                            disabled
                            {...form.register("phone_code")}
                            defaultValue={listCountry?.[0]?.phoneCode}
                        />
                        <div className="w-full">
                            <Input
                                placeholder="Enter your phone number"
                                className="text-sm"
                                type="number"
                                id="phone_number"
                                {...form.register("phone_number")}
                            />
                            {form.formState.errors.phone_number && (
                                <div className="mt-1 text-red-600">
                                    {form.formState.errors.phone_number.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-x-2 md:ml-auto md:w-[68%]">
                    <Checkbox
                        id="terms"
                        checked={form.watch("terms")}
                        onCheckedChange={(checked) =>
                            form.setValue("terms", !!checked)
                        }
                        className="mt-0.5 rounded-full"
                        defaultValue={"false"}
                        {...form.register("terms")}
                    />
                    <div>
                        <label htmlFor="terms">
                            I agree to the{" "}
                            <span className="text-primary">
                                Free Membership Agreement
                            </span>
                            {", "}
                            <span className="text-primary">Terms of Use </span>
                            and
                            <span className="text-primary">
                                {" "}
                                Privacy Policy
                            </span>{" "}
                            of Alibaba.com. I also agree to receive more
                            information about its products and services.
                        </label>
                        {form.formState.errors.terms && (
                            <div className="mt-1 text-red-600">
                                {form.formState.errors.terms.message}
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:ml-auto md:w-[68%]">
                    <Button
                        type="submit"
                        variant={"default"}
                        className="min-w-[150px] text-white"
                        disabled={!form.watch("terms")}
                    >
                        {loading ? <ButtonLoading /> : "Create an account"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Registration;
