import DoctorForm from "./components/DoctorForm";
import SearchDoctors from "./components/SearchDoctors";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🩺 Doctor-Patient Location App</h1>
      <DoctorForm />
      <hr />
      <SearchDoctors />
    </div>
  );
}

export default App;
