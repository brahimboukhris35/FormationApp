package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Profil;
import com.greenbuilding.formation.service.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/profils")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    @PostMapping
    public ResponseEntity<Profil> createProfil(@RequestBody Profil profil) {
        Profil saved = profilService.save(profil);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> getProfilById(@PathVariable Long id) {
        Profil profil = profilService.getById(id);
        if (profil != null) {
            return ResponseEntity.ok(profil);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Profil>> getAllProfils() {
        return ResponseEntity.ok(profilService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfil(@PathVariable Long id) {
        profilService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profil> updateProfil(@PathVariable Long id, @RequestBody Profil profil) {
        profil.setId(id);
        Profil updatedProfil = profilService.save(profil);
        return ResponseEntity.ok(updatedProfil);
    }

}
