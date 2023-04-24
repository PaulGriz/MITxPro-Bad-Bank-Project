import { useEffect, useState } from "react";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import useGlobalStore from "../../store/global";

// 1.) Define a schema for the form
// First, define a custom type because the HTML input type="number" returns a string
// The zod preprocess function will convert the string to a number to remove this error
const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === "string") {
      return parseFloat(a);
    } else if (typeof a === "number") {
      return a;
    } else {
      return undefined;
    }
  }, schema);

// 1.2) Then, define the schema
const scheme = z.object({
  amount: numericString(
    z
      .number({ invalid_type_error: "Deposit Amount is Required " })
      .min(0, { message: "Amount must be greater than 0" })
  ),
});

// 2.) use z.infer to make a typescript interface
type DepositForm = z.infer<typeof scheme>;

const Deposit = () => {
  const [isDeposited, setIsDeposited] = useState(false);
  // 3.) use the useForm hook to register the form
  // Pass the <scheme> as type for the useForm hook
  // Configure the hook to use the zodResolver to validate the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty, isValid },
  } = useForm<DepositForm>({
    resolver: zodResolver(scheme),
  });

  useEffect(() => {
    // 4.) If the form is submitted successfully, reset the form
    reset({
      amount: "",
    });
  }, [isSubmitSuccessful, reset]);

  const { balance, setBalance } = useGlobalStore();

  const onSubmit = (data: FieldValues) => {
    const newBalance = balance + data.amount;
    setBalance(newBalance);
    setIsDeposited(true);
    setTimeout(() => {
      setIsDeposited(false);
    }, 1800);
  };

  return (
    <>
      <div className="flex w-full items-center justify-center mobile:mx-16 mobile:justify-start">
        <section className="w-full max-w-[24rem] rounded-lg border border-solid border-gray-200 bg-gray-50 p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col"
          >
            <p className="mb-3">
              Balance:{" "}
              {balance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>

            <label htmlFor="amount" className="mb-2 block">
              Deposit Amount:
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              autoComplete="off"
              id="amount"
              className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            />
            {/* 5.) Display the error message */}
            {errors.amount && (
              <p className="mb-2 text-red-500">
                {String(errors.amount?.message)}
              </p>
            )}
            {isDeposited && (
              <p className="mb-2 text-green-600">Deposit Successful!</p>
            )}
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className="mt-2 w-[45%] self-center rounded bg-blue-500 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-30"
            >
              Deposit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};
export default Deposit;
