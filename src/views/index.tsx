import { createRoot }  from "react-dom/client";
import CategoryList from "./CategoryList";



const container = document.getElementById("root");
const root = createRoot(container!);
const App = () => {
 
  return (
    <CategoryList/>
  );
}

root.render(
  <App/>
);