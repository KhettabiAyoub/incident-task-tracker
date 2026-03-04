package com.ayoub.incidenttracker.dto;

import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketStatus;
import com.ayoub.incidenttracker.domain.enums.TicketType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketDTO {
    private Long id;
    private String title;
    private String description;
    private TicketType type;
    private TicketStatus status;
    private TicketPriority priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long assignedToId;
    private String assignedToName;
}