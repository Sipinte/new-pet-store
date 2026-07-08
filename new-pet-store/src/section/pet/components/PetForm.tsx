import { useState, useEffect } from "react";
import type { IPet } from "../../../types/pet";
import { PET_STATUS_OPTIONS } from "../constant/pet.constant";
import { StatusBadge } from "./StatusBadge";

interface IPetFormProps {
  initialPet: IPet;
  onSubmit: (pet: IPet) => Promise<void>;
  submitLabel?: string;
}

export function PetForm({ initialPet, onSubmit, submitLabel = "Simpan" }: IPetFormProps) {
  const [form, setForm] = useState<IPet>(initialPet);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialPet);
  }, [initialPet]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan pet");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label>
        Nama
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </label>

      <label>
        Status
        <select
          value={form.status ?? ""}
          onChange={(e) => setForm({ ...form, status: e.target.value as IPet["status"] })}
        >
          <option value="" disabled>Pilih status</option>
          {PET_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label>
        Photo URLs (pisahkan dengan koma)
        <input
          value={form.photoUrls.join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              photoUrls: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
            })
          }
        />
      </label>

      {form.status && <div>Preview: <StatusBadge status={form.status} /></div>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Menyimpan..." : submitLabel}
      </button>
    </form>
  );
}