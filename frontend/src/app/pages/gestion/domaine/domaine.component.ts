import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';



interface Domaine {
  id?: number;
  libelle: string;
}


@Component({
  selector: 'app-domaine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass],
  templateUrl: './domaine.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class DomaineComponent {
  isSubmittedDomaine=false;
  domaines: Domaine[] = [];
  domaineForm: FormGroup;
  isEditingDomaine = false;
  currentDomaineId: number | null = null;

  constructor(private http: HttpClient,
    private fb: FormBuilder,) {
      this.domaineForm = this.fb.group({
        libelle: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.chargerDomaines();
  }

  chargerDomaines(): void {
    this.http.get<Domaine[]>('http://localhost:8080/api/domaines').subscribe({
      next: data => this.domaines = data,
      error: err => console.error('Erreur chargement domaines', err)
    });
  }

  onSubmitDomaine(): void {
    this.isSubmittedDomaine=true;
    if (this.domaineForm.invalid) return;
    const domaine: Domaine = this.domaineForm.value;

    if (this.isEditingDomaine && this.currentDomaineId) {
      this.http.put(`http://localhost:8080/api/domaines/${this.currentDomaineId}`, domaine).subscribe({
        next: () => { this.chargerDomaines(); this.resetDomaineForm(); },
        error: err => console.error('Erreur modification domaine', err)
      });
    } else {
      this.http.post('http://localhost:8080/api/domaines', domaine).subscribe({
        next: () => { this.chargerDomaines(); this.resetDomaineForm(); },
        error: err => console.error('Erreur ajout domaine', err)
      });
    }
  }

  editerDomaine(domaine: Domaine): void {
    this.isEditingDomaine = true;
    this.currentDomaineId = domaine.id || null;
    this.domaineForm.patchValue({ libelle: domaine.libelle });
  }

  supprimerDomaine(id: number): void {
    if (confirm('Supprimer ce domaine ?')) {
      this.http.delete(`http://localhost:8080/api/domaines/${id}`).subscribe({
        next: () => this.chargerDomaines(),
        error: err => console.error('Erreur suppression domaine', err)
      });
    }
  }

  resetDomaineForm(): void {
    this.domaineForm.reset();
    this.isSubmittedDomaine=false;
    this.isEditingDomaine = false;
    this.currentDomaineId = null;
  }

  
}
