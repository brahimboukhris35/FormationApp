package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.FormationFormateur;
import com.greenbuilding.formation.repository.FormationFormateurRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class FormationFormateurServiceImpl implements FormationFormateurService {

    private final FormationFormateurRepository repository;

    public FormationFormateurServiceImpl(FormationFormateurRepository repository) {
        this.repository = repository;
    }

    @Override
    public FormationFormateur save(FormationFormateur formationFormateur) {
        return repository.save(formationFormateur);
    }

    @Override
    public List<FormationFormateur> findAll() {
        return repository.findAll();
    }

    @Override
    public List<FormationFormateur> findByFormation(Long formationId) {
        return repository.findByFormationId(formationId);
    }

    @Override
    public List<FormationFormateur> findByFormateur(Long formateurId) {
        return repository.findByFormateurId(formateurId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }

}