import { Injectable } from '@nestjs/common'
import { TaskStatus } from './task.model'
import { CreateTaskDto } from './dto/create-task-dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskRepository } from './task.repository'
import { TaskEntity } from './task.entity'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  getAllTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getAllTasks(filterDto)
  }

  getTaskById(taskId: number): Promise<TaskEntity> {
    return this.taskRepository.getTaskById(taskId)
  }

  deleteTaskById(taskId: number): Promise<string> {
    return this.taskRepository.deleteTaskById(taskId)
  }

  createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto)
  }

  updateTaskStatus(taskId: number, taskStatus: TaskStatus): Promise<string> {
    return this.taskRepository.updateTaskStatus(taskId, taskStatus)
  }
}
