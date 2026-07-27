import {
  createContext,
  useContext,
  useState,
  cloneElement,
  type ReactElement,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { cn } from "@/utils/helpers";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactElement<{
    onClick?: MouseEventHandler;
  }>;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Open must be used within a Modal");

  return cloneElement(children, {
    onClick: () => context.open(opensWindowName),
  });
}

export interface ModalChildProps {
  onCloseModal?: () => void;
}
interface WindowProps {
  children: ReactElement<ModalChildProps>;
  name: string;
  title: string;
  description?: string;
  className?: string;
}
function Window({
  children,
  name,
  title,
  description,
  className,
}: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal.Window must be used within a Modal");

  const { openName, close } = context;
  const isOpen = name === openName;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className={cn(
          "gap-2 border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:rounded-xl",
          className,
        )}
      >
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Dynamic content */}
        <div className="w-full">
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

Modal.Open = Open;
Modal.Window = Window;
