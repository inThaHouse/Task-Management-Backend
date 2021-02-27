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
import { GetUser } from 'src/auth/get-user-decorator'
import { User } from 'src/auth/user.entity'
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
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getAllTasks(filterDto, user)
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.tasksService.getTaskById(taskId, user)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) taskId: number, @GetUser() user: User) {
    return this.tasksService.deleteTaskById(taskId, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) taskId: number,
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTaskStatus(taskId, taskStatus, user)
  }
}
