import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";

const router = Router();

router.get("/", (req, res) => {
   res.send("Desde GET");
});

router.post(
   "/",

   body("name").notEmpty().withMessage("Product cant be empty"),

   body("price")
      .isNumeric()
      .notEmpty()
      .custom((value) => value > 0)
      .withMessage("Price not valid"),

   createProduct
);

export default router;
