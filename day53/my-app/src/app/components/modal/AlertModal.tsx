import { POST } from "@/app/constants/post.constant";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onContinue: () => void;
};
export default function AlertModal({
  open,
  onClose,
  title,
  description,
  onContinue,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{POST.confirmDelete.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>
            {POST.confirmDelete.continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
