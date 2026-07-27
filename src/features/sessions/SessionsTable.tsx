import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Pencil, Trash2, Eye, ExternalLink } from "lucide-react";
import { useSessions } from "./hooks/useSessions";
import { Spinner } from "@/ui/Spinner";
import { Modal } from "@/ui/Modal";
import { ConfirmDelete } from "@/ui/ConfirmDelete";
import { useDeleteSession } from "./hooks/useDeleteSession";
import { useUpdateSession } from "./hooks/useUpdateSession";
import { PAGE_SIZE } from "@/utils/constants";
import TechIcon from "@/ui/TechIcon";
import Pagination from "@/ui/Pagination";

export default function SessionsTable() {
  const { sessions, isLoadingSessions, count } = useSessions();
  const { deleteSession, isDeleting } = useDeleteSession();
  const { isUpdating, updateSession } = useUpdateSession();

  if (isLoadingSessions) return <Spinner />;

  if (!sessions?.length)
    return (
      <p className="flex items-center justify-center p-8 text-muted-foreground">
        No sessions found. Start by adding one!
      </p>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[5%] text-center">Order</TableHead>
          <TableHead className="w-[10%] text-center">Cover</TableHead>
          <TableHead className="w-[20%] text-center">Title</TableHead>
          <TableHead className="w-[15%] text-center">Category</TableHead>
          <TableHead className="w-[10%] text-center">Created At</TableHead>
          <TableHead className="w-[10%] text-center">Read Time</TableHead>
          <TableHead className="w-[10%] text-center">Visible</TableHead>
          <TableHead className="w-[5%] text-center">Link</TableHead>
          <TableHead className="w-[15%] text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions?.map((session) => (
          <TableRow key={session.id}>
            <Modal>
              <TableCell className="font-medium text-slate-500 text-center">
                {session.display_order}
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  {session.cover_image ? (
                    <img
                      src={session.cover_image}
                      alt={session.title}
                      className="h-10 w-16 rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-16 items-center justify-center rounded-md bg-slate-100 text-xs text-slate-400 dark:bg-slate-800">
                      No img
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-center">
                {session.title}
              </TableCell>

              <TableCell>
                {session.categories ? (
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800/50"
                      style={{ color: session.categories.categoryColor }}
                    >
                      <TechIcon
                        techName={session.categories.slug}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <span className="text-sm text-slate-400">—</span>
                  </div>
                )}
              </TableCell>

              <TableCell className="text-sm text-slate-600 dark:text-slate-400 text-center">
                {new Date(session.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-sm text-slate-600 dark:text-slate-400 text-center">
                {session.estimated_reading_time
                  ? `${session.estimated_reading_time} min`
                  : "—"}
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <Switch
                    checked={session.is_visible}
                    disabled={isUpdating}
                    onCheckedChange={() =>
                      updateSession({
                        id: session.id,
                        updatedSession: { is_visible: !session.is_visible },
                      })
                    }
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  {session.notion_url ? (
                    <a
                      href={session.notion_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {/* <Modal.Open opens="details-session">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Modal.Open> */}

                  <Modal.Open opens="edit-session">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Modal.Open>

                  <Modal.Open opens="delete-session">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Modal.Open>

                  <Modal.Window
                    name="delete-session"
                    title="Delete Session"
                    description="Think before you click delete"
                    className="max-w-lg"
                  >
                    <ConfirmDelete
                      resourceName="session"
                      disabled={isDeleting}
                      onConfirm={() => deleteSession(session.id)}
                    />
                  </Modal.Window>

                  <Modal.Window
                    className="max-w-2xl"
                    name="edit-session"
                    title="Edit Session"
                    description="Update the session details"
                  >
                    {/* This will be replaced with <SessionForm sessionToEdit={session} /> once built */}
                    <div className="p-4 text-center text-muted-foreground">
                      Session form coming soon...
                    </div>
                  </Modal.Window>

                  {/* <Modal.Window
                    className="max-w-2xl"
                    name="details-session"
                    title="Session Details"
                    description="View full information about this session"
                  >
                    This will be replaced with SessionDetails component once built
                    <div className="p-4 text-center text-muted-foreground">
                      Session details coming soon...
                    </div>
                  </Modal.Window> */}
                </div>
              </TableCell>
            </Modal>
          </TableRow>
        ))}
      </TableBody>
      {Math.ceil((count || 1) / PAGE_SIZE) > 1 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9}>
              <Pagination count={count} />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
