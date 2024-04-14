"use client";
import Link from "next/link";
import { register } from "@/api/users";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ToastContext from "@/context/ToastContext";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function Faq() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const router = useRouter();
  const { msg, type, setMsg, setType } = useContext(ToastContext);

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]*@pitt.edu+$/
  );
  const passwordRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );

  const validate = async () => {
    // email checks
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setMsg("Not a valid email");
      setType(0);
      return;
    }

    // password checks
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
      setMsg("Not a valid password");
      setType(0);
      return;
    }
    if (password !== confirmedPassword) {
      setMsg("Password mismatch");
      setType(0);
      return;
    }

    // passed data
    const data = {
      email,
      password,
    };

    send(data);
  };

  const send = async (data) => {
    const res = await Faq(data);
    console.log(res);
    if (res?.status === 201) {
      router.push("/login");
      setMsg(res?.response?.data?.message || "Success");
      setType(1);
    } else {
      setMsg(res?.response?.data?.message || "Unknown Error");
      setType(0);
      return;
    }
  };

  return (
    <div className="bg-white flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gold">
          FAQ
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg lg:px-5">
          <div className="space-y-6">
            <div>
              <h1 className="block text-lg pd font-bold font-medium leading-6 text-gray-900 pb-4">
                {" "}
                Frequently Asked Questions
              </h1>
              <ul className="block text-md font-small leading-6 text-gray-900">
                <li className="pb-4">
                  1. How do I create an account? To create an account, open the
                  app via any browser on phone or PC and click on the "Sign Up"
                  or "Create Account" button. Then, follow the on-screen
                  instructions to enter your details and create your account.
                </li>

                <li className="pb-4">
                  2. Can I use the app without a gym membership? Yes, you can
                  still use the app to access features such as workout plans,
                  nutrition guidance, and fitness tracking even if you're not a
                  gym member. However, you do need a pitt email address.
                </li>
                <li className="pb-4">
                  {" "}
                  3.Are the workout plans customizable? Yes, you can customize
                  the workout plans based on your fitness goals, preferences,
                  and available equipment. The app offers a static plan with
                  excercises to give you a concrete example of what a plan could
                  look like.
                </li>
                <li className="pb-4">
                  4. I'm experiencing issues with the app. What should I do? If
                  you encounter any technical issues with the app, please reach
                  out to our support team through emails such as
                  GymCrown@pitt.edu.
                </li>
                <li className="pb-4">
                  5. Is the app available on all devices? The app is compatible
                  with both iOS and Android devices. Theres no need to download
                  it but is available with any browser which can allow the same
                  enjoyment of all its features on your smartphone or tablet.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Wanna learn more? Go{" "}
          <Link
            href="/#"
            className="font-semibold  text-center leading-6 text-royal hover:text-gold"
          >
            Home!
          </Link>
        </p>
      </div>
    </div>
  );
}
