package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StructureServiceImpl implements StructureService {

    @Autowired
    private StructureRepository structureRepository;

    @Override
    public Structure save(Structure structure) {
        return structureRepository.save(structure);
    }

    @Override
    public Structure getById(Long id) {
        Optional<Structure> structure = structureRepository.findById(id);
        return structure.orElseThrow(() -> new RuntimeException("Structure non trouvée"));
    }

    @Override
    public List<Structure> getAll() {
        return structureRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        structureRepository.deleteById(id);
    }
}
