package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.FormationParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FormationParticipantRepository extends JpaRepository<FormationParticipant, Long> {
    List<FormationParticipant> findByFormationId(Long formationId);

    List<FormationParticipant> findByParticipantId(Long participantId);
}