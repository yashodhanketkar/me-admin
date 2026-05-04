import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { ButtonGroup } from "@/components/ui/button-group";
import * as c from "@/components/ui/card";
import { useSocialsQuery } from "@/store/query/social";
import type { Social } from "@/types";

import { UpdateSocial } from "../form/update";
import { DeleteButton } from "./delete";

export const SocialCard = ({ social }: { social: Social }) => {
  const { deleteSocialMutation } = useSocialsQuery();

  const deleteSocial = () => {
    deleteSocialMutation.mutate(social.id);
    toast.success("Deleted social");
  };

  return (
    <c.Card className="group relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-ring/20">
      <c.CardHeader>
        <div className="space-y-2">
          <c.CardDescription>{social.type}</c.CardDescription>
        </div>
        <c.CardTitle>{social.name}</c.CardTitle>
        <c.CardAction>
          <ButtonGroup className="mx-auto" orientation="horizontal">
            <UpdateSocial social={social} />
            <DeleteButton deleteSocial={deleteSocial} />
          </ButtonGroup>
        </c.CardAction>
      </c.CardHeader>
      <c.CardContent className="text-lg text-muted-foreground">
        <Link
          to={social.url}
          rel="noreferrer noopener nofollow"
          target="_blank"
        >
          {social.url}
        </Link>
      </c.CardContent>
    </c.Card>
  );
};
