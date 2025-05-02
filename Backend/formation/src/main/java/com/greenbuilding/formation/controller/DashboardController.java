package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.repository.*;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private FormationRepository formationRepository;

    @Autowired
    private FormateurRepository formateurRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
    
        // Statistiques globales
        long totalUtilisateurs = utilisateurRepository.count();
        long totalFormations = formationRepository.count();
        long totalFormateurs = formateurRepository.count();
    
        stats.put("utilisateurs", totalUtilisateurs);
        stats.put("formations", totalFormations);
        stats.put("formateurs", totalFormateurs);
    
        // Répartition des utilisateurs par rôle
        List<Object[]> roleCounts = utilisateurRepository.countUtilisateursByRole();
        Map<String, Long> utilisateursParRole = new HashMap<>();
        for (Object[] row : roleCounts) {
            String roleName = (String) row[0];
            Long count = (Long) row[1];
            utilisateursParRole.put(roleName, count);
        }
        stats.put("utilisateursParRole", utilisateursParRole);
    
        // Répartition des formations par domaine
        List<Object[]> formationParDomaine = formationRepository.countFormationsByDomaine();
        Map<String, Long> formationsParDomaine = new HashMap<>();
        for (Object[] row : formationParDomaine) {
            String domaineName = (String) row[0];
            Long count = (Long) row[1];
            formationsParDomaine.put(domaineName, count);
        }
        stats.put("formationsParDomaine", formationsParDomaine);
    
        // Répartition des formateurs par type (Interne/Externe)
        List<Object[]> formateurParType = formateurRepository.countFormateursByType();
        Map<String, Long> formateursParType = new HashMap<>();
        for (Object[] row : formateurParType) {
            String type = (String) row[0];
            Long count = (Long) row[1];
            formateursParType.put(type, count);
        }
        stats.put("formateursParType", formateursParType);
    
        return ResponseEntity.ok(stats);
    }
    
}
