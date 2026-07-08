import { useState, useEffect } from "react";
import type { IPet } from "../../../types/pet";
import { PET_STATUS_OPTIONS } from "../constant/pet.constant";
import { usePetContext } from "../context/PetContext";
import { StatusBadge } from "./StatusBadge";

interface IPetFormProps {
  initialPet: IPet;
  onSaved?: (pet: IPet) => void;
}

export function PetForm({ initialPet, onSaved }: IPetFormProps) {
  const { savePet, loading, error } = usePetContext();
  const [form, setForm] = useState<IPet>(initialPet);

  useEffect(() => {
    setForm(initialPet);
  }, [initialPet]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await savePet(form);
    onSaved?.(form);
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

      <button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan Pet"}
      </button>
    </form>
  );
}