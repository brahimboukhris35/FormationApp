package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeurServiceImpl implements EmployeurService {

    private final EmployeurRepository employeurRepository;

    public EmployeurServiceImpl(EmployeurRepository employeurRepository) {
        this.employeurRepository = employeurRepository;
    }

    @Override
    public List<Employeur> findAll() {
        return employeurRepository.findAll();
    }

    @Override
    public Employeur findById(Long id) {
        return employeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employeur introuvable avec id " + id));
    }

    @Override
    public Employeur save(Employeur employeur) {
        return employeurRepository.save(employeur);
    }

    @Override
    public Employeur update(Long id, Employeur employeur) {
        Employeur existing = findById(id);
        existing.setNomemployeur(employeur.getNomemployeur());
        return employeurRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        employeurRepository.deleteById(id);
    }
}
