import { Header } from "@/components";

const Home = () => {
  return (
    <div className="fixed z-0 flex items-center justify-center w-screen h-screen">
      <div className="absolute top-0 w-full">
        <Header />
      </div>
      <div>
        <h1 className="flex flex-col text-2xl group">
          <p className="w-full text-left">Welcome to the</p>
          <p className="p-4 text-5xl font-bold text-white bg-red-500 group-hover:bg-neutral-200 group-hover:drop-shadow-glow rounded-es-xl rounded-se-xl group-hover:text-black ">
            Yashodhan | Admin
          </p>
          <p className="w-full text-right">panel</p>
        </h1>
      </div>
    </div>
  );
};

export default Home;
