import { Briefcase, Code2, GraduationCap, LayoutDashboard } from "lucide-react";

import * as c from "@/components/ui/card";
import type { DashData } from "@/types";

interface StatsProps {
  data: DashData;
}

export const Stats = ({ data }: StatsProps) => {
  const { projects, skills, publication, educations } = data;
  return (
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
        title="Publications"
        icon={<Briefcase />}
        value={publication.length}
        sub="Research publications"
      />
      <StatCard
        title="Education"
        icon={<GraduationCap />}
        value={educations.length}
        sub="Degrees"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  sub: string;
}

export const StatCard = ({ title, icon, value, sub }: StatCardProps) => (
  <c.Card className="bg-card/50 backdrop-blur">
    <c.CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <c.CardTitle className="text-sm font-medium">{title}</c.CardTitle>
      <div className="h-4 w-4 text-muted-foreground">{icon}</div>
    </c.CardHeader>
    <c.CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </c.CardContent>
  </c.Card>
);
