import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

/*
    Clase abstracta que define los métodos que debe implementar un datasource de TODOs.
*/
export abstract class TodoDataSource {
    abstract getAll(): Promise<TodoEntity[]>;
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteBytId(id: number): Promise<TodoEntity>;
}