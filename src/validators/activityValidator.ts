const { check } = require("express-validator");

export const activityValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  check("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  check("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  check("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format (expected ISO8601)"),

  check("time")
    .trim()
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Time must be in HH:mm format (24-hour)"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["cricket", "movies", "football"])
    .withMessage("Category must be one of: cricket, movies, football"),
];
