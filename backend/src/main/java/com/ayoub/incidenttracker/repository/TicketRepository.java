package com.ayoub.incidenttracker.repository;

import com.ayoub.incidenttracker.domain.entity.TicketEntity;
import com.ayoub.incidenttracker.domain.enums.TicketPriority;
import com.ayoub.incidenttracker.domain.enums.TicketStatus;
import com.ayoub.incidenttracker.domain.enums.TicketType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {

    List<TicketEntity> findByStatus(TicketStatus status);
    List<TicketEntity> findByType(TicketType type);
    List<TicketEntity> findByAssignedTo_Id(Long userId);

    Page<TicketEntity> findAll(Pageable pageable);

    Page<TicketEntity> findByStatus(TicketStatus status, Pageable pageable);

    Page<TicketEntity> findByPriority(TicketPriority priority, Pageable pageable);

    Page<TicketEntity> findByType(TicketType type, Pageable pageable);

}
