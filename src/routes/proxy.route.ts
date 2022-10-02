import express, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import asyncMiddleware from "../utils/asyncMiddleware";
import { InputValidateError } from "../errorHandlers/baseError";
import { sendRedashRequest } from "../services/redashRequest.service";

export const router = express.Router();

router.get(
  "/",
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new InputValidateError(errors.array());
      }
      const response = await sendRedashRequest(req);
      res.status(response.status).json(response.response);
    } catch (error) {
      next(error);
    }
  })
);
