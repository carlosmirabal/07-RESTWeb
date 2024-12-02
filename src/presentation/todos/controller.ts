import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
    { id: 1, text: 'Buy milk', completeAt: new Date() },
    { id: 2, text: 'Buy eggs', completeAt: null },
    { id: 3, text: 'Buy bread', completeAt: new Date() }
]

export class TodosController {

    // Dependency Injection
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();

        res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id: ${req.params.id}` })
            return;
        }

        const todo = await prisma.todo.findUnique({ where: { id } })

        todo
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodo] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        const newTodo = await prisma.todo.create({
            data: createTodo!
        })

        res.json(newTodo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updatedTodoDto] = UpdateTodoDto.create({ id, ...req.body });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const updatedTodo = await prisma.todo.update({
            data: updatedTodoDto!.values,
            where: { id }
        })

        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ error: `Invalid id: ${req.params.id}` })
            return;
        }

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found` });
            return;
        }

        const deletedTodo = await prisma.todo.delete({ where: { id } })

        res.json({ todo, deletedTodo });
    }

}