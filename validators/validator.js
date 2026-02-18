import { z } from "zod";

// Strong Password Regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Name: only letters + spaces
const nameRegex = /^[A-Za-z\s]+$/;

// Phone: only numbers
const phoneRegex = /^[0-9]+$/;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid Email Address!" })
    .max(255, { message: "Email should not exceed 255 characters" }),

  password: z
    .string({ required_error: "Password is required!" })
    .regex(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    ),
});

export const signupSchema = loginSchema
  .extend({
    username: z
      .string({ required_error: "Name is required!" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(50, { message: "Name should not exceed 50 characters" })
      .regex(nameRegex, {
        message: "Name can only contain letters and spaces",
      }),

    phone: z
      .string({ required_error: "Phone is required!" })
      .trim()
      .regex(phoneRegex, {
        message: "Phone must contain only numbers",
      })
      .min(10, { message: "Phone must be at least 10 digits" })
      .max(15, { message: "Phone must not exceed 15 digits" }),

    confirmPassword: z.string({
      required_error: "Confirm Password is required!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"], // error confirmPassword field pe show hoga
  });
