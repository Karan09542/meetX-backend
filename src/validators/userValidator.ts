import { Request } from "express";
const { check, body } = require("express-validator");

export const userSignupValidator = [
  check("email").trim().isEmail().withMessage("Please provide a valid email"),

  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("confirmPassword")
    .trim()
    .custom((value: any, { req }: { req: Request }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),

  check("name").trim().notEmpty().withMessage("Name is required"),

  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
];

export const userLoginValidator = [
  body().custom((_value: any, { req }: { req: Request }) => {
    if (!req.body.email && !req.body.phoneNumber) {
      throw new Error("Either email or phone number is required");
    }
    return true;
  }),

  check("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("phoneNumber")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Please provide a valid phone number"),

  check("password").trim().notEmpty().withMessage("Password is required"),
];
export const validateAuthorizationHeader = [
  check("Authorization")
    .exists()
    .withMessage("Authorization header is required")
    .isString()
    .withMessage("Authorization header must be a string")
    .matches(/^Bearer\s[0-9a-zA-Z\-_\.]+$/)
    .withMessage("Authorization header must be in Bearer token format"),
];
