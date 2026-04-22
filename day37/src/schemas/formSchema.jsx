import * as z from "zod";

const contactInfoSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: "This field is required",
  }),
  lastName: z.string().trim().min(1, {
    message: "This field is required",
  }),
  age: z
    .string()
    .trim()
    .min(1, {
      message: "This field is required",
    })
    .pipe(
      z.coerce.number().positive({
        message: "Age must be a positive number",
      }),
    ),
});

const usernameSchema = z.object({
  username: z.string().trim().min(1, {
    message: "This field is required",
  }),
});

export const formSchema = {
  1: contactInfoSchema,
  2: usernameSchema,
};
