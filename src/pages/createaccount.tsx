import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import useGlobalStore from "../../store/global";

const scheme = z.object({
  name: z.string().min(3, { message: "Must be 3 or more Characters" }),
  email: z.string().min(5, { message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be greater than 8 Characters" }),
});
type LoginForm = z.infer<typeof scheme>;

function CreateAccount() {
  const [isLoginFormShown, setIsLoginFormShown] = useState(true); // Toggles between forms

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = useForm<LoginForm>({
    resolver: zodResolver(scheme),
  });

  // Clears form on successful submit
  useEffect(() => {
    reset({
      name: "",
      email: "",
      password: "",
    });
  }, [isSubmitSuccessful, reset]);

  // Zustand Global Store
  const { addUser, setCurrentUser, setLoginTrue } = useGlobalStore();

  // Form Submit Handler
  const onSubmit = ({ name, email, password }: FieldValues) => {
    setCurrentUser({ name, email, password });
    addUser({ name, email, password });
    setIsLoginFormShown(false);
    setLoginTrue();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <section className="body-font max-w-[800px] text-gray-600">
          <div className="container mx-auto flex flex-wrap items-center px-7 py-8">
            <div className="md:w-1/2 md:pr-16 lg:w-2/5 lg:pr-0 pr-0">
              <h1 className="title-font text-3xl font-medium text-gray-900">
                Paul Griz Bad Bank
              </h1>
              <p className="mt-4 leading-relaxed">
                Your money is definitely safe with us! (not FDIC insured)
              </p>
            </div>
            {isLoginFormShown ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="md:ml-auto md:mt-0 md:w-1/2 mt-8 flex w-full flex-col rounded-lg bg-gray-100 p-8"
              >
                <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
                  Create Account
                </h2>
                <div className="relative mb-4">
                  <label
                    htmlFor="full-name"
                    className="text-sm leading-7 text-gray-600"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    {...register("name")}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  {errors.name && (
                    <p className="text-red-500">
                      {String(errors.name?.message)}
                    </p>
                  )}
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="text-sm leading-7 text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  {errors.email && (
                    <p className="text-red-500">
                      {String(errors.email?.message)}
                    </p>
                  )}
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="text-sm leading-7 text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  {errors.password && (
                    <p className="text-red-500">
                      {String(errors.password?.message)}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!isDirty}
                  className="rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none disabled:opacity-30"
                >
                  Login
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  "You can trust our 0% guarantee."
                </p>
              </form>
            ) : (
              <div className="md:ml-auto md:mt-0 md:w-1/2 mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8">
                <h3 className="title-font mb-5 text-center text-lg font-medium text-green-600">
                  Success! Account Added.
                </h3>
                <button
                  type="submit"
                  className="rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                  onClick={() => {
                    setIsLoginFormShown(true);
                  }}
                >
                  Add another account
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default CreateAccount;
