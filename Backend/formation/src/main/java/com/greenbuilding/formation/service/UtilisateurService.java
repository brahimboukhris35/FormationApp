package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface UtilisateurService {
    
    Utilisateur save(Utilisateur utilisateur);

    Utilisateur getById(Long id);

    Utilisateur getByLogin(String login);

    List<Utilisateur> getAll();

    void delete(Long id);
    
    Utilisateur login(String login, String password);
}
