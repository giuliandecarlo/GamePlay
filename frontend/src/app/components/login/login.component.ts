import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: any;
  password: any;
  err=false;

  constructor(private router: Router,
              private userService: UserService,
              private route: ActivatedRoute){}
  
  ngOnInit(){ //Funzione che viene eseguita subito
    this.userService.authState$.subscribe(authState=>{
      if(authState){
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/admin');
      }else{
        this.router.navigateByUrl('/login');
      }
    });
  }

  login(form: NgForm){
    const email = this.email;
    const password = this.password;

    if(form.invalid){return;} //Controllo di sicurezza se viene eliminato da browser developer tool

    form.reset();
    this.userService.loginUser(email,password);
    this.err=true; //Se dati errati attiva la sezione che mostra l'errore
  }
}
