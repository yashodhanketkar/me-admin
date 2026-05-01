import { useQuery } from "@tanstack/react-query";

import { fetchEducations } from "@/api/education";
import { fetchProjects } from "@/api/project";
import { fetchPublications } from "@/api/research";
import { fetchSkills } from "@/api/skills";

const fetchDashboard = async () => {
  const [projects, skills, publication, educations] = await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchPublications(),
    fetchEducations(),
  ]);

  return {
    projects,
    skills,
    publication,
    educations,
  };
};

export const useDashboardQuery = () => {
  const getDashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  return {
    getDashboardQuery,
  };
};
