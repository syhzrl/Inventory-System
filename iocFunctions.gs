var ss = SpreadsheetApp.openById('1IhClKHNuxt4r7klTUPE3-FurEKYDQooY6R-fr3AhS2A');
var iocSheet = ss.getSheetByName('IOC');

var today = new Date();
var currEmail = Session.getActiveUser().getEmail();

var inventorySheet = SpreadsheetApp.openById('14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A');
var cleaningSheet = inventorySheet.getSheetByName('Cleaning');
var pantrySheet = inventorySheet.getSheetByName('Pantry');
var stationarySheet = inventorySheet.getSheetByName('Stationary');

var cleaningArr = cleaningSheet.getDataRange().getValues();
var pantryArr = pantrySheet.getDataRange().getValues();
var stationaryArr = stationarySheet.getDataRange().getValues();
var iocArr = iocSheet.getDataRange().getValues();

function userButton(){
  setEmailAndDate();
  setFormula();
  SpreadsheetApp.getUi().alert('Success');
}

function clearButton(){
  clearFormula();
  clearEmailAndDate();
  SpreadsheetApp.getUi().alert('Cleared');
  updateQOH(cleaningArr, cleaningSheet);
  updateQOH(pantryArr, pantrySheet);
  updateQOH(stationaryArr, stationarySheet);
}

function setEmailAndDate(){
  iocSheet.getRange(2, 9).setValue(currEmail);
  iocSheet.getRange(2, 10).setValue(today);
}

function clearEmailAndDate(){
  iocSheet.getRange(2, 9).clearContent();
  iocSheet.getRange(2, 10).clearContent();
}

function setFormula(){
  for (var i = 1 ; i <= iocSheet.getLastRow() ; i++){
    if((iocSheet.getRange(i, 1).isBlank())){

      iocSheet.getRange(i, 2).setFormula('=ARRAYFORMULA(IF(A'+ i +':A<>"",VLOOKUP(A'+ i +':A,{IMPORTRANGE("https://docs.google.com/spreadsheets/d/14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A/edit#gid=0","Cleaning!A2:B");IMPORTRANGE("https://docs.google.com/spreadsheets/d/14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A/edit#gid=0","Pantry!A2:B");IMPORTRANGE("https://docs.google.com/spreadsheets/d/14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A/edit#gid=0","Stationary!A2:B")},2,0),""))');

      iocSheet.getRange(i, 5).setFormula('=ARRAYFORMULA(IF(A'+ i +':A<>"",VLOOKUP(A'+ i +':A,{IMPORTRANGE("https://docs.google.com/spreadsheets/d/14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A/edit#gid=0","Cleaning!A2:G");IMPORTRANGE("https://docs.google.com/spreadsheets/d/14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A/edit#gid=0","Pantry!A2:G");IMPORTRANGE("https://docs.google.com/spreadsheets/d/14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A/edit#gid=0","Stationary!A2:G")},7,0)+C'+ i +':C - D'+ i +':D,""))');

      iocSheet.getRange(i, 6).setFormula('=ARRAYFORMULA(IF(A' + i +':A<>"",I2,""))');
      iocSheet.getRange(i, 7).setFormula('=ARRAYFORMULA(IF(A' + i +':A<>"",TEXT(J2,"dd/mm/yyyy"),""))');
      break;
    }
  }
}

function clearFormula(){

  var tempArr = [];

  for (var i = 1 ; i < iocArr.length ; i++){
    if(iocArr[i][0] != ""){
      tempArr.push([iocArr[i][1], iocArr[i][4], iocArr[i][5] , iocArr[i][6]]);
    }
  }

  for (var i = 0 ; i < tempArr.length ; i++){
    iocSheet.getRange(i+2, 2).setValue(tempArr[i][0]);
    iocSheet.getRange(i+2, 5).setValue(tempArr[i][1]);
    iocSheet.getRange(i+2, 6).setValue(tempArr[i][2]);
    iocSheet.getRange(i+2, 7).setValue(tempArr[i][3]);
  }
}

function updateQOH(invArray, invSheet) {

  for (var i = 1 ; i < iocArr.length ; i++){

    for (var j = 1 ; j < invArray.length ; j++){

      if(iocArr[i][1] == invArray[j][1]){

       invSheet.getRange(j+1 , 7).setValue(iocArr[i][4]);

      }
    }
  }
}
