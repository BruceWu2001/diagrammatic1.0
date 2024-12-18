import { Outlet } from "react-router";

const WorkspaceLayout = () => {
    return (
      <>
        <h1>Workspace</h1>
        <Outlet /> {/* This is where the child routes render */}
      </>
    );
  };

export default WorkspaceLayout