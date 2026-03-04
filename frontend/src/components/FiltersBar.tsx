import type { TicketPriority, TicketStatus, TicketType } from "../types/ticket";

export function FiltersBar(props: {
  filterMode: "NONE" | "STATUS" | "PRIORITY" | "TYPE";
  setFilterMode: (v: "NONE" | "STATUS" | "PRIORITY" | "TYPE") => void;

  filterStatus: TicketStatus;
  setFilterStatus: (v: TicketStatus) => void;

  filterPriority: TicketPriority;
  setFilterPriority: (v: TicketPriority) => void;

  filterType: TicketType;
  setFilterType: (v: TicketType) => void;

  page: number;
  setPage: (fn: (p: number) => number) => void;

  size: number;
  setSize: (n: number) => void;

  totalPages: number;
}) {
  const {
    filterMode,
    setFilterMode,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    filterType,
    setFilterType,
    page,
    setPage,
    size,
    setSize,
    totalPages,
  } = props;

  return (
    <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm font-semibold">Filters</div>

        <select
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          value={filterMode}
          onChange={(e) => {
            setPage(() => 0);
            setFilterMode(e.target.value as any);
          }}
        >
          <option value="NONE">None</option>
          <option value="STATUS">Status</option>
          <option value="PRIORITY">Priority</option>
          <option value="TYPE">Type</option>
        </select>

        {filterMode === "STATUS" && (
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            value={filterStatus}
            onChange={(e) => {
              setPage(() => 0);
              setFilterStatus(e.target.value as TicketStatus);
            }}
          >
            <option value="TODO">TODO</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </select>
        )}

        {filterMode === "PRIORITY" && (
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            value={filterPriority}
            onChange={(e) => {
              setPage(() => 0);
              setFilterPriority(e.target.value as TicketPriority);
            }}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        )}

        {filterMode === "TYPE" && (
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            value={filterType}
            onChange={(e) => {
              setPage(() => 0);
              setFilterType(e.target.value as TicketType);
            }}
          >
            <option value="INCIDENT">INCIDENT</option>
            <option value="TASK">TASK</option>
          </select>
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="text-sm text-slate-600">Page size</div>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            value={size}
            onChange={(e) => {
              setPage(() => 0);
              setSize(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <button
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            disabled={page <= 0}
            onClick={() => setPage((p) => p - 1)}
            type="button"
          >
            Prev
          </button>

          <div className="text-sm text-slate-700">
            Page <span className="font-semibold">{page + 1}</span> /{" "}
            {Math.max(totalPages, 1)}
          </div>

          <button
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
