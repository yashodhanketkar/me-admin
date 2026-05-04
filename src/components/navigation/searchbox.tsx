import { formatForDisplay } from "@tanstack/react-hotkeys";
import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import * as c from "@/components/ui/command";
import * as d from "@/components/ui/dialog";
import * as f from "@/components/ui/field";
import * as i from "@/components/ui/input-group";
import * as k from "@/components/ui/kbd";

import { HomePages, ManagePages } from "./links";
import type { NavPage } from "./types";

type SearchLink = Omit<NavPage, "serial"> & {
  description: string;
};

const links: SearchLink[] = [
  ...HomePages.map((page) => ({
    name: page.name,
    path: page.path,
    description: "Go to " + page.name.toLocaleLowerCase() + " page",
  })),
  ...ManagePages.map((page) => ({
    name: page.name,
    path: page.path,
    description: "Manage your " + page.name.toLocaleLowerCase(),
  })),
];

export const SearchBox = () => {
  const [open, setOpen] = useState(false);
  const inpuref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.document.getElementById("nav-search-input")?.blur();
  }, [open]);

  return (
    <d.Dialog open={open} onOpenChange={setOpen}>
      <d.DialogTrigger
        ref={inpuref}
        id="nav-search-input"
        className="outline-none"
      >
        <i.InputGroup>
          <i.InputGroupText className="mr-8 ml-2">Search...</i.InputGroupText>
          <i.InputGroupAddon>
            <SearchIcon />
          </i.InputGroupAddon>
          <i.InputGroupAddon align="inline-end">
            <k.KbdGroup>
              <k.Kbd>{formatForDisplay("/")}</k.Kbd>
              <k.Kbd>{formatForDisplay("Mod+K")}</k.Kbd>
            </k.KbdGroup>
          </i.InputGroupAddon>
        </i.InputGroup>
      </d.DialogTrigger>
      <d.DialogContent>
        <d.DialogHeader>
          <d.DialogTitle>Quick navigation</d.DialogTitle>
          <d.DialogDescription>
            Search for a page or type a link
          </d.DialogDescription>
        </d.DialogHeader>
        <c.Command>
          <c.CommandInput placeholder="Search for page..."></c.CommandInput>
          <c.CommandList className="mt-1">
            <c.CommandEmpty></c.CommandEmpty>
            <c.CommandGroup>
              {links.map((link) => (
                <NavItmes
                  key={link.name + link.path}
                  link={link}
                  setOpen={setOpen}
                />
              ))}
            </c.CommandGroup>
          </c.CommandList>
        </c.Command>
      </d.DialogContent>
    </d.Dialog>
  );
};

const NavItmes = ({
  link,
  setOpen,
}: {
  link: SearchLink;
  setOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({
      to: link.path,
    });
    setOpen(false);
  };

  return (
    <c.CommandItem onSelect={handleClick} className="mx-auto mb-1">
      <f.Field orientation="horizontal">
        <f.FieldTitle>{link.path}</f.FieldTitle>
        <f.FieldDescription>{link.description}</f.FieldDescription>
      </f.Field>
    </c.CommandItem>
  );
};
