import Link from "next/link";
import { getProjects } from "./api";
import { AddProject } from "./create";

const ProjectFactory = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col items-center w-full gap-2 p-4 rounded-lg bg-white/10">
      <h2 className="inline-flex items-center justify-center w-full gap-2 text-2xl font-bold font-comfortaa">
        {project.title}
      </h2>
      <h3 className="text-base">({project?.endYear || project.startYear})</h3>
      <p className="w-full truncate text-ellipsis">{project.description}</p>
      <div className="inline-flex justify-center w-full gap-4">
        <Link
          className="text-center duration-100 w-fit lg:w-1/6 add-button"
          href={`projects/${project.id}`}
        >
          View
        </Link>
        <a
          className="inline-flex justify-center gap-1 text-center duration-100 w-fit lg:w-1/6 add-button"
          href={project.url}
          rel="noopener noreferrer"
        >
          <span className="hidden lg:block">Source</span>
          Code
        </a>
      </div>
    </div>
  );
};

const Project = async () => {
  const projects: Project[] = await getProjects();
  return (
    <>
      <AddProject />
      <div className="mx-5 my-20">
        <div className="flex flex-col gap-4">
          {projects &&
            projects.map((project) => (
              <ProjectFactory key={project.id} project={project} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Project;
