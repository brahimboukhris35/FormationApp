package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Formation;
import com.greenbuilding.formation.service.FormationService;
import com.greenbuilding.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/formations")
public class FormationController {
    private final FormationRepository formationRepository;

    public FormationController(FormationRepository formationRepository) {
        this.formationRepository = formationRepository;
    }

    @Autowired
    private FormationService formationService;

    @PostMapping
    public Formation createFormation(@RequestBody Formation formation) {
        System.out.println("Domaine ID reçu : " + formation);
        return formationRepository.save(formation);
    }

    @GetMapping
    public ResponseEntity<List<Formation>> getAllFormations() {
        return ResponseEntity.ok(formationService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable Long id) {
        Formation formation = formationService.getById(id);
        if (formation != null) {
            return ResponseEntity.ok(formation);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable Long id) {
        formationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/domaine/{domaine}")
    public ResponseEntity<List<Formation>> getFormationsByDomaine(@PathVariable String domaine) {
        return ResponseEntity.ok(formationService.findByDomaine(domaine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable Long id, @RequestBody Formation updatedFormation) {
        Formation existingFormation = formationService.getById(id);
        if (existingFormation == null) {
            return ResponseEntity.notFound().build();
        }

        // Mise à jour des champs
        existingFormation.setTitre(updatedFormation.getTitre());
        existingFormation.setAnnee(updatedFormation.getAnnee());
        existingFormation.setDuree(updatedFormation.getDuree());
        existingFormation.setBudget(updatedFormation.getBudget());
        existingFormation.setDomaine(updatedFormation.getDomaine());

        Formation savedFormation = formationService.save(existingFormation);

        return ResponseEntity.ok(savedFormation);
    }

}
