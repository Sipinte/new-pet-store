import type { IStatus } from "../../../types/pet";
import { PET_STATUS_COLOR } from "../constant/pet.constant";

export function StatusBadge({ status }: { status?: IStatus }) {
  if (!status) return null;
  const color = PET_STATUS_COLOR[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        backgroundColor: `${color}1a`,
        color,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
      {status}
    </span>
  );
}