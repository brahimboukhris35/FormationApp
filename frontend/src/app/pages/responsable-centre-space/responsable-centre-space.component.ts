import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { FormGroup,FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartOptions, ChartData, PieController, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { DashboardComponent } from "../gestion/dashboard/dashboard.component";

@Component({
  selector: 'app-responsable-centre-space',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule,DashboardComponent],
  templateUrl: './responsable-centre-space.component.html',
  styleUrl: './responsable-centre-space.component.scss'
})
export class ResponsableCentreSpaceComponent {

  menuOuvert = false;

  constructor(private router: Router,
    private http: HttpClient,
     private fb: FormBuilder,
     public sessionService: SessionService) {}


  toggleMenu() {
    this.menuOuvert = !this.menuOuvert;
  }

  onLogout(): void {
    this.sessionService.clearUser();
    this.sessionService.clearRole();
    this.router.navigateByUrl('/home');
  }

  showSection(sectionId: string): void {
    this.sectionActive = sectionId;
    if (sectionId === 'dashboard') {
      this.dashboard();
    }
  }

  isActive(sectionId: string): boolean {
    return this.sectionActive === sectionId;
    
  }



    ngOnInit(): void {
      if(this.sessionService.getRoleId() == 8){
        this.dashboard();
      }else{
        this.router.navigateByUrl('/home'); 
      }

    }
  

  sectionActive: string = 'dashboard'; // Section par défaut
    stats: any = {};


  // Déclaration des types pour vos charts
  private roleChart: Chart<'pie', number[], string> | null = null;
  private formationChart: Chart<'pie', number[], string> | null = null;
  private formateurChart: Chart<'pie', number[], string> | null = null;
  
  dashboard(): void {
      Chart.register(PieController, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);
  
      if (typeof document !== 'undefined') {  
          this.http.get<any>('http://localhost:8080/api/dashboard/stats').subscribe({
              next: (data) => {
                  console.log('Dashboard data:', data);
                  this.stats = data;
  
                  // Détruire les anciens charts
                  [this.roleChart, this.formationChart, this.formateurChart].forEach(chart => {
                      if (chart) chart.destroy();
                  });
  
                  // Configuration type commune
                  const commonChartOptions: ChartOptions<'pie'> = {
                      responsive: false,
                      maintainAspectRatio: false,
                      plugins: {
                          legend: {
                              position: 'top',
                          }
                      },
                      layout: {
                          padding: { top: 50 , left: 0, right: 0, bottom: 50 }
                      }
                  };
  
                  // Helper function pour créer la configuration des charts
                  const createChartConfig = (labels: string[], data: number[], label: string, colors: string[]): ChartConfiguration<'pie', number[], string> => {
                      return {
                          type: 'pie',
                          data: {
                              labels: labels,
                              datasets: [{
                                  label: label,
                                  data: data,
                                  backgroundColor: colors,
                                  hoverOffset: 4
                              }]
                          },
                          options: commonChartOptions
                      };
                  };
  
                  // --------- Utilisateurs par rôle ----------
                  const roleCounts = data.utilisateursParRole;
                  const labelsRole = Object.keys(roleCounts);
                  const dataRole = Object.values(roleCounts).map(Number); // Conversion explicite en number
  
                  const ctxRole = document.getElementById('chartDomaine') as HTMLCanvasElement;
                  if (ctxRole) {
                      ctxRole.width = 400;
                      ctxRole.height = 400;
                      
                      this.roleChart = new Chart(ctxRole, createChartConfig(
                          labelsRole,
                          dataRole,
                          'Utilisateurs par rôle',
                          ['#3b82f6', '#10b981', '#f97316', '#e11d48']
                      ));
                  }
  
                  // --------- Formations par domaine ----------
                  const formationCounts = data.formationsParDomaine;
                  const labelsFormation = Object.keys(formationCounts);
                  const dataFormation = Object.values(formationCounts).map(Number); // Conversion explicite en number
  
                  const ctxFormation = document.getElementById('chartFormation') as HTMLCanvasElement;
                  if (ctxFormation) {
                      ctxFormation.width = 400;
                      ctxFormation.height = 400;
                      
                      this.formationChart = new Chart(ctxFormation, createChartConfig(
                          labelsFormation,
                          dataFormation,
                          'Formations par domaine',
                          ['#6366f1', '#22c55e', '#f59e0b', '#ef4444']
                      ));
                  }
  
                  // --------- Formateurs interne/externe ----------
                  const formateurCounts = data.formateursParType;
                  const labelsFormateur = Object.keys(formateurCounts);
                  const dataFormateur = Object.values(formateurCounts).map(Number); // Conversion explicite en number
  
                  const ctxFormateur = document.getElementById('chartFormateur') as HTMLCanvasElement;
                  if (ctxFormateur) {
                      ctxFormateur.width = 400;
                      ctxFormateur.height = 400;
                      
                      this.formateurChart = new Chart(ctxFormateur, createChartConfig(
                          labelsFormateur,
                          dataFormateur,
                          'Formateurs par type',
                          ['#0ea5e9', '#8b5cf6']
                      ));
                  }
              },
              error: (err) => {
                  console.error('Erreur lors de la récupération des statistiques', err);
              }
          });
      }
  }

}
