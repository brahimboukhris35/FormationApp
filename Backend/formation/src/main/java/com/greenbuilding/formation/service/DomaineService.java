package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface DomaineService {
    Domaine save(Domaine domaine);

    Domaine getById(Long id);

    List<Domaine> getAll();

    void delete(Long id);
}