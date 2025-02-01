import { Route, Routes } from "react-router-dom";

import Landing from "./pages/landing";
import MainLayout from "./components/layout/main-layout";

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
         <Route path="/" element={<Landing />} />
         
         </Route>
      </Routes>
   );
}

export default App;
