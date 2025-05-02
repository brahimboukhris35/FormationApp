package com.greenbuilding.formation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "formation_participant")
public class FormationParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "formation_id", nullable = false)
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    public FormationParticipant() {
    }

    public FormationParticipant(Formation formation, Participant participant) {
        this.formation = formation;
        this.participant = participant;
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

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    @Override
    public String toString() {
        return "FormationParticipant{" +
                "id=" + id +
                ", formation=" + formation +
                ", participant=" + participant +
                '}';
    }
}