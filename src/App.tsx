import DefaultLayout from "./components/layouts/default";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <>
      <DefaultLayout>
        <DashboardPage />
      </DefaultLayout>
    </>
  );
}

export default App;
