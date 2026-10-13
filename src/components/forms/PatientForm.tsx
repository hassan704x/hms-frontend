"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { LoginFormValidation } from "@/lib/validation";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export enum FormFieldType {
  INPUT = "input",
  SELECT = "select",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phone_input",
  SKELETON = "skeleton",
  CUSTOM = "custom", 
  DATE_PICKER = "DATE_PICKER",
}

interface PatientFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string | null;
}

const PatientForm = ({ onSubmit, loading = false, error = null }: PatientFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleSubmit(formData: z.infer<typeof LoginFormValidation>) {
    // Store data in Redux first
    await onSubmit(formData);
    
    // Then route to register page
    router.push('/register');
  }

  if (!isMounted) {
    return (
      <div className="max-w-lg w-[476px] mx-auto p-6 bg-[#1a1a1a] rounded-xl shadow-md">
        <div className="h-[400px] animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg w-[476px] mx-auto p-6 bg-[#1a1a1a] rounded-xl shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 flex-1"
          noValidate
        >
          <section className="mb-12 space-y-4">
            <h1 className="text-32-bold md:text-36-bold">Hi there 👋</h1>
            <p className="text-[#ABB8C4]">
              Please enter your details.
            </p>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
          </section>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@email.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            type="email"
            autoComplete="username"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            label="Password"
            placeholder="••••••••"
            iconAlt="password"
            type="password"
            autoComplete="current-password"
          />

          <SubmitButton isLoading={loading}>Sign In</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;