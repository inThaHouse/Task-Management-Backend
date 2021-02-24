import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v1 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task-dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(taskId: string): Task {
    const existingTask = this.tasks.find((task) => task.id === taskId)

    if (!existingTask) {
      throw new NotFoundException(`Task ${taskId} is not found.`)
    }

    return existingTask
  }

  deleteTaskById(taskId: string): string {
    const existingTask = this.getTaskById(taskId)

    this.tasks = this.tasks.filter((task) => task.id !== existingTask.id)
    return 'Task has been deleted.'
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)

    return task
  }

  updateTaskStatus(taskId: string, taskStatus: TaskStatus) {
    const existingTask = this.getTaskById(taskId)

    if (existingTask) {
      existingTask.status = taskStatus
    }

    return existingTask
  }
}
