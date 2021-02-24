import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task-dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

// value passed in decorator is the name of the path.
@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // handler
  // Note that handlers doesn't do any business logics.
  // They pass it off to the taskService and let them handle it.
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
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(taskId, taskStatus)
  }
}
