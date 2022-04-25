import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoListDto } from './dto/rodoList.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<TodoListDto> {
    const todos = await this.todoService.getAllTodos();
    return toPromise({ todos });
  }

  @Get()
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() todoDto: TodoDto,
  // ): Promise<TodoDto> {
  //   return await this.todoService.updateTodo(todoDto);
  // }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoDto> {
    return await this.todoService.createTodo(createTodoDto);
  }

  // @Delete(':id')
  // async destroy(@Param('id') id: string): Promise<TodoDto> {
  //   return await this.todoService.destroyTodo(id);
  // }
}
