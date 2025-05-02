package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface EmployeurService {
    List<Employeur> findAll();
    Employeur findById(Long id);
    Employeur save(Employeur employeur);
    Employeur update(Long id, Employeur employeur);
    void delete(Long id);
}
