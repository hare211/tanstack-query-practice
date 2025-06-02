import { BrowserRouter as Router, Routes, Route } from "react-router";
import RecipeList from "./components/RecipeList";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList/>} />
        </Routes>
      </Router>
  );
}

export default App;
