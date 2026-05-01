import { CreatePublication } from "./form/add";
import { PublicationsList } from "./list";

const PublicationsPage = () => {
  return (
    <>
      <PublicationsList />
      <CreatePublication />
    </>
  );
};

export default PublicationsPage;
