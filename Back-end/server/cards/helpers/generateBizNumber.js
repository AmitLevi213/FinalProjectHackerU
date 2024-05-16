const Card = require("../models/mongodb/Card");
const handleBadRequest = require("../../utils/handleErrors");
const loadash = require("lodash");

const generateBizNumber = async () => {
  try {
    const random = loadash.random(1000000, 9999999);
    const card = await Card.findOne({ bizNumber: random });
    if (card) {
      return generateBizNumber();
    } else {
      return random;
    }
  } catch (error) {
    return handleBadRequest("GenerateBizNumber", error);
  }
};

module.exports = generateBizNumber;
