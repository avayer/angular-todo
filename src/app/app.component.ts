import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('dataForm', { static: true }) form: ElementRef;
  
  noofCompleted = 0;
  todoList: string[] = [
    'Buy Veggies',
    'Clean Lawn',
    'Workout'
  ];

  completed: string[] = []

  markCompleted(item: string, index: number) {
    this.todoList.splice(index, 1);
    this.completed.push(item);
    this.noofCompleted = this.completed.length / (this.todoList.length + this.completed.length) * 100;
  }

  keyDownFunction(event, todoItem: HTMLInputElement) {
    if (event.keyCode === 13) {
      this.todoList.push(todoItem.value);
      this.form.nativeElement.reset();
    }
  }

}
