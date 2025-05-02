package com.greenbuilding.formation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.greenbuilding.formation.model.Inscription;
import com.greenbuilding.formation.repository.InscriptionRepository;

import java.util.List;

@Service
public class InscriptionServiceImpl implements InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Override
    public Inscription save(Inscription inscription) {
        return inscriptionRepository.save(inscription);
    }

    @Override
    public List<Inscription> findAll() {
        return inscriptionRepository.findAll();
    }

    @Override
    public Inscription findById(Long  id) {
        return inscriptionRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long  id) {
        inscriptionRepository.deleteById(id);
    }
}