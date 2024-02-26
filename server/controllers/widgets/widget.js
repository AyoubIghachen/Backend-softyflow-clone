const jwt = require('jsonwebtoken');

const mongoose = require("mongoose");

const Widget = mongoose.model("Widget");

exports.createWidget = (req, res) => {
    const token = req.cookies.token;
    let userId;

    if (token) {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(400).json({ err: error });
            } else {
                userId = decodedToken._id;
                const widgetData = req.body;

                Widget.create(widgetData, userId)
                    .then(widget => {
                        res.status(200).json(widget);
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

exports.getWidgets = (req, res) => {
  Widget.find({})
    .then(widgets => {
      res.status(200).json(widgets);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};

exports.getSingleWidget = (req, res) => {
  const widgetId = req.params.widgetId;

  Widget.findOne({ _id: widgetId })
    .then(widget => {
      res.status(200).json(widget);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};

exports.updateWidget = (req, res) => {
  const widgetId = req.params.widgetId;
  const widgetData = req.body;

  Widget.updateOne({ _id: widgetId }, widgetData)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};

exports.deleteWidget = (req, res) => {
  const widgetId = req.params.widgetId;

  Widget.deleteOne({ _id: widgetId })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log("error", error);
      res.status(400).json({ err: error });
    });
};
