const readline = require('readline');
const fileQuery = require('./FileQuery');
global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cryptoExchange = require('cryptocompare');
cryptoExchange.setApiKey('d8dd92daab6adcd43b885b36b44ba3b4248eff5a1a7921b068d9724f500246fc');

const rl = readline.createInterface({  //create command line interface so that a client can give a command
  input: process.stdin,
  output: process.stdout
});

console.log("Choose one of the operation");
console.log("1) Given no parameters, return the latest portfolio value per token in USD");
console.log("2) Given a token, return the latest portfolio value for that token in USD");
console.log("3) Given a date, return the portfolio value per token in USD on that date");
console.log("4) Given a date and a token, return the portfolio value of that token in USD on that date");

rl.question(' press from 1 - 4: ',  async (value) => {
    if(value === '1'){
       fileQuery.search()
       .then(latestPortfilo=>{
           for(let key in latestPortfilo){
                let element = latestPortfilo[key];
                 cryptoExchange.price(element.token,'USD').then(price=>{
                    let amount = price.USD * element.portfilo.amount;
                    console.log("Token:",element.token);
                    console.log("Date: "+new Date(element.portfilo.date*1000)+" amount: "+Number(Math.round(amount + 'e' + 2) + 'e-' + 2)+" $");

                }).catch(console.error);
            }
       });


    }else if(value === '2'){
        rl.question('Please insert token: ', acceptedToken =>{
            fileQuery.search()
            .then(latestPortfilo=>{
                
                 let element = latestPortfilo[acceptedToken];
                 cryptoExchange.price(element.token,'USD').then(price=>{
                     let amount = price.USD * element.portfilo.amount;
                     console.log("Token:",element.token);
                     console.log("Date: "+new Date(element.portfilo.date*1000)+" amount: "+Number(Math.round(amount + 'e' + 2) + 'e-' + 2)+" $");
                     rl.close();

                  }).catch(console.error);
             
            });
        })
       
    }else if(value === '3'){
        rl.question('Please insert the date in a given format YYYY-MM-DD: ', acceptedDate =>{
            let upperBound = new Date(acceptedDate).getTime()/1000;
            let lowwerBound = new Date(new Date(acceptedDate).getTime() + (24 * 60 * 60 * 1000)).getTime()/1000;

            fileQuery.searchByDate(upperBound)
            .then(portfilo=>{
                console.log("finished");
               
                for(let key in portfilo){
                    let element = portfilo[key];
                    cryptoExchange.price(element.token,'USD').then(price=>{
                        let amount = price.USD * element.portfilo.amount;
                        console.log("Token:",element.token);
                        console.log("Date: "+new Date(element.portfilo.date*1000)+" amount: "+Number(Math.round(amount + 'e' + 2) + 'e-' + 2)+" $ ");
    
                    }).catch(console.error);
                }
             
            });
        })
    }else if( value === '4'){
        rl.question('Please insert the date in a given format YYYY-MM-DD: ', acceptedDate =>{
            rl.question('Please insert token: ', acceptedToken =>{
                let upperBound = new Date(acceptedDate).getTime()/1000;
                fileQuery.searchByDate(upperBound)
                .then(portfilo=>{                   
                    let element = portfilo[acceptedToken];
                    cryptoExchange.price(element.token,'USD').then(price=>{
                        let amount = price.USD * element.portfilo.amount;
                        console.log("Token:",element.token);
                        console.log("Date: "+new Date(element.portfilo.date*1000)+" amount: "+Number(Math.round(amount + 'e' + 2) + 'e-' + 2)+" $");
                        rl.close();
    
                    }).catch(console.error);
                    
                 
                });
            })
        })
    }else{
        console.log("Incorrect");
    }
});

rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});