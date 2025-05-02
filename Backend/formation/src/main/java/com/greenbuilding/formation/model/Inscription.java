package com.greenbuilding.formation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Inscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idFormation", nullable = false)
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "idParticipant", nullable = false)
    private Participant participant;

    private String statut; // Ex: "Inscrit", "Validé", "Annulé"
}