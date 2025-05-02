import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


interface Profil {
  id?: number;
  libelle: string;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass],
  templateUrl: './profil.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ProfilComponent {
  profils: Profil[] = [];
  profilForm: FormGroup;
  isEditingProfil = false;
  isSubmittedProfil=false;
  currentProfilId: number | null = null;
  
  constructor(private http: HttpClient,
      private fb: FormBuilder) {
      this.profilForm = this.fb.group({
        libelle: ['', Validators.required]
      });

  }

  ngOnInit(): void {
    this.chargerProfils();
  }


  chargerProfils(): void {
    this.http.get<Profil[]>('http://localhost:8080/api/profils').subscribe({
      next: data => this.profils = data,
      error: err => console.error('Erreur chargement profils', err)
    });
  }

  onSubmitProfil(): void {
    this.isSubmittedProfil=true;
    if (this.profilForm.valid) {
      const profil: Profil = this.profilForm.value;

      if (this.isEditingProfil && this.currentProfilId) {
        this.http.put(`http://localhost:8080/api/profils/${this.currentProfilId}`, profil).subscribe({
          next: () => { this.chargerProfils(); this.resetProfilForm(); },
          error: err => console.error('Erreur modification profil', err)
        });
      } else {
        this.http.post('http://localhost:8080/api/profils', profil).subscribe({
          next: () => { this.chargerProfils(); this.resetProfilForm(); },
          error: err => console.error('Erreur ajout profil', err)
        });
      }
    }
  }

  editerProfil(profil: Profil): void {
    this.isEditingProfil = true;
    this.currentProfilId = profil.id || null;
    this.profilForm.patchValue({ libelle: profil.libelle });
  }

  supprimerProfil(id: number): void {
    if (confirm('Supprimer ce profil ?')) {
      this.http.delete(`http://localhost:8080/api/profils/${id}`).subscribe({
        next: () => this.chargerProfils(),
        error: err => console.error('Erreur suppression profil', err)
      });
    }
  }

  resetProfilForm(): void {
    this.profilForm.reset();
    this.isEditingProfil = false;
    this.isSubmittedProfil=false;
    this.currentProfilId = null;
  }

}
