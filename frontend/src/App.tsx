import { Route, Routes } from "react-router-dom";

import JobInsightsDisplay from "./pages/insights";
import Landing from "./pages/landing";
import NewsSummary from "./pages/News_summary"
import ChatbotIframe from "./pages/chatBot";


function App() {
   return (
      <Routes>
      
         <Route path="/" element={<Landing />} />
         <Route path="/dashboard" element={<JobInsightsDisplay />} />
         <Route path="/NewsSummary" element={<NewsSummary />} />
         <Route path="/chatbot" element={<ChatbotIframe />} />
      </Routes>
   );
}

export default App;
