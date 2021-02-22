import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

// value passed in decorator is the name of the path.
@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // handler
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Task {
    return this.tasksService.getTaskById(taskId)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') taskId: string) {
    return this.tasksService.deleteTaskById(taskId)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status') taskStatus: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(taskId, taskStatus)
  }
}
