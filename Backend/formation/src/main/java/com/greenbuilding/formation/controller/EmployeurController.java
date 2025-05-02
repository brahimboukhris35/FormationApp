package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Employeur;
import com.greenbuilding.formation.service.EmployeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/employeurs")
public class EmployeurController {

    @Autowired
    private EmployeurService employeurService;

    @GetMapping
    public ResponseEntity<List<Employeur>> getAllEmployeurs() {
        return ResponseEntity.ok(employeurService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employeur> getEmployeurById(@PathVariable Long id) {
        Employeur employeur = employeurService.findById(id);
        if (employeur != null) {
            return ResponseEntity.ok(employeur);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Employeur> createEmployeur(@RequestBody Employeur employeur) {
        Employeur saved = employeurService.save(employeur);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employeur> updateEmployeur(@PathVariable Long id, @RequestBody Employeur employeur) {
        Employeur updated = employeurService.update(id, employeur);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeur(@PathVariable Long id) {
        employeurService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
