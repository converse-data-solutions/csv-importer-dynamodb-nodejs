const dynamoose = require("dynamoose");

const TargetedCollection = dynamoose.model("companies", {
  id: String,
  affiliated_pages: Object,
  company_li_url: String,
  company_name: String,
  company_size: String,
  description: String,
  domain: String,
  employee_count_on_li: Number,
  employees: Object,
  follower_count: Number,
  funding_info: Map,
  headquarters: String,
  industries: String,
  locations: Object,
  logo: String,
  original_li_url: String,
  primary_loc_parsed: Map,
  products: Object,
  similar_pages: Object,
  specialties: String,
  type: String,
  website: String,
  founded: Number,
  jobs_count: Number,
  stock: Map,
});

module.exports = TargetedCollection;
