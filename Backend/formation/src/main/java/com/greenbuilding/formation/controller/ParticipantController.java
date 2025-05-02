package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Participant;
import com.greenbuilding.formation.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @PostMapping
    public ResponseEntity<Participant> createParticipant(@RequestBody Participant participant) {
        Participant saved = participantService.save(participant);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participant> getParticipantById(@PathVariable Long id) {
        Participant participant = participantService.getById(id);
        if (participant != null) {
            return ResponseEntity.ok(participant);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Participant>> getAllParticipants() {
        return ResponseEntity.ok(participantService.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id) {
        participantService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/formation/{formationId}")
    public ResponseEntity<List<Participant>> getParticipantsByFormation(@PathVariable Long formationId) {
        return ResponseEntity.ok(participantService.getByFormation(formationId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Participant> updateParticipant(@PathVariable Long id,
            @RequestBody Participant participant) {
        participant.setId(id);
        return ResponseEntity.ok(participantService.save(participant));
    }
}
