import { Route, Routes } from "react-router-dom";

import JobInsightsDisplay from "./pages/insights";
import Landing from "./pages/landing";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/dashboard" element={<JobInsightsDisplay />} />
      </Routes>
   );
}

export default App;
