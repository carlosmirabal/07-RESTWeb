import {Request, Response} from "express";
import {prisma} from "../../data/postgres";
import {CreateTodoDto, UpdateTodoDto} from "../../domain/dtos";
import {CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo} from "../../domain";

const todos = [
  {id: 1, text: "Buy milk", completeAt: new Date()},
  {id: 2, text: "Buy eggs", completeAt: null},
  {id: 3, text: "Buy bread", completeAt: new Date()},
];

export class TodosController {
  // Dependency Injection
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({error}));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({error}));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodo] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({error});
      return;
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodo!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({error}));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    req.body.id = id;

    const [error, updatedTodoDto] = UpdateTodoDto.create({id, ...req.body});

    if (error) {
      res.status(400).json({error});
      return;
    }

    new UpdateTodo(this.todoRepository)
      .execute(updatedTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({error}));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({error}));
  };
}
