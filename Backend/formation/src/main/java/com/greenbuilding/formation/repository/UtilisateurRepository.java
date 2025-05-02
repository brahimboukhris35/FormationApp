package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Utilisateur;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByLogin(String login);
    Utilisateur findByLoginAndPassword(String login, String password);
    
    @Query("SELECT u.role.nom, COUNT(u) FROM Utilisateur u GROUP BY u.role.nom")
    List<Object[]> countUtilisateursByRole();


}