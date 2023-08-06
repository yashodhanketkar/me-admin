import Link from "next/link";
import { getProject } from "../api";
import { DeleteButton } from "./delete";

const SingleProject = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);
  return (
    <>
      <div className="absolute inline-flex gap-2 top-10 right-10">
        <DeleteButton id={project.id} />
        <Link href="/projects" className="add-button">
          Close
        </Link>
      </div>
      <div className="flex flex-col items-center gap-4 mx-5 my-20">
        <h1 className="text-4xl font-bold font-comfortaa">{project.title}</h1>
        <h2>
          {project.startYear} - {project?.endYear}
        </h2>
        <span>{project.description}</span>
        <a
          href={project.url}
          className="add-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </div>
    </>
  );
};

export default SingleProject;
