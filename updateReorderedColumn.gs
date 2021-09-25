function masterUpdateReordColumn(){

  if((today.getMonth()+1)%3 == 0){

    updateReordColumn(cleaningArr , cleaningSheet);

    updateReordColumn(pantryArr , pantrySheet);

    updateReordColumn(stationaryArr , stationarySheet);
    
  }
}

//This function is done
function updateReordColumn(arrInv , invSht){ // must repopulate the inventory arrays...it wont run consecutively

  for(var i = 1 ; i < orderArr.length ; i++){

    for(var j = 1 ; j < arrInv.length ; j++){

       if(orderArr[i][0] == arrInv[j][1]){

        invSht.getRange(j+1 , 8).setValue(orderArr[i][2]);

      }
    }
  }
}

