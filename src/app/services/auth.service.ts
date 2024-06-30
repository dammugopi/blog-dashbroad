import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn :BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  isLoggedinGuard:boolean=false

  constructor( private afAuth:AngularFireAuth,private toastr:ToastrService , private router:Router) { }

  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then(logRef => {
      this.toastr.success("Logged In SuccessFully..!")
      this.loadUser(); 

      this.loggedIn.next(true);
      this.isLoggedinGuard=true;
      
      this.router.navigate(['/'])
    }).catch(function(e) {   let error = e.message;
      alert('Invlaid Password')})
  }


  loadUser(){
    // saving data in localStorage
    this.afAuth.authState.subscribe(user => {
      // console.log(JSON.parse(JSON.stringify(user)));
      window.localStorage.setItem('user',  JSON.stringify(user))
    })
  }


  logOut(){ 
    // user logout from apage
    this.afAuth.signOut().then(() =>
    this.toastr.success("user Logged Out SUccessfully"))
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


  // we need the LoggedOut Variable so we return it in method and use that method

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }


}
