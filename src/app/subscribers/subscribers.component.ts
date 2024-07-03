import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent {


  subscribersArray!:any

  constructor( private  subService:SubscribersService){

    subService.loadData().subscribe( val =>{
      console.log(val)
      this.subscribersArray = val
    }) 

  }
  deleteSubscriber( id:any) {

    this.subService.deleteSubscriber(id); 
    




    }




   

}
