import { useEffect, useState, type FormEvent } from "react";
import type { User, UserRole, UserStatus } from "../../types/user";
import "./UserModal.css";

interface UserModalProps {
  isOpen: boolean;
  userToEdit: User | null;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const emptyUser = {
  name: "",
  email: "",
  role: "Viewer" as UserRole,
  status: "Active" as UserStatus,
};

export function UserModal({
  isOpen,
  userToEdit,
  onClose,
  onSubmit,
}: UserModalProps) {
  const [formData, setFormData] = useState(emptyUser);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        status: userToEdit.status,
      });
    } else {
      setFormData(emptyUser);
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      id: userToEdit?.id ?? crypto.randomUUID(),
      ...formData,
    });

    onClose();
  }

  return (
    <div className="user-modal-backdrop">
      <section className="user-modal">
        <div className="user-modal__header">
          <h2>{userToEdit ? "Edit user" : "Add user"}</h2>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="user-modal__form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              required
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
            />
          </label>

          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
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
            <button type="submit">
              {userToEdit ? "Save changes" : "Create user"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
