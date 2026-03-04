package com.ayoub.incidenttracker.service;

import com.ayoub.incidenttracker.domain.entity.TicketEntity;
import com.ayoub.incidenttracker.domain.entity.UserEntity;
import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketStatus;
import com.ayoub.incidenttracker.domain.enums.TicketType;
import com.ayoub.incidenttracker.dto.CreateTicketRequest;
import com.ayoub.incidenttracker.dto.TicketDTO;
import com.ayoub.incidenttracker.dto.UpdateTicketRequest;
import com.ayoub.incidenttracker.repository.TicketRepository;
import com.ayoub.incidenttracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public List<TicketDTO> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::mapToDTO)
                .toList();
    }

    public TicketDTO getTicketById(Long id) {
        TicketEntity ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        return mapToDTO(ticket);
    }

    public TicketDTO createTicket(CreateTicketRequest request) {
        TicketEntity ticket = new TicketEntity();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setType(request.getType());
        ticket.setPriority(request.getPriority());
        ticket.setStatus(TicketStatus.TODO); // default
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        if (request.getAssignedToId() != null) {
            UserEntity user = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            ticket.setAssignedTo(user);
        }

        TicketEntity saved = ticketRepository.save(ticket);
        return mapToDTO(saved);
    }

    public TicketDTO updateTicket(Long id, UpdateTicketRequest request) {
        TicketEntity ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (request.getTitle() != null) ticket.setTitle(request.getTitle());
        if (request.getDescription() != null) ticket.setDescription(request.getDescription());
        if (request.getStatus() != null) ticket.setStatus(request.getStatus());
        if (request.getPriority() != null) ticket.setPriority(request.getPriority());

        if (request.getAssignedToId() != null) {
            UserEntity user = userRepository.findById(request.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));
            ticket.setAssignedTo(user);
        }

        ticket.setUpdatedAt(LocalDateTime.now());

        TicketEntity updated = ticketRepository.save(ticket);
        return mapToDTO(updated);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    private TicketDTO mapToDTO(TicketEntity ticket) {
        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setType(ticket.getType());
        dto.setStatus(ticket.getStatus());
        dto.setPriority(ticket.getPriority());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());

        if (ticket.getAssignedTo() != null) {
            dto.setAssignedToId(ticket.getAssignedTo().getId());
            dto.setAssignedToName(ticket.getAssignedTo().getName());
        }
        return dto;
    }

    public Page<TicketDTO> searchTickets(
            TicketStatus status,
            TicketPriority priority,
            TicketType type,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<TicketEntity> resultPage;

        if (status != null) {
            resultPage = ticketRepository.findByStatus(status, pageable);
        } else if (priority != null) {
            resultPage = ticketRepository.findByPriority(priority, pageable);
        } else if (type != null) {
            resultPage = ticketRepository.findByType(type, pageable);
        } else {
            resultPage = ticketRepository.findAll(pageable);
        }

        return resultPage.map(this::mapToDTO);
    }
}
