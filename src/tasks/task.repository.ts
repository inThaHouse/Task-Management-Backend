import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task-dto'
import { TaskEntity } from './task.entity'
import { TaskStatus } from './task.model'
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'
import { User } from 'src/auth/user.entity'

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  private logger = new Logger('TaskRepository')

  async createTask({ title, description }: CreateTaskDto, user: User): Promise<TaskEntity> {
    try {
      const task = await this.save({
        title,
        description,
        status: TaskStatus.OPEN,
        userId: user.id,
      })

      return task
    } catch (error) {
      this.logger.error(
        `User ${user.username} couldn't create a task. Data : ${JSON.stringify({
          title,
          description,
        })}`,
        error.stack,
      )
      throw new InternalServerErrorException()
    }
  }

  async getAllTasks({ status, search }: GetTasksFilterDto, user: User): Promise<TaskEntity[]> {
    const query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    const queryStatement = '(task.title LIKE :search OR task.description LIKE :search)'

    if (search) {
      query.andWhere(queryStatement, {
        search: `%${search}%`,
      })
    }

    try {
      const tasks = await query.getMany()
      return tasks
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}. Filters: ${JSON.stringify({
          status,
          search,
        })}`,
        error.stack,
      )
      throw new InternalServerErrorException()
    }
  }

  async getTaskById(taskId: number, user: User): Promise<TaskEntity> {
    const existingTask = await this.findOne({ where: { id: taskId, userId: user.id } })

    if (!existingTask) {
      throw new NotFoundException(`Task ${taskId} is not found.`)
    }

    return existingTask
  }

  async deleteTaskById(taskId: number, user: User): Promise<string> {
    const { affected } = await this.delete({ id: taskId, userId: user.id })

    if (!affected) {
      throw new NotFoundException('Task is not found.')
    }

    return 'Task has been deleted.'
  }

  async updateTaskStatus(taskId: number, taskStatus: TaskStatus, user: User): Promise<TaskEntity> {
    const existingTask = await this.getTaskById(taskId, user)

    if (!existingTask) {
      throw new NotFoundException('Task is not found.')
    }

    existingTask.status = taskStatus

    await existingTask.save()

    return existingTask
  }
}
