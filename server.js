const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "garcia",
  database: "top_songsDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected to mysql as id ${connection.threadId}`);
  initPrompt();
});

function initPrompt() {
  inquirer
    .prompt([
      {
        name: "action",
        message: "What do you want to search for?",
        type: "list",
        choices: ["ARTIST", "MULTI", "RANGE", "SONG", "EXIT"],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "ARTIST":
          artistSearch();
          break;
        case "MULTI":
          multiSearch();
          break;
        case "RANGE":
          rangeSearch();
          break;
        case "SONG":
          songSearch();
          break;
        default:
          connection.end();
          process.exit();
      }
    });
}

function artistSearch() {
  inquirer
    .prompt([
      {
        name: "artist",
        message: "What artist do you want to look for?",
      },
    ])
    .then((answer) => {
      connection.query(
        'SELECT position, song, year FROM top5000 WHERE ?',
        { artist: answer.artist },
        (err, result) => {
          if (err) throw err;
          console.table(result);
          initPrompt();
        }
      );
    });
  console.log("searching for artist");
}

function multiSearch() {
  console.log("searching");
  initPrompt();
}

function rangeSearch() {
  console.log("searching");
  initPrompt();
}

function songSearch() {
  console.log("searching");
  initPrompt();
}
