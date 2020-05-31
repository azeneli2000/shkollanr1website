import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Observable } from 'rxjs';
import { disableDebugTools } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 user : Observable<firebase.User>;;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 

    this.user = afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth
      
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['admin']);
       localStorage.setItem('user',value.user.email);
      })
      .catch(err => {
        console.log('Gabim:',err.message);
        //this.router.navigate(['login']);

      });
  }
// async register(email: string, password: string) {
//   var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
// }

async logout(){
  await this.afAuth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['login']);
  
}
get isLoggedIn(): boolean {
  const  user  =  (localStorage.getItem('user'));
  return  user  !==  null;
}
// async  loginWithGoogle(){
//   await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
//   this.router.navigate(['admin/list']);
// }
}
