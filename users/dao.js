import model from "./model.js";
// findbyId,findByIdAndDelete,findByID... does not need {} around id. it is a string.
// function is Async function, it returns a promise.

export const findAllUsersDao = () => model.find();
export const findUserByIdDao = (id) => model.findById(id); // ({_id: id}) is same as (id)
export const findUserByUserNameDao = (username) =>
  model.findOne({ username: username });
export const findUserByCredentialsDao = (username, password) =>
  model.findOne({ username: username, password: password }); // ({username,password}) es6 it can be collapse
export const findUserByRoleDao = (role) => model.find({ role: role }); // returns array of users
export const createUserDao = (user) => model.create(user);
export const updateSingleUserDao = (id, user) =>
  model.updateOne({ _id: id }, { $set: user }); // match id and set user
export const deleteUserDao = (id) => model.deleteOne({ _id: id }); // return deleted object
// export const deleteUserDao = (id) => model.findByIdAndDelete(id); // return deleted object

// export const updateUserDao = (id, user) => model.findByIdAndUpdate(id, user);

// export const findAllUsersDao = () => {
//     return model.find();
// }
