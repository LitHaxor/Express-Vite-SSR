// task.controller.ts
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { TaskEntity } from "../entitiy/task.entity";
import { TaskDto } from "../dto/task/task.dto";
import { AuthenticatedRequest } from "src/middlewares/jwtVerify.middleware";

/**
 * @swagger
 * definitions:
 *   Task:
 *     type: object
 *     required:
 *       - title
 *       - status
 *       - userId
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       status:
 *         type: string
 *         enum:
 *           - not_started
 *           - complete
 *       userId:
 *         type: string
 *     example:
 *       title: Task 1
 *       description: Description of Task 1
 *       status: not_started
 *
 */

class TaskController {
  /**
   * @swagger
   * /api/tasks:
   *   post:
   *     summary: Create a new task
   *     description: Create a new task with the provided details
   *     tags: [Task]
   *     security:
   *         - bearerAuth: []
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *            schema:
   *              $ref: '#/definitions/Task'
   *     responses:
   *       201:
   *         description: Task created successfully
   *       400:
   *         description: Invalid input data
   */
  async create(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;

      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const taskDto = plainToClass(TaskDto, req.body);
      const errors = await validate(taskDto);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      taskDto.userId = user?.id;

      const task = AppDataSource.getRepository(TaskEntity).create(taskDto);
      const result = await AppDataSource.getRepository(TaskEntity).save(task);

      return res.status(201).json(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error while creating task",
      });
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   put:
   *     summary: Update a task
   *     description: Update an existing task with the provided details
   *     security:
   *       - bearerAuth: []
   *     tags: [Task]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the task to update
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/definitions/Task'
   *     responses:
   *       200:
   *         description: Task updated successfully
   *       400:
   *         description: Invalid input data
   *       404:
   *         description: Task not found
   */

  async update(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;

      const task = await AppDataSource.getRepository(TaskEntity).findOne({
        where: {
          id: req.params.id,
          userId: user?.id,
        },
      });

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      const taskDto = plainToClass(TaskDto, req.body);
      const errors = await validate(taskDto, { skipMissingProperties: true });
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      AppDataSource.getRepository(TaskEntity).merge(task, taskDto);

      console.log(task);
      const result = await AppDataSource.getRepository(TaskEntity).save(task);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error while updating task",
      });
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   get:
   *     summary: Get a task
   *     description: Get task details by ID
   *     security:
   *         - bearerAuth: []
   *     tags: [Task]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the task to retrieve
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Task details retrieved successfully
   *       404:
   *         description: Task not found
   */

  async get(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;

      const task = await AppDataSource.getRepository(TaskEntity).findOne({
        where: {
          id: req.params.id,
          userId: user?.id,
        },
      });

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error while fetching task",
      });
    }
  }

  /**
   * @swagger
   * /api/tasks/{id}:
   *   delete:
   *     summary: Delete a task
   *     description: Delete an existing task by ID
   *     security:
   *       - bearerAuth: []
   *     tags: [Task]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: ID of the task to delete
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: Task deleted successfully
   *       404:
   *         description: Task not found
   */
  async delete(req: Request, res: Response) {
    try {
      const task = await AppDataSource.getRepository(TaskEntity).findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      const result = await AppDataSource.getRepository(TaskEntity).delete({
        id: req.params.id,
      });

      return res.status(204).json({
        message: "Task deleted successfully",
        result,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error while deleting task",
      });
    }
  }

  /**
   * @swagger
   * /api/tasks:
   *   get:
   *     summary: Get all tasks
   *     description: Get details of all tasks
   *     security:
   *        - bearerAuth: []
   *     tags: [Task]
   *     responses:
   *       200:
   *         description: Tasks retrieved successfully
   *       400:
   *         description: Error while fetching tasks
   */
  async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;

      const tasks = await AppDataSource.getRepository(TaskEntity).find({
        where: {
          userId: user?.id,
        },
      });

      return res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error while fetching tasks",
      });
    }
  }
}

export default new TaskController();
