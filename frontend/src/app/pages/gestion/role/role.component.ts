import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';




interface Role {
  id?: number;
  nom: string;
}

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass],
  templateUrl: './role.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class RoleComponent {
  roles: Role[] = [];
  roleForm: FormGroup;
  isEditingRole = false;
  currentRoleId: number | null = null;
  isSubmittedRole=false;
  constructor(private http: HttpClient,
        private fb: FormBuilder) {
          this.roleForm = this.fb.group({
            nom: ['', Validators.required]
          });
  
    }

  // ============================= Rôles =======================================

  ngOnInit(): void {
    this.chargerRoles();
  }
  chargerRoles(): void {
    this.http.get<Role[]>('http://localhost:8080/api/roles').subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error('Erreur chargement rôles', err)
    });
  }

  onSubmitRole(): void {
    this.isSubmittedRole=true;
    if (this.roleForm.valid) {
    const role: Role = this.roleForm.value;
    console.log("test",role);

    if (this.isEditingRole && this.currentRoleId) {
      this.http.put<Role>(`http://localhost:8080/api/roles/${this.currentRoleId}`, role).subscribe({
        next: () => {
          this.chargerRoles();
          this.resetRoleForm();
        },
        error: (err) => console.error('Erreur modification rôle', err)
      });
    } else {
      this.http.post<Role>('http://localhost:8080/api/roles', role).subscribe({
        next: () => {
          console.log("test",role);
          this.chargerRoles();
          this.resetRoleForm();
        },
        error: (err) => console.error('Erreur ajout rôle', err)
      });
    }
  }
}

  editerRole(role: Role): void {
    this.isEditingRole = true;
    this.currentRoleId = role.id || null;
    this.roleForm.patchValue({ nom: role.nom });
  }

  supprimerRole(id: number): void {
    if (confirm('Supprimer ce rôle ?')) {
      this.http.delete(`http://localhost:8080/api/roles/${id}`).subscribe({
        next: () => this.chargerRoles(),
        error: (err) => console.error('Erreur suppression rôle', err)
      });
    }
  }

  resetRoleForm(): void {
    this.roleForm.reset();
    this.isSubmittedRole=false;
    this.isEditingRole = false;
    this.currentRoleId = null;
  }

}
