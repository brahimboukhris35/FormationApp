package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface ProfilService {
    Profil save(Profil profil);

    Profil getById(Long id);

    List<Profil> getAll();

    void delete(Long id);
}
