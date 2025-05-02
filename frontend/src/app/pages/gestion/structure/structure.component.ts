import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormsModule,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

interface Structure {
  id?: number;
  libelle: string;
}


@Component({
  selector: 'app-structure',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NgClass],
  templateUrl: './structure.component.html',
  styleUrls: ['../../../app.component.scss']
})
export class StructureComponent {
  isSubmittedStructure=false;
  structures: Structure[] = [];
  structureForm: FormGroup;
  isEditingStructure = false;
  currentStructureId: number | null = null;

  constructor(private http: HttpClient,
    private fb: FormBuilder) {
    this.structureForm = this.fb.group({
      libelle: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.chargerStructures();
  }

  chargerStructures(): void {
    this.http.get<Structure[]>('http://localhost:8080/api/structures').subscribe({
      next: data => this.structures = data,
      error: err => console.error('Erreur chargement structures', err)
    });
  }

  onSubmitStructure(): void {
    this.isSubmittedStructure=true;
    if (this.structureForm.invalid) return;
    const structure: Structure = this.structureForm.value;

    if (this.isEditingStructure && this.currentStructureId) {
      this.http.put(`http://localhost:8080/api/structures/${this.currentStructureId}`, structure).subscribe({
        next: () => { this.chargerStructures(); this.resetStructureForm(); },
        error: err => console.error('Erreur modification structure', err)
      });
    } else {
      this.http.post('http://localhost:8080/api/structures', structure).subscribe({
        next: () => { this.chargerStructures(); this.resetStructureForm(); },
        error: err => console.error('Erreur ajout structure', err)
      });
    }
  }

  editerStructure(structure: Structure): void {
    this.isEditingStructure = true;
    this.currentStructureId = structure.id || null;
    this.structureForm.patchValue({ libelle: structure.libelle });
  }

  supprimerStructure(id: number): void {
    if (confirm('Supprimer cette structure ?')) {
      this.http.delete(`http://localhost:8080/api/structures/${id}`).subscribe({
        next: () => this.chargerStructures(),
        error: err => console.error('Erreur suppression structure', err)
      });
    }
  }

  resetStructureForm(): void {
    this.structureForm.reset();
    this.isEditingStructure = false;
    this.isSubmittedStructure=false;
    this.currentStructureId = null;
  }

  

}
