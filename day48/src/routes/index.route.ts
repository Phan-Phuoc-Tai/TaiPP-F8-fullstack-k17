import express from "express";
import { homeController } from "../controllers/home.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";
import { productController } from "../controllers/product.controller";
import { productMiddleware } from "../middlewares/product.middleware";
import {
  createProductValidator,
  updateProductValidator,
} from "../validators/product.validator";
// import { validate } from "../middlewares/validate.middleware";
// import { createUserSchema } from "../validators/createUser.validate";

const router = express.Router();
router.use(authMiddleware);
router.get("/", homeController.index);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.find);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//====post========//
router.post("/users/:id/posts", userController.createPost);

//====product========//

router.post(
  "/products",
  productMiddleware(createProductValidator),
  productController.create,
);
router.get("/products", productController.findAll);
router.get("/products/:id", productController.find);
router.put(
  "/products/:id",
  productMiddleware(updateProductValidator),
  productController.update,
);
router.delete("/products/:id", productController.delete);
export default router;
