import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { AppService } from '../../app.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'home-root',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
  providers: [AppService],
  imports: [NgFor, NgIf, HttpClientModule],
})

export class HomeComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

  list: any = [];

  ngOnInit(): void {
    this.callGetAllToDo();
  }

  callGetAllToDo = () => {
    console.log("Call Get All ToDo!");
    this.appService.getAllToDo().subscribe((res) => {
      if (res && res.success) {
        this.list = res.todos;
      }
    });
  }

  formatDate = (date: any) => {
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-US", options);
  }

  addNewToDo = () => {
    console.log("Add New ToDo!");
    this.router.navigate(['/create']);
  }

  goToTrashBin = () => {
    console.log("Go To Trash Bin!");
    this.router.navigate(['/bin']);
  }

  editToDo = () => {
    console.log("Edit ToDo!");
    this.router.navigate(['/edit']);
  }
}
