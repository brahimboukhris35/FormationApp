package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.FormationFormateur;
import java.util.List;

public interface FormationFormateurService {
    FormationFormateur save(FormationFormateur formationFormateur);

    void delete(Long id);

    List<FormationFormateur> findAll();

    List<FormationFormateur> findByFormation(Long formationId);

    List<FormationFormateur> findByFormateur(Long formateurId);
}
