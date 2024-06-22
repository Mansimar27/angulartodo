import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'create',
  styleUrl: './create.component.css',
  templateUrl: './create.component.html',
  imports: [NgFor, NgIf, ReactiveFormsModule],
})

export class CreateComponent {

  todoForm: FormGroup;
  loading: Boolean = false;
  isFormError: Boolean = false;
  isDateError: Boolean = false;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {
    this.todoForm = this.fb.group({
      dueDate: ['', Validators.required],
      task: ['', Validators.required],
      priority: [false],
      status: [''],
    });
  }

  create = () => {
    if (this.todoForm.invalid) {
      this.isFormError = true;
    }
    if (this.todoForm.valid) {
      this.isFormError = false;
      const today = new Date();
      const dueDate = new Date(this.todoForm.value.dueDate);
      if (dueDate < today) {
        this.isDateError = true;
      }
      else {
        this.isDateError = false;
      }
    }
    if (!this.isDateError && this.todoForm.valid) {
      const { task, priority, dueDate, status } = this.todoForm.value;
      const date = new Date(dueDate);
      const timestamp = date.toISOString();
      const taskStatus = status || "Pending";
      this.loading = true;
      this.appService.createToDo(task, priority, taskStatus, timestamp).subscribe((res) => {
        if (res && res.success) {
          this.loading = false;
          this.router.navigate(["/home"]);
        }
      });
    }
  }

  goToHome = () => {
    this.router.navigate(['/home']);
  }
}
