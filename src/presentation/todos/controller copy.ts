import {Request, Response} from "express";
import {prisma} from "../../data/postgres";
import {CreateTodoDto, UpdateTodoDto} from "../../domain/dtos";
import {TodoRepository} from "../../domain";

const todos = [
  {id: 1, text: "Buy milk", completeAt: new Date()},
  {id: 2, text: "Buy eggs", completeAt: null},
  {id: 3, text: "Buy bread", completeAt: new Date()},
];

export class TodosController {
  // Dependency Injection
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findById(id);

      res.json(todo);
    } catch (error) {
      res.status(400).json({error});
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodo] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({error});
      return;
    }

    const todo = await this.todoRepository.create(createTodo!);
    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    req.body.id = id;

    const [error, updatedTodoDto] = UpdateTodoDto.create({id, ...req.body});
    console.log({id, ...req.body}, id);

    if (error) {
      res.status(400).json({error});
      return;
    }

    try {
      const todo = await this.todoRepository.updateById(updatedTodoDto!);
      res.json(todo);
    } catch (error) {
      res.status(400).json({error});
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await this.todoRepository.deleteBytId(id);

    res.json(todo);
  };
}
