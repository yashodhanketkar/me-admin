export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-muted/20 px-6 py-4 text-muted-foreground">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span>&copy; {year}</span>
          <span className="text-foreground">Yashodhan Ketkar</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-medium opacity-50 uppercase tracking-normal italic">
              Powered by
            </span>
            <span>AWS Lambda</span>
          </div>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>MongoDB Atlas</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>Go</span>
        </div>
      </div>
    </footer>
  );
};
