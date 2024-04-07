const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const EC = require("elliptic").ec;
const { Blockchain, Transaction, Block } = require("./blockchain/blockchain");

// You can use any elliptic curve you want
const ec = new EC("secp256k1");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));

// Generate a new key pair and convert them to hex-strings
app.post("/api/user/register", (req, res) => {
  // Check if the email is already taken
  con.query(
    "SELECT * FROM users WHERE first_name='" +
      req.query.first_name +
      "' OR email='" +
      req.body.email +
      "'",
    function (err, result) {
      if (err) throw err;
      resultOut = JSON.stringify(result);
      if (result.length > 0) {
        if (result[0].first_name === req.query.first_name) {
          res.status(422);
          res.send("First Name is already taken");
        } else if (result[0].email === req.body.email) {
          res.status(422);
          res.send("Email is already taken");
        }
      } else {
        // If neither first name nor email is taken, proceed with registration
        const key = ec.genKeyPair();
        const publicKey = key.getPublic("hex");
        const privateKey = key.getPrivate("hex");
        let sqlQuery =
          "INSERT INTO users (first_name,last_name,password,email,address,user_type,public_key,private_key,is_verified,phone,vounteer_proof)" +
          "VALUES ('" +
          req.body.first_name +
          "','" +
          req.body.last_name +
          "','" +
          req.body.password +
          "','" +
          req.body.email +
          "','" +
          req.body.address +
          "','" +
          req.body.user_type +
          "','" +
          publicKey +
          "','" +
          privateKey +
          "','" +
          "N" +
          "','" +
          req.body.phone +
          "','" +
          req.body.image_location +
          "')";

        con.query(sqlQuery, function (err, result) {
          if (err) throw err;
          resultOut = JSON.stringify(result);

          res.status(200);
          res.send(resultOut);
        });
      }
    }
  );
});

var con = mysql.createConnection({
  port: 3306,
  host: "localhost",
  database: "crowdsensing", //"floodblockchain",
  user: "root",
  password: "password",
});

app.get("/api/user/login", (req, res) => {
  let whereCondition =
    " WHERE id='" +
    req.query.userid +
    "' AND password= '" +
    req.query.password +
    "' AND user_type = '" +
    req.query.user_type +
    "'";

  con.query("SELECT * FROM users " + whereCondition, function (err, result) {
    if (err) throw err;
    resultOut = JSON.stringify(result);
    if (result.length > 0) {
      res.status(200);
      res.send(JSON.stringify(result[0]));
    } else {
      res.status(422);
      res.send("Invalid username/password/userType");
    }
  });
});

app.get("/api/users/all", (req, res) => {
  let whereCondition = " WHERE user_type IN ( 'regular','volunteer' ) ";

  con.query("SELECT * FROM users " + whereCondition, function (err, result) {
    if (err) throw err;
    resultOut = JSON.stringify(result);
    res.status(200);
    res.send(JSON.stringify(result));
  });
});
app.get("/api/users/id", (req, res) => {
  let whereCondition = " WHERE id = " + req.query.id;

  con.query("SELECT * FROM users " + whereCondition, function (err, result) {
    if (err) throw err;
    resultOut = JSON.stringify(result);
    res.status(200);
    res.send(JSON.stringify(result[0]));
  });
});
app.get("/api/user/approval", (req, res) => {
  let whereCondition = " WHERE id = " + req.query.id;
  let sqlStatement =
    "UPDATE USERS SET is_verified = '" +
    req.query.is_verified +
    "' " +
    whereCondition;
  con.query(sqlStatement, function (err, result) {
    if (err) throw err;
    resultOut = JSON.stringify(result);
    res.status(200);
    res.send(JSON.stringify(result));
  });
});

