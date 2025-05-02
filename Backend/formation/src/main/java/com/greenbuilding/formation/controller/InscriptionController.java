package com.greenbuilding.formation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.greenbuilding.formation.model.Inscription;
import com.greenbuilding.formation.service.InscriptionService;

import java.util.List;

@RestController
@RequestMapping("/api/inscriptions")
@CrossOrigin(origins = "http://localhost:4200")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    @PostMapping
    public Inscription create(@RequestBody Inscription inscription) {
        return inscriptionService.save(inscription);
    }

    @GetMapping
    public List<Inscription> getAll() {
        return inscriptionService.findAll();
    }

    @GetMapping("/{id}")
    public Inscription getById(@PathVariable Long id) {
        return inscriptionService.findById(id);
    }

    @PutMapping("/{id}")
    public Inscription update(@PathVariable Long id, @RequestBody Inscription inscription) {
        inscription.setId(id);
        return inscriptionService.save(inscription);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        inscriptionService.deleteById(id);
    }
}