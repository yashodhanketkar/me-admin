import { Avatar } from "@mui/material";
import Link from "next/link";

export const UserCardFactory = async ({ user }: { user: User }) => {
  return (
    <Link
      href={`user/${user.id}`}
      className="flex flex-col items-center justify-center gap-1 p-4 text-white bg-white/25 aspect-video rounded-xl"
    >
      <Avatar
        src={user.picture || ""}
        alt="user-avatar"
        sx={{
          width: "7rem",
          height: "7rem",
          fontSize: "2rem",
          backgroundColor: " white",
        }}
      >
        {user.firstName.charAt(0)}
        {user.lastName.charAt(0)}
      </Avatar>
      <h1>
        <span>{user.firstName}</span>
        <span>{user.lastName}</span>
      </h1>
      <h2>@{user.username}</h2>
      <h3>{user.role}</h3>
    </Link>
  );
};
