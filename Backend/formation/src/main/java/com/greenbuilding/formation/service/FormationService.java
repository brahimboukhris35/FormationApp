package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface FormationService {
    Formation save(Formation formation);
    List<Formation> getAll();
    Formation getById(Long id);
    void delete(Long id);
    List<Formation> findByDomaine(String domaine);
}
