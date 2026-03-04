import { http } from "./http";

import type {
  CreateTicketRequest,
  TicketDTO,
  TicketPriority,
  TicketStatus,
  TicketType,
} from "../types/ticket";

export async function createTicket(payload: CreateTicketRequest) {
  const res = await http.post<TicketDTO>("/api/tickets", payload);
  return res.data;
}

export async function getAllTickets() {
  const res = await http.get<TicketDTO[]>("/api/tickets");
  return res.data;
}

// ✅ DELETE
export async function deleteTicket(id: number) {
  await http.delete(`/api/tickets/${id}`);
}

// ✅ UPDATE (PUT)
export type UpdateTicketRequest = {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  assignedToId?: number | null;
};

export async function updateTicket(id: number, payload: UpdateTicketRequest) {
  const res = await http.put<TicketDTO>(`/api/tickets/${id}`, payload);
  return res.data;
}

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page
  first: boolean;
  last: boolean;
};

export async function searchTickets(params: {
  status?: TicketStatus;
  priority?: TicketPriority;
  type?: TicketType;
  page?: number;
  size?: number;
}) {
  const res = await http.get<PageResponse<TicketDTO>>("/api/tickets/search", {
    params,
  });
  return res.data;
}
