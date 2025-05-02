package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.Inscription;

import java.util.List;

public interface InscriptionService {
    Inscription save(Inscription inscription);

    List<Inscription> findAll();

    Inscription findById(Long  id);

    void deleteById(Long  id);
}
