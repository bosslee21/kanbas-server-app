import * as dao from "./dao.js";

let currentUser = null;

function UserRoutes(app) {
  const findAllUser = async (req, res) => {
    const user = await dao.findAllUsersDao();
    res.json(user);
  };
  const findUserbyId = async (req, res) => {
    const { id } = req.params;
    const user = await dao.findUserByIdDao(id);
    res.json(user);
  };
  const findUserByUserName = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUserNameDao(username);
    res.json(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentialsDao(username, password);
    res.json(user);
  };

  const findUserByRole = async (req, res) => {
    const { role } = req.params;
    const user = await dao.findUserByRoleDao(role);
    res.json(user);
  };
  const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    const user = { username, password, role };
    const newUser = await dao.createUserDao(user);
    res.json(newUser);
  };
  app.get("/api/users/create/:username/:password/:role", createUser); // when api/user, run findAllUser function

  const updateUser = async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    const status = await dao.updateSingleUserDao(id, newUser);
    currentUser = await dao.findUserByIdDao(id);
    res.json(status); // return status, true or false for update
  };

  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateSingleUserDao(id, {
      firstName: newFirstName,
    });
    res.json(status); // return status, true or false for update
  };
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName); // when api/user, run findAllUser function

  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUserDao(id);
    res.json(status); // return status, true or false for update
  };

  const signin = async (req, res) => {
    // const {username, password} = req.body;
    const username = req.body.username;
    const password = req.body.password;
    const user = await dao.findUserByCredentialsDao(username, password);
    if (user) {
      currentUser = user;
      res.json(user);
    } else {
      res.sendStatus(403);
    }
  };
  app.post("/api/users/signin", signin);

  const signout = async (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };
  app.post("/api/users/signout", signout);

  const signup = async (req, res) => {};

  const account = async (req, res) => {
    // when signin, we can get the current user.
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.sendStatus(403);
      return;
    }
  };
  app.post("/api/users/account", account);
  app.post("/api/users", createUser);

  app.delete("/api/users/:id", deleteUser); // when api/user, run findAllUser function
  // RESTFUL API should only have primary key. in PARAM. :id is allowed.
  app.get("/api/users", findAllUser); // when api/user, run findAllUser function
  app.get("/api/users/:id", findUserbyId);
  app.get("/api/users/username/:username", findUserByUserName);
  app.get("/api/users/credentials/:username/:password", findUserByCredentials);
  app.get("/api/users/role/:role", findUserByRole);
  app.put("/api/users/:id", updateUser);
}

export default UserRoutes;

// app.get("/api/users/role/:role", (req, res) => {
//     const { role } = req.params;
//     dao.findUserByRoleDao(role)
//         .then(user => {
//             res.json(user);
//         })
//         .catch(error => {
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// });
