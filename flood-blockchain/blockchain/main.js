const { Blockchain, Transaction, Block } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

// Your private key goes here

const crowdKey = ec.keyFromPrivate(
  "febbb625f699a22d33ef5a945c2c9b17be850655143782e0ad7fcdc422325b8f"
);
// From that we can calculate your public key (which doubles as your wallet address)

const crowdAddress = crowdKey.getPublic("hex");
const crowdCoin = new Blockchain();
var initialCount = 0;
// Create new instance of Blockchain class
module.exports = function (server, connection) {
  //server.get('/api/block', (req, res) => {
  connection.query(
    "SELECT block FROM block_chain_crowd",
    function (err, result) {
      if (err) throw err;

      if (result.length > 0) {
        initialCount = result.length;
        let previousChain = [];
        result.forEach((element) => {
          let block = Object.assign(
            new Block(),
            JSON.parse(
              Buffer.from(
                JSON.parse(JSON.stringify(element)).block.data
              ).toString()
            )
          );
          let transactions = [];
          block.transactions.forEach((tx) => {
            transactions.push(Object.assign(new Transaction(), tx));
          });
          block.transactions = transactions;
          previousChain.push(block);
        });
        crowdCoin.chain = previousChain;
        //console.log("sdfd: " +  Buffer.from(JSON.parse(resultOut).block.data).toJSON());
      } else {
        initialCount = 1;
        connection.query(
          "INSERT INTO block_chain_crowd (block) VALUES('" +
            JSON.stringify(crowdCoin.chain[0]) +
            "') ",
          function (err, result) {
            if (err) throw err;
          }
        );
      }

      // Create second transaction
      //const tx2 = new Transaction(key1Address, 'address1', 50);
      //tx2.signTransaction(key1);
      //crowdCoin.addTransaction(tx2);

      // Mine block
      //crowdCoin.minePendingTransactions(key1Address);
      console.log("crowdCoin valid?", crowdCoin.isChainValid() ? "Yes" : "No");
      //res.send("success");
    }
  );
  //});
  server.get("/api/block/getCrowdBlockChain", (req, res) => {
    res.status(200);
    res.send(crowdCoin);
  });
  server.get("/api/block/minerDetails", (req, res) => {
    let miner = {
      name: "CrowdMiner",
      balance: crowdCoin.getBalanceOfAddress(crowdAddress),
      bankerPublicKey: crowdAddress,
    };
    res.status(200);
    res.send(miner);
  });
  server.post("/api/block/createAndMineBlock", (req, res) => {
    let fromAddress = req.body.from_account.public_key;
    let toAddress = req.body.to_account.public_key;
    let fromPrivateKey = ec.keyFromPrivate(req.body.from_account.private_key);

    // Create a transaction & sign it with your key
    const tx1 = new Transaction(fromAddress, toAddress, {
      verifiedBy: req.body.verifiedBy,
      verifiedFor: req.body.verifiedFor,
      image_id: req.body.image_id,
    });
    tx1.signTransaction(fromPrivateKey);
    crowdCoin.addTransaction(tx1);

    // Mine block
    crowdCoin.minePendingTransactions(crowdAddress);

    //let saveBlock = crowdCoin.chain.length - initialCount;

    while (initialCount != crowdCoin.chain.length) {
      let blockToSave = crowdCoin.chain[initialCount];
      connection.query(
        "INSERT INTO block_chain_crowd (block) VALUES('" +
          JSON.stringify(blockToSave) +
          "') ",
        function (err, result) {
          if (err) throw err;
          if (result.insertId > 0) {
            connection.query(
              "UPDATE user_posts SET verified_count=50 " +
                " WHERE id = " +
                req.body.id +
                " AND image_id = " +
                req.body.image_id,
              function (err, result) {
                if (err) throw err;
              }
            );

            res.status(200);
            res.send("success");
          }
        }
      );
      initialCount = initialCount + 1;
    }
  });

  server.post("/api/block/rejectRequest", (req, res) => {
    connection.query(
      "UPDATE user_posts SET verified_count=-1 " +
        " WHERE id = " +
        req.body.id +
        " AND image_id = " +
        req.body.image_id,
      function (err, result) {
        if (err) throw err;
      }
    );

    res.status(200);
    res.send("success");
  });
};

console.log();
//console.log(`Balance of xavier is ${savjeeCoin.getBalanceOfAddress(key1Address)}`);

// Uncomment this line if you want to test tampering with the chain
// savjeeCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
