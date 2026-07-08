import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PetProvider, usePetContext } from "../section/pet/context/PetContext";
import { PetForm } from "../section/pet/components/PetForm";

function PetDetailContent({ petId }: { petId: number }) {
  const { pet, fetchPet, savePet, loading } = usePetContext();

  useEffect(() => {
    fetchPet(petId);
  }, [petId, fetchPet]);

  if (loading || !pet) return <p>Memuat data pet...</p>;

  return (
    <div>
      <h1>Edit Pet</h1>
      <PetForm initialPet={pet} onSubmit={savePet} submitLabel="Simpan Perubahan" />
    </div>
  );
}

export function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const petId = Number(id);

  if (!id || Number.isNaN(petId)) {
    return <p>ID pet tidak valid.</p>;
  }

  return (
    <PetProvider>
      <PetDetailContent petId={petId} />
    </PetProvider>
  );
}