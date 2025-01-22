import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  clickStyle:any;
  counter:number = 0;
  clickMe():void {
    this.clickStyle = {
      "border": "1px solid black",
      "fontWeight": "bold", 
      "padding": "10px 100px"
    }
    ;
    setTimeout(()=>{
      this.clickStyle = {};      
    }, 5000);
    setInterval(()=>{
      this.counter++;
    }, 1000);
  }
}
