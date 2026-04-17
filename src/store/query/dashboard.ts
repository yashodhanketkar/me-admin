import { useQuery } from "@tanstack/react-query";

import { fetchEducations } from "@/api/education";
import { fetchProjects } from "@/api/project";
import { fetchResearchs } from "@/api/research";
import { fetchSkills } from "@/api/skills";

const fetchDashboard = async () => {
  const [projects, skills, research, educations] = await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchResearchs(),
    fetchEducations(),
  ]);

  return {
    projects,
    skills,
    research,
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
