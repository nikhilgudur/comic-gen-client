import React, { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function Chat() {
  const [model, setModel] = useState("custom_tld");
  const [prompt, setPrompt] = useState("");
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setError("");
    setPanels([]);

    const BASE_URL = "https://pmihh01ef82lmz-8000.proxy.runpod.net";

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          num_panels: 4,
          model,
        }),
      });

      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }

      const json = await res.json();
      // The API returns { panels: [...] }
      setPanels(json.panels);
    } catch (e) {
      console.error(e);
      setError("Failed to generate comic. Check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", background: "#ffb300", height: "150vh" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1
          style={{
            fontFamily: '"Comic Sans MS", "Comic Sans", cursive, sans-serif',
          }}
        >
          Generate Comic
        </h1>
      </div>

      <div
        style={{
          marginBottom: "1rem",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <select
          style={{
            borderRadius: 5,
            fontFamily: "Comic Sans MS",
            border: "2px solid #000",
          }}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="" disabled>
            Select Model
          </option>
          <option value="flux">flux</option>
          <option value="sdxl">sdxl</option>
          <option value="custom_tld">spartan</option>
          <option value="lumina">lumina</option>
          <option value="pixart">pixart</option>
        </select>

        <input
          type="text"
          placeholder="Enter your prompt…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGenerate();
            }
          }}
          style={{ width: "50%", height: "2rem", borderRadius: 5 }}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            borderRadius: 5,
            background: "#333",
            color: "#fff",
            fontFamily: "Comic Sans MS",
            padding: "0.5rem 1rem",
          }}
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          marginTop: "2rem",
          height: "35%",
          width: "40%",
          position: "relative",
          left: "446px",
          // background: "#fff",
        }}
      >
        {loading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <PacmanLoader color="#000" />
          </div>
        ) : (
          panels.map((p) => {
            const filename = p.image_path.replace(/\\/g, "/").split("/").pop();

            const imageUrl =
              model === "custom_tld"
                ? `https://pmihh01ef82lmz-8000.proxy.runpod.net/custom_images/${encodeURIComponent(
                    filename
                  )}`
                : `https://2fn2ckveg46moy-8888.proxy.runpod.net/${encodeURIComponent(
                    filename
                  )}`;

            return (
              <div key={p.panel} style={{ border: "1px solid #ddd" }}>
                <img
                  src={imageUrl}
                  alt={`Panel ${p.panel}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <p style={{ padding: "0.5rem", fontFamily: "Comic Sans MS" }}>
                  {p.dialogue.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
