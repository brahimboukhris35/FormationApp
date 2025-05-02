package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface ParticipantService {
    Participant save(Participant participant);
    Participant getById(Long id);
    List<Participant> getAll();
    void delete(Long id);
    List<Participant> getByFormation(Long formationId);
}