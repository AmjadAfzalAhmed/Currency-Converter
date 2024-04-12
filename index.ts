import inquirer from "inquirer"; //imported inqurier package from npm
import chalk from "chalk"; //imported chalk package from npm
import chalkAnimation from "chalk-animation";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  let multiColor = chalkAnimation.rainbow(
    `\n*-*-*- WELCOME TO THE CURRENCY EXHANGE -*-*-*
                            \n ----- Created by Amjad Afzal Ahmed -----\n`
  );

  await sleep();
  multiColor.stop();
}

await welcome();

let rate:any = {
  USD: 1,
  GBP: 0.79,
  EURO: 0.92,
  PKR: 277.54
};//defined exchange rate in an object having type any

let answer = await inquirer.prompt([
  {
      name: "from",
      message: chalk.whiteBright.bold("Enter the exchange currency:"),
      type: "list",
      choices: ["USD", "GBP", "EURO", "PKR"]
  },
  {
      name: "to",
      message: chalk.blue.bold("Enter the currency in which you need the conversion"),
      type: "list",
      choices: ["USD", "GBP", "EURO", "PKR"]
  },
  {
      name: "amount",
      message: chalk.yellow("Enter the amount:"),
      type: "number"
  }
]);//the answer object contains from to and amount property for proper exchange creation
let { from, to, amount } = answer;//destructured answer object 
let output: number = amount / rate[from] * rate[to];//applied result with formula to exchange currency

console.log(`${chalk.magenta.bold.underline("\nYour Currency has been Exchanged to Your Desired One")} ${chalk.whiteBright.bold(output.toFixed())}`);//final message

let question = await inquirer.prompt({
  name: "continue",
  message: chalk.green.bold("Would You Like to do any more Conversions?"),
  type: "list",
  choices: ["Yes", "No"]
});

while (question.continue === "Yes") {
  answer = await inquirer.prompt([
      {
          name: "from",
          message: chalk.blue("Enter the exchange currency:"),
          type: "list",
          choices: ["USD", "GBP", "EURO", "PKR"]
      },
      {
          name: "to",
          message: chalk.yellow.bold("Enter the currency in which you need the conversion"),
          type: "list",
          choices: ["USD", "GBP", "EURO", "PKR"]
      },
      {
          name: "amount",
          message: chalk.blue.bold("Enter the amount:"),
          type: "number"
      }
  ]);

  ({ from, to, amount } = answer);
  output = (amount / rate[from]) * rate[to];

  console.log(`${chalk.magenta.bold.underline("\nYour Currency has been Exchanged to Your Desired One")} ${chalk.whiteBright.bold(output.toFixed())}`);

  question = await inquirer.prompt({
      name: "continue",
      message: chalk.whiteBright("Would You Like to do any more Conversions?"),
      type: "list",
      choices: ["Yes", "No"]
  });
}
while(question.continue == "No"){
  async function thanxMsg() {
    let multiColors = chalkAnimation.rainbow(
      `\n*-*-*- THANK YOU FOR USING THE CURRENCY CONVERTER -*-*-* `
    );
  
    await sleep();
    multiColors.stop();
  }

  await thanxMsg();
  break;
//   console.log(chalk.magentaBright.bold("\nThank You for using the Currency Converter"));
//   break;
}