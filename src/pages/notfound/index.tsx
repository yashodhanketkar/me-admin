import { Link } from "@tanstack/react-router";

import { useAuthStore } from "@/store/auth";

const NotFoundPage = () => {
  const { token } = useAuthStore();

  return (
    <div className="mt-[35vh]">
      <div>
        <h1 className="scroll-m-20 text-center font-semi tracking-tight text-balance mb-4 text-4xl">
          <span className="font-bold mb-6 text-6xl">404 | Not Found</span>
        </h1>
      </div>
      <div className="text-center text-muted-foreground mt-4 italic">
        {"Please return to "}
        <Link className="font-bold" to="/home">
          HomePage
        </Link>
        {!token && (
          <>
            <br />
            {"Or please sign in and try again "}
            <Link className="font-bold" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
