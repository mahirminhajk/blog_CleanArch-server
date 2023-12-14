import express from "express";

import UserController from "../../adapter/controllers/userController";

import UserUseCase from "../../useCases/userUseCase";

import UserRepository from "../repositories/userRepository";

import BcryptPassword from "../services/bcryptPassword";
import JWTToken from "../services/generateToken";
import Validator from "../services/validator";

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

//*auth
router.post('/singup', (req, res, next) => controller.signUp(req, res, next));
router.post('/singin', (req, res, next) => controller.login(req, res, next));
router.get('/logout', (req, res, next) => controller.logout(req, res, next));
router.get('/verify', (req, res, next) => controller.verifyToken(req, res, next));


export default router;