package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.Utilisateur;
import com.greenbuilding.formation.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur save(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public Utilisateur getById(Long id) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        return utilisateur.orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    @Override
    public Utilisateur getByLogin(String login) {
        return utilisateurRepository.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec le login: " + login));
    }

    @Override
    public List<Utilisateur> getAll() {
        return utilisateurRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        utilisateurRepository.deleteById(id);
    }

    @Override
    public Utilisateur login(String login, String password) {
        return utilisateurRepository.findByLoginAndPassword(login, password);
    }
}
