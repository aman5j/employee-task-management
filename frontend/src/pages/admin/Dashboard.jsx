import { useEffect, useState } from "react";

import { dashboardService } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await dashboardService.getStats();

        // Handles whether the service returns response.data directly or the full axios response
        const result = response.data?.data || response.data || response;

        setStats({
          totalEmployees: result.totalEmployees || 0,
          totalTasks: result.totalTasks || 0,
          todo: result.tasksByStatus?.["Todo"] || 0,
          inProgress: result.tasksByStatus?.["In Progress"] || 0,
          completed: result.tasksByStatus?.["Completed"] || 0,
        });

        // setStats(
        //   response.data || response
        // );
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
    },
    {
      title: "Todo",
      value: stats.todo,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
    },
    {
      title: "Completed",
      value: stats.completed,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Overview of your employee task management system.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">
            Loading dashboard...
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <p className="mt-3 text-3xl font-bold text-slate-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Quick Actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/admin/employees"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Manage Employees
          </a>

          <a
            href="/admin/tasks"
            className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
          >
            Manage Tasks
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;