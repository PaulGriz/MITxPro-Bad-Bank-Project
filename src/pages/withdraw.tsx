import { useEffect, useState } from "react";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import useGlobalStore from "../../store/global";

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

const scheme = z.object({
  amount: numericString(
    z
      .number({ invalid_type_error: "Deposit Amount is Required " })
      .min(0, { message: "Amount must be greater than 0" })
  ),
});

type WithdrawForm = z.infer<typeof scheme>;

const Withdraw = () => {
  const [balanceError, setBalanceError] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isDirty, isValid },
  } = useForm<WithdrawForm>({
    resolver: zodResolver(scheme),
  });

  useEffect(() => {
    reset({
      amount: "",
    });
  }, [isSubmitSuccessful, reset]);

  const { balance, setBalance } = useGlobalStore();

  const onSubmit = (data: FieldValues) => {
    if (data.amount > balance) {
      setBalanceError(true);
      return;
    }
    setBalanceError(false);
    const newBalance = balance - data.amount;
    setBalance(newBalance);
    setIsWithdrawn(true);
    setTimeout(() => {
      setIsWithdrawn(false);
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
              Withdraw Amount:
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              autoComplete="off"
              id="amount"
              className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            />

            {errors.amount && (
              <p className="mb-2 text-red-500">
                {String(errors.amount?.message)}
              </p>
            )}
            {balanceError && (
              <p className="mb-2 text-red-500">
                You do not have enough funds to withdraw this amount
              </p>
            )}
            {isWithdrawn && (
              <p className="mb-2 text-green-600">Withdraw Successful!</p>
            )}
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className="mt-2 w-[45%] self-center rounded bg-blue-500 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-30"
            >
              Withdraw
            </button>
          </form>
        </section>
      </div>
    </>
  );
};
export default Withdraw;
