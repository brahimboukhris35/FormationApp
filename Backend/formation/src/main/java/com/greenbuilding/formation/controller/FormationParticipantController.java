package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.FormationParticipant;
import com.greenbuilding.formation.service.FormationParticipantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formation-participants")
@CrossOrigin("*")
public class FormationParticipantController {

    private final FormationParticipantService service;

    public FormationParticipantController(FormationParticipantService service) {
        this.service = service;
    }

    @PostMapping
    public FormationParticipant save(@RequestBody FormationParticipant formationParticipant) {
        return service.save(formationParticipant);
    }

    @PutMapping("/{id}")
    public FormationParticipant update(@PathVariable Long id, @RequestBody FormationParticipant formationParticipant) {
        formationParticipant.setId(id);
        return service.save(formationParticipant);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping
    public List<FormationParticipant> findAll() {
        return service.findAll();
    }

    @GetMapping("/formation/{formationId}")
    public List<FormationParticipant> findByFormation(@PathVariable Long formationId) {
        return service.findByFormation(formationId);
    }

    @GetMapping("/participant/{participantId}")
    public List<FormationParticipant> findByParticipant(@PathVariable Long participantId) {
        return service.findByParticipant(participantId);
    }
}
