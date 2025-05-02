import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


interface Employeur {
  id: number;
  nomemployeur: string;
}

@Component({
  selector: 'app-employeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass],
  templateUrl: './employeur.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class EmployeurComponent {
  isSubmittedEmployeur = false;
  isEditingEmployeur = false;
  employeurs :Employeur[]=[];
  employeurForm: FormGroup;
  selectedEmployeur: any = null;
  currentEmployeurId: number | null = null;
  
  constructor(private http: HttpClient,
    private fb: FormBuilder) {
    this.employeurForm = this.fb.group({
      nomemployeur: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerEmployeurs();
  }

  chargerEmployeurs(): void {
    this.http.get<Employeur[]>('http://localhost:8080/api/employeurs').subscribe({
      next: data => this.employeurs = data,
      error: err => console.error('Erreur chargement employeurs', err)
    });
  }

  onSubmitEmployeur(): void {
    this.isSubmittedEmployeur = true;
    
    if (this.employeurForm.valid) {
      const employeur: Employeur = this.employeurForm.value;

      if (this.isEditingEmployeur && this.currentEmployeurId !== null) {
        this.http.put(`http://localhost:8080/api/employeurs/${this.currentEmployeurId}`, employeur).subscribe({
          next: () => { this.chargerEmployeurs(); this.resetEmployeurForm(); },
          error: err => console.error('Erreur modification employeur', err)
        });
      } else {
        this.http.post('http://localhost:8080/api/employeurs', employeur).subscribe({
          next: () => { this.chargerEmployeurs(); this.resetEmployeurForm(); },
          error: err => console.error('Erreur ajout employeur', err)
        });
      }
    }
  }

  editerEmployeur(employeur: Employeur): void {
    this.isEditingEmployeur = true;
    this.currentEmployeurId = employeur.id || null;
    this.employeurForm.patchValue({ nomemployeur: employeur.nomemployeur });
  }

  supprimerEmployeur(id: number): void {
    if (confirm('Supprimer cet employeur ?')) {
      this.http.delete(`http://localhost:8080/api/employeurs/${id}`).subscribe({
        next: () => this.chargerEmployeurs(),
        error: err => console.error('Erreur suppression employeur', err)
      });
    }
  }

  resetEmployeurForm(): void {
    this.employeurForm.reset();
    this.isEditingEmployeur = false;
    this.isSubmittedEmployeur = false;
    this.currentEmployeurId = null;
  }

}
