type Project = {
  id: string;
  title: string;
  startYear: number;
  endYear?: number;
  description: string;
  url: string;
};

type User = {
  id: string;
  role: string;
  picture: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  profile: string;
};
