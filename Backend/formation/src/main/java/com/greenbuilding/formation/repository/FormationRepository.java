package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Formation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    List<Formation> findByDomaineLibelle(String domaineLibelle);

    @Query("SELECT f.domaine.libelle, COUNT(f) FROM Formation f GROUP BY f.domaine.libelle")
    List<Object[]> countFormationsByDomaine();

}
