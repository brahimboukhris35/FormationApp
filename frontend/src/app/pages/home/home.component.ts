import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  menuOuvert = false;

  toggleMenu() {
    this.menuOuvert = !this.menuOuvert;
  }
  constructor(private router: Router,public sessionService: SessionService) {}

  onRegister():void{
    console.log("Créer un compte cliqué !");
    this.router.navigateByUrl('/register'); 
  }
  
  onLogin():void {
    console.log("Connexion cliquée !");
    this.router.navigateByUrl('/login'); 
  }
  onMyEspace(): void {
    if(this.sessionService.getRoleId() == 2){
      this.router.navigateByUrl('/admin'); 

    }else if(this.sessionService.getRoleId() == 4){
      this.router.navigateByUrl('/myspace');

    }else if(this.sessionService.getRoleId() == 8){
      this.router.navigateByUrl("/space");

    }else{
      this.router.navigateByUrl('/home'); 
    }
  }

  onLogout(): void {
    this.sessionService.clearUser();
    this.sessionService.clearRole();
    this.router.navigateByUrl('/home');
  }
}
