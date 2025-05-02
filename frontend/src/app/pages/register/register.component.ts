import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

    constructor(private router: Router,public sessionService: SessionService) {}
  
    Register():void{
      console.log("Créer un compte cliqué !");
      
    }
    ngOnInit(): void {
      // Vérifie si un utilisateur est déjà connecté
      if (this.sessionService.getUserId() !== null) {
        // Redirige vers la page d'accueil si l'utilisateur est déjà connecté
        this.router.navigateByUrl('/home');
      }
    }
    
    onLogin():void {
      console.log("Connexion cliquée !");
      this.router.navigateByUrl('/login'); 
    }

}
