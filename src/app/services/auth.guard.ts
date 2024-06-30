import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route,state ) => {

   if(inject(AuthService).isLoggedinGuard ){
    console.log("Access granted")
    return true;
   }
   else{
      console.log("access denied")
    inject(Router).navigate(['/login'])
    return false;
   }
  
};
