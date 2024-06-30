import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private authService:AuthService){}

onLoginSubmit(arg0: any) {
  // console.log(arg0);
  this.authService.login(arg0.value.email,arg0.value.password)
  



}

}
