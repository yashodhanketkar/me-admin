import { useDashboardQuery } from "@/store/query/dashboard";

import { DashHero } from "./hero";
import { QuickLink } from "./quicklinks";
import { RecentProjects } from "./recents";
import { Stats } from "./stats";

export const BoardPage = () => {
  const { getDashboardQuery } = useDashboardQuery();
  const { data, isLoading, isError, error } = getDashboardQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <DashHero />
      <Stats data={data} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentProjects projects={data.projects} />
        <QuickLink />
      </div>
    </div>
  );
};

export default BoardPage;
