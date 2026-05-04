import { useHotkeys, useHotkeySequence } from "@tanstack/react-hotkeys";
import { useNavigate } from "@tanstack/react-router";

export const HotkeysProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const buttonClick = (id: string) => {
    window.document.getElementById(id)?.click();
  };

  useHotkeys([
    { hotkey: "Home", callback: () => navigate({ to: "/home" }) },
    { hotkey: "Shift+D", callback: () => navigate({ to: "/board" }) },
    { hotkey: "Shift+N", callback: () => buttonClick("new-button") },
    { hotkey: "/", callback: () => buttonClick("nav-search-input") },
    { hotkey: "Mod+K", callback: () => buttonClick("nav-search-input") },
  ]);

  useHotkeySequence(["B", "G"], () => buttonClick("theme-button"));

  return <>{children}</>;
};
