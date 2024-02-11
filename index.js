const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const initDynamoDB = require("./config");
const TargetedCollection = require("./model");

const { marshall } = require("@aws-sdk/util-dynamodb");

// Initialize AWS DynamoDb
initDynamoDB();

// Read the CSV file
const contents = fs.readFileSync(__dirname + "/companies.csv", "utf-8");
// console.log("contents", contents[0]);

// contents[0] = [];

const data = parse(contents, { columns: true });

const records = [];
data.forEach((element) => {
  for (const [key, value] of Object.entries(element)) {
    if (
      [
        "affiliated_pages",
        "employees",
        "funding_info",
        "locations",
        "primary_loc_parsed",
        "products",
        "similar_pages",
        "stock",
      ].includes(key)
    ) {
      // console.log(key, value);

      if (value && typeof value === "string") {
        try {
          parsed_val = value;
          parsed_val = JSON.parse(value);
        } catch (e) {
          console.log("initial json parse error", e);
        }

        try {
          parsed_val = eval(value);
        } catch (e) {
          console.log("eval error", element.id, e);
        }

        try {
          parsed_val = value.replace(/\'/g, '"');
          parsed_val = eval(parsed_val);
        } catch (e) {
          console.log("eval error with single quote replace", element.id, e);
        }

        try {
          parsed_val = value.replace(/\'/g, '"');
          parsed_val = JSON.parse(parsed_val);
        } catch (e) {
          console.log("eval error with single quote replace", element.id, e);
        }
      } else {
        parsed_val = value;
      }
      element[key] = parsed_val;
    }
  }

  // console.log(element);

  records.push(marshall(element));
  // records.push(element);
});

console.log(records[0]);

// Import it into DynamoDB
try {
  response = TargetedCollection.batchPut([records[0]]);

  // response.then(function (res) {
  //   console.log("response", res);
  //   console.log("completed");
  // });
} catch (e) {
  console.log("errors", e);
}
