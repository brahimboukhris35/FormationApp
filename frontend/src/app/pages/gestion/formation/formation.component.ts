import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


interface Formation {
  id?: number;
  titre: string;
  annee: number;
  duree: number;
  budget: number;
  domaine?: Domaine; 
}
interface Domaine {
  id?: number;
  libelle: string;
}
interface Formateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  tel?: number;
  type: string;
  employeur?: Employeur;
}
interface Participant {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  tel?: string;
  structure?: Structure;
  profil?: Profil;
}
interface Employeur {
  id: number;
  nomemployeur: string;
}
interface Profil {
  id?: number;
  libelle: string;
}
interface Structure {
  id?: number;
  libelle: string;
} 


@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,FormsModule,NgClass],
  templateUrl: './formation.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class FormationComponent {
  domaines: Domaine[] = [];
  formations: Formation[] = [];
  structures: Structure[] = [];
  employeurs: Employeur[] = [];
  formateurs: Formateur[] = [];
  participants: Participant[] = [];
  formationForm: FormGroup;
  isEditingformation: boolean = false;
  currentFormationId: number | null = null;
  isEditingFormateur: boolean = false;
  currentFormateurId: number | null = null;
  isSubmittedFormation = false;
  isSubmittedParticipant = false;
  isSubmittedFormateur = false;
  isEditing = false;

  constructor(private http: HttpClient,
      private fb: FormBuilder) {
      this.formationForm = this.fb.group({
      titre: ['', Validators.required],
      annee: [new Date().getFullYear(), Validators.required],
      duree: [null, Validators.required],
      budget: [null, Validators.required],
      domaine: [null, Validators.required] 
    });

  }
  

  ngOnInit(): void {
    this.chargerDomaines();
    this.chargerFormations();
  }

  chargerFormateurs(): void {
    this.http.get<Formateur[]>('http://localhost:8080/api/formateurs').subscribe({
      next: (data) => this.formateurs = data,
      error: (err) => console.error('Erreur lors du chargement des formateurs', err)
    });
  }
  chargerParticipants(): void {
    this.http.get<Participant[]>('http://localhost:8080/api/participants').subscribe({
      next: (data) => this.participants = data,
      error: (err) => console.error('Erreur lors du chargement des participants', err)
    });
  }

  chargerDomaines(): void {
    this.http.get<Domaine[]>('http://localhost:8080/api/domaines').subscribe({
      next: data => this.domaines = data,
      error: err => console.error('Erreur chargement domaines', err)
    });
  }
  chargerEmployeurs(): void {
    this.http.get<Employeur[]>('http://localhost:8080/api/employeurs').subscribe({
      next: data => this.employeurs = data,
      error: err => console.error('Erreur chargement employeurs', err)
    });
  }
  chargerStructures(): void {
    this.http.get<Structure[]>('http://localhost:8080/api/structures').subscribe({
      next: data => this.structures = data,
      error: err => console.error('Erreur chargement structures', err)
    });
  }


  chargerFormations(): void {
    this.http.get<Formation[]>('http://localhost:8080/api/formations').subscribe({
      next: (data) => {
        console.log('Formations chargées:', data);
        this.formations = data;
      },
      error: (err) => console.error('Erreur lors du chargement des formations', err)
    });
  }
  
  onSubmitFormation(): void {
    this.isSubmittedFormation = true;
    if (this.formationForm.valid) {
      const formationData = {
        titre: this.formationForm.get("titre")?.value,
        annee: this.formationForm.get("annee")?.value,
        duree: this.formationForm.get("duree")?.value,
        budget: this.formationForm.get("budget")?.value,
        domaine: { id: this.formationForm.get("domaine")?.value} 
      };
  
  
      if (this.isEditing) {
        this.updateFormation(formationData);
      } else {
        this.createFormation(formationData);
      }
    }
  }
  
  createFormation(formationData: any): void {
    this.http.post('http://localhost:8080/api/formations', formationData).subscribe(() => {
      console.log('Données envoyées:', formationData);
      this.chargerFormations();
      this.resetFormFormation();
    });
  }
  
  updateFormation(formationData: any): void {
    if (this.currentFormationId !== null) {
      this.http.put(`http://localhost:8080/api/formations/${this.currentFormationId}`, formationData).subscribe(() => {
        this.chargerFormations();
        this.resetFormFormation();
      });
    }
  }
  
  resetFormFormation(): void {
    this.formationForm.reset({
      titre: '',
      annee: new Date().getFullYear(),
      duree: null,
      budget: null,
      idDomaine: null
    });
    this.isSubmittedFormation = false;
    this.isEditing = false;
    this.currentFormationId = null;
  }
  
  editFormation(formation: Formation): void {
    this.formationForm.setValue({
      titre: formation.titre,
      annee: formation.annee,
      duree: formation.duree,
      budget: formation.budget,
      domaine: formation.domaine?.id
    });
    this.isEditing = true;
    this.currentFormationId = formation.id || null;
  
  
  }
  


  showConfirmationModal = false;
  formationASupprimerId: number | null = null;

  deleteFormation(id: number): void {
    this.formationASupprimerId = id;
    this.showConfirmationModal = true;
  }

  confirmerSuppression(): void {
    if (this.formationASupprimerId !== null) {
      this.http.delete(`http://localhost:8080/api/formations/${this.formationASupprimerId}`).subscribe(() => {
        this.chargerFormations();
        this.formationASupprimerId = null;
        this.showConfirmationModal = false;
      });
    }
  }

  annulerSuppression(): void {
    this.formationASupprimerId = null;
    this.showConfirmationModal = false;
  }


  
