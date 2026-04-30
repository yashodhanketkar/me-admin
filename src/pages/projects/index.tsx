import { CreateProject } from "./form/newProject";
import { ProjectsList } from "./list";

const ProjectsPage = () => {
  return (
    <>
      <ProjectsList />
      <CreateProject />
    </>
  );
};

export default ProjectsPage;
