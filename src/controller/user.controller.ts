import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { AppDataSource } from "../database";
import { UserEntity } from "../entitiy/user.entity";
import { plainToClass } from "class-transformer";
import { UserLoginDto, UserRegisterDto } from "../dto/task/user.dto";
import { validate } from "class-validator";
import { JWT_SECRET } from "../config";

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   required:
 *     - name
 *     - email
 *     - password
 *   properties:
 *     name:
 *       type: string
 *     email:
 *       type: string
 *     password:
 *       type: string
 *   example:
 *     name: John Doe
 *     email: johndoe@example.com
 *     password: password123
 *  UserLoginDto:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *
 *  UserRegisterDto:
 *    type: object
 *    required:
 *       - name
 *       - email
 *       - password
 *    properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

class UserController {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/UserLoginDto'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/definitions/User'
   *       400:
   *         description: Invalid credentials
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal Server Error
   */
  async login(req: Request, res: Response) {
    try {
      const loginUserDto = plainToClass(UserLoginDto, req.body);
      const errors = await validate(loginUserDto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const { email, password } = loginUserDto;

      const user = await AppDataSource.getRepository(UserEntity).findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "user not found!" });
      }

      if (!(await argon2.verify(user.password, password))) {
        return res.status(400).json({ message: "incorrect password!" });
      }
      console.log(JWT_SECRET);

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET!);

      delete (user as { password?: string }).password;

      return res.status(200).json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }

  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register new user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/definitions/UserRegisterDto'
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 user:
   *                   $ref: '#/definitions/User'
   *       400:
   *         description: Bad request, validation error
   *       500:
   *         description: Internal Server Error
   */
  async register(req: Request, res: Response) {
    try {
      const userRegisterDto = plainToClass(UserRegisterDto, req.body);

      const errors = await validate(userRegisterDto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const { name, email, password } = userRegisterDto;

      const hashedPassword = await argon2.hash(password);

      const user = AppDataSource.getRepository(UserEntity).create({
        name,
        email,
        password: hashedPassword,
      });

      await AppDataSource.getRepository(UserEntity).save(user);

      return res.status(201).json({
        message: "user created successfully! Please login to continue.",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error while registering" });
    }
  }
}

export default new UserController();
