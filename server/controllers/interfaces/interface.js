const mongoose = require("mongoose");
const Interface = mongoose.model("Interface");


exports.createInterface = (req, res) => {
  const widgetsData = req.body.widget;
  let userId = req.decoded._id;

  const createInterface = () => {
    return Interface.create(widgetsData, userId);
  }

  const onResponse = (interface) => {
    res.status(200).json(interface);
  }
  const onError = (error) => {
    res.status(400).json({ err: error });
  }

  createInterface()
    .then(onResponse)
    .catch(onError);
};

// Create variable for the the callback function that will pass in p.then
// const onResponse and onError

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

  const findInterface = () => {
    return Interface.findOne({ _id: interfaceId });
  }
  // Mongo Data Object
  const renderInterface = (interface) => {
    res.render('interface', { interface: interface.toObject() });
  }
  
  const onError = () => {
    res.status(400).json({ err: error });
  }

  findInterface()
  .then(renderInterface)
  .catch(onError);

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
