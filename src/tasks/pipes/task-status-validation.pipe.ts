import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task.model'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  // transform method is a requirement for pipes.
  // Note to self: Would there be a better way to implement this?
  transform(value: string | TaskStatus) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value as TaskStatus)) {
      throw new BadRequestException(`${value} is an invalid status.`)
    }

    return value
  }

  private isStatusValid(status: TaskStatus): boolean {
    const index = this.allowedStatuses.indexOf(status)

    return index !== -1
  }
}
