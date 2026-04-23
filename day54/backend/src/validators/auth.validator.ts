import z from "zod";
import { AUTH } from "../constants/auth.constant";
import { userService } from "../services/user.service";

export const authRegisterSchema = z.object({
  name: z.string().trim().min(1, {
    message: AUTH.ZOD_ERRORS.NAME,
  }),
  email: z
    .string()
    .trim()
    .min(1, {
      message: AUTH.ZOD_ERRORS.EMAIL,
    })
    .pipe(z.email(AUTH.ZOD_ERRORS.EMAIL_INVALID))
    .refine(
      async (email: string) => {
        const isUserExist = await userService.findEmailExist(email);
        return !isUserExist;
      },
      {
        message: AUTH.ZOD_ERRORS.EMAIL_EXIST,
      },
    ),
  password: z.string().trim().min(6, {
    message: AUTH.ZOD_ERRORS.PASSWORD,
  }),
});

export const authLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: AUTH.ZOD_ERRORS.EMAIL,
    })
    .pipe(z.email(AUTH.ZOD_ERRORS.EMAIL_INVALID)),
  password: z.string().trim().min(6, {
    message: AUTH.ZOD_ERRORS.PASSWORD,
  }),
});
