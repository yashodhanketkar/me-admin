import { Link } from "@tanstack/react-router";
import { Briefcase, Code2, GraduationCap, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardQuery } from "@/store/query/dashboard";

export const BoardPage = () => {
  const { getDashboardQuery } = useDashboardQuery();
  const { data, isLoading, isError, error } = getDashboardQuery;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  const { projects, skills, research, educations } = data;

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Yashodhan. Here's an overview of your portfolio data.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Projects"
          icon={<LayoutDashboard />}
          value={projects.length}
          sub={`${projects.filter((p) => p.featured).length} featured`}
        />
        <StatCard
          title="Skills"
          icon={<Code2 />}
          value={skills.length}
          sub={`${new Set(skills.map((s) => s.category)).size} categories`}
        />
        <StatCard
          title="Experience"
          icon={<Briefcase />}
          value={research.length}
          sub="Research publications"
        />
        <StatCard
          title="Education"
          icon={<GraduationCap />}
          value={educations.length}
          sub="Degrees"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your latest work entries.
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-2">
            <QuickLink to="/skills" label="Manage Skills" />
            <QuickLink to="/experience" label="Update Experience" />
            <QuickLink to="/social" label="Social Connections" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, icon, value, sub }: any) => (
  <Card className="bg-card/50 backdrop-blur">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </CardContent>
  </Card>
);

const QuickLink = ({ to, label }: { to: string; label: string }) => (
  <Button variant="outline" className="justify-start w-full font-medium">
    <Link to={to}>{label}</Link>
  </Button>
);

export default BoardPage;
