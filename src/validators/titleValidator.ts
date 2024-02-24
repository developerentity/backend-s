import { body } from "express-validator";

export const titleValidator = body("title")
  .trim()
  .isLength({
    min: 3,
    max: 10,
  })
  .withMessage("Title length should be from 3 to 10 symbols");
