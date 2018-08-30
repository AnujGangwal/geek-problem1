import { Component, OnInit } from '@angular/core';
import { FindFalconeService } from './find-falcone.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-find-falcone',
  templateUrl: './find-falcone.component.html',
  styleUrls: ['./find-falcone.component.css']
})
export class FindFalconeComponent implements OnInit {

  constructor(private service:FindFalconeService,private router: Router) { }
  planetsName;
  vehicleName;
  firstPlanet = "";
  secondPlanet = "";
  thirdPlanet = "";
  forthPlanet = "";
  firstVehicle = "";
  secondVehicle = "";
  thirdVehicle = "";
  forthVehicle = "";
  showError:boolean = false;
  errorMsg="";
  token;
  status:boolean = false;
  findIn;
  allPlanets;
  timeTaken=0;
  buttonText="Find Falcone"
  ngOnInit() {

    this.service.getPlanets().subscribe(response=>{
      this.planetsName = JSON.parse(response);
      this.allPlanets = JSON.parse(response);
      console.log("response...",this.planetsName);
      this.service.getVehicle().subscribe(data=>{
        this.vehicleName = JSON.parse(data);
        console.log("vehicle",this.vehicleName);
      },
    error=>{
      console.log("error",error);
    })
    },
    error=>{
      console.log("error",error);
    })
  }

  planetChange(value){
    console.log("value",value)
  for (var i = 0; i < this.planetsName.length; i++)
    if (this.planetsName[i]['name'] === value) { 
        this.planetsName.splice(i, 1);
        break;
    }


  }

  calculate(val){
    console.log("cal");
    let planet;
    let vehicle;
    if(val == 'firstV'){
       planet = this.allPlanets.filter(ele=> ele.name == this.firstPlanet);
       vehicle = this.vehicleName.filter(ele=>ele.name == this.firstVehicle);
    }else if(val == 'secondV'){
      planet = this.allPlanets.filter(ele=> ele.name == this.secondPlanet);
      vehicle = this.vehicleName.filter(ele=>ele.name == this.secondVehicle);
    }else if(val == 'thirdV'){
      planet = this.allPlanets.filter(ele=> ele.name == this.thirdPlanet);
      vehicle = this.vehicleName.filter(ele=>ele.name == this.thirdVehicle);
    }else if(val == 'forthV'){
      planet = this.allPlanets.filter(ele=> ele.name == this.forthPlanet);
      vehicle = this.vehicleName.filter(ele=>ele.name == this.forthVehicle);
    }
      let distanceOfPlanet = planet[0].distance;
      let maxDistanceOfRocket = vehicle[0].max_distance;
      let speed = vehicle[0].speed;
      let time = distanceOfPlanet/speed;
      this.timeTaken = this.timeTaken + time;
      // if(distanceOfPlanet <= maxDistanceOfRocket){
      //   let time = distanceOfPlanet/speed;
      //   this.timeTaken = this.timeTaken + time;
      //   this.showError = false;
      //   this.errorMsg = ""
      // }else{
      //   this.showError = true;
      //   this.errorMsg = "Vehicle is not sutable for this planet."
      // }
      console.log(":fist",planet);
      console.log("vehi",vehicle)
    
  }

  find(){
    this.service.getToken().subscribe(data=>{
      console.log("token",data['token']);
      this.token = data['token'];
      this.buttonText="Searching..."
      let Inputdata = {
        'token':this.token,
        'planet_names':[
          this.firstPlanet,
          this.secondPlanet,
          this.thirdPlanet,
          this.forthPlanet
        ],
        'vehicle_names':[
          this.firstVehicle,
          this.secondVehicle,
          this.thirdVehicle,
          this.forthVehicle
        ]
      }
      console.log("find input data",Inputdata)
      this.service.find(Inputdata).subscribe(responseData=>{
          console.log("find response",responseData)
        if(responseData['status'] == 'success'){
          this.status = true;
          this.findIn = responseData['planet_name'];
          this.service.timeTaken = this.timeTaken;
          this.service.planetFound = this.findIn;
          this.router.navigate(['/success']);
        }else{
          this.buttonText = "Find Falcone";
          this.showError = true;
          this.errorMsg="Fail!"
        }

      })
    })
  }
}
