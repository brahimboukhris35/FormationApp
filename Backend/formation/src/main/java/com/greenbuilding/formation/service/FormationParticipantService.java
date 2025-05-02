package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.FormationParticipant;
import java.util.List;

public interface FormationParticipantService {
    FormationParticipant save(FormationParticipant formationParticipant);

    List<FormationParticipant> findAll();

    List<FormationParticipant> findByFormation(Long formationId);

    List<FormationParticipant> findByParticipant(Long participantId);

    void delete(Long id);
}