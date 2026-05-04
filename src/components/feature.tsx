import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export const FeatureButton = ({
  featured = false,
  toggleFeatured,
}: {
  featured?: boolean;
  toggleFeatured: () => void;
}) => {
  return (
    <Button
      onClick={toggleFeatured}
      type="button"
      className="cursor-pointer"
      title={featured ? "Remove from featured" : "Add to featured"}
    >
      <Star
        className={`h-3 w-3 ${featured && "fill-[#FFB900] text-[#FFB900]"}`}
      />
      {featured ? "Remove from featured" : "Add to featured"}
    </Button>
  );
};
