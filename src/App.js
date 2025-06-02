import { BrowserRouter as Router, Routes, Route } from "react-router";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList/>} />
          <Route path="/recipe/detail/:no" element={<RecipeDetail/>} />
        </Routes>
      </Router>
  );
}

export default App;
