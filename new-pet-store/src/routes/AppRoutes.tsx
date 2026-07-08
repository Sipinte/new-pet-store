import { Routes, Route } from "react-router-dom";
import { PetListPage } from "../pages/PetListPage";
import { PetCreatePage } from "../pages/PetCreatePage";
import { PetDetailPage } from "../pages/PetDetailPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/pets" element={<PetListPage />} />
      <Route path="/pets/new" element={<PetCreatePage />} />
      <Route path="/pets/:id" element={<PetDetailPage />} />
    </Routes>
  );
}