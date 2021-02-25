import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task-dto'
import { TaskEntity } from './task.entity'
import { TaskStatus } from './task.model'
import { NotFoundException } from '@nestjs/common'

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask({ title, description }: CreateTaskDto): Promise<TaskEntity> {
    const task = await this.save({
      title,
      description,
      status: TaskStatus.OPEN,
    })

    return task
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    const tasks = await this.find()

    return tasks
  }

  async getTaskById(taskId: number): Promise<TaskEntity> {
    const existingTask = await this.findOne(taskId)

    if (!existingTask) {
      throw new NotFoundException(`Task ${taskId} is not found.`)
    }

    return existingTask
  }

  async deleteTaskById(taskId: number): Promise<string> {
    const { affected } = await this.delete(taskId)

    if (!affected) {
      throw new NotFoundException('Task is not found.')
    }

    return 'Task has been deleted.'
  }

  async updateTaskStatus(
    taskId: number,
    taskStatus: TaskStatus,
  ): Promise<string> {
    const { affected } = await this.update(taskId, { status: taskStatus })

    if (!affected) {
      throw new NotFoundException('Task is not found.')
    }

    return 'Task has been updated.'
  }
}
