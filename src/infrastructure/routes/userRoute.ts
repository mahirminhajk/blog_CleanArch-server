import express from "express";

import UserController from "../../adapter/controllers/userController";

import UserUseCase from "../../useCases/userUseCase";

import UserRepository from "../repositories/userRepository";

import BcryptPassword from "../services/bcryptPassword";
import JWTToken from "../services/generateToken";
import Validator from "../services/validator";
import CustomError from "../services/customError";

//*service
const bcryptPassword = new BcryptPassword();
const jwt = new JWTToken();
const validator = new Validator();

//*repo
const userRepository = new UserRepository();
//* use case
const userUseCase = new UserUseCase(userRepository, bcryptPassword, jwt, validator);

//*controller
const controller = new UserController(userUseCase);

const router = express.Router();

router.post('/singup',(req, res, next) => controller.signUp(req, res, next));

export default router;