import * as z from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .pipe(
      z.email({
        message: "Email isn't correct format",
      }),
    ),
  password: z.string().min(1, {
    message: "This field is required",
  }),
});
