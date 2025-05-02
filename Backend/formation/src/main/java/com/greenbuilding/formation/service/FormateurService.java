package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface FormateurService {
    Formateur save(Formateur formateur);
    Formateur getById(Long id);
    List<Formateur> getAll();
    void delete(Long id);
}
