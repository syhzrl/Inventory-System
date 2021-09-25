function masterUpdateQOH(){

  cleaningSheet.getRange('H2:H').clear();
  pantrySheet.getRange('H2:H').clear();
  stationarySheet.getRange('H2:H').clear();

  if((today.getMonth()+1)%3 == 0){

    updateQOH(cleaningArr, cleaningSheet);

    updateQOH(pantryArr , pantrySheet);

    updateQOH(stationaryArr , stationarySheet);
    
  }
}

function updateQOH(invArray, invSheet) {

    for (var i = 1 ; i < orderArr.length ; i++){

    for (var j = 1 ; j < invArray.length ; j++){

      if(orderArr[i][0] == invArray[j][1]){

       invSheet.getRange(j+1 , 7).setValue(orderArr[i][2] + invArray[j][6]);

      }
    }
  }
}


