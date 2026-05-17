import "./DeleteConfirmationModal.css";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-backdrop">
      <section className="delete-modal">
        <h2>Delete User</h2>

        <p>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>

        <div className="delete-modal__actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            className="delete-modal__confirm"
            onClick={onConfirm}
          >
            Delete User
          </button>
        </div>
      </section>
    </div>
  );
}
