package com.greenbuilding.formation.model;

import jakarta.persistence.*;

@Entity
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private Integer tel;

    @ManyToOne
    @JoinColumn(name = "idStructure")
    private Structure structure;

    @ManyToOne
    @JoinColumn(name = "idProfil")
    private Profil profil;

    @ManyToOne
    @JoinColumn(name = "idformation", referencedColumnName = "id")
    private Formation formation;

    public Participant() {
    }

    public Participant(Long id, String nom, String prenom, String email, Integer tel, Structure structure,
            Profil profil) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.tel = tel;
        this.structure = structure;
        this.profil = profil;
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

    public Integer getTel() {
        return tel;
    }

    public void setTel(Integer tel) {
        this.tel = tel;
    }

    public Structure getStructure() {
        return structure;
    }

    public void setStructure(Structure structure) {
        this.structure = structure;
    }

    public Profil getProfil() {
        return profil;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }
}