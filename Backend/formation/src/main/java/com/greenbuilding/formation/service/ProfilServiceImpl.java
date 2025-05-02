package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ProfilServiceImpl implements ProfilService {

    @Autowired
    private ProfilRepository profilRepository;

    @Override
    public Profil save(Profil profil) {
        return profilRepository.save(profil);
    }

    @Override
    public Profil getById(Long id) {
        Optional<Profil> profil = profilRepository.findById(id);
        return profil.orElseThrow(() -> new RuntimeException("Profil non trouvé"));
    }

    @Override
    public List<Profil> getAll() {
        return profilRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        profilRepository.deleteById(id);
    }
}
