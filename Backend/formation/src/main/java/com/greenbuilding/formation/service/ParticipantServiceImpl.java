package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Override
    public Participant save(Participant participant) {
        return participantRepository.save(participant);
    }

    @Override
    public Participant getById(Long id) {
        Optional<Participant> participant = participantRepository.findById(id);
        return participant.orElseThrow(() -> new RuntimeException("Participant non trouvé"));
    }

    @Override
    public List<Participant> getAll() {
        return participantRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        participantRepository.deleteById(id);
    }

    @Override
    public List<Participant> getByFormation(Long formationId) {
        return participantRepository.findByFormationId(formationId);
    }
}
