import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined")
}