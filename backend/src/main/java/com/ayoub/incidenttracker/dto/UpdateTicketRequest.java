package com.ayoub.incidenttracker.dto;

import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketRequest {
    private String title;
    private String description;
    private TicketStatus status;
    private TicketPriority priority;
    private Long assignedToId;
}
