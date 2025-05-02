package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormationServiceImpl implements FormationService {

    @Autowired
    private FormationRepository formationRepository;

    @Override
    public Formation save(Formation formation) {
        return formationRepository.save(formation);
    }

    @Override
    public List<Formation> getAll() {
        return formationRepository.findAll();
    }

    @Override
    public Formation getById(Long id) {
        Optional<Formation> formation = formationRepository.findById(id);
        return formation.orElseThrow(() -> new RuntimeException("Formation non trouvée"));
    }

    @Override
    public void delete(Long id) {
        formationRepository.deleteById(id);
    }

    @Override
    public List<Formation> findByDomaine(String domaine) {
        return formationRepository.findByDomaineLibelle(domaine);
    }
}
