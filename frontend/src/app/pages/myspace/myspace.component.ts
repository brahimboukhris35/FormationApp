import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup,FormsModule , FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { FormationComponent } from '../../pages/gestion/formation/formation.component';
import { FormateurComponent } from '../../pages/gestion/formateur/formateur.component';
import { ParticipantComponent } from '../../pages/gestion/participant/participant.component';


@Component({
  selector: 'app-myspace',
  standalone: true,
    imports: [
      CommonModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      FormationComponent,
      FormateurComponent,
      ParticipantComponent
  ],
  templateUrl: './myspace.component.html',
  styleUrls: ['./myspace.component.scss']
})
export class MyspaceComponent implements OnInit {

  menuOuvert = false;
  sectionActive: string = 'formation';

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {
    if(this.sessionService.getRoleId() != 4){
      this.router.navigateByUrl('/home'); 
    }
  }

  toggleMenu(): void {
    this.menuOuvert = !this.menuOuvert;
  }

  onLogout(): void {
    this.sessionService.clearUser();
    this.sessionService.clearRole();
    this.router.navigateByUrl('/home');
  }

  showSection(sectionId: string): void {
    this.sectionActive = sectionId;
  }

  isActive(sectionId: string): boolean {
    return this.sectionActive === sectionId;
  }

}
