package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> findAll() { return roleRepository.findAll(); }

    public Role findById(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new RuntimeException("Rôle introuvable"));
    }

    public Role save(Role role) { return roleRepository.save(role); }

    public Role update(Long id, Role role) {
        Role existing = findById(id);
        existing.setNom(role.getNom());
        return roleRepository.save(existing);
    }

    public void delete(Long id) { roleRepository.deleteById(id); }
}

