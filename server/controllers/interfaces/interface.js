const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Interface = mongoose.model("Interface");

// Token to extract user id
exports.createInterface = (req, res) => {
  const token = req.cookies.token;
  let userId;

  if (token) {
      jwt.verify(token, req.app.get('jwt-secret'), (err, decodedToken) => {
          if (err) {
              console.log(err);
              res.status(400).json({ err: error });
          } else {
              userId = decodedToken._id;
              const widgetsData = Array.isArray(req.body.widget) ? req.body.widget : [req.body.widget];

              Interface.create(widgetsData, userId)
                  .then(interface => {
                      res.status(200).json(interface);
                  })
                  .catch(error => {
                      console.log("error", error);
                      res.status(400).json({ err: error });
                  });
          }
      });
  } else {
      res.status(401).json({ err: 'No token provided' });
  }
};


exports.getInterfaces = (req, res) => {
  Interface.find({})
    .then(interfaces => {
      res.status(200).json(interfaces);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};


exports.getSingleInterface = (req, res) => {
  const interfaceId = req.params.interfaceId;

  Interface.findOne({ _id: interfaceId })
    .then(interface => {
      res.status(200).json(interface);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};


exports.getSingleInterfaceRender = (req, res) => {
  const interfaceId = req.params.interfaceId;

  Interface.findOne({ _id: interfaceId })
    .then(interface => {
      res.render('interface', { interface: interface.toObject() });
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};


exports.updateInterface = (req, res) => {
  const interfaceId = req.params.interfaceId;
  const interfaceData = req.body;

  Interface.updateOne({ _id: interfaceId }, interfaceData)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};


exports.deleteInterface = (req, res) => {
  const interfaceId = req.params.interfaceId;

  Interface.deleteOne({ _id: interfaceId })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};
