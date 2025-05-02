package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Formateur;
import com.greenbuilding.formation.service.FormateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/formateurs")
public class FormateurController {

    @Autowired
    private FormateurService formateurService;

    @PostMapping
    public ResponseEntity<Formateur> createFormateur(@RequestBody Formateur formateur) {
        Formateur saved = formateurService.save(formateur);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formateur> getFormateurById(@PathVariable Long id) {
        Formateur formateur = formateurService.getById(id);
        if (formateur != null) {
            return ResponseEntity.ok(formateur);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Formateur>> getAllFormateurs() {
        return ResponseEntity.ok(formateurService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormateur(@PathVariable Long id) {
        formateurService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formateur> updateFormateur(@PathVariable Long id, @RequestBody Formateur formateur) {
        formateur.setId(id);
        Formateur updated = formateurService.save(formateur);
        return ResponseEntity.ok(updated);
    }
}
