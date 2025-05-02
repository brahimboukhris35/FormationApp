package com.greenbuilding.formation.repository;

import com.greenbuilding.formation.model.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeurRepository extends JpaRepository<Employeur, Long> {
}
