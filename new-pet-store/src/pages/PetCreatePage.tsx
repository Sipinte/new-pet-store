import { useNavigate } from "react-router-dom";
import type { IPet } from "../types/pet";
import { PetForm } from "../section/pet/components/PetForm";
import { addPet } from "../section/pet/utils/pet-utils";
import { ROUTE_PATHS } from "../routes/route-paths";

const emptyPet: IPet = {
  id: 0,
  name: "",
  photoUrls: [],
  status: "available",
};

export function PetCreatePage() {
  const navigate = useNavigate();

  async function handleCreate(pet: IPet) {
    const created = await addPet(pet);
    navigate(ROUTE_PATHS.petDetail(created.id));
  }

  return (
    <div>
      <h1>Tambah Pet Baru</h1>
      <PetForm initialPet={emptyPet} onSubmit={handleCreate} submitLabel="Tambah Pet" />
    </div>
  );
}