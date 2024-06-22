import { Component } from '@angular/core';
import { AppService } from './app.service';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
  providers: [AppService],
  imports: [RouterOutlet, HttpClientModule],
})

export class AppComponent { }
