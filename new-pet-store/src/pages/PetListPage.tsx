import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PetProvider, usePetContext } from "../section/pet/context/PetContext";
import { PetCard } from "../section/pet/components/PetCard";
import { PET_STATUS_OPTIONS } from "../section/pet/constant/pet.constant";
import { ROUTE_PATHS } from "../routes/route-paths";
import type { IStatus } from "../types/pet";

function PetListContent() {
  const { pets, fetchPetsByStatus, loading, error } = usePetContext();
  const [status, setStatus] = useState<IStatus>("available");

  useEffect(() => {
    fetchPetsByStatus(status);
  }, [status, fetchPetsByStatus]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Daftar Pet</h1>
        <Link to={ROUTE_PATHS.petCreate}>+ Tambah Pet</Link>
      </div>

      <select value={status} onChange={(e) => setStatus(e.target.value as IStatus)}>
        {PET_STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {loading && <p>Memuat...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export function PetListPage() {
  return (
    <PetProvider>
      <PetListContent />
    </PetProvider>
  );
}