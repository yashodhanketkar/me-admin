import { CreateSocial } from "./form/add";
import { SocialsList } from "./list";

const SocialsPage = () => {
  return (
    <>
      <SocialsList />
      <CreateSocial />
    </>
  );
};

export default SocialsPage;
