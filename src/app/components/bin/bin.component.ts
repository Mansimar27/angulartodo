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

  ngOnInit(): void {
    this.callGetDeletedToDo();
  }

  callGetDeletedToDo = () => {
    console.log("Call Get Deleted ToDo!");
    this.appService.getDeletedToDo().subscribe((res) => {
      if (res && res.success) {
        this.list = res.todos;
      }
    });
  }

  goToHome = () => {
    console.log("Go To Home!");
    this.router.navigate(['/home']);
  }
}
