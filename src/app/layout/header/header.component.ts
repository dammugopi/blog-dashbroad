import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private authservice:AuthService){}

    userEmail:string=''
    isLoggedIn$!:Observable<boolean>;
    

  ngOnInit(): void {

    // Here  we used the local storge to get the data  we stored the data  in stored data using authservice   

    console.log(new BehaviorSubject(JSON.parse(localStorage.getItem('user')!)).asObservable().subscribe( (res)=> this.userEmail=res?.email));

     this.isLoggedIn$=this.authservice.isLoggedIn();
  }
   
  onLogout(){
    this.authservice.logOut();

  }
}
