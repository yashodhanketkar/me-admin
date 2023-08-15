import { Avatar } from "@mui/material";
import { getUser } from "../api";

const SingleUser = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <Avatar
        src={user.picture || ""}
        alt={user.id + "-picture"}
        sx={{
          width: "10rem",
          height: "10rem",
          fontSize: "4rem",
          backgroundColor: "error.dark",
          marginBottom: 4,
          color: "black",
          ":hover": {
            color: "primary.light",
            backgroundColor: "error.main",
          },
        }}
      >
        {user.firstName.charAt(0)}
        {user.lastName.charAt(0)}
      </Avatar>
      <h1 className="text-4xl font-bold">
        {`${user.firstName} ${user.lastName}`}
      </h1>
      <h3 className="inline-flex items-center gap-2">
        <span className="text-xl text-red-500">@{user.username}</span>
        <span
          className={
            user.role === "admin"
              ? "text-green-500 font-bold before:content-['-_']"
              : "text-inherit"
          }
        >
          {user.role}
        </span>
      </h3>
      <p>{user.profile}</p>
    </div>
  );
};

export default SingleUser;
