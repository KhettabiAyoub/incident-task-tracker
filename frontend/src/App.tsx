import { useEffect, useMemo, useState } from "react";
import {
  createTicket,
  deleteTicket,
  searchTickets,
  updateTicket,
} from "./api/tickets";
import { login, register } from "./api/auth";

import type {
  CreateTicketRequest,
  TicketDTO,
  TicketPriority,
  TicketStatus,
  TicketType,
} from "./types/ticket";

import { AuthCard } from "./components/AuthCard";
import { TopBar } from "./components/TopBar";
import { StatsGrid } from "./components/StatsGrid";
import { CreateTicketForm } from "./components/CreateTicketForm";
import { FiltersBar } from "./components/FiltersBar";
import { TicketsTable } from "./components/TicketsTable";

export default function App() {
  //  AUTH
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("ayoub@test.com");
  const [password, setPassword] = useState("123456");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // TICKETS STATE
  const [tickets, setTickets] = useState<TicketDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // create form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<TicketType>("INCIDENT");
  const [priority, setPriority] = useState<TicketPriority>("HIGH");

  // edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState<TicketStatus>("TODO");
  const [editPriority, setEditPriority] = useState<TicketPriority>("HIGH");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  // filter mode
  const [filterMode, setFilterMode] = useState<
    "NONE" | "STATUS" | "PRIORITY" | "TYPE"
  >("NONE");
  const [filterStatus, setFilterStatus] = useState<TicketStatus>("TODO");
  const [filterPriority, setFilterPriority] = useState<TicketPriority>("HIGH");
  const [filterType, setFilterType] = useState<TicketType>("INCIDENT");

  const [totalPages, setTotalPages] = useState(1);

  const stats = useMemo(() => {
    const total = tickets.length;
    const todo = tickets.filter((t) => t.status === "TODO").length;
    const doing = tickets.filter((t) => t.status === "DOING").length;
    const done = tickets.filter((t) => t.status === "DONE").length;
    return { total, todo, doing, done };
  }, [tickets]);

  async function load() {
    if (!token) return;
    setLoading(true);
    try {
      const params: any = { page, size };
      if (filterMode === "STATUS") params.status = filterStatus;
      else if (filterMode === "PRIORITY") params.priority = filterPriority;
      else if (filterMode === "TYPE") params.type = filterType;

      const result = await searchTickets(params);
      setTickets(result.content);
      setTotalPages(result.totalPages);
    } finally {
      setLoading(false);
    }
  }

  // listen to logout that happens from http.ts interceptor
  useEffect(() => {
    const handler = () => setToken(null);
    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, []);

  useEffect(() => {
    if (token) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, page, size, filterMode, filterStatus, filterPriority, filterType]);

  async function onSubmitAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const data =
        authMode === "REGISTER"
          ? await register({ name, email, password })
          : await login({ email, password });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setPassword("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Authentication failed. Please check your email and password.";
      setAuthError(String(msg));
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();

    const payload: CreateTicketRequest = {
      title,
      description: description || undefined,
      type,
      priority,
    };

    await createTicket(payload);
    setPage(0);
    await load();

    setTitle("");
    setDescription("");
    setType("INCIDENT");
    setPriority("HIGH");
  }

  async function onDelete(id: number) {
    const ok = confirm("Are you sure you want to delete this ticket?");
    if (!ok) return;

    await deleteTicket(id);
    await load();
  }

  function startEdit(t: TicketDTO) {
    setEditingId(t.id);
    setEditTitle(t.title);
    setEditStatus(t.status);
    setEditPriority(t.priority);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: number) {
    await updateTicket(id, {
      title: editTitle,
      status: editStatus,
      priority: editPriority,
    });
    setEditingId(null);
    await load();
  }

  // AUTH SCREEN
  if (!token) {
    return (
      <AuthCard
        authMode={authMode}
        setAuthMode={setAuthMode}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        authError={authError}
        authLoading={authLoading}
        onSubmitAuth={onSubmitAuth}
      />
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar onRefresh={load} onLogout={logout} />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <StatsGrid stats={stats} />

        <CreateTicketForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          type={type}
          setType={setType}
          priority={priority}
          setPriority={setPriority}
          onCreate={onCreate}
        />

        <FiltersBar
          filterMode={filterMode}
          setFilterMode={setFilterMode}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterType={filterType}
          setFilterType={setFilterType}
          page={page}
          setPage={setPage}
          size={size}
          setSize={setSize}
          totalPages={totalPages}
        />

        <TicketsTable
          tickets={tickets}
          loading={loading}
          editingId={editingId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          editPriority={editPriority}
          setEditPriority={setEditPriority}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          saveEdit={saveEdit}
          onDelete={onDelete}
        />

        <div className="mt-6 text-xs text-slate-500">
          Secure authentication and protected requests enabled.
        </div>
      </div>
    </div>
  );
}
