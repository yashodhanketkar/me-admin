import { CreateProject } from "./form/newproject";
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
