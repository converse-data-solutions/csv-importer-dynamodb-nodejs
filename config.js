const dynamoose = require("dynamoose");

const initDynamoDB = () => {
  dynamoose.AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-south-1",
  });
};

module.exports = initDynamoDB;
