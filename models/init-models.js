var DataTypes = require("sequelize").DataTypes;
var _customers = require("./customers");
var _customers_buybox_regions = require("./customers_buybox_regions");
var _customers_eins = require("./customers_eins");
var _customers_email_domains = require("./customers_email_domains");
var _deals = require("./deals");
var _deals_listings = require("./deals_listings");
var _listings = require("./listings");
var _listings_properties = require("./listings_properties");
var _markets = require("./markets");
var _migrations = require("./migrations");
var _properties = require("./properties");
var _property_events = require("./property_events");
var _property_photos = require("./property_photos");
var _property_snapshots = require("./property_snapshots");
var _settings = require("./settings");
var _users = require("./users");

function initModels(sequelize) {
  var customers = _customers(sequelize, DataTypes);
  var customers_buybox_regions = _customers_buybox_regions(sequelize, DataTypes);
  var customers_eins = _customers_eins(sequelize, DataTypes);
  var customers_email_domains = _customers_email_domains(sequelize, DataTypes);
  var deals = _deals(sequelize, DataTypes);
  var deals_listings = _deals_listings(sequelize, DataTypes);
  var listings = _listings(sequelize, DataTypes);
  var listings_properties = _listings_properties(sequelize, DataTypes);
  var markets = _markets(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var properties = _properties(sequelize, DataTypes);
  var property_events = _property_events(sequelize, DataTypes);
  var property_photos = _property_photos(sequelize, DataTypes);
  var property_snapshots = _property_snapshots(sequelize, DataTypes);
  var settings = _settings(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    customers,
    customers_buybox_regions,
    customers_eins,
    customers_email_domains,
    deals,
    deals_listings,
    listings,
    listings_properties,
    markets,
    migrations,
    properties,
    property_events,
    property_photos,
    property_snapshots,
    settings,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
