package com.greenbuilding.formation.controller;

import com.greenbuilding.formation.model.*;
import com.greenbuilding.formation.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;
    public RoleController(RoleService roleService) { this.roleService = roleService; }

    @GetMapping public List<Role> getAll() { return roleService.findAll(); }
    @GetMapping("/{id}") public Role getById(@PathVariable Long id) { return roleService.findById(id); }
    @PostMapping public Role create(@RequestBody Role r) { return roleService.save(r); }
    @PutMapping("/{id}") public Role update(@PathVariable Long id, @RequestBody Role r) { return roleService.update(id, r); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { roleService.delete(id); }
}