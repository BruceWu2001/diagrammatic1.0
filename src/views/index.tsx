import { createRoot }  from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router";
import Home from "./Home";
import WorkspaceLayout from "./workspace/layout";
import TextView from "./workspace/TextView";
import FileContent from "./workspace/FileContent";



const container = document.getElementById("root");
const root = createRoot(container!);
const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="workspace" element={<WorkspaceLayout />}>
        <Route index element={<TextView />} />
        <Route path="content" element={<FileContent/>}/>
      </Route>
    </Routes>
  );
}

root.render(
  <MemoryRouter>
      <App/>
  </MemoryRouter>
);