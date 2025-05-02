package com.greenbuilding.formation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "formation_formateur")
public class FormationFormateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "formation_id", nullable = false)
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "formateur_id", nullable = false)
    private Formateur formateur;

    public FormationFormateur() {
    }

    public FormationFormateur(Formation formation, Formateur formateur) {
        this.formation = formation;
        this.formateur = formateur;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Formateur getFormateur() {
        return formateur;
    }

    public void setFormateur(Formateur formateur) {
        this.formateur = formateur;
    }

    @Override
    public String toString() {
        return "FormationFormateur{" +
                "id=" + id +
                ", formation=" + formation +
                ", formateur=" + formateur +
                '}';
    }
}