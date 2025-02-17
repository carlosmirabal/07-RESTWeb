import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
    abstract getAll(): Promise<TodoEntity[]>;
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteBytId(id: number): Promise<TodoEntity>;
}