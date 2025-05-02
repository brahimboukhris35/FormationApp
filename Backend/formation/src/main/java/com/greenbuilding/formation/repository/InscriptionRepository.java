package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscriptionRepository extends JpaRepository<Inscription, Long> {
}