app.get("/api/account/statement", (req, res) => {
  let debitSql =
    "select a.from_account, a.to_account, a.block_id, a.last_upd_ts, b.block from blockchainbank.transaction_details a, blockchainbank.block_chain_bank b where a.block_id = b.block_id and from_account = " +
    req.query.account_number;
  let creditSql =
    "select a.from_account, a.to_account, a.block_id, a.last_upd_ts, b.block from blockchainbank.transaction_details a, blockchainbank.block_chain_bank b where a.block_id = b.block_id and to_account = " +
    req.query.account_number;
  let whereCondition = "";
  let debitList = [];
  let creditList = [];

  con.query(debitSql, function (err, result) {
    if (err) throw err;
    resultOut = JSON.stringify(result);
    if (result.length > 0) {
      result.forEach((element) => {
        let block = Object.assign(
          new Block(),
          JSON.parse(
            Buffer.from(
              JSON.parse(JSON.stringify(element)).block.data
            ).toString()
          )
        );
        let transfer_amount = "";
        let transfer_description = "";
        block.transactions.forEach((tx) => {
          let trans = Object.assign(new Transaction(), tx);
          if (trans.fromAddress !== null) {
            transfer_amount = trans.data.transferAmount;
            transfer_description = trans.data.transferDescription;
          }
        });

        let debitObject = {
          type: "debit",
          account_number: element.to_account,
          transfer_amount,
          transfer_description,
          last_upd_ts: element.last_upd_ts,
        };
        debitList.push(debitObject);
      });
    }
    con.query(creditSql, function (err, result) {
      if (err) throw err;
      resultOut = JSON.stringify(result);
      if (result.length > 0) {
        result.forEach((element) => {
          let block = Object.assign(
            new Block(),
            JSON.parse(
              Buffer.from(
                JSON.parse(JSON.stringify(element)).block.data
              ).toString()
            )
          );
          let transfer_amount = "";
          let transfer_description = "";
          block.transactions.forEach((tx) => {
            let trans = Object.assign(new Transaction(), tx);
            if (trans.fromAddress !== null) {
              transfer_amount = trans.data.transferAmount;
              transfer_description = trans.data.transferDescription;
            }
          });

          let creditObject = {
            type: "credit",
            account_number: element.from_account,
            transfer_amount,
            transfer_description,
            last_upd_ts: element.last_upd_ts,
          };
          creditList.push(creditObject);
        });

        res.status(200);
        res.send(
          JSON.stringify(
            debitList.concat(creditList).sort((a, b) => {
              return a.last_upd_ts - b.last_upd_ts;
            })
          )
        );
      } else {
        res.status(200);
        res.send({});
      }
    });
  });
});

app.post("/api/user/publish", (req, res) => {
  let sqlStatement =
    "INSERT INTO user_posts (id,place,details,contact_person,contact_no,image_location,first_name) VALUES (" +
    +parseInt(req.body.id) +
    " " +
    " ,'" +
    req.body.place +
    "','" +
    req.body.details +
    "','" +
    req.body.contact_person +
    "'," +
    req.body.contact_no +
    ",'" +
    req.body.image_location +
    "','" +
    req.body.first_name +
    "')";
  con.query(sqlStatement, function (err, result) {
    if (err) throw err;
    resultOut = JSON.stringify(result);

    res.send(JSON.stringify(result));
  });
});

app.get("/api/user/posts", (req, res) => {
  let sqlStatement = "SELECT * FROM user_posts ";
  if (req.query.id) {
    sqlStatement = sqlStatement + "WHERE id =" + req.query.id;
  }

  con.query(
    sqlStatement + " order by created_time desc",
    function (err, result) {
      if (err) throw err;
      resultOut = JSON.stringify(result);

      res.send(JSON.stringify(result));
    }
  );
});
app.post("/api/account/register", (req, res) => {
  con.query(
    "SELECT * FROM account_details WHERE user_name='" +
      req.query.user_name +
      "'",
    function (err, result) {
      if (err) throw err;
      resultOut = JSON.stringify(result);
      if (result.length > 0) {
        res.status(422);
        res.send("userName is taken");
      } else {
        const key = ec.genKeyPair();
        const publicKey = key.getPublic("hex");
        const privateKey = key.getPrivate("hex");
        let sqlQuery =
          "INSERT INTO account_details (customer_name,ifsc_code,branch_name,amount,user_name,password,email,address,phone,public_key,private_key)" +
          "VALUES ('" +
          req.body.customer_name +
          "','" +
          req.body.ifsc_code +
          "','" +
          req.body.branch_name +
          "'," +
          req.body.amount +
          ",'" +
          req.body.user_name +
          "','" +
          req.body.password +
          "','" +
          req.body.email +
          "','" +
          req.body.address +
          "'," +
          req.body.phone +
          ",'" +
          publicKey +
          "','" +
          privateKey +
          "')";

        con.query(sqlQuery, function (err, result) {
          if (err) throw err;
          resultOut = JSON.stringify(result);
          res.status(200);
          res.send(resultOut);
        });
      }
    }
  );
});
function escapeSpecialChars(jsonString) {
  return jsonString
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\t/g, " ")
    .replace(/\f/g, " ");
}
var blockchain = require("./blockchain/main.js");
blockchain(app, con);
