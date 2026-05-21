import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { User, UserRole, UserStatus } from "../../types/user";
import { hasDuplicateEmail } from "../../utils/users";
import "./UserModal.css";

interface UserModalProps {
  isOpen: boolean;
  userToEdit: User | null;
  existingUsers: User[];
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const emptyUser = {
  name: "",
  email: "",
  role: "Viewer" as UserRole,
  status: "Active" as UserStatus,
};

function getInitialFormData(userToEdit: User | null) {
  if (!userToEdit) {
    return emptyUser;
  }

  return {
    name: userToEdit.name,
    email: userToEdit.email,
    role: userToEdit.role,
    status: userToEdit.status,
  };
}

export function UserModal({
  isOpen,
  userToEdit,
  existingUsers,
  onClose,
  onSubmit,
}: UserModalProps) {
  if (!isOpen) return null;

  return (
    <UserModalForm
      key={userToEdit?.id ?? "new-user"}
      userToEdit={userToEdit}
      existingUsers={existingUsers}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

function UserModalForm({
  userToEdit,
  existingUsers,
  onClose,
  onSubmit,
}: Omit<UserModalProps, "isOpen">) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(() =>
    getInitialFormData(userToEdit),
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validationErrors = useMemo(() => {
    const errors: Partial<Record<keyof typeof formData, string>> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (trimmedName.length < 2) {
      errors.name = "Name must contain at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Enter a valid email address.";
    } else if (
      hasDuplicateEmail(existingUsers, trimmedEmail, userToEdit?.id)
    ) {
      errors.email = "A user with this email already exists.";
    }

    return errors;
  }, [existingUsers, formData.email, formData.name, userToEdit?.id]);

  const hasErrors = Object.keys(validationErrors).length > 0;

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    if (hasErrors) {
      return;
    }

    onSubmit({
      id: userToEdit?.id ?? crypto.randomUUID(),
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
    });

    onClose();
  }

  return (
    <div className="user-modal-backdrop" onMouseDown={onClose}>
      <section
        className="user-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="user-modal__header">
          <h2 id="user-modal-title">{userToEdit ? "Edit user" : "Add user"}</h2>
          <button type="button" onClick={onClose}>
            <span aria-hidden="true">x</span>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form className="user-modal__form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Name</span>
            <input
              ref={nameInputRef}
              required
              value={formData.name}
              aria-invalid={Boolean(submitAttempted && validationErrors.name)}
              aria-describedby={
                submitAttempted && validationErrors.name
                  ? "user-name-error"
                  : undefined
              }
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
            />
            {submitAttempted && validationErrors.name && (
              <strong className="user-modal__error" id="user-name-error">
                {validationErrors.name}
              </strong>
            )}
          </label>

          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={formData.email}
              aria-invalid={Boolean(submitAttempted && validationErrors.email)}
              aria-describedby={
                submitAttempted && validationErrors.email
                  ? "user-email-error"
                  : undefined
              }
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
            {submitAttempted && validationErrors.email && (
              <strong className="user-modal__error" id="user-email-error">
                {validationErrors.email}
              </strong>
            )}
          </label>

          <label>
            <span>Role</span>
            <select
              value={formData.role}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  role: event.target.value as UserRole,
                })
              }
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </label>

          <label>
            <span>Status</span>
            <select
              value={formData.status}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  status: event.target.value as UserStatus,
                })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          <div className="user-modal__actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={submitAttempted && hasErrors}>
              {userToEdit ? "Save changes" : "Create user"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
