'use client';

import { FormEvent, useState } from "react";

import { useStore } from "@/zustand/store";

export const CouponForm = () => {
  const [couponName, setCouponName] = useState('');

  const coupon = useStore((state) => state.coupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const couponName = formData.get('coupon_name') as string;

    if (!couponName.length) return;

    await applyCoupon(couponName);
  }

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponName('');
  }

  return (
    <>
      <p className="py-5 font-bold border-t border-gray-300">Canjear Cupón</p>

      <form 
        className="flex" 
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="coupon_name"
          placeholder="Ingresa un cupón"
          className={`p-2 bg-gray-200 border-gray-300 w-full ${coupon.coupon.name ? 'opacity-75' : ''}`}
          disabled={!!couponName}
          value={couponName}
          onChange={(e) => {
            setCouponName(e.target.value);
          }}
        />
        
        {!coupon.coupon.name ? (
          <input
            type="submit"
            className="p-3 bg-green-400 font-bold hover:cursor-pointer"
            value='Canjear'
          />
        ) : (
          <button
            className="p-3 bg-red-400 font-bold hover:cursor-pointer"
            onClick={handleRemoveCoupon}
          >
            Remover
          </button>
        )}
      </form>

      {coupon.message ? (
        <p className="py-2 text-center text-sm font-bold">
          { coupon.message }
        </p>
      ) : null}
    </>
  )
}