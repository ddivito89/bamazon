var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost", port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err)
    throw err;
  }
);

function getOrder() {
  inquirer.prompt([
    {
      name: "itemId",
      message: "id of item?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }

    }, {
      name: "itemQty",
      message: "quantity?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function(answers) {
    var itemId = answers.itemId
    var itemQty = answers.itemQty

    var query = `SELECT stock_quantity, price, product_name FROM products where item_id = ${itemId}`;

    connection.query(query, function(err, res) {

      var stockQty = res[0].stock_quantity
      var price = res[0].price
      var product_name = res[0].product_name

      if (stockQty >= itemQty) {
        var query2 = `UPDATE products set stock_quantity = ${stockQty - itemQty} where item_id = ${itemId}`;
        connection.query(query2, function(err, res) {
          console.log(`order successful, your total is $${itemQty*price}`)
          displayAll()
        })
      } else {
        console.log("order failed, insufficient quantity")
        displayAll()
      }
    })
  })
}

function displayAll() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    console.log("Inventory:")
    for (var x=0; x<=res.length -1; x++){
      console.log(`Item ID ${res[x].item_id}: ${res[x].stock_quantity} ${res[x].product_name}s @ $${res[x].price}`)
    }
    getOrder()
  });
}

displayAll()
