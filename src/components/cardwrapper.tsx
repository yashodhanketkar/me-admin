import { ScrollArea } from "@/components/ui/scroll-area";

interface CardWrapperProps {
  render: React.ReactNode;
  title: string;
  description: string;
}

export const CardWrapper = ({
  render,
  title,
  description,
}: CardWrapperProps) => {
  return (
    <div className="h-[82vh] flex flex-col bg-card border text-card-foreground shadow-sm rounded-xl overflow-hidden">
      <div className="p-6 pb-4 shrink-0 border-b bg-muted/5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <h3 className="text-sm text-muted-foreground font-medium">
          {description}
        </h3>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-4 p-6">{render}</div>
      </ScrollArea>
    </div>
  );
};
