# propine answer

# Dependencies
 - fs
 - readline
 - node-fetch
 - Cryptocompare

# Design decisions

#### fs
For a file like “transaction.csv” which size is more than 512mb to do any kind of operation we have to use createReadStream. So I chose createReadStream and I processed it chunk by chunk to make it really fast and also createReadStream has garbage collection so that it is more efficient in memory conception.

#### readline
So that the client need to choose from list of the operation on command line 


#### node-fetch
Because Crypto compare needs it as a global variable.


 
