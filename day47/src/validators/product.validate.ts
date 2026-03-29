import z from "zod";

const productValidate = z.object({
  price: z.string().trim().min(1, {
    message: "Giá sản phẩm không được để trống",
  }),
  name: z.string().trim().min(1, {
    message: "Tên sản phẩm không được để trống",
  }),
});

export { productValidate };
