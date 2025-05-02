package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomaineServiceImpl implements DomaineService {

    @Autowired
    private DomaineRepository domaineRepository;

    @Override
    public Domaine save(Domaine domaine) {
        return domaineRepository.save(domaine);
    }

    @Override
    public Domaine getById(Long id) {
        Optional<Domaine> domaine = domaineRepository.findById(id);
        return domaine.orElseThrow(() -> new RuntimeException("Domaine non trouvé"));
    }

    @Override
    public List<Domaine> getAll() {
        return domaineRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        domaineRepository.deleteById(id);
    }
}
