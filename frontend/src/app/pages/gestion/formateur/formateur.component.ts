import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';



interface Formateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  tel?: number;
  type: string;
  employeur?: Employeur;
}
interface Employeur {
  id: number;
  nomemployeur: string;
}

@Component({
  selector: 'app-formateur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass,FormsModule],
  templateUrl: './formateur.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class FormateurComponent {
  formateurForm: FormGroup;
  formateurs: Formateur[] = [];
  employeurs :Employeur[]=[];
  isSubmittedFormateur = false;
  isEditingFormateur = false;
  currentFormateurId: number | null = null;
  constructor(private http: HttpClient,
  private fb: FormBuilder) {
    this.formateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: [null, Validators.required],
      type: ['', Validators.required],
      employeur: [null]
    });
  }
  ngOnInit(): void {
    this.chargerEmployeurs();
    this.chargerFormateurs();
  }

  chargerEmployeurs(): void {
    this.http.get<Employeur[]>('http://localhost:8080/api/employeurs').subscribe({
      next: data => this.employeurs = data,
      error: err => console.error('Erreur chargement employeurs', err)
    });
  }

  chargerFormateurs(): void {
    this.http.get<Formateur[]>('http://localhost:8080/api/formateurs').subscribe({
      next: (data) => this.formateurs = data,
      error: (err) => console.error('Erreur lors du chargement des formateurs', err)
    });
  }
  
  // Envoi du formulaire
  onSubmitFormateur(): void {
  this.isSubmittedFormateur = true;
  if (this.formateurForm.valid) {
    console.log("valide")
    const formateurData = {
      nom: this.formateurForm.get('nom')?.value,
      prenom: this.formateurForm.get('prenom')?.value,
      email: this.formateurForm.get('email')?.value,
      tel: this.formateurForm.get('tel')?.value,
      type: this.formateurForm.get('type')?.value,
      employeur: this.formateurForm.get('employeur')?.value === null
      ? null
      :  { id: this.formateurForm.get('employeur')?.value }
      
    };
    console.log(formateurData.employeur,"valide")
    if (this.isEditingFormateur) {
      this.updateFormateur(formateurData);
    } else {
      this.createFormateur(formateurData);
    }
  }
  }
  
  // Création
  createFormateur(formateurData: any): void {
  console.log(formateurData.employeur,"valide")
  this.http.post('http://localhost:8080/api/formateurs', formateurData).subscribe(() => {
    this.chargerFormateurs();
    this.resetFormateurForm();
  });
  }
  
  // Mise à jour
  updateFormateur(formateurData: any): void {
  if (this.currentFormateurId !== null) {
    this.http.put(`http://localhost:8080/api/formateurs/${this.currentFormateurId}`, formateurData).subscribe(() => {
      this.chargerFormateurs();
      this.resetFormateurForm();
    });
  }
  }
  
  // Remplir formulaire pour modification
  editFormateur(formateur: Formateur): void {
  this.formateurForm.setValue({
    nom: formateur.nom,
    prenom: formateur.prenom,
    email: formateur.email,
    tel: formateur.tel,
    type: formateur.type,
    employeur: formateur.employeur?.id || null
  });
  this.isEditingFormateur = true;
  this.currentFormateurId = formateur.id || null;
  }
  
  // Suppression
  deleteFormateur(id: number): void {
  this.http.delete(`http://localhost:8080/api/formateurs/${id}`).subscribe(() => {
    this.chargerFormateurs();
  });
  }
  
  // Reset formulaire
  resetFormateurForm(): void {
  this.formateurForm.reset({
    nom: '',
    prenom: '',
    email: '',
    tel: null,
    type: 'Interne',
    employeur: null
  });
  this.isSubmittedFormateur = false;
  this.isEditingFormateur = false;
  this.currentFormateurId = null;
  }

}
