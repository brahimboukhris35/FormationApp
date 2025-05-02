package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface StructureService {
    Structure save(Structure structure);

    Structure getById(Long id);

    List<Structure> getAll();

    void delete(Long id);
}
