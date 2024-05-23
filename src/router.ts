import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";
import {
   createProduct,
   deleteProduct,
   getProductById,
   getProducts,
   updateProduct,
   updateProductAvailability,
} from "./handlers/product";

const router = Router();

router.post(
   "/",
   body("name").notEmpty().withMessage("Product cant be empty"),
   body("price")
      .isNumeric()
      .withMessage("Product should be numeric")
      .notEmpty()
      .withMessage("Price can't be empty")
      .custom((value) => value > 0)
      .withMessage("Price not valid"),
   handleInputErrors,
   createProduct
);

router.get("/", getProducts);

router.get(
   "/:id",
   param("id").isInt().withMessage("Id not valid"),
   handleInputErrors,
   getProductById
);

router.put(
   "/:id",
   param("id").isInt().withMessage("Id not valid"),
   body("name").notEmpty().withMessage("Product cant be empty"),
   body("price")
      .isNumeric()
      .withMessage("Product should be numeric")
      .notEmpty()
      .withMessage("Price can't be empty")
      .custom((value) => value > 0)
      .withMessage("Price not valid"),
   body("availability").isBoolean().withMessage("Availability value not valid"),
   handleInputErrors,
   updateProduct
);

router.patch("/:id", 
   param("id").isInt().withMessage("Id not valid"),
   handleInputErrors,
   updateProductAvailability
)

router.delete("/:id",
   param("id").isInt().withMessage("Id not valid"),
   handleInputErrors,
   deleteProduct
)

export default router;
