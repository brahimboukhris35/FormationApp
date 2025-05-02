package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.Utilisateur;
import com.greenbuilding.formation.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    // Création d'un utilisateur
    @PostMapping
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur saved = utilisateurService.save(utilisateur);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Erreur serveur
        }
    }

    // Récupérer un utilisateur par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        try {
            Utilisateur utilisateur = utilisateurService.getById(id);
            if (utilisateur != null) {
                return ResponseEntity.ok(utilisateur);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Erreur serveur
        }
    }

    // Récupérer tous les utilisateurs
    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        try {
            return ResponseEntity.ok(utilisateurService.getAll());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Erreur serveur
        }
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        try {
            utilisateurService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Erreur serveur
        }
    }

    // Connexion d'un utilisateur
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur loggedIn = utilisateurService.login(utilisateur.getLogin(), utilisateur.getPassword());
            if (loggedIn != null) {
                return ResponseEntity.ok(loggedIn);
            } else {
                return ResponseEntity.status(401).body("Login ou mot de passe incorrect");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur serveur : " + e.getMessage());
        }
    }

    // Récupérer un utilisateur par son login
    @GetMapping("/login/{login}")
    public ResponseEntity<Utilisateur> getUtilisateurByLogin(@PathVariable String login) {
        try {
            Utilisateur utilisateur = utilisateurService.getByLogin(login);
            if (utilisateur != null) {
                return ResponseEntity.ok(utilisateur);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Erreur serveur
        }
    }

    // Mise à jour d'un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur existingUtilisateur = utilisateurService.getById(id);
            if (existingUtilisateur == null) {
                return ResponseEntity.notFound().build(); // Utilisateur non trouvé
            }
            utilisateur.setId(id); // S'assurer que l'ID dans l'objet utilisateur est correct
            Utilisateur updatedUtilisateur = utilisateurService.save(utilisateur); // Utiliser save pour la mise à jour
            return ResponseEntity.ok(updatedUtilisateur);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Erreur serveur
        }
    }
}
