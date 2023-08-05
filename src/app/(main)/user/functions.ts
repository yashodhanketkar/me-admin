export const getUsers = async () => {
  const users = fetch("http://localhost:3000/api/v1/user")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.result);
      return data.result;
    })
    .catch((err) => console.log(err));

  return users;
};
