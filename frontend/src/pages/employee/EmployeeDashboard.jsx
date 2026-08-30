import Navbar from "../../components/layout/Navbar";

function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Employee Dashboard
          </h2>

          <p className="mt-2 text-slate-600">
            View and manage your assigned tasks.
          </p>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;