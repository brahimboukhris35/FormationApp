import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


interface Participant {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  tel?: string;
  structure?: Structure;
  profil?: Profil;
}

interface Structure {
  id?: number;
  libelle: string;
}

interface Profil {
  id?: number;
  libelle: string;
}

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass,FormsModule],
  templateUrl: './participant.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class ParticipantComponent {
  isEditingParticipant = false;
  participantForm: FormGroup;
  participants: Participant[] = [];
  structures:Structure[] = [];
  profils:Profil[] = [];
  currentParticipantId: number | null = null;
  isSubmittedParticipant = false;


  constructor(private http: HttpClient,
    private fb: FormBuilder) {
    this.participantForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: [null, Validators.required],
      structure: [null, Validators.required],
      profil: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.chargerStructures();
    this.chargerParticipants();
  }

  chargerStructures(): void {
    this.http.get<Structure[]>('http://localhost:8080/api/structures').subscribe({
      next: data => this.structures = data,
      error: err => console.error('Erreur chargement structures', err)
    });
  }
  chargerProfils(): void {
    this.http.get<Profil[]>('http://localhost:8080/api/profils').subscribe({
      next: data => this.profils = data,
      error: err => console.error('Erreur chargement profils', err)
    });
  }

  chargerParticipants(): void {
    this.http.get<Participant[]>('http://localhost:8080/api/participants').subscribe({
      next: (data) => this.participants = data,
      error: (err) => console.error('Erreur lors du chargement des participants', err)
    });
  }
  
  onSubmitParticipant(): void {
    this.isSubmittedParticipant = true;
    if (this.participantForm.valid) {
      const participantData = {
        nom: this.participantForm.get('nom')?.value,
        prenom: this.participantForm.get('prenom')?.value,
        email: this.participantForm.get('email')?.value,
        tel: this.participantForm.get('tel')?.value,
        structure: { id: this.participantForm.get('structure')?.value },
        profil: { id: this.participantForm.get('profil')?.value }
      };
  
      if (this.isEditingParticipant) {
        this.updateParticipant(participantData);
      } else {
        this.createParticipant(participantData);
      }
    }
  }
  
  createParticipant(participantData: any): void {
    this.http.post('http://localhost:8080/api/participants', participantData).subscribe(() => {
      this.chargerParticipants();
      this.resetParticipantForm();
    });
  }
  
  updateParticipant(participantData: any): void {
    if (this.currentParticipantId !== null) {
      this.http.put(`http://localhost:8080/api/participants/${this.currentParticipantId}`, participantData).subscribe(() => {
        this.chargerParticipants();
        this.resetParticipantForm();
      });
    }
  }
  
  editParticipant(participant: Participant): void {
    this.participantForm.setValue({
      nom: participant.nom,
      prenom: participant.prenom,
      email: participant.email,
      tel: participant.tel,
      structure: participant.structure?.id || null,
      profil: participant.profil?.id || null
    });
    this.isEditingParticipant = true;
    this.currentParticipantId = participant.id || null;
  }
  
  deleteParticipant(id: number): void {
    this.http.delete(`http://localhost:8080/api/participants/${id}`).subscribe(() => {
      this.chargerParticipants();
    });
  }
  
  resetParticipantForm(): void {
    this.participantForm.reset({
      nom: '',
      prenom: '',
      email: '',
      tel: null,
      structure: null,
      profil: null
    });
    this.isSubmittedParticipant = false;
    this.isEditingParticipant = false;
    this.currentParticipantId = null;
  }
  
  

}
