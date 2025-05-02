package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {
    // Vous pouvez ajouter des méthodes personnalisées ici si besoin
}
