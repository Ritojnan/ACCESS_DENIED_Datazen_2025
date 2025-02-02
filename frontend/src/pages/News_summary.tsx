import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/landing/footer";

function App() {
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        console.log("Received Data:", response.data); // Debugging
        setSummaries(response.data.summaries || []);
      } catch (err) {
        console.error("Error fetching summaries:", err);
        setError("Failed to fetch summaries. Please try again.");
      }
    };
    fetchSummaries();
  }, []);
  

  return (
    <><Navbar />
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" ,marginTop: '25px',paddingTop: '55px'}}>
      <h1>📰 News Summarizer</h1>

      {/* Error Handling */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Display Summaries */}
      {summaries.length > 0 ? (
        summaries.map((summary, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <p><strong>Summary {index + 1}:</strong> {summary.summary || "No summary available."}</p>
            <a href={summary.url} target="_blank" rel="noopener noreferrer">
              Read Full Article
            </a>
          </div>
        ))
      ) : (
        <p>No summaries available.</p>
      )}
    </div>
    <Footer />
    </>
  );
}

export default App;
