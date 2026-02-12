import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(task);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (foundTask) {
      return foundTask;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll() {
    return this.tasks;
  }

  update(task: TaskDto) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    if (index === -1) {
      throw new HttpException(
        `Task with id ${task.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      this.tasks[index] = task;
    }
  }

  delete(id: string) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.tasks.splice(index, 1);
    }
  }
}
