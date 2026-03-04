import type { TicketDTO, TicketPriority, TicketStatus } from "../types/ticket";
import { Badge } from "./Badge";
import { formatDate } from "../utils/formatDate";

export function TicketsTable(props: {
  tickets: TicketDTO[];
  loading: boolean;

  editingId: number | null;
  editTitle: string;
  setEditTitle: (v: string) => void;

  editStatus: TicketStatus;
  setEditStatus: (v: TicketStatus) => void;

  editPriority: TicketPriority;
  setEditPriority: (v: TicketPriority) => void;

  startEdit: (t: TicketDTO) => void;
  cancelEdit: () => void;
  saveEdit: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const {
    tickets,
    loading,
    editingId,
    editTitle,
    setEditTitle,
    editStatus,
    setEditStatus,
    editPriority,
    setEditPriority,
    startEdit,
    cancelEdit,
    saveEdit,
    onDelete,
  } = props;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-base font-semibold">Tickets</h3>
        <p className="text-sm text-slate-500">
          Edit, update status/priority, or delete.
        </p>
      </div>

      {loading ? (
        <div className="p-6 text-sm text-slate-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {tickets.map((t) => {
                const isEditing = editingId === t.id;

                const priorityBadge =
                  t.priority === "HIGH"
                    ? "red"
                    : t.priority === "MEDIUM"
                      ? "amber"
                      : "green";

                const statusBadge =
                  t.status === "DONE"
                    ? "green"
                    : t.status === "DOING"
                      ? "blue"
                      : "gray";

                return (
                  <tr key={t.id} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 text-sm text-slate-700">{t.id}</td>

                    <td className="px-5 py-3 text-sm">
                      {isEditing ? (
                        <input
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                      ) : (
                        <div className="font-medium text-slate-900">
                          {t.title}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-3 text-sm text-slate-700">
                      <Badge variant="gray">{t.type}</Badge>
                    </td>

                    <td className="px-5 py-3 text-sm">
                      {isEditing ? (
                        <select
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                          value={editPriority}
                          onChange={(e) =>
                            setEditPriority(e.target.value as TicketPriority)
                          }
                        >
                          <option value="LOW">LOW</option>
                          <option value="MEDIUM">MEDIUM</option>
                          <option value="HIGH">HIGH</option>
                        </select>
                      ) : (
                        <Badge variant={priorityBadge as any}>
                          {t.priority}
                        </Badge>
                      )}
                    </td>

                    <td className="px-5 py-3 text-sm">
                      {isEditing ? (
                        <select
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                          value={editStatus}
                          onChange={(e) =>
                            setEditStatus(e.target.value as TicketStatus)
                          }
                        >
                          <option value="TODO">TODO</option>
                          <option value="DOING">DOING</option>
                          <option value="DONE">DONE</option>
                        </select>
                      ) : (
                        <Badge variant={statusBadge as any}>{t.status}</Badge>
                      )}
                    </td>

                    <td className="px-5 py-3 text-sm text-slate-600">
                      {formatDate(t.createdAt)}
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-2">
                        {isEditing ? (
                          <>
                            <button
                              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                              onClick={() => saveEdit(t.id)}
                              type="button"
                            >
                              Save
                            </button>
                            <button
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
                              onClick={cancelEdit}
                              type="button"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
                              onClick={() => startEdit(t)}
                              type="button"
                            >
                              Edit
                            </button>
                            <button
                              className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
                              onClick={() => onDelete(t.id)}
                              type="button"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {tickets.length === 0 && (
                <tr>
                  <td
                    className="px-5 py-10 text-center text-sm text-slate-500"
                    colSpan={7}
                  >
                    No tickets found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
