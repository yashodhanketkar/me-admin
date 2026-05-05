import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import * as c from "@/components/ui/card";

export const QuickLink = () => {
  return (
    <c.Card className="col-span-3">
      <c.CardHeader>
        <c.CardTitle>Quick Links</c.CardTitle>
      </c.CardHeader>
      <c.CardContent className="grid grid-cols-1 gap-2">
        <QLink to="/skills" label="Manage Skills" />
        <QLink to="/experience" label="Update Experience" />
        <QLink to="/social" label="Social Connections" />
      </c.CardContent>
    </c.Card>
  );
};

export const QLink = ({ to, label }: { to: string; label: string }) => (
  <Button variant="outline" className="justify-start w-full font-medium">
    <Link to={to}>{label}</Link>
  </Button>
);
