package com.greenbuilding.formation.service;

import com.greenbuilding.formation.model.*;
import java.util.List;

public interface RoleService {
    List<Role> findAll();
    Role findById(Long id);
    Role save(Role role);
    Role update(Long id, Role role);
    void delete(Long id);
}
