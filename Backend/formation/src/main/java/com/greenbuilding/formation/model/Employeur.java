package com.greenbuilding.formation.model;

import jakarta.persistence.*;

@Entity
public class Employeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomemployeur;

    public Employeur() {
    }

    public Employeur(Long id, String nomemployeur) {
        this.id = id;
        this.nomemployeur = nomemployeur;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomemployeur() {
        return nomemployeur;
    }

    public void setNomemployeur(String nomemployeur) {
        this.nomemployeur = nomemployeur;
    }
}