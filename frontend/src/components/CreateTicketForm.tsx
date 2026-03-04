import type { TicketPriority, TicketType } from "../types/ticket";

export function CreateTicketForm(props: {
  title: string;
  setTitle: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  type: TicketType;
  setType: (v: TicketType) => void;

  priority: TicketPriority;
  setPriority: (v: TicketPriority) => void;

  onCreate: (e: React.FormEvent) => Promise<void>;
}) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    type,
    setType,
    priority,
    setPriority,
    onCreate,
  } = props;

  return (
    <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4">
        <h3 className="text-base font-semibold">Create Ticket</h3>
        <p className="text-sm text-slate-500">Add an incident or a task.</p>
      </div>

      <form
        onSubmit={onCreate}
        className="grid grid-cols-1 gap-3 md:grid-cols-6"
      >
        <div className="md:col-span-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
            placeholder="e.g. Login page bug"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Description
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
            placeholder="Optional details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Type
          </label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
            value={type}
            onChange={(e) => setType(e.target.value as TicketType)}
          >
            <option value="INCIDENT">INCIDENT</option>
            <option value="TASK">TASK</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Priority
          </label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TicketPriority)}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="md:col-span-2 md:flex md:items-end">
          <button
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
