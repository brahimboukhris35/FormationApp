package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.FormationParticipant;
import com.greenbuilding.formation.repository.FormationParticipantRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FormationParticipantServiceImpl implements FormationParticipantService {

    private final FormationParticipantRepository repository;

    public FormationParticipantServiceImpl(FormationParticipantRepository repository) {
        this.repository = repository;
    }

    @Override
    public FormationParticipant save(FormationParticipant formationParticipant) {
        return repository.save(formationParticipant);
    }

    @Override
    public List<FormationParticipant> findAll() {
        return repository.findAll();
    }

    @Override
    public List<FormationParticipant> findByFormation(Long formationId) {
        return repository.findByFormationId(formationId);
    }

    @Override
    public List<FormationParticipant> findByParticipant(Long participantId) {
        return repository.findByParticipantId(participantId);
    }
    @Override
    public void delete(Long id) {
        repository.deleteById(id); // ⚡ corriger ici : on utilise deleteById
    }
}