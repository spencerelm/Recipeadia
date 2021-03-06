// from recipeData.js
var entries = recipeData;

var searchDict = {};

// define the variable to hold final table data
var totData = [];

//function we will use for ingredient search
function searchIngredients(searchTerms, entryArray) {
  console.log("Began search for")
  console.log(searchTerms);
  var found = false;
  var hasFound = [];
  returnArray = [];
  for (var entry of entryArray) {
    hasFound = [];
    for (var term of searchTerms){
      //make an array out of the string of an array that we have right now so we can loop through it
      ingredientsArray = entry["Ingredients"].replace(/[\[\]']+/g, '').split(",");
      console.log(ingredientsArray)
      for (var ing of ingredientsArray) {
        ing = ing.toLowerCase();
        if (ing.includes(term)) {
          found = true;
        }
      }
      //if it found the ingredient it'll push true, otherwise will push false
      hasFound.push(found);
      //reset found
      found = false;
    } //ends looping through each search term

    //if all the terms in the search array are true then conditional will be true, and we'll save the recipe
    console.log(hasFound)
    if(hasFound.every(Boolean)){
      returnArray.push(entry);
    }
  } // ends looping through each entry
  return returnArray;
} //ends function

//BUTTON CLICKS HANDLING BELOW

// this is if they click the ingredient query
var ingClick = d3.select("#filterBtnIng");
ingClick.on("click", function() {
  //don't refresh the page
  d3.event.preventDefault();
  if(d3.select("#ing1").property("value")){
    searchDict["Ing1"] = [d3.select("#ing1").property("value")]; }
  if(d3.select("#ing2").property("value")){
    searchDict["Ing2"] = [d3.select("#ing2").property("value")]; }
  if(d3.select("#ing3").property("value")){
    searchDict["Ing3"] = [d3.select("#ing3").property("value")]; }
})

//this is if they click the dietary restrictions query
var dietClick = d3.select("#filterBtnDiet");
dietClick.on("click", function() {
  d3.event.preventDefault();
  searchDict["Restrictions"] = [];
  if(d3.select("#pork").property("checked")){
    searchDict["Restrictions"].push("Pork") }
  if(d3.select("#chicken").property("checked")){
    searchDict["Restrictions"].push("Chicken") }
  if(d3.select("#beef").property("checked")){
    searchDict["Restrictions"].push("Beef") }
  if(d3.select("#milk").property("checked")){
    searchDict["Restrictions"].push("Milk") }
  if(d3.select("#cheese").property("checked")){
    searchDict["Restrictions"].push("Cheese") }
  if(d3.select("#butter").property("checked")){
    searchDict["Restrictions"].push("Butter") }
  if(d3.select("#eggs").property("checked")){
    searchDict["Restrictions"].push("Eggs") }
  if(d3.select("#sugar").property("checked")){
    searchDict["Restrictions"].push("Sugar") }
  if(d3.select("#peanuts").property("checked")){
    searchDict["Restrictions"].push("Peanuts") }
  if(d3.select("#walnuts").property("checked")){
    searchDict["Restrictions"].push("Walnuts") }
  if(d3.select("#almonds").property("checked")){
    searchDict["Restrictions"].push("Almonds") }
  if(d3.select("#cashews").property("checked")){
    searchDict["Restrictions"].push("Cashews") }
})

//this is if they click the duration query
var durClick = d3.select("#filterBtnDur");
durClick.on("click", function() {
  d3.event.preventDefault();
  searchDict['Duration'] = {};
  if(d3.select("#days").property("value")){
    searchDict.Duration.days = [d3.select("#days").property("value")]; }
  if(d3.select("#hours").property("value")){
    searchDict.Duration.hours = [d3.select("#hours").property("value")]; }
  if(d3.select("#mins").property("value")){
    searchDict.Duration.mins = [d3.select("#mins").property("value")]; }
})

//input is what the user enters into the form
var filterClick = d3.select("#filterButt");
filterClick.on("click", function(){
  console.log(searchDict);

  // Remove existing table, if there is one
  d3.select("#dataTable").remove();

  //reset the form inputs
  d3.select("#days").node().value = "";
  d3.select("#hours").node().value = "";
  d3.select("#mins").node().value = "";

  d3.select("#pork").node().checked = false;
  d3.select("#chicken").node().checked = false;
  d3.select("#beef").node().checked = false;
  d3.select("#milk").node().checked = false;
  d3.select("#cheese").node().checked = false;
  d3.select("#butter").node().checked = false;
  d3.select("#eggs").node().checked = false;
  d3.select("#sugar").node().checked = false;
  d3.select("#peanuts").node().checked = false;
  d3.select("#walnuts").node().checked = false;
  d3.select("#almonds").node().checked = false;
  d3.select("#cashews").node().checked = false;

  d3.select("#ing1").node().value = "";
  d3.select("#ing2").node().value = "";
  d3.select("#ing3").node().value = "";  

  //set a master table which we will keep splicing from in each button's chunk
  var masterTable = entries;
  
  var ingTable = [], durTable = [], dietTable = [];
  // if ingredients are used in search, it will execute the following
  if(searchDict.Ing1 || searchDict.Ing2 || searchDict.Ing3) {
    var searchArray = [];
    if (searchDict.Ing1) {searchArray.push(searchDict.Ing1[0].toLowerCase());}
    if (searchDict.Ing2) {searchArray.push(searchDict.Ing2[0].toLowerCase());}
    if (searchDict.Ing3) {searchArray.push(searchDict.Ing3[0].toLowerCase());}
    
    //refer to function start on line 15
    ingTable = searchIngredients(searchArray, masterTable);
    masterTable = ingTable;
    console.log(masterTable);
  }

  // if dietary restrictions are used, it will execute the following
  if (searchDict.Restrictions) {
    //set table equal to masterTable which would have already been modified if ingSearch was used, not modified if it wasn't used
    dietTable = masterTable;
    // var tempTable = [];
    var restrictions = searchDict.Restrictions;
    for (var idx = 0; idx < dietTable.length; idx++){
        for (var restrict of restrictions) {
            if (dietTable[idx][restrict]) {
                dietTable.splice(idx, 1);
                idx--;
                break;
            }
        }
    }

    masterTable = dietTable;
    console.log(masterTable);
  }
  
  // if duration is used in search, it will execute the following
  if (searchDict.Duration) {

    //set the temp modifying table to masterTable
    durTable = masterTable;

    var days, hours, mins;
    var dMin, hMin;
    if (searchDict.Duration.days) {
      days = searchDict.Duration.days[0];
      dMin = parseInt(days) * 1440;
    }
    else { dMin = 0;}

    if (searchDict.Duration.hours) {
      hours = searchDict.Duration.hours[0];
      hMin = parseInt(hours) * 60;
    }
    else { hMin = 0; }

    if (searchDict.Duration.mins) {
      mins = parseInt(searchDict.Duration.mins[0]);
    }
    else { mins = 0; }

    var searchTimeInMinutes = dMin + hMin + mins;
    console.log("search Time: " + searchTimeInMinutes);
    
    var entryDur;
    for (var j = 0; j < durTable.length; j++) {
        entryDur = durTable[j]["Duration"];
        console.log("entryDur: " + entryDur)

        var entryDays, entryHours, entryMinutes;
        if (entryDur=="X" || entryDur==""){
            entryTimeInMinutes = "nan";
        }
        else {
            if (entryDur.includes("d")) {
                var d = entryDur.indexOf("d");
                entryDays = parseInt(entryDur.substring(0,d));
            }
            if (entryDur.includes("h")) {
                var h = entryDur.indexOf("h");
                entryHours = parseInt(entryDur.substring(h-3,h));
            }
            if (entryDur.includes("m")) {
                var m = entryDur.indexOf("m");
                entryMinutes = parseInt(entryDur.substring(m-3,m));
            }
            var entryTimeInMinutes = entryDays * 1440 + entryHours * 60 + entryMinutes;
        }  

        if (isNaN(entryTimeInMinutes)) {
            entryTimeInMinutes = "nan";
        }
        console.log("entryTime: " + entryTimeInMinutes)
        //check if the entry is greater than the searchDuration or if it was not applicable
        if (entryTimeInMinutes > searchTimeInMinutes || entryTimeInMinutes == "nan") {
            durTable.splice(j, 1);
            j--;
        }
        //reset entry value checkers
        entryDays = 0;
        entryHours = 0;
        entryMinutes = 0;  
    }

    masterTable = durTable;
    console.log(masterTable)
  }

//set totData equal to manipulated masterTable
  totData = masterTable;

  // Replace the table body in order to append new swearch information
  d3.select("#recTable").append("tbody").attr("id","dataTable");
  
  // Build table based on totData
  var tbody = d3.select("tbody");

  var counter = 0;
  var tableClass;
  // Loop through totData and add a row for each entry
  totData.forEach(entry => {

    if (counter == 0) {
      counter = 1;
      tableClass = "table-primary";
    }
    else {
      counter = 0;
      tableClass = "table-light";
    }

    var row = tbody.append("tr").attr("class", tableClass).attr("style", "color:rgb(7, 20, 97); height: 2em");

    //photo
    if(entry["Recipe Photo"].substring(0,5) == "https") {
      var imgLink = entry["Recipe Photo"];    }
    else {
      var imgLink = "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/face-savouring-delicious-food.png" }

    row.append("td").html("<img src=" + imgLink + " height='105' width='120'>")

    //recipe
    row.append("td").text(entry["Recipe Name"]);
    //ingredients
    row.append("td").text(entry.Ingredients);
    //duration
    row.append("td").text(entry.Duration);
    //instructions
    row.append("td").text(entry.Instructions);
    //link
    row.append("td").text(entry.rlink);
    // ***table data is stored in totData ***
  }) //end filter click handling (Get Results button)
 
})