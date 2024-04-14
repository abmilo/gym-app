"use client";
import Link from "next/link";
import { register } from "@/api/users";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ToastContext from "@/context/ToastContext";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function Nutrition() {
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
    const res = await Nutrition(data);
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
    <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gold">
            Nutrition Hub
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg lg:px-5">
            <div className="space-y-6">
              <div>
                <h1 className="block text-lg pd font-bold font-medium leading-6 text-gray-900 pb-4">
                  {" "}
                  Welcome to the Nutrition Hub! Here, you'll find everything you
                  need to fuel your fitness journey and optimize your
                  performance in and out of the gym.
                </h1>
                <ul className="block text-md font-small leading-6 text-gray-900">
                  <li className="pb-4">
                    1. Meal Plans: Explore a variety of curated meal plans
                    designed by nutrition experts to support different fitness
                    goals, whether it's muscle gain, fat loss, or overall
                    health. Each meal plan comes with detailed recipes and
                    nutritional information.
                  </li>

                  <li className="pb-4">
                    2. Nutrition Articles: Dive into a collection of informative
                    articles covering topics such as macronutrients,
                    micronutrients, meal timing, supplementation, and more. Stay
                    informed and make educated choices about your nutrition.
                  </li>
                  <li className="pb-4">
                    {" "}
                    3.Recipe Library: Discover delicious and nutritious recipes
                    that are easy to prepare and packed with essential
                    nutrients. From protein-packed smoothies to wholesome
                    dinners, find inspiration for every meal of the day.
                  </li>
                  <li className="pb-4">
                    4. Nutrient Calculator: Calculate your daily calorie and
                    macronutrient needs based on your fitness goals, activity
                    level, and body composition. Get personalized
                    recommendations to optimize your nutrition intake.
                  </li>
                  <li className="pb-4">
                    5. Nutrition Challenges: Join nutrition challenges designed
                    to help you develop healthy eating habits and achieve your
                    fitness goals. Whether it's a sugar detox, meal prep
                    challenge, or hydration challenge, we're here to support you
                    every step of the way.
                  </li>
                  <li className="pb-4">
                    {" "}
                    6. Ask a Nutritionist: Have questions about nutrition or
                    need personalized advice? Our team of certified
                    nutritionists is here to help! Submit your questions and get
                    expert guidance tailored to your specific needs and goals.
                  </li>
                  <li className="pb-4">
                    7. Nutrition Events: Stay updated on nutrition workshops,
                    seminars, and events hosted by our gym and nutrition
                    partners. Learn from industry experts, participate in
                    cooking demonstrations, and connect with like-minded
                    individuals passionate about health and wellness.{" "}
                  </li>
                  <li className="pb-4">
                    8. Nutrition Resources: Access a curated list of recommended
                    nutrition books, podcasts, apps, and websites to further
                    expand your knowledge and stay motivated on your nutrition
                    journey.
                  </li>
                  <li className="pb-4">
                    9. Nutrition FAQs: Find answers to frequently asked
                    questions about nutrition, dieting, supplements, and more.
                    Get clarity on common misconceptions and make informed
                    decisions about your dietary choices.
                  </li>
                  <li className="pb-4">
                    {" "}
                    10. Meal Tracking: Track your daily food intake and monitor
                    your nutritional progress using our built-in meal tracking
                    feature. Set goals, log meals, and view detailed reports to
                    stay accountable and make adjustments as needed. Fuel your
                    body for success with the right nutrition! Whether you're
                    looking to build muscle, lose weight, or simply improve your
                    overall health, our Nutrition Hub has everything you need to
                    reach your goals and unleash your full potential.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Wanna to learn more? Go{" "}
            <Link
              href="/faq"
              className="font-semibold  text-center leading-6 text-royal hover:text-gold"
            >
              Here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
