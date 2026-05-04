import { formatForDisplay } from "@tanstack/react-hotkeys";
import { Link } from "@tanstack/react-router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth";

const HomePage = () => {
  const { token } = useAuthStore();

  const loggedIn = !!token;

  return (
    <div className="mt-[35vh]">
      <div>
        <h1 className="scroll-m-20 text-center font-semi tracking-tight text-balance mb-4 text-4xl">
          <span>{"Welcome to "}</span>
          <span className="font-bold mb-6 text-6xl">Yashodhan | Admin</span>
        </h1>
      </div>
      {!loggedIn ? (
        <div className="text-center text-muted-foreground mt-4 italic">
          {"Please "}
          <Link className="font-bold" to="/login">
            login
          </Link>
          {" or "}
          <Link className="font-bold" to="/register">
            register
          </Link>
          {" to access."}
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger
            render={
              <div className="text-center text-muted-foreground mt-4 italic">
                {"Please visit "}
                <Link className="font-bold" to="/board">
                  dashboard
                </Link>
                {" for more info."}
              </div>
            }
          />
          <TooltipContent side="bottom">
            {formatForDisplay("Shift+D")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default HomePage;
