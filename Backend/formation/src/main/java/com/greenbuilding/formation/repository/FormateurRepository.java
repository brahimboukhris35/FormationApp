package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Formateur;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FormateurRepository extends JpaRepository<Formateur, Long> {
    @Query("SELECT f.type, COUNT(f) FROM Formateur f GROUP BY f.type")
    List<Object[]> countFormateursByType();

}
