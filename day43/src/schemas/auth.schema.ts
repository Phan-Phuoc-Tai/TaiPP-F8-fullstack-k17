import z from "zod";

export const registerUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .pipe(z.email("Email không đúng định dạng")),
  password: z.string().trim().min(6, "Mật khẩu phải từ 6 ký tự"),
  fullName: z.string().trim().min(1, "Tên không được để trống"),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không được để trống")
    .pipe(z.email("Email không đúng định dạng")),
  password: z.string().trim().min(6, "Mật khẩu phải từ 6 ký tự"),
});
