import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink, Newspaper } from "lucide-react";

interface Summary {
  summary: string;
  url: string;
}

export default function NewsSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
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
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">📰 News Summarizer</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {summaries.length > 0 ? (
          summaries.map((summary, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  News Summary {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{summary.summary || "No summary available."}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <a href={summary.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Read Full Article
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">No summaries available.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}