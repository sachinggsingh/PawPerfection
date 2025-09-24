import { z } from "zod";

export const userValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  googleId: z.string().optional(),

  name: z.string().optional(),

  refreshToken: z.string().nullable().optional(),
})
.refine(
  (data) => {
    // Ensure password is required when googleId is missing
    if (!data.googleId && !data.password) {
      return false;
    }
    return true;
  },
  {
    message: "Password is required if googleId is not provided",
    path: ["password"],
  }
);

export const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});
