import { CreateProject } from "./form/add";
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
