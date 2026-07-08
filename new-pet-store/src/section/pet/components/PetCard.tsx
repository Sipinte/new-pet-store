import { Link } from "react-router-dom";
import type { IPet } from "../../../types/pet";
import { ROUTE_PATHS } from "../../../routes/route-paths";
import { StatusBadge } from "./StatusBadge";

export function PetCard({ pet }: { pet: IPet }) {
  return (
    <Link
      to={ROUTE_PATHS.petDetail(pet.id)}
      style={{
        display: "block",
        padding: 12,
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 500 }}>{pet.name}</span>
        <StatusBadge status={pet.status} />
      </div>
      {pet.category && (
        <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
          Kategori: {pet.category.name}
        </p>
      )}
    </Link>
  );
}