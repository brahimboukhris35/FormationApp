import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface Utilisateur {
  id?: number;
  login: string;
  password: string;
  role: Role;
}

interface Role {
  id?: number;
  nom: string;
}


@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass,FormsModule],
  templateUrl: './utilisateur.component.html',
  styleUrls: ['../../../app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup;
  roleForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];
  currentId: number | null = null;
  isEditing = false;
  isEditingRole = false;
  isSubmittedUtilisateur = false;
  isSubmittedRole = false;
  activeSection = 'users';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.utilisateurForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: [null, Validators.required]
    });

    this.roleForm = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerUtilisateurs();
    this.chargerRoles();
  }


  // ------------------ Gestion Utilisateurs ------------------
  chargerUtilisateurs(): void {
    this.http.get<any[]>('http://localhost:8080/api/utilisateurs').subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }

  onSubmitUtilisateur(): void {
    this.isSubmittedUtilisateur = true;

    if (this.utilisateurForm.valid) {
      const utilisateur = {
        login: this.utilisateurForm.get("login")?.value,
        password: this.utilisateurForm.get("password")?.value,
        role: { id: this.utilisateurForm.get("role")?.value }
      };

      if (this.isEditing && this.currentId) {
        this.http.put(`http://localhost:8080/api/utilisateurs/${this.currentId}`, utilisateur).subscribe({
          next: () => {
            this.chargerUtilisateurs();
            this.resetFormUtilisateur();
          },
          error: (err) => console.error('Erreur lors de la modification', err)
        });
      } else {
        this.http.post('http://localhost:8080/api/utilisateurs', utilisateur).subscribe({
          next: () => {
            this.chargerUtilisateurs();
            this.resetFormUtilisateur();
          },
          error: (err) => console.error('Erreur lors de l\'ajout', err)
        });
      }
    }
  }

  editerUtilisateur(utilisateur: any): void {
    this.isEditing = true;
    this.currentId = utilisateur.id || null;
    this.utilisateurForm.patchValue({
      login: utilisateur.login,
      password: utilisateur.password,
      role: utilisateur.role.id
    });
  }

  supprimerUtilisateur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.http.delete(`http://localhost:8080/api/utilisateurs/${id}`).subscribe({
        next: () => this.chargerUtilisateurs(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  resetFormUtilisateur(): void {
    this.utilisateurForm.reset();
    this.isSubmittedUtilisateur = false;
    this.isEditing = false;
    this.currentId = null;
  }

  // ------------------ charger les Roles ------------------
  chargerRoles(): void {
    this.http.get<any[]>('http://localhost:8080/api/roles').subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error('Erreur lors du chargement des rôles', err)
    });
  }

  
}
