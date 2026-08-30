import Navbar from "../../components/layout/Navbar";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Admin Dashboard
          </h2>

          <p className="mt-2 text-slate-600">
            Manage employees, tasks and system activity.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;