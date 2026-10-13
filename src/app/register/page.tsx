import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

interface SearchParamProps {
  params: Promise<{
    userId: string;
  }>;
}

const Register = async ({ params }: SearchParamProps) => {
  const resolvedParams = await params;
  const user = await getUser(resolvedParams.userId);
  console.log(user);

  // const safeUser = {
  //   $id: user?.$id || "",
  //   name: user?.name || "Guest",
  //   email: user?.email || "Not provided",
  //   phone: user?.phone || "Not provided",
  // };

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="ml-10 mt-20 mb-12 h-10 w-fit"
          />

          <RegisterForm user={resolvedParams.userId} 
          />
          <p className="copyright py-12">
            © 2024 CarePulse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="Register Illustration"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;