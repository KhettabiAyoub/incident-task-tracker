export type TicketStatus = "TODO" | "DOING" | "DONE";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";
export type TicketType = "TASK" | "INCIDENT";

export interface TicketDTO {
  id: number;
  title: string;
  description?: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  assignedToId?: number | null;
  assignedToName?: string | null;
}

export interface CreateTicketRequest {
  title: string;
  description?: string;
  type: TicketType;
  priority: TicketPriority;
  assignedToId?: number | null;
}
