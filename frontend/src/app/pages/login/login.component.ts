import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { SessionService } from '../../services/session.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  constructor(private router: Router, private http: HttpClient,  private sessionService: SessionService,private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    // Vérifie si un utilisateur est déjà connecté
    if (this.sessionService.getUserId() !== null) {
      // Redirige vers la page d'accueil si l'utilisateur est déjà connecté
      this.router.navigateByUrl('/home');
    }
  }

  onRegister():void{
    console.log("Créer un compte cliqué !");
    this.router.navigate(['/home']).then(() => {
      this.viewportScroller.scrollToAnchor('Contact');
    });
  }
  
  Login(): void {
    console.log("Tentative de login: " , this.login , " / " , this.password);
    this.http.post<any>('http://localhost:8080/api/utilisateurs/login', {
      login: this.login,
      password: this.password
      
    }).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        console.log("Tentative de login: " , this.login , " / " , this.password);
        this.sessionService.setUserId(response.id); 
        this.sessionService.setRoleId(response.role.id); 
        this.router.navigateByUrl('/home');


      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        alert('Login ou mot de passe incorrect');
      }
    });
  }




}
