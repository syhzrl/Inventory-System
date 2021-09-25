var today = new Date();

var parentFolder = DriveApp.getFolderById('1NH9JCmvj3cElfqNHlr5wQOzhuruXWtjb'); //set folder Subang as the parent folder
var tempFolder = parentFolder.getFoldersByName(today.getFullYear());
var invFile = DriveApp.getFileById('14dCRlNY8P-k8j7rMJLoi3CFutrqCxwRRZZlgvtPsV_A');
var iocFile = DriveApp.getFileById('1IhClKHNuxt4r7klTUPE3-FurEKYDQooY6R-fr3AhS2A');

var iocSheet = SpreadsheetApp.openById('1IhClKHNuxt4r7klTUPE3-FurEKYDQooY6R-fr3AhS2A');
var iocTab = iocSheet.getSheetByName('IOC');

var destFolderId; 
var fold;
var dest;

function generateHistory() {

  if(tempFolder.hasNext()) { 

    destFolderId = tempFolder.next().getId(); 
  }

  fold = DriveApp.getFolderById(destFolderId);
  
  switch(today.getMonth()){

    case 2:
      dest = fold.createFolder('Jan - Mar');
      invFile.makeCopy('Inventory Jan - Mar',dest);
      iocFile.makeCopy('IOC Jan - Mar',dest);
      break;

    case 5:
      dest = fold.createFolder('Apr - June');
      invFile.makeCopy('Inventory Apr - June',dest);
      iocFile.makeCopy('IOC Apr - June',dest);
      break;

    case 8:
      dest = fold.createFolder('July - August');
      invFile.makeCopy('Inventory July - August',dest);
      iocFile.makeCopy('IOC July - August',dest);
      break;

    case 11:
      dest = fold.createFolder('Sept - Dec');
      invFile.makeCopy('Inventory Sept - Dec',dest);
      iocFile.makeCopy('IOC Sept - Dec',dest);
      parentFolder.createFolder(today.getFullYear() + 1); // create another folder for next year
      break;
  }

  orderSheet.getRange('A2:C').clear();
  iocTab.getRange('A2:G').clearContent();
}

