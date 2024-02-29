const mongoose = require("mongoose");
const User = mongoose.model("User");


exports.getUsers = (req, res) => {
  const findUser = () => {
    return User.find({}); // find all users
  };

  const respond = (userData) => {
    res.status(200).json(userData);
  };

  const onError = (error) => {
    console.log("error", error);
    res.status(400).json({ err: error });
  };

  findUser()
    .then(respond)
    .catch(onError);
};


exports.getSingleUser = (req, res) => {
  const userId = req.params.userId;

  const findUser = () => {
    return User.findOne({ _id: userId }).select('age role')
    // return User.findById(userId)
  }

  const respond = (userData) => {
    res.status(200).json(userData);
  };

  const onError = (error) => {
    console.log("error", error);
    res.status(400).json({ err: error });
  };

  findUser()
    .then(respond)
    .catch(onError);
};


exports.updateUser = (req, res) => {
  // const userId = req.params.userId;
  // let firstName = req.body.firstName;
  // const updateUser = () => {
  //   return User.updateOne({ _id: userId }, { firstName: firstName })
  // }

  const { userId : _id } = req.params;
  let {firstName} = req.body;
  const updateUser = () => {
    return User.updateOne({ _id }, { firstName })
  }

  const respond = (userData) => {
    res.status(200).json(userData);
  };

  const onError = (error) => {
    console.log("error", error);
    res.status(400).json({ err: error });
  };

  updateUser()
    .then(respond)
    .catch(onError);
};


exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  const deleteUser = () => {
    return User.deleteOne({ _id: userId })
    // return User.findById(userId)
  }

  const respond = (userData) => {
    res.status(200).json(userData);
  };

  const onError = (error) => {
    console.log("error", error);
    res.status(400).json({ err: error });
  };

  deleteUser()
    .then(respond)
    .catch(onError);
};

