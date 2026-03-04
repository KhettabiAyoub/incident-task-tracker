package com.ayoub.incidenttracker.domain.entity;

import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketStatus;
import com.ayoub.incidenttracker.domain.enums.TicketType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketType type; // TASK / INCIDENT

    @Enumerated(EnumType.STRING)
    private TicketStatus status; // TODO / DOING / DONE

    @Enumerated(EnumType.STRING)
    private TicketPriority priority; // LOW / MEDIUM / HIGH

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "assigned_to_id")
    private UserEntity assignedTo;
}
