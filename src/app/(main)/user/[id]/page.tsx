const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="text-black bg-white">
      <p className="font-bold">{id}</p>
    </div>
  );
};

export default Page;
