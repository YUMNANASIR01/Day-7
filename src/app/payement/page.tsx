
// src\app\payement\page.tsx

"use client"
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useSearchParams } from "next/navigation";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

function PaymentPage() {
    const searchParam = useSearchParams();
    const amount = searchParam.get("amount");
  return (
    <>
    <Elements  stripe={stripePromise} options={{mode: "payment", currency: "usd", amount: Number(amount)}} >
      <CheckoutForm amount= {Number(amount)}/>
    </Elements>
    </>
  )
}

export default PaymentPage









