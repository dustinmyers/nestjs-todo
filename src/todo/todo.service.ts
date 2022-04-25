import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { todos } from 'src/mock.todos.mock';
import { TodoEntity } from './entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { toPromise } from 'src/shared/utils';
import { toTodoDto } from 'src/shared/mapper';
import { TodoListDto } from './dto/rodoList.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getAllTodos(): Promise<TodoDto[]> {
    return todos.map((todo) => toTodoDto(todo));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const { name, description } = createTodoDto;

    const todo: TodoEntity = {
      id: uuid(),
      name,
      description,
    };

    this.todos.push(todo);
    return toPromise(toTodoDto(todo));
  }

  // async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
  //   const { name, description } = todoDto;

  //   let todo: TodoEntity = this.todos.find((todo) => todo.id === id);

  //   if (!todo) {
  //     throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
  //   }

  //   todo = {
  //     id,
  //     name,
  //     description,
  //   };
  // }
}
