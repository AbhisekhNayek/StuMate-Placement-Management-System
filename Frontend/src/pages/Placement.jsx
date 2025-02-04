import React, { useEffect, useRef } from "react";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, // For Pie charts
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import LandNavbar from "../components/LandingPages/LandNavbar";
import LandFooter from "../components/LandingPages/LandFooter";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, // Register ArcElement for pie charts
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const Placement = () => {
  const chartRef = useRef(null);

  // Example data for Placement statistics and charts
  const placementStats = {
    totalPlacements: 150,
    highestPackage: 45, // in LPA
    averagePackage: 12, // in LPA
    companiesVisited: 50,
    studentsPlaced: 120,
    lowestPackage: 6
  };

  // Line chart data (Placements over the months)
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Placements",
        data: [5, 12, 25, 30, 45, 35, 50],
        fill: false,
        borderColor: "rgba(34, 197, 94, 1)",
        tension: 0.1,
      },
    ],
  };

  // Bar chart data (Number of companies visiting each department)
  const barChartData = {
    labels: ["CS", "IT", "ECE", "EEE", "ME", "Civil"],
    datasets: [
      {
        label: "Companies Visited",
        data: [10, 15, 8, 12, 7, 5],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data (Percentage of placement offers by company type)
  const pieChartData = {
    labels: ["Tech", "Non-Tech", "Internships", "Other"],
    datasets: [
      {
        data: [60, 25, 10, 5],
        backgroundColor: ["#34D9A8", "#3B82F6", "#F59E0B", "#EF4444"],
        borderColor: ["#34D9A8", "#3B82F6", "#F59E0B", "#EF4444"],
        borderWidth: 1,
      },
    ],
  };

  // Radar chart data (Skills or attributes evaluated by recruiters across departments)
  const radarChartData = {
    labels: ["Technical Skills", "Communication", "Problem Solving", "Teamwork", "Leadership", "Creativity"],
    datasets: [
      {
        label: "CS",
        data: [80, 70, 90, 85, 80, 75],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
      {
        label: "IT",
        data: [70, 65, 80, 75, 70, 80],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    // Clean up chart before creating a new one to avoid "canvas already in use" error
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    }
  }, []);

  return (
    <>
      <LandNavbar />
      <div className="min-h-screen bg-black text-white flex items-center justify-center mt-16">
        <div className="container max-w-6xl p-6">
          {/* Charts Section - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium text-white mb-6">Placements Over the Months</h2>
              <Line data={lineChartData} />
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium text-white mb-6">Companies Visited by Department</h2>
              <Bar data={barChartData} />
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium text-white mb-6">Placement Offers by Company Type</h2>
              <Pie data={pieChartData} />
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium text-white mb-6">Skills Evaluated by Recruiters</h2>
              <Radar data={radarChartData} />
            </div>
          </div>

          {/* Cards Section - Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-white mb-3">Total Placements</h2>
              <p className="text-2xl text-green-400">{placementStats.totalPlacements}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-white mb-3">Highest Package (LPA)</h2>
              <p className="text-2xl text-green-400">{placementStats.highestPackage} LPA</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-white mb-3">Average Package (LPA)</h2>
              <p className="text-2xl text-green-400">{placementStats.averagePackage} LPA</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-white mb-3">Companies Visited</h2>
              <p className="text-2xl text-green-400">{placementStats.companiesVisited}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-white mb-3">Students Placed</h2>
              <p className="text-2xl text-green-400">{placementStats.studentsPlaced}</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-medium text-white mb-3">Lowest Package (LPA)</h2>
              <p className="text-2xl text-green-400">{placementStats.lowestPackage}</p>
            </div>
          </div>
        </div>
      </div>
      <LandFooter />
    </>
  );
};

export default Placement;
