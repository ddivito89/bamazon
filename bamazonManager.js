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

function manage() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What do you want to do?',
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
  ]).then(function(answers) {
    var choice = answers.choice

    switch (choice) {
      case 'View Products for Sale':
        viewProducts()
        break;
      case 'View Low Inventory':
        viewLowInventory()
        break;
      case 'Add to Inventory':
        addInventory()
        break;
      case 'Add New Product':
        addProduct()
        break;
      default:
    }
  })
}

function viewProducts() {
  var query = "SELECT * FROM products";

  connection.query(query, function(err, res) {
    console.log("Inventory:")

    for (var x = 0; x <= res.length - 1; x++) {
      console.log(`${res[x].item_id}: ${res[x].stock_quantity} ${res[x].product_name}s @ $${res[x].price}`)
    }
    manage()
  });
}

function viewLowInventory() {
  var query = "SELECT * FROM products where stock_quantity < 5 ";

  connection.query(query, function(err, res) {
    console.log("Low Inventory:")
    for (var x = 0; x <= res.length - 1; x++) {
      console.log(`${res[x].item_id}: ${res[x].stock_quantity} ${res[x].product_name}s @ $${res[x].price}`)
    }
    manage()
  });
}

function addInventory() {
  manage()
  
}

function addProduct() {

  manage()
}

manage()
