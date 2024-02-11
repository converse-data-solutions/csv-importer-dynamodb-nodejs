const dynamoose = require("dynamoose");

const initDynamoDB = () => {
  dynamoose.AWS.config.update({
    accessKeyId: "AKIARPY37TSO6K6MNZI4",
    secretAccessKey: "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",
    region: "ap-south-1",
  });
};

module.exports = initDynamoDB;
