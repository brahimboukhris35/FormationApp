package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Domaine;
import com.greenbuilding.formation.service.DomaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/domaines")
public class DomaineController {

    @Autowired
    private DomaineService domaineService;

    @PostMapping
    public ResponseEntity<Domaine> createDomaine(@RequestBody Domaine domaine) {
        Domaine saved = domaineService.save(domaine);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Domaine> getDomaineById(@PathVariable Long id) {
        Domaine domaine = domaineService.getById(id);
        if (domaine != null) {
            return ResponseEntity.ok(domaine);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Domaine>> getAllDomaines() {
        return ResponseEntity.ok(domaineService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDomaine(@PathVariable Long id) {
        domaineService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domaine> updateDomaine(@PathVariable Long id, @RequestBody Domaine updatedDomaine) {
        Domaine existingDomaine = domaineService.getById(id);
        if (existingDomaine == null) {
            return ResponseEntity.notFound().build();
        }

        // Mise à jour du libellé
        existingDomaine.setLibelle(updatedDomaine.getLibelle());

        Domaine savedDomaine = domaineService.save(existingDomaine);

        return ResponseEntity.ok(savedDomaine);
    }

}
