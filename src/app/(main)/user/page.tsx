import { getUsers } from "./api";

const User = async () => {
  const users = await getUsers();
  return (
    <div className="text-black bg-white">
      <h1>Users</h1>
      <p>{JSON.stringify(users)}</p>
      <a href={`user/${users[0].id}`}>{users[0].id}</a>
    </div>
  );
};

export default User;
