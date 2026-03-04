package com.ayoub.incidenttracker.controller;

import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketStatus;
import com.ayoub.incidenttracker.domain.enums.TicketType;
import com.ayoub.incidenttracker.dto.CreateTicketRequest;
import com.ayoub.incidenttracker.dto.TicketDTO;
import com.ayoub.incidenttracker.dto.UpdateTicketRequest;
import com.ayoub.incidenttracker.service.TicketService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173") // React Vite لاحقاً
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService){
        this.ticketService=ticketService;
    }
    @GetMapping
    public List<TicketDTO> getAll() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public TicketDTO getById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping
    public TicketDTO create(@RequestBody @Valid CreateTicketRequest request) {
        return ticketService.createTicket(request);
    }

    @PutMapping("/{id}")
    public TicketDTO update(@PathVariable Long id,
                            @RequestBody @Valid UpdateTicketRequest request) {
        return ticketService.updateTicket(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }

    @GetMapping("/search")
    public Page<TicketDTO> search(
            @RequestParam(required = false) TicketStatus status,
            @RequestParam(required = false) TicketPriority priority,
            @RequestParam(required = false) TicketType type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ticketService.searchTickets(status, priority, type, page, size);
    }
}
