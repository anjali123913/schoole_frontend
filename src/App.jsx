import { Routes, Route, NavLink } from "react-router-dom";
import AddSchool from "./pages/AddSchool.jsx";
import ShowSchools from "./pages/ShowSchools.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Schools Marketplace</h1>
          <nav className="flex gap-3">
            <NavLink className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200" to="/">
              Show Schools
            </NavLink>
            <NavLink className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700" to="/add">
              Add School
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<ShowSchools />} />
          <Route path="/add" element={<AddSchool />} />
        </Routes>
      </main>
    </div>
  );
}
