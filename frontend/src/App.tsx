import { Route, Routes } from "react-router-dom";

import JobInsightsDisplay from "./pages/insights";
import Landing from "./pages/landing";
import NewsSummary from "./pages/News_summary"


function App() {
   return (
      <Routes>
      
         <Route path="/" element={<Landing />} />
         <Route path="/dashboard" element={<JobInsightsDisplay />} />
         <Route path="/NewsSummary" element={<NewsSummary />} />
      </Routes>
   );
}

export default App;
