import { Modal, type ModalChildProps } from "@/ui/Modal";
import { Button } from "@/ui/button";
import { Plus } from "lucide-react";
import type { ReactElement } from "react";

interface AddButtonProps {
  buttonName: string;
  children: ReactElement<ModalChildProps>;
}
function AddButton({ buttonName, children }: AddButtonProps) {
  return (
    <Modal>
      <Modal.Open opens="create-category">
        <Button className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-600 lg:w-auto px-6 py-6 font-bold">
          <Plus className="mr-2 h-5 w-5" />
          {buttonName}
        </Button>
      </Modal.Open>
      <Modal.Window
        name="create-category"
        title="Create Category"
        description="Add new category in the website"
        className="w-2xl"
      >
        {children}
      </Modal.Window>
    </Modal>
  );
}

export default AddButton;
