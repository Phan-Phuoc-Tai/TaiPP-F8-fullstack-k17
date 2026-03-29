import express from "express";
import { productController } from "../controllers/product.controller";
import { productMiddleware } from "../middlewares/product.middleware";
import { productValidate } from "../validators/product.validate";

const router = express.Router();

router.post(
  "/products",
  productMiddleware(productValidate),
  productController.create,
);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.find);
router.put("/products/:id", productController.update);
router.delete("/products/:id", productController.delete);
export default router;
