import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown, AlertCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Navbar } from "@/components/layout/navbar";

const genAI = new GoogleGenerativeAI("AIzaSyAbUeERXWMGaZBdQf1P1nU6aMeQGDpQjsY");

interface Scheme {
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
}

interface CategoryGroup {
  title: string;
  items: { id: keyof typeof defaultSelections; label: string }[];
}

const defaultSelections = {
  manufacturing: false,
  tech: false,
  agriculture: false,
  renewable: false,
  micro: false,
  small: false,
  medium: false,
  womenOwned: false,
  scst: false,
  rural: false,
  northeastern: false,
  export: false,
  innovation: false,
  digital: false,
  financial: false,
};

const categoryGroups: CategoryGroup[] = [
  {
    title: "Business Type",
    items: [
      { id: "manufacturing", label: "Manufacturing & MSME" },
      { id: "tech", label: "Tech & Innovation" },
      { id: "agriculture", label: "Agriculture" },
      { id: "renewable", label: "Renewable Energy" },
    ],
  },
  {
    title: "Company Size",
    items: [
      { id: "micro", label: "Micro Enterprise" },
      { id: "small", label: "Small Enterprise" },
      { id: "medium", label: "Medium Enterprise" },
    ],
  },
  {
    title: "Special Categories",
    items: [
      { id: "womenOwned", label: "Women-Owned" },
      { id: "scst", label: "SC/ST Owned" },
      { id: "rural", label: "Rural Business" },
      { id: "northeastern", label: "North Eastern Region" },
    ],
  },
  {
    title: "Additional Criteria",
    items: [
      { id: "export", label: "Export-Oriented" },
      { id: "innovation", label: "R&D Focus" },
      { id: "digital", label: "Digital Business" },
      { id: "financial", label: "Financial Sector" },
    ],
  },
];

const AccordionItem = ({
  scheme,
  isOpen,
  onClick,
}: {
  scheme: Scheme;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border border-purple-200 rounded-lg bg-white overflow-hidden mb-3 shadow-sm">
    <button
      onClick={onClick}
      className="w-full px-4 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="text-purple-600 text-left font-medium">{scheme.name}</span>
      <ChevronDown
        className={`w-5 h-5 text-purple-600 transition-transform duration-200 ${
          isOpen ? "transform rotate-180" : ""
        }`}
      />
    </button>
    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="px-4 py-4 space-y-4 border-t border-purple-200">
        <div>
          <h4 className="font-semibold text-purple-600 mb-2">Description</h4>
          <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-purple-600 mb-2">Eligibility</h4>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{scheme.eligibility}</p>
        </div>
        <div>
          <h4 className="font-semibold text-purple-600 mb-2">Benefits</h4>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{scheme.benefits}</p>
        </div>
      </div>
    </div>
  </div>
);

const SchemeFinder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [openSchemeIndex, setOpenSchemeIndex] = useState<number | null>(null);
  const [selections, setSelections] = useState(defaultSelections);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelections((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setError(null);
  };

  const generatePrompt = () => {
    const selectedCategories = Object.entries(selections)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (selectedCategories.length === 0) {
      throw new Error("Please select at least one category to find applicable schemes.");
    }

    let prompt = `Based on the following company characteristics, provide detailed information about applicable government schemes in India. Return the response as a JSON array where each object has the format: {"name": "string", "description": "string", "eligibility": "string", "benefits": "string"}.\n\n`;

    Object.entries(selections).forEach(([key, value]) => {
      if (value) {
        const category = categoryGroups.flatMap((g) => g.items).find((item) => item.id === key);
        if (category) {
          prompt += `- ${category.label}\n`;
        }
      }
    });

    return prompt;
  };

  const findSchemes = async () => {
    setLoading(true);
    setError(null);
    setSchemes([]);

    try {
      const prompt = generatePrompt();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      // Log the API response for debugging
      const text = await result.response.text();
      console.log("API Response Text:", text);

      // Clean the response (strip away any markdown formatting like ```json and the disclaimer)
      const cleanedText = text.replace(/^```json\n|```$/g, "").trim();

      // Remove the disclaimer (any non-JSON text after the valid JSON object)
      const jsonEndIndex = cleanedText.lastIndexOf('}');
      let cleanedJsonText = cleanedText.substring(0, jsonEndIndex + 1).trim();

      // Check if there's any disclaimer text after the JSON part
      const disclaimerRegex = /(\[.*\])\s*[\s\S]*$/;
      const matches = cleanedJsonText.match(disclaimerRegex);

      if (matches) {
        cleanedJsonText = matches[1]; // Keep only the valid JSON part
      }

      // Log cleaned response for debugging
      console.log("Cleaned API Response:", cleanedJsonText);
      cleanedJsonText += "]";

      // Attempt to parse the cleaned response as JSON
      try {
        const extractedSchemes = JSON.parse(cleanedJsonText);

        if (!Array.isArray(extractedSchemes) || extractedSchemes.length === 0) {
          throw new Error("No applicable schemes found for the selected criteria.");
        }
        setSchemes(extractedSchemes);
      } catch (parseError) {
        console.error("Error parsing the response:", parseError);
        setError("Failed to process the response. Please try again.");
      }
    } catch (error) {
      console.error("API request error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-20 mt-20">
        <Card className="bg-white text-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-600 text-4xl text-center p-2">Government Scheme Finder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categoryGroups.map((group) => (
                <div key={group.title} className="space-y-4">
                  <h3 className="font-semibold text-purple-600 text-lg">{group.title}</h3>
                  <div className="space-y-3">
                    {group.items.map(({ id, label }) => (
                      <label key={id} className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name={id}
                          checked={selections[id]}
                          onChange={handleChange}
                          className="mt-1 rounded border-purple-400 text-purple-600 focus:ring-purple-500 bg-white"
                        />
                        <span className="leading-tight text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-500 rounded-lg flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <Button
                onClick={findSchemes}
                disabled={loading}
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Finding Schemes...</span>
                  </div>
                ) : (
                  "Find Applicable Schemes"
                )}
              </Button>
            </div>

            {schemes.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4 text-purple-600 text-lg">
                  Applicable Schemes ({schemes.length})
                </h3>
                <div className="space-y-2">
                  {schemes.map((scheme, index) => (
                    <AccordionItem
                      key={index}
                      scheme={scheme}
                      isOpen={openSchemeIndex === index}
                      onClick={() => setOpenSchemeIndex(openSchemeIndex === index ? null : index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SchemeFinder;