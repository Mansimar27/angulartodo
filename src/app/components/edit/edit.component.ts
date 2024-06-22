import { NgFor, NgIf } from '@angular/common';
import { AppService } from '../../app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'edit',
  styleUrl: './edit.component.css',
  templateUrl: './edit.component.html',
  imports: [NgFor, NgIf, ReactiveFormsModule],
})

export class EditComponent implements OnInit {

  todoId: any;
  todoForm: FormGroup;
  loading: Boolean = true;
  isFormError: Boolean = false;
  isDateError: Boolean = false;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private activeRoute: ActivatedRoute) {
    this.todoForm = this.fb.group({
      dueDate: ['', Validators.required],
      task: ['', Validators.required],
      priority: [false],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.todoId = param['id'];
    });
    this.callGetToDo();
  }

  callGetToDo = () => {
    this.appService.getToDo(this.todoId).subscribe((res) => {
      if (res && res.data) {
        const { task, dueDate, priority, status } = res.data;
        const date = new Date(dueDate);
        const readableDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        this.todoForm.patchValue({
          task,
          status,
          priority,
          dueDate: readableDate,
        });
        this.loading = false;
      }
    });
  }

  update = () => {
    this.loading = true;
    if (this.todoForm.value.status && this.todoForm.value.status === "Done") {
      this.done();
    }
    if (this.todoForm.invalid) {
      this.loading = false;
      this.isFormError = true;
    }
    if (this.todoForm.valid) {
      this.loading = false;
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
    if (!this.isDateError) {
      const { task, priority, dueDate, status } = this.todoForm.value;
      const date = new Date(dueDate);
      const timestamp = date.toISOString();
      this.appService.updateToDo(this.todoId, task, priority, status, timestamp).subscribe((res) => {
        if (res && res.success) {
          this.loading = false;
          this.router.navigate(["/home"]);
        }
      });
    }
  }

  done = () => {
    this.loading = true;
    this.appService.deleteToDo(this.todoId).subscribe((res) => {
      if (res && res.success) {
        this.loading = false;
        this.router.navigate(['/home']);
      }
    });
  }

  goToHome = () => {
    this.router.navigate(['/home']);
  }
}
