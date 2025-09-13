    import Payment from "../models/payment.js"
    import { stripe } from "../utils/payment.js"

    if(!stripe){
        throw new Error("Stripe is not defined")
    }

    export const createPayment = async (req, res) => {
        try{
            const {price, trainingProgramId} = req.body
            if(!price || !trainingProgramId){
                return res.status(400).json({
                    msg: "Price and training program id are required",
                    success: false
                })
            }

            // Ensure absolute URLs for Stripe redirect (must include scheme)
            const rawFrontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const frontendUrl = rawFrontendUrl.startsWith('http://') || rawFrontendUrl.startsWith('https://')
                ? rawFrontendUrl
                : `http://${rawFrontendUrl}`;

            const payment = await Payment.create({
                price,
                trainingProgramId,
                userId: req.user._id
            })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Training Program - Week ${payment.week || 1}`,
                            description: `Dog training course enrollment`
                        },
                        unit_amount: price * 100, // Convert to paise
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${frontendUrl}/payment/cancel`,
                metadata: {
                    paymentId: payment._id.toString(),
                    userId: req.user._id.toString(),
                    trainingProgramId: trainingProgramId
                }
            })
            await Payment.findByIdAndUpdate(payment._id, {paymentId: session.id})
            return res.status(201).json({
                msg: "Payment created successfully",
                success: true,
                payment,
                session
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                msg: "Can't create payment",
                success: false
            })
        }
    }

    export  const getPayment = async (req, res) => {
        try{
            const {paymentId} = req.params
            const payment = await Payment.findById(paymentId)
            return res.status(200).json({
                msg: "Payment fetched successfully",
                success: true,
                payment
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                msg: "Can't get payment",
                success: false
            })
        }
    }

