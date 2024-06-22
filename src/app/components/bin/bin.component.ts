import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AppService } from '../../app.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'bin-root',
  styleUrl: './bin.component.css',
  templateUrl: './bin.component.html',
  providers: [AppService],
  imports: [NgFor, NgIf, HttpClientModule],
})

export class BinComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  list: any = [];
  loading: Boolean = true;

  ngOnInit(): void {
    this.callGetDeletedToDo();
  }

  callGetDeletedToDo = () => {
    this.appService.getDeletedToDo().subscribe((res) => {
      if (res && res.success) {
        this.list = res.todos;
        this.loading = false;
      }
    });
  }

  formatTask = (task: any) => {
    if (task.length < 35) {
      return task;
    }
    return `${task.slice(0, 35)}...`;
  }

  formatDate = (date: any) => {
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-US", options);
  }

  goToHome = () => {
    this.router.navigate(['/home']);
  }
}
