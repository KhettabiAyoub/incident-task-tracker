package com.ayoub.incidenttracker.dto;

import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTicketRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private TicketType type;

    @NotNull
    private TicketPriority priority;

    private Long assignedToId;
}
