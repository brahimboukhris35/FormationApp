package com.greenbuilding.formation.model;

//import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private int annee;
    private int duree;
    private double budget;

    @ManyToOne
    private Domaine domaine;

    public Formation() {
    }

    public Formation(Long id, String titre, int annee, int duree, double budget, Domaine domaine) {
        this.id = id;
        this.titre = titre;
        this.annee = annee;
        this.duree = duree;
        this.budget = budget;
        this.domaine = domaine;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public double getBudget() {
        return budget;
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public Domaine getDomaine() {
        return domaine;
    }

    public void setDomaine(Domaine domaine) {
        this.domaine = domaine;
    }
}