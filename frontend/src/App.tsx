import { Route, Routes } from "react-router-dom";

import JobInsightsDisplay from "./pages/insights";
import Landing from "./pages/landing";
import NewsSummary from "./pages/News_summary"
import ChatbotIframe from "./pages/chatBot";
import StockMarketReportIframe from "./pages/Stock_market_report";
import VAEIframe from "./pages/VAE";
import NarrativeSummaryIframe from "./pages/Narrative_generation";
import SchemeFinder from "./pages/SchemeFinder";


function App() {
   return (
      <Routes>
      
         <Route path="/" element={<Landing />} />
         <Route path="/dashboard" element={<JobInsightsDisplay />} />
         <Route path="/NewsSummary" element={<NewsSummary />} />
         <Route path="/chatbot" element={<ChatbotIframe />} />
         <Route path="/stockreport" element={<StockMarketReportIframe />} />
         <Route path="/fraud" element={<VAEIframe />} />
         <Route path="/narrativesummary" element={<NarrativeSummaryIframe />} />
         <Route path="/schemefinder" element={<SchemeFinder />} />
      </Routes>
   );
}

export default App;
