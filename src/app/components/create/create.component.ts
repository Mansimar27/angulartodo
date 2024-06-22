import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AppService } from '../../app.service';

@Component({
  standalone: true,
  selector: 'create',
  styleUrl: './create.component.css',
  templateUrl: './create.component.html',
  imports: [NgFor, NgIf],
})

export class CreateComponent {

  constructor(private appService: AppService, private router: Router) { }

  create = () => {
    this.appService.createToDo("", "", "", "").subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
  }

  goToHome = () => {
    console.log("Go To Home!");
    this.router.navigate(['/home']);
  }
}
