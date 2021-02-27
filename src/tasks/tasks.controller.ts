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
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskEntity } from './task.entity'
import { TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

// value passed in decorator is the name of the path.
@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // handler
  // Note that handlers doesn't do any business logics.
  // They pass it off to the taskService and let them handle it.
  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.tasksService.getAllTasks(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) taskId: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(taskId)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.deleteTaskById(taskId)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) taskId: number,
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(taskId, taskStatus)
  }
}
