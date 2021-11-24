const Subscription = require("../Model/Subscription");

const createSubscribe = async (req, res) => {
  console.log(req.body);
  const Subscriptions = new Subscription({
    mail: req.body.email,
  });
  await Subscriptions.save();
  res.status(201).json({ message: "Thanks for subscribe" });
};

module.exports = {
  createSubscribe,
};
