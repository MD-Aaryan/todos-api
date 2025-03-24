import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '@prisma/client';

interface TodoRequest extends Request {
  user: User;
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() request: TodoRequest) {
    createTodoDto.user_id = request.user.id;
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Req() request: TodoRequest) {
    return this.todosService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: TodoRequest) {
    return this.todosService.findOne(+id, request.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() request: TodoRequest,
  ) {
    return this.todosService.update(+id, updateTodoDto, request.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: TodoRequest) {
    return this.todosService.remove(+id, request.user.id);
  }
}
