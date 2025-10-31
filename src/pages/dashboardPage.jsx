import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [builds, setBuilds] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProfile();
      fetchBuilds();
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!error && data) {
      setProfile(data);
    }
  };

  const fetchBuilds = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("builds")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBuilds(data);
    }
    setLoading(false);
  };

  const deleteBuild = async (buildId) => {
    if (!confirm("Are you sure you want to delete this build?")) return;

    const { error } = await supabase.from("builds").delete().eq("id", buildId);

    if (!error) {
      setBuilds(builds.filter((b) => b.id !== buildId));
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-5 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1
              className="text-3xl md:text-5xl text-[#F77603]"
              style={{ fontFamily: "Kaushan Script" }}
            >
              Welcome, {profile?.name || "User"}
            </h1>
            <p className="text-gray-400 mt-2" style={{ fontFamily: "Judson" }}>
              {profile?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"
            style={{ fontFamily: "Judson" }}
          >
            Logout
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl md:text-3xl text-white"
            style={{ fontFamily: "Judson" }}
          >
            My Saved Builds
          </h2>
          <button
            onClick={() => navigate("/customize")}
            className="bg-[#F77603] hover:bg-orange-600 px-6 py-3 rounded-xl transition"
            style={{ fontFamily: "Judson" }}
          >
            Create New Build
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl" style={{ fontFamily: "Judson" }}>
              Loading builds...
            </p>
          </div>
        ) : builds.length === 0 ? (
          <div className="bg-[#151414] rounded-3xl border border-[#F77603] p-12 text-center">
            <p className="text-xl mb-4" style={{ fontFamily: "Judson" }}>
              You haven&apos;t created any builds yet.
            </p>
            <button
              onClick={() => navigate("/customize")}
              className="bg-[#F77603] hover:bg-orange-600 px-6 py-3 rounded-xl transition"
              style={{ fontFamily: "Judson" }}
            >
              Create Your First Build
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <div
                key={build.id}
                className="bg-[#151414] rounded-3xl border border-[#F77603] p-6 hover:border-orange-500 transition"
              >
                <div
                  className="w-full h-40 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: build.color }}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-2">🚗</div>
                    <p
                      className="text-lg font-bold"
                      style={{ fontFamily: "Judson" }}
                    >
                      {build.car_model}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p style={{ fontFamily: "Judson" }}>
                    <span className="text-gray-400">Model:</span>{" "}
                    <span className="text-white">{build.car_model}</span>
                  </p>
                  <p style={{ fontFamily: "Judson" }}>
                    <span className="text-gray-400">Color:</span>{" "}
                    <span className="text-white">{build.color}</span>
                  </p>
                  <p style={{ fontFamily: "Judson" }}>
                    <span className="text-gray-400">Parts:</span>{" "}
                    <span className="text-white">
                      {
                        Object.values(build.selected_parts).filter((p) => p)
                          .length
                      }
                    </span>
                  </p>
                  <p
                    className="text-xl text-[#F77603]"
                    style={{ fontFamily: "Judson" }}
                  >
                    Total: ${parseFloat(build.total_price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500" style={{ fontFamily: "Judson" }}>
                    {new Date(build.created_at).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteBuild(build.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition flex items-center justify-center gap-2"
                  style={{ fontFamily: "Judson" }}
                >
                  <FaTrash /> Delete Build
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
