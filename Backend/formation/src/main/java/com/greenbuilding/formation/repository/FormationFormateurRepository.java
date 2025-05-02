package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.FormationFormateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FormationFormateurRepository extends JpaRepository<FormationFormateur, Long> {
    List<FormationFormateur> findByFormationId(Long formationId);

    List<FormationFormateur> findByFormateurId(Long formateurId);
}