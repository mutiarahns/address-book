const getGithubUsers = async () => {
  const response = await fetch("https://api.github.com/users");
  const users = await response.json();

  return users;
};

getGithubUsers().then((data) => {
  console.log(data);
});
