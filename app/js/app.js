// Get Entity Data from CRM (Note: this only works within Zoho CRM)    
var buildingArray = [];
var buildingArrayFiltered = [];


ZOHO.embeddedApp.on("PageLoad",entity => {        // This is the information about the current record, if applicable.
            console.log(entity); 
            ZOHO.CRM.API.getAllRecords({Entity:"Immeubles"})
            .then(function(data){
            console.log(data);
            console.log(data.info.more_records);
            var resultBuilding = [];
            var resultLoan = [];
            Promise.resolve(resultBuilding = loadAllRecords("Immeubles")).then(setBuildingArray);


        }) });      
            // Initialize Widget Connection 
ZOHO.embeddedApp.init();


// Building array constructor; we take the promise result and push each building from each page from the promise to a temporary array then put tempArray into buildingArray
function setBuildingArray(result){
    buildingArray = result
    tempArray = [];
    buildingArray.forEach(buidingPage => {
        (buidingPage.data).forEach(building => {
            tempArray.push(building);
        });
    });
    buildingArray = tempArray
    buildingArrayFiltered = buildingArray;
    console.log(buildingArray);
}



// get all record from a specified module
async function loadAllRecords(moduleName) {
    var bool_more_records = true;
    var dataArray = [];
    var page = 1;
    while(bool_more_records == true){
        await ZOHO.CRM.API.getAllRecords({Entity:moduleName,page:page}).then(function(data){
            dataArray.push(data);
            console.log('more record?');
            bool_more_records = data.info.more_records;
            console.log(bool_more_records);
            page = page+1;
        }) 
        

    } 
   return dataArray;
  }

function filterByPrice(priceMin,priceMax){
    console.log('filterPrice start');

    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (building.Prix_d_achat >= priceMin && building.Prix_d_achat <= priceMax) {
            tempArray.push(building);
        }
    });
    
    console.log('filterPrice End');
    return 
    
}

// point of entry of the filter
async function filterBuilding(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess){
    console.log('filter');
    console.log(singleFamilyHome)
    await asyncFilter(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess);
    console.log('filter Done');
    console.log(tempArray[1].Owner);
}

// asynchronus filter ; call each filter
async function asyncFilter(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess){
    console.log('asyncfilter');
    buildingArrayFiltered = await filterOwnershipType(ownershipType);
    buildingArrayFiltered = await filterByPrice(priceMin,priceMax);
    await filterPropertyType(singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot);
    await filterBedrooms(bedroomNumber);
    await filterBathrooms(bathroomNumber);
    await filterParkings(parkingNumber);
    await filterGarages(garageNumber);
    await filterPiscine(piscine);
    await filterElevator(elevator);
    await filterAdaptedMobility(adaptedMobility);
    await filterWaterfront(waterfront);
    await filterWaterfrontAccess(waterfrontAccess);
    await filterNavigable(navigable);
    await filterResort(resort);
    await filterFurnished(furnished);
    await filterSemiFurnished(semiFurnished)
    console.log('asyncfilter Done');
}
//filter building by ownership type aka to buy or to rent
async function filterOwnershipType(ownershipType){
    console.log('filterOwnershipType start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (ownershipType == 'sell') {
            //if building ownershipType == sell add to temp array
        }
        if (ownershipType == 'buy') {
            //if building ownershipType == buy add to temp array
        }
    });
    console.log('filterOwnershipType Done');

    //return tempArray
    return buildingArrayFiltered
}

async function filterPropertyType(singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot){
    /*
    console.log('filterPropertyType start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
       switch (building.type) {
           case 'singleFamilyHome':
               if (singleFamilyHome == true) {
                   tempArray.push[building]
               }
               break;
            case 'condoApartment':
                if (condoApartment == true) {
                    tempArray.push[building]
                }
                break;
            case 'loftStudio':
               if (loftStudio == true) {
                   tempArray.push[building]
               }
               break;
            case 'intergenerational':
                if (intergenerational == true) {
                    tempArray.push[building]
                }
                break;
            case 'mobileHome':
               if (mobileHome == true) {
                   tempArray.push[building]
               }
               break;
            case 'hobbyFarm':
                if (hobbyFarm == true) {
                    tempArray.push[building]
                }
                break;
            case 'cottage':
               if (cottage == true) {
                   tempArray.push[building]
               }
               break;
            case 'lot':
                if (lot == true) {
                    tempArray.push[building]
                }
                break;

       } 
    });
    if (singleFamilyHome == true || condoApartment == true || loftStudio == true ||
         intergenerational == true || mobileHome == true || hobbyFarm == true || cottage == true || lot == true) 
    {
        buildingArrayFiltered = tempArray;
    }
    console.log('filterPropertyType end');


    */
    
}

function filterBedrooms(bedroomNumber){
    console.log('filterBedrooms start');
    /*
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (bedroomNumber == '1') {
            if (building.bedroomNumber == 1) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '2') {
            if (building.bedroomNumber == 2) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '3') {
            if (building.bedroomNumber == 3) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '4') {
            if (building.bedroomNumber == 4) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '5') {
            if (building.bedroomNumber == 5) {
                tempArray.push(building);
            }
        }

        if (bedroomNumber == '1+') {
            if (building.bedroomNumber >= 1) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '2+') {
            if (building.bedroomNumber >= 2) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '3+') {
            if (building.bedroomNumber >= 3) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '4+') {
            if (building.bedroomNumber >= 4) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '5+') {
            if (building.bedroomNumber >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    */
    console.log('filterBedrooms end');
}

