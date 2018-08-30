import { Component, OnInit } from '@angular/core';
import { FindFalconeService } from '../find-falcone/find-falcone.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  timeTaken;
  planetFound;
  constructor(private service:FindFalconeService,private router:Router) { }

  ngOnInit() {
    this.timeTaken = this.service.timeTaken;
    this.planetFound = this.service.planetFound;
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
