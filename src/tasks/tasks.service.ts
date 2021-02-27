import { Injectable } from '@nestjs/common'
import { TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task-dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { TaskEntity } from './task.entity'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'
import { User } from 'src/auth/user.entity'

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {}

  getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<TaskEntity[]> {
    return this.taskRepository.getAllTasks(filterDto, user)
  }

  getTaskById(taskId: number, user: User): Promise<TaskEntity> {
    return this.taskRepository.getTaskById(taskId, user)
  }

  deleteTaskById(taskId: number, user: User): Promise<string> {
    return this.taskRepository.deleteTaskById(taskId, user)
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  updateTaskStatus(taskId: number, taskStatus: TaskStatus, user: User): Promise<TaskEntity> {
    return this.taskRepository.updateTaskStatus(taskId, taskStatus, user)
  }
}
