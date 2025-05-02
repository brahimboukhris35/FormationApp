package com.greenbuilding.formation.model;

import jakarta.persistence.*;

@Entity
public class Formateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private Long tel;
    private String type;

    @ManyToOne(optional = true)
    private Employeur employeur;

    public Formateur() {
    }

    public Formateur(Long id, String nom, String prenom, String email, Long tel, String type, Employeur employeur) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.tel = tel;
        this.type = type;
        this.employeur = employeur;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getTel() {
        return tel;
    }

    public void setTel(Long tel) {
        this.tel = tel;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Employeur getEmployeur() {
        return employeur;
    }

    public void setEmployeur(Employeur employeur) {
        this.employeur = employeur;
    }
}