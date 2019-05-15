var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// require fs and readline to make it available input from command line

try{
    // read file and parse JSON data from file named data.json from the example
  var jsonData = JSON.parse(fs.readFileSync('data.json'));
}catch (e){
  console.error('Invalid JSON file');
  console.error(e);
  process.exit(1);
}

console.log(`Type Selector:`);

rl.on('line', (input) => {
    // when user enters characters (stdin)
    
    // calling function searchSelector
    searchSelector(jsonData, input);
    
    // generating result for found results
    console.log(`Results found: ${foundResults}`);
    
    // counter for how many matching element found
    foundResults = 0;
})

var foundResults = 0;

var searchSelector = (data, text) => {
    // loop the current level
  for(var i in data){
      
     // if the current value is equeal to stdin (inserter characters)
    if(data[i] === text){
        // increment found results
      foundResults++;
      // stdout found result
      console.log(`############### FOUND ##############`);
      console.log(`#### \t\t\t\t ####`);
      console.log(`${foundResults}. ${text}`);
      console.log(JSON.stringify(data, null, 2));
      console.log(`#### \t\t\t\t ####`);
      console.log(`#####################################`);
    }

    // if type of value is array or object, so continue looping to those elements
    if(typeof data[i] === 'array' || typeof data[i] === 'object'){
        // call itself recursively
      searchSelector(data[i], text);
    }
  }
}
