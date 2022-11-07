const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Choose one of the operation");
console.log("1) Given no parameters, return the latest portfolio value per token in USD");
console.log("2) Given a token, return the latest portfolio value for that token in USD");
console.log("3) Given a date, return the portfolio value per token in USD on that date");
console.log("4) Given a date and a token, return the portfolio value of that token in USD on that date");

rl.question(' press from 1 - 4: ',  (value) => {
    if(value === '1'){
        
        rl.close();

    }else if(value === '2'){
       
        rl.close();
    }else if(value === '3'){
        rl.question('Please insert the date in a given format yyyy-mm-dd: ', acceptedDate =>{
            rl.close()
        })
    }else if( value === '4'){
        rl.question('Please insert the date in a given format yyyy-mm-dd: ', acceptedDate =>{
            rl.question('Please insert token: ', acceptedToken =>{
              rl.close()
            })
        })
    }else{
        console.log("Incorrect");
    }
});

rl.on('close', function () {
  console.log('\nProcessing please wait....');
  process.exit(0);
});