function filterBathrooms(bathroomNumber){
    console.log('filterBathrooms start');
    /*
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (bathroomNumber == '1') {
            if (building.bathroomNumber == 1) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '2') {
            if (building.bathroomNumber == 2) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '3') {
            if (building.bathroomNumber == 3) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '4') {
            if (building.bathroomNumber == 4) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '5') {
            if (building.bathroomNumber == 5) {
                tempArray.push(building);
            }
        }

        if (bathroomNumber == '1+') {
            if (building.bathroomNumber >= 1) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '2+') {
            if (building.bathroomNumber >= 2) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '3+') {
            if (building.bathroomNumber >= 3) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '4+') {
            if (building.bathroomNumber >= 4) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '5+') {
            if (building.bathroomNumber >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    */
    console.log('filterBathrooms end');
}

function filterParkings(parkingNumber){
    console.log('filterParkings start');
    /*
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (parkingNumber == '1') {
            if (building.parkingNumber == 1) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '2') {
            if (building.parkingNumber == 2) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '3') {
            if (building.parkingNumber == 3) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '4') {
            if (building.parkingNumber == 4) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '5') {
            if (building.parkingNumber == 5) {
                tempArray.push(building);
            }
        }

        if (parkingNumber == '1+') {
            if (building.parkingNumber >= 1) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '2+') {
            if (building.parkingNumber >= 2) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '3+') {
            if (building.parkingNumber >= 3) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '4+') {
            if (building.parkingNumber >= 4) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '5+') {
            if (building.parkingNumber >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    */
    console.log('filterParkings end');
}

function filterGarages(garageNumber){
    console.log('filterGarages start');
    /*
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (garageNumber == '1') {
            if (building.garageNumber == 1) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '2') {
            if (building.garageNumber == 2) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '3') {
            if (building.garageNumber == 3) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '4') {
            if (building.garageNumber == 4) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '5') {
            if (building.garageNumber == 5) {
                tempArray.push(building);
            }
        }

        if (garageNumber == '1+') {
            if (building.garageNumber >= 1) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '2+') {
            if (building.garageNumber >= 2) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '3+') {
            if (building.garageNumber >= 3) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '4+') {
            if (building.garageNumber >= 4) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '5+') {
            if (building.garageNumber >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    */
    console.log('filterGarages end');
}

function filterPiscine(piscine) {
    console.log('filterPiscine start');
    /*
    tempArray = [];
    if (piscine == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.piscine == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterPiscine end');
}

function filterElevator(elevator) {
    console.log('filterElevator start');
    /*
    tempArray = [];
    if (elevator == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.elevator == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterElevator end');
}

function filterAdaptedMobility(AdaptedMobility) {
    console.log('filterAdaptedMobility start');
    /*
    tempArray = [];
    if (AdaptedMobility == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.AdaptedMobility == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterAdaptedMobility end');
}

function filterWaterfront(waterfront) {
    console.log('filterWaterfront start');
    /*
    tempArray = [];
    if (waterfront == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.waterfront == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterWaterfront end');
}

function filterWaterfrontAccess(waterfrontAccess) {
    console.log('filterWaterfrontAccess start');
    /*
    tempArray = [];
    if (waterfrontAccess == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.waterfrontAccess == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterWaterfrontAccess end');
}

function filterNavigable(navigable) {
    console.log('filterNavigable start');
    /*
    tempArray = [];
    if (navigable == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.navigable == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterNavigable end');
}

function filterResort(resort) {
    console.log('filterResort start');
    /*
    tempArray = [];
    if (resort == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.resort == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterResort end');
}

function filterFurnished(furnished) {
    console.log('filterFurnished start');
    /*
    tempArray = [];
    if (furnished == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.furnished == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterFurnished end');
}

function filterSemiFurnished(semiFurnished) {
    console.log('filterSemiFurnished start');
    /*
    tempArray = [];
    if (semiFurnished == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.semiFurnished == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterSemiFurnished end');
}

async function filterBuildingCharacteric(bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess){
    console.log('filterBuildingCharacteric start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (bungalow == true) {
            if (building.bungalow == true) {
                tempArray.push(building);
            }
        }
        if (splitLevel == true) {
            if (building.splitLevel == true) {
                tempArray.push(building);
            }
        }
        if (semiDetached == true) {
            if (building.semiDetached == true) {
                tempArray.push(building);
            }
        }
        if (newConstruction == true) {
            if (building.newConstruction == true) {
                tempArray.push(building);
            }
        }
        if (centuryHistoric == true) {
            if (building.centuryHistoric == true) {
                tempArray.push(building);
            }
        }
        if (moreThanOneStory == true) {
            if (building.moreThanOneStory == true) {
                tempArray.push(building);
            }
        }
        if (detached == true) {
            if (building.detached == true) {
                tempArray.push(building);
            }
        }
        if (tenYearsOrLess == true) {
            if (building.tenYearsOrLess == true) {
                tempArray.push(building);
            }
        }
    });
    if (bungalow == true || splitLevel == true || semiDetached == true || newConstruction == true || centuryHistoric == true || moreThanOneStory == true || detached == true || tenYearsOrLess == true) 
    {
        buildingArrayFiltered = tempArray;
    }
    console.log('filterBuildingCharacteric end');

}