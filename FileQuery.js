const fs = require('fs');

const readStream = fs.createReadStream('transactions.csv'); //create csv file stream which has to be placed in project folder
const nl = '\n';
const search =  function search (){
    let latestPortfilo = [];
    return new Promise(function(resolve,reject){  // surrond with promise so that to notify when it finish searching
        readStream.on('data',(chunk) => { // do the operation on the file by creating array of buffers and process them one by one
            let transactionsString = ''+chunk.toString();
            let countLine = 0;
            let row = "";
            for(let ch = 0; ch < transactionsString.length; ch++){
                if(transactionsString[ch] == nl){
                    countLine++;
                    var columns = row.split(',');
                    if(countLine >=2 ){
                        var transaction_type = columns[1];
                        var token = columns[2];
                        var amount = parseFloat(columns[3]);

                       
                        if(latestPortfilo[columns[2]]== null){  //check wheter the token is't in the object 

                            latestPortfilo[columns[2]]={token:token,portfilo:{date:columns[0],token:token,amount:amount}};

                        }else{
                            if(columns[1]==='DEPOSIT'){
                                amount = amount + parseFloat(latestPortfilo[columns[2]].portfilo.amount);
                            }else{
                                amount = amount - parseFloat(latestPortfilo[columns[2]].portfilo.amount);
                            }
                            latestPortfilo[columns[2]] = {token:token,portfilo:{date:columns[0],token:token,amount:amount}};
                        }
                    }
                    row="";
                }else{
                    row+=transactionsString[ch];
                }
            }
           
        });
    
        readStream.on('end',()=>{  //once it finished return the result
            resolve(latestPortfilo);
        });
        readStream.on('error',reject);
    })
    
}



const searchByDate =  function searchByDate (bound){
    let portfilo = [];
    return new Promise(function(resolve,reject){
        readStream.on('data',(chunk) => {
            let transactionsString = ''+chunk.toString();
            let countLine = 0;
            let row = "";
            for(let ch = 0; ch < transactionsString.length; ch++){
                if(transactionsString[ch] == nl){
                    countLine++;
                    var columns = row.split(',');
                    if(countLine >=2 ){
                        var transaction_type = columns[1];
                        var token = columns[2];
                        var amount = parseFloat(columns[3]);
                        if(bound >= columns[0]){
                            if(portfilo[columns[2]]== null){    
                                portfilo[columns[2]]={token:token,portfilo:{date:columns[0],token:token,amount:amount}};
                            }else{
                                if(columns[1]==='DEPOSIT'){
                                    amount = amount + parseFloat(portfilo[columns[2]].portfilo.amount);
                                }else{
                                    amount = amount - parseFloat(portfilo[columns[2]].portfilo.amount);
                                }
                                portfilo[columns[2]] = {token:token,portfilo:{date:columns[0],token:token,amount:amount}};
                            }
                        }
                        
                    }
                    row="";
                }else{
                    row+=transactionsString[ch];
                }
            }
           
        });
    
        readStream.on('end',()=>{
            resolve(portfilo);
        });
        readStream.on('error',reject);
    })
    
}



module.exports = {search,searchByDate};
