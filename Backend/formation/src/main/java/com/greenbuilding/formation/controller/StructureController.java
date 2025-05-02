package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Structure;
import com.greenbuilding.formation.service.StructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/structures")
public class StructureController {

    @Autowired
    private StructureService structureService;

    @PostMapping
    public ResponseEntity<Structure> createStructure(@RequestBody Structure structure) {
        Structure saved = structureService.save(structure);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Structure> getStructureById(@PathVariable Long id) {
        Structure structure = structureService.getById(id);
        if (structure != null) {
            return ResponseEntity.ok(structure);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Structure>> getAllStructures() {
        return ResponseEntity.ok(structureService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStructure(@PathVariable Long id) {
        structureService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Structure> updateStructure(@PathVariable Long id, @RequestBody Structure structure) {
        structure.setId(id); // S'assurer que l'ID de l'objet est celui de l'URL
        Structure updated = structureService.save(structure); // Sauvegarder (ou mettre à jour) la structure
        return ResponseEntity.ok(updated); // Retourner la structure mise à jour
    }

}
