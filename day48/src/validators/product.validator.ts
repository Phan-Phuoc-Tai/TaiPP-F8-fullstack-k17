import z from "zod";

export const createProductValidator = z.object({
  name: z.string().trim().min(2, "Tên sản phẩm phải từ 2 ký tự"),
  desc: z.string().trim().optional(),
  price: z.number().nonnegative("Giá sản phẩm phải là số không âm"),
  stock: z.number().nonnegative("Số lượng hàng phải là số không âm").optional(),
  userId: z.number("UserID sai định dạng"),
});

export const updateProductValidator = z
  .object({
    name: z.string().trim().min(2, "Tên sản phẩm phải từ 2 ký tự").optional(),
    desc: z.string().trim().optional(),
    price: z
      .number()
      .nonnegative("Giá sản phẩm phải là số không âm")
      .optional(),
    stock: z
      .number()
      .nonnegative("Số lượng hàng phải là số không âm")
      .optional(),
    userId: z.number("UserID sai định dạng").optional(),
  })
  .superRefine((value, context) => {
    if (!Object.keys(value).length) {
      context.addIssue({
        code: "custom",
        message: "Body không được để trống",
        path: ["body"],
      });
    }
    if (value.userId?.toString.length) {
      context.addIssue({
        code: "custom",
        message: "UserId không được thay đổi",
        path: ["userId"],
      });
    }
  });
