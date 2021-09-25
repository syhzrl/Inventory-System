var invSpreadsheet = SpreadsheetApp.openById('14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A');
var cleaningSheet = invSpreadsheet.getSheetByName('Cleaning');
var pantrySheet = invSpreadsheet.getSheetByName('Pantry');
var stationarySheet = invSpreadsheet.getSheetByName('Stationary');

var ordSpreadsheet = SpreadsheetApp.openById('10KiPbREeazRa9QR-n9FVAJVAhuh-Lm7zqlaLb0WziS4');
var orderSheet = ordSpreadsheet.getSheetByName('Subang'); //no duplicates on other files change this by location

var cleaningArr = cleaningSheet.getDataRange().getValues();
var pantryArr = pantrySheet.getDataRange().getValues();
var stationaryArr = stationarySheet.getDataRange().getValues();
var orderArr = orderSheet.getDataRange().getValues();

var cleaningTempArr = [];
var pantryTempArr = [];
var stationaryTempArr = [];
var orderTempArr = [];


function masterOrder() {

  if((today.getMonth()+1)%3 == 0){

    generateOrder(cleaningArr, cleaningTempArr);

    generateOrder(pantryArr, pantryTempArr);

    generateOrder(stationaryArr, stationaryTempArr);

    tableFormat(orderSheet , orderTempArr);
  }

  generateOrder(cleaningArr, cleaningTempArr);

  generateOrder(pantryArr, pantryTempArr);

  generateOrder(stationaryArr, stationaryTempArr);

  tableFormat(orderSheet , orderTempArr);
}

//This function is done
function generateOrder(mainArray , tempArr){

  for(var i = 1 ; i < mainArray.length ; i++){

    if(mainArray[i][6] <= mainArray[i][3] && mainArray[i][3] != 0){

      orderTempArr.push([mainArray[i][1] , mainArray[i][3]]);

      tempArr.push([mainArray[i][1] , mainArray[i][3]]);
      
    }
  }
}

//This function is done
function tableFormat(sheet , array){

  sheet.getRange('A2:C').clear();

  for(var i = 0 ; i < array.length ; i++){

    sheet.getRange(i + 2 , 1).setValue(array[i][0]);

    sheet.getRange(i + 2 , 2).setValue(array[i][1]);

  }
}

