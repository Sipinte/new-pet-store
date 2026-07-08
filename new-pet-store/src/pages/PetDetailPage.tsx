import { useEffect } from "react";
import { PetProvider, usePetContext } from "../section/pet/context/PetContext";
import { PetForm } from "../section/pet/components/PetForm";

function PetDetailContent({ petId }: { petId: number }) {
  const { pet, fetchPet, loading } = usePetContext();

  useEffect(() => {
    fetchPet(petId);
  }, [petId, fetchPet]);

  if (loading || !pet) return <p>Memuat data pet...</p>;

  return (
    <div>
      <h1>Edit Pet</h1>
      <PetForm initialPet={pet} onSaved={() => alert("Tersimpan!")} />
    </div>
  );
}

export function PetDetailPage({ petId }: { petId: number }) {
  return (
    <PetProvider>
      <PetDetailContent petId={petId} />
    </PetProvider>
  );
}