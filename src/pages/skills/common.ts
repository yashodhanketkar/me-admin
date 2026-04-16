import type { Skill } from "@/types/types";

export const skillFormatter = (data: Skill[]) => {
  return Object.values(
    data.reduce(
      (acc, { category, name }) => {
        if (!acc[category]) {
          acc[category] = { category, name: [] };
        }
        acc[category].name.push(name);
        return acc;
      },
      {} as Record<string, { category: string; name: string[] }>,
    ),
  );
};

export type SkillDict = ReturnType<typeof skillFormatter>;
