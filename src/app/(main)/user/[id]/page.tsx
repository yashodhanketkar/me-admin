import { getUser } from "../api";

const SingleUser = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

  return (
    <div className="text-black bg-white">
      <p className="font-bold">{JSON.stringify(user)}</p>
    </div>
  );
};

export default SingleUser;
