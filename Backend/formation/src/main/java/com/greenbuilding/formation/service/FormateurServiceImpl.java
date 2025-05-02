package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormateurServiceImpl implements FormateurService {

    @Autowired
    private FormateurRepository formateurRepository;

    @Override
    public Formateur save(Formateur formateur) {
        return formateurRepository.save(formateur);
    }

    @Override
    public Formateur getById(Long id) {
        Optional<Formateur> formateur = formateurRepository.findById(id);
        return formateur.orElseThrow(() -> new RuntimeException("Formateur non trouvé"));
    }

    @Override
    public List<Formateur> getAll() {
        return formateurRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        formateurRepository.deleteById(id);
    }
}
