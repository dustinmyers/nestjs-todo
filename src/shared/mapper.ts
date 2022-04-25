import { TodoListDto } from 'src/todo/dto/rodoList.dto';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { TodoEntity } from 'src/todo/entity/todo.entity';

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description } = data;

  const todoDto = { id, name, description };
  return todoDto;
};
