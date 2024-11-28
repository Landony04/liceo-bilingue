const login = (req, res) => {
  res.send("Desde API/USERS");
};

const profile = (req, res) => {
  res.send("DESDE API/USERS/PROFILE");
};

const register = (req, res) => {
  res.send("Desde API/USERS/REGISTER");
};

export { login, profile, register };
