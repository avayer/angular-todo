import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {


  color: ThemePalette = 'primary';
  @ViewChild('dataForm', { static: true }) form: ElementRef;
  
  checked = false;
  completed: string[] = []
  noofCompleted = 0;
  todoList = [ 
    { name: 'item1' },
    { name: 'item2' },
    { name: 'item3' },
    { name: 'item4' }
  ];

  markCompleted(index, name) {
    this.todoList.splice(index, 1);
    this.completed.push(name);
    this.noofCompleted = this.completed.length / (this.todoList.length + this.completed.length) * 100;
  }

  keyDownFunction(event, todoItem: HTMLInputElement) {
    if (event.keyCode === 13) {
      this.todoList.push({name : todoItem.value});
      this.form.nativeElement.reset();
      this.noofCompleted = this.completed.length / (this.todoList.length + this.completed.length) * 100;
    }
  }

  deletePost(item, i) {
    this.todoList.splice(i, 1);
    console.log(this.todoList);
    this.noofCompleted = this.completed.length / (this.todoList.length + this.completed.length) * 100;
  }

  getTheme() {
    return this.checked ? '#121212' : 'white';
  }

  getColor() {
    return this.checked ? 'white' : '';
  }

  controls: FormArray;

  ngOnInit() {
    const toGroups = this.todoList.map(entity => {

      return new FormGroup({
        name: new FormControl(entity.name, Validators.required),
      });
    });
    this.controls = new FormArray(toGroups);

  }

  getControl(index: number, field: string): FormControl {
    return this.controls.at(index).get(field) as FormControl;
  }

  updateField(index: number, field: string) {
    console.log(index + ", " + field);
    const control = this.getControl(index, field);

    if (control.valid) {
      this.todoList = this.todoList.map((e, i) => {
        if (index === i) {
          return {
            ...e,
            [field]: control.value
          }
        }
        return e;
      })
    }
    console.log(this.todoList);
  }
 
  

}
