import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CustomizePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [carModel, setCarModel] = useState("Range Rover");
  const [carColor, setCarColor] = useState("#FF6B35");
  const [services, setServices] = useState([]);
  const [selectedParts, setSelectedParts] = useState({
    wheels: null,
    spoiler: null,
    exhaust: null,
    bodykit: null,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const carModels = [
    "Range Rover",
    "Nissan GTR",
    "Porsche 911",
    "BMW M4",
    "Mercedes-Benz AMG",
    "Lamborghini Huracan",
  ];

  const presetColors = [
    { name: "Orange", hex: "#FF6B35" },
    { name: "Red", hex: "#E63946" },
    { name: "Blue", hex: "#457B9D" },
    { name: "Black", hex: "#1D3557" },
    { name: "White", hex: "#F1FAEE" },
    { name: "Yellow", hex: "#FFD60A" },
    { name: "Green", hex: "#52B788" },
    { name: "Silver", hex: "#ADB5BD" },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedParts]);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("category", { ascending: true });

    if (!error && data) {
      setServices(data);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    Object.values(selectedParts).forEach((partId) => {
      if (partId) {
        const service = services.find((s) => s.id === partId);
        if (service) {
          total += parseFloat(service.price);
        }
      }
    });
    setTotalPrice(total);
  };

  const handlePartSelection = (category, serviceId) => {
    setSelectedParts((prev) => ({
      ...prev,
      [category]: prev[category] === serviceId ? null : serviceId,
    }));
  };

  const saveBuild = async () => {
    if (!user) {
      setMessage("Please log in to save your build");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase.from("builds").insert([
        {
          user_id: user.id,
          car_model: carModel,
          color: carColor,
          selected_parts: selectedParts,
          total_price: totalPrice,
        },
      ]);

      if (error) throw error;

      setMessage("Build saved successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage("Error saving build: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const getServicesByCategory = (category) => {
    return services.filter((s) => s.category === category);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 px-5 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl md:text-5xl text-[#F77603] text-center mb-8"
          style={{ fontFamily: "Kaushan Script" }}
        >
          Customize Your Dream Car
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#151414] rounded-3xl border border-[#F77603] p-6">
            <h2
              className="text-2xl text-[#F77603] mb-4"
              style={{ fontFamily: "Judson" }}
            >
              Car Preview
            </h2>

            <div className="mb-6">
              <label className="block mb-2" style={{ fontFamily: "Judson" }}>
                Select Car Model
              </label>
              <select
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white"
                style={{ fontFamily: "Judson" }}
              >
                {carModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="w-full h-64 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: carColor }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">🚗</div>
                <p className="text-lg font-bold" style={{ fontFamily: "Judson" }}>
                  {carModel}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-3" style={{ fontFamily: "Judson" }}>
                Choose Color
              </label>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {presetColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setCarColor(color.hex)}
                    className={`h-12 rounded-lg border-2 transition ${
                      carColor === color.hex
                        ? "border-[#F77603]"
                        : "border-gray-700"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              <input
                type="color"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer bg-gray-900"
              />
            </div>

            <div className="bg-gray-900 rounded-xl p-4 mb-4">
              <h3
                className="text-xl text-[#F77603] mb-2"
                style={{ fontFamily: "Judson" }}
              >
                Build Summary
              </h3>
              <p style={{ fontFamily: "Judson" }}>
                Model: <span className="text-gray-300">{carModel}</span>
              </p>
              <p style={{ fontFamily: "Judson" }}>
                Color: <span className="text-gray-300">{carColor}</span>
              </p>
              <p style={{ fontFamily: "Judson" }}>
                Total Parts:{" "}
                <span className="text-gray-300">
                  {Object.values(selectedParts).filter((p) => p).length}
                </span>
              </p>
              <p className="text-2xl text-[#F77603] mt-3" style={{ fontFamily: "Judson" }}>
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>

            {message && (
              <div
                className={`p-3 rounded-xl mb-4 ${
                  message.includes("Error")
                    ? "bg-red-900/50 text-red-200"
                    : "bg-green-900/50 text-green-200"
                }`}
                style={{ fontFamily: "Judson" }}
              >
                {message}
              </div>
            )}

            <button
              onClick={saveBuild}
              disabled={saving}
              className="w-full bg-[#F77603] hover:bg-orange-600 text-white py-3 rounded-xl transition disabled:opacity-50"
              style={{ fontFamily: "Judson" }}
            >
              {saving ? "Saving..." : "Save Build"}
            </button>
          </div>

          <div className="bg-[#151414] rounded-3xl border border-[#F77603] p-6">
            <h2
              className="text-2xl text-[#F77603] mb-6"
              style={{ fontFamily: "Judson" }}
            >
              Select Modifications
            </h2>

            <div className="space-y-6 max-h-[700px] overflow-y-auto">
              {["wheels", "spoiler", "exhaust", "bodykit"].map((category) => (
                <div key={category}>
                  <h3
                    className="text-xl text-white mb-3 capitalize"
                    style={{ fontFamily: "Judson" }}
                  >
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {getServicesByCategory(category).map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handlePartSelection(category, service.id)}
                        className={`p-4 rounded-xl cursor-pointer transition ${
                          selectedParts[category] === service.id
                            ? "bg-[#F77603] border-[#F77603]"
                            : "bg-gray-900 border-gray-700 hover:bg-gray-800"
                        } border-2`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p
                              className="font-bold"
                              style={{ fontFamily: "Judson" }}
                            >
                              {service.name}
                            </p>
                            <p
                              className="text-sm text-gray-300"
                              style={{ fontFamily: "Judson" }}
                            >
                              {service.description}
                            </p>
                          </div>
                          <p
                            className="text-xl font-bold"
                            style={{ fontFamily: "Judson" }}
                          >
                            ${parseFloat(service.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
