'use client';

import { useActionState } from "react";

import { submitOrder } from "@/actions";

export const SubmitOrderForm = () => {
  const [state, dispatch] = useActionState(submitOrder, {
    errors: [],
    success: ''
  });

  console.log(state);

  return (
    <form onSubmit={dispatch}>
      <input
        type="submit"
        className="w-full mt-5 p-3 text-white uppercase bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        value="Confirmar Compra"
      />
    </form>
  )
}
