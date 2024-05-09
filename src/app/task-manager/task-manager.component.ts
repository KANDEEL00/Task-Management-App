import { Component } from '@angular/core';

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
})
export class TaskManagerComponent {
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    name: '',
    description: '',
    dueDate: new Date(),
    completed: false,
  };
  editingTaskId: number | null = null;

  addTask() {
    if (this.newTask.name.trim()) {
      this.newTask.id = Date.now(); // Simple ID assignment
      this.tasks.push({ ...this.newTask });
      this.newTask = {
        id: 0,
        name: '',
        description: '',
        dueDate: new Date(),
        completed: false,
      };
    }
  }

  editTask(task: Task) {
    this.editingTaskId = task.id;
    this.newTask = { ...task };
  }

  updateTask() {
    const index = this.tasks.findIndex((t) => t.id === this.newTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.newTask };
      this.cancelEditing();
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
  }

  cancelEditing() {
    this.editingTaskId = null;
    this.newTask = {
      id: 0,
      name: '',
      description: '',
      dueDate: new Date(),
      completed: false,
    };
  }

  toggleTaskStatus(task: Task) {
    task.completed = !task.completed;
  }
}
