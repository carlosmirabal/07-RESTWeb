import {prisma} from "../../data/postgres";
import {CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto} from "../../domain";

/*
    Implementación de los metodos de la clase abstracta TodoDataSource.    
    Será el encargado de interactuar con la base de datos.
*/

export class TodoDatasourceImpl implements TodoDataSource {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(newTodo);
  }
  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({where: {id}});

    if (!todo) throw `Todo with id ${id} not found`;

    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: {id: updateTodoDto.id},
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }
  async deleteBytId(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({where: {id}});

    return TodoEntity.fromObject(deletedTodo);
  }
}
