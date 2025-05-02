package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.FormationFormateur;
import com.greenbuilding.formation.service.FormationFormateurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formation-formateurs")
@CrossOrigin("*")
public class FormationFormateurController {

    private final FormationFormateurService service;

    public FormationFormateurController(FormationFormateurService service) {
        this.service = service;
    }

    @PostMapping
    public FormationFormateur save(@RequestBody FormationFormateur formationFormateur) {
        return service.save(formationFormateur);
    }

    @PutMapping("/{id}")
    public FormationFormateur update(@PathVariable Long id, @RequestBody FormationFormateur formationFormateur) {
        formationFormateur.setId(id); 
        return service.save(formationFormateur);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping
    public List<FormationFormateur> findAll() {
        return service.findAll();
    }

    @GetMapping("/formation/{formationId}")
    public List<FormationFormateur> findByFormation(@PathVariable Long formationId) {
        return service.findByFormation(formationId);
    }

    @GetMapping("/formateur/{formateurId}")
    public List<FormationFormateur> findByFormateur(@PathVariable Long formateurId) {
        return service.findByFormateur(formateurId);
    }
}
