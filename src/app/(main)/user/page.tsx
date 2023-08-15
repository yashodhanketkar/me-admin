import { getUsers } from "./api";
import { UserCardFactory } from "./card";

const User = async () => {
  const users = await getUsers();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="px-2 text-xl font-bold text-red-600 font-comfortaa">
        Staff
      </h1>
      <div className="grid grid-cols-1 gap-4 p-2 text-black md:gap-2 xl:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {users
          .filter((user) => user.role === "admin")
          .map((user) => (
            <UserCardFactory key={user.id} user={user} />
          ))}
      </div>
      {users.filter((user) => user.role !== "admin").length > 0 && (
        <>
          <hr className="my-4 border-2 border-neutral-600" />
          <h1 className="px-2 text-xl font-bold text-red-600 font-comfortaa">
            Users
          </h1>
        </>
      )}
      <div className="grid grid-cols-1 gap-4 p-2 text-black md:gap-2 xl:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {users
          .filter((user) => user.role !== "admin")
          .map((user) => (
            <UserCardFactory key={user.id} user={user} />
          ))}
      </div>
    </div>
  );
};

export default User;
