package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Participant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    List<Participant> findByFormationId(Long formationId);
}
