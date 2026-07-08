import { PetDetailPage } from "./pages/PetDetailPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <PetDetailPage petId={1} />
    </div>
  );
}

export default App;