//=============================== gestion assignement ======================

  showModal = false;
  showModalParticipant = false;
  showModalFormateur = false;
  idFormationSelectionnee: number | null = null;
  participantSelection: number | null = null;;  
  formateurSelection: number | null = null;;    
  participantsDisponibles: any[] = [];
  formateursDisponibles: any[] = [];


  filtrerParticipantsDisponibles() {
    this.http.get<any[]>(`http://localhost:8080/api/formation-participants/formation/${this.idFormationSelectionnee}`)
      .subscribe(affectes => {
        const idsAffectes = affectes.map(a => a.participant.id);
        this.participantsDisponibles = this.participants.filter(p => !idsAffectes.includes(p.id));
      });
  }
  filtrerFormateursDisponibles() {
    console.log(this.idFormationSelectionnee);
    this.http.get<any[]>(`http://localhost:8080/api/formation-formateurs/formation/${this.idFormationSelectionnee}`)
      .subscribe(affectes => {
        const idsAffectes = affectes.map(a => a.formateur.id);
        this.formateursDisponibles = this.formateurs.filter(f => !idsAffectes.includes(f.id));
      });
      console.log(this.formateursDisponibles);
  }



  ouvrirChoixAssignation(idFormation: number) {
    
    this.idFormationSelectionnee = idFormation;
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
  }

  ouvrirModalParticipant(){
    this.fermerModal();
    this.chargerParticipants();
    this.filtrerParticipantsDisponibles();
    this.showModalParticipant = true;
    this.isSubmittedParticipant = false;
  }

  fermerModalParticipant() {
    
    this.showModalParticipant = false;
  }

  ouvrirModalFormateur(){
    this.fermerModal();
    this.chargerFormateurs();
    this.filtrerFormateursDisponibles();
    this.showModalFormateur = true;
    this.isSubmittedFormateur = false;
    
  }

  fermerModalFormateur() {
    this.showModalFormateur = false;
  }

  assignerParticipant() {
    this.isSubmittedParticipant = true;
    if (this.participantSelection) {
      const body = {
        formation: { id: this.idFormationSelectionnee },
        participant: { id: this.participantSelection }
      };
      this.http.post('http://localhost:8080/api/formation-participants', body)
      .subscribe({
        next: (response) => {
          console.log('Participant assigné avec succès');
          this.fermerModalParticipant();
        },
        error: (error) => {
          console.error('Erreur lors de l\'assignation du participant', error);
        }
      });
      this.isSubmittedParticipant = false;
    }


  }

  assignerFormateur() {
    this.isSubmittedFormateur = true;
    console.log("test : ", this.isSubmittedFormateur);
    console.log("test : ", this.formateurSelection);
    if (this.formateurSelection) {
      const body = {
        formation: { id: this.idFormationSelectionnee },
        formateur: { id: this.formateurSelection }
      };


      this.http.post('http://localhost:8080/api/formation-formateurs', body)
        .subscribe({
          next: (response) => {
            console.log('Formateur assigné avec succès');
            this.fermerModalFormateur();
          },
          error: (error) => {
            console.error('Erreur lors de l\'assignation du formateur', error);
          }
        });
      this.isSubmittedFormateur = false;
        
    }
  

  }

  supprimerParticipantAssigne(idAssignement: number) {
    console.log('test ',idAssignement);
    if (confirm('Supprimer ce participant de la formation ?')) {
      this.http.delete(`http://localhost:8080/api/formation-participants/${idAssignement}`)
        .subscribe({
          next: () => {
            console.log('Participant désassigné');
            this.chargerParticipantsFormateurs(); // Refresh la liste
          },
          error: (error) => {
            console.error('Erreur suppression participant', error);
          }
        });
    }
  }

  supprimerFormateurAssigne(idAssignement: number) {
    console.log('test ',idAssignement);
    if (confirm('Supprimer ce formateur de la formation ?')) {
      this.http.delete(`http://localhost:8080/api/formation-formateurs/${idAssignement}`)
        .subscribe({
          next: () => {
            console.log('Formateur désassigné');
            this.chargerParticipantsFormateurs(); // Refresh la liste
          },
          error: (error) => {
            console.error('Erreur suppression formateur', error);
          }
        });
    }
  }



//=================== affichage des assignation ==================
  isModalAfficherOuvert = false;
  participantsAssignes: any[] = [];
  formateursAssignes: any[] = [];
  ouvrirModalAfficher(idFormation: number) {
    this.idFormationSelectionnee = idFormation;
    this.chargerParticipantsFormateurs(); // Charger les données au moment d'ouvrir
    this.isModalAfficherOuvert = true;

  }

  fermerModalAfficher() {
    this.isModalAfficherOuvert = false;
  }

  chargerParticipantsFormateurs() {
    if (!this.idFormationSelectionnee) {
      console.error("Aucune formation sélectionnée !");
      return;
    }

    // Charger les participants
    this.http.get<any[]>(`http://localhost:8080/api/formation-participants/formation/${this.idFormationSelectionnee}`)
    .subscribe({
      next: (data) => {
        this.participantsAssignes = data.map(fp => ({
          idAssignement: fp.id,        // conserver l'id de la table associative
          participant: fp.participant
        }));
      },
      error: (error) => {   
        console.error('Erreur chargement participants', error);
      }
    });

    // Charger les formateurs
    this.http.get<any[]>(`http://localhost:8080/api/formation-formateurs/formation/${this.idFormationSelectionnee}`)
    .subscribe({
      next: (data) => {
        console.log('formateurs :', data.map(ff => ff.id)); 
        this.formateursAssignes = data.map(ff => ({
          idAssignement: ff.id,        // conserver l'id de la table associative
          formateur: ff.formateur
        }));
      },
      error: (error) => {
        console.error('Erreur chargement formateurs', error);
      }
    });
  }

}
