// Get Entity Data from CRM (Note: this only works within Zoho CRM)    
var buildingArray = [];
var buildingArrayFiltered = [];


ZOHO.embeddedApp.on("PageLoad",entity => {        // This is the information about the current record, if applicable.
            console.log(entity); 
            ZOHO.CRM.API.getAllRecords({Entity:"Propri_t_s"})
            .then(function(data){
            console.log(data);
            console.log(data.info.more_records);
            var resultBuilding = [];
            var resultLoan = [];
            Promise.resolve(resultBuilding = loadAllRecords("Propri_t_s")).then(setBuildingArray);


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
        if (building.Prix >= priceMin && building.Prix <= priceMax) {
            tempArray.push(building);
        }
    });
    
    console.log('filterPrice End');
    return tempArray
    
}

// point of entry of the filter
async function filterBuilding(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess,landMin,landMax,openHouse,openHouseVirtual){
    console.log('filter');
    console.log(singleFamilyHome)
    await asyncFilter(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess,landMin,landMax,openHouse,openHouseVirtual);
    console.log('filter Done');
    console.log(buildingArrayFiltered.length);
}

// asynchronus filter ; call each filter
async function asyncFilter(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess,landMin,landMax,openHouse,openHouseVirtual){
    console.log('asyncfilter');
    buildingArrayFiltered = await filterOwnershipType(ownershipType);
    buildingArrayFiltered = await filterByPrice(priceMin,priceMax);
    buildingArrayFiltered = await filterPropertyType(singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot);
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
    await filterLand(landMin,landMax);
    await filterOpenHouse(openHouse);
    await filterOpenHouseVirtual(openHouseVirtual);
    console.log('asyncfilter Done');
}
//filter building by ownership type aka to buy or to rent
async function filterOwnershipType(ownershipType){
    console.log('filterOwnershipType start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
            if (building.vente_location == 'Location' && ownershipType == 'rent') {
                tempArray.push(building);
            }
            if (building.vente_location == 'Vente' && ownershipType == 'sell') {
                tempArray.push(building);
            }

    });
    buildingArrayFiltered = tempArray;
    console.log('filterOwnershipType Done');

    //return tempArray
    return buildingArrayFiltered
}

async function filterPropertyType(singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot){
    
    console.log('filterPropertyType start');
    tempArray = [];
    
    buildingArrayFiltered.forEach(building => {
    console.log(building.Type_de_propi_t);
    if (building.Type_de_propi_t != null) {
        switch (building.Type_de_propi_t) {
           case 'Maison unifamiliale':
               if (singleFamilyHome == true) {
                   tempArray.push(building)
               }
               break;
            case 'Condo / Appartement':
                if (condoApartment == true) {
                    tempArray.push(building)
                }
                break;
            case 'Loft / Studio':
               if (loftStudio == true) {
                tempArray.push(building)
               }
               break;
            case 'intergénération':
                if (intergenerational == true) {
                    tempArray.push(building)
                }
                break;
            case 'Maison mobile':
               if (mobileHome == true) {
                    tempArray.push(building)
               }
               break;
            case 'Fermette':
                if (hobbyFarm == true) {
                    tempArray.push(building)
                }
                break;
            case 'Chalet':
               if (cottage == true) {
                    tempArray.push(building)
                }
               break;
            case 'Terrain':
                if (lot == true) {
                    tempArray.push(building)
                }
                break;

       } 
    }
       
    });
    if (singleFamilyHome == true || condoApartment == true || loftStudio == true ||
         intergenerational == true || mobileHome == true || hobbyFarm == true || cottage == true || lot == true) 
    {
        console.log('filterPropertyType end');
        return tempArray;
    }
    console.log('filterPropertyType end');
    return buildingArrayFiltered;

    
    
}

function filterBedrooms(bedroomNumber){
    console.log('filterBedrooms start');
    tempArray = [];
    
    if (bedroomNumber != '-') {
        buildingArrayFiltered.forEach(building => {
        if (bedroomNumber == '1') {
            if (building.Nombres_de_chambre == 1) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '2') {
            if (building.Nombres_de_chambre == 2) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '3') {
            if (building.Nombres_de_chambre == 3) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '4') {
            if (building.Nombres_de_chambre == 4) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '5') {
            if (building.Nombres_de_chambre == 5) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '1+') {
            if (building.Nombres_de_chambre >= 1) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '2+') {
            if (building.Nombres_de_chambre >= 2) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '3+') {
            if (building.Nombres_de_chambre >= 3) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '4+') {
            if (building.Nombres_de_chambre >= 4) {
                tempArray.push(building);
            }
        }
        if (bedroomNumber == '5+') {
            if (building.Nombres_de_chambre >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    console.log(buildingArrayFiltered.length);
    }
    
    
    console.log('filterBedrooms end');
}

function filterBathrooms(bathroomNumber){
    console.log('filterBathrooms start');
    if (bathroomNumber != '-') {
        tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (bathroomNumber == '1') {
            if (building.Nombre_de_chambre_de_bain == 1) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '2') {
            if (building.Nombre_de_chambre_de_bain == 2) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '3') {
            if (building.Nombre_de_chambre_de_bain == 3) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '4') {
            if (building.Nombre_de_chambre_de_bain == 4) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '5') {
            if (building.Nombre_de_chambre_de_bain == 5) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '1+') {
            if (building.Nombre_de_chambre_de_bain >= 1) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '2+') {
            if (building.Nombre_de_chambre_de_bain >= 2) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '3+') {
            if (building.Nombre_de_chambre_de_bain >= 3) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '4+') {
            if (building.Nombre_de_chambre_de_bain >= 4) {
                tempArray.push(building);
            }
        }
        if (bathroomNumber == '5+') {
            if (building.Nombre_de_chambre_de_bain >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    console.log(buildingArrayFiltered.length);
    }
    
    
    console.log('filterBathrooms end');
}

function filterParkings(parkingNumber){
    console.log('filterParkings start');
    if (parkingNumber != '-') {
        tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (parkingNumber == '1') {
            if (building.Nombre_de_stationnements == 1) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '2') {
            if (building.Nombre_de_stationnements == 2) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '3') {
            if (building.Nombre_de_stationnements == 3) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '4') {
            if (building.Nombre_de_stationnements == 4) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '5') {
            if (building.Nombre_de_stationnements == 5) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '1+') {
            if (building.Nombre_de_stationnements >= 1) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '2+') {
            if (building.Nombre_de_stationnements >= 2) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '3+') {
            if (building.Nombre_de_stationnements >= 3) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '4+') {
            if (building.Nombre_de_stationnements >= 4) {
                tempArray.push(building);
            }
        }
        if (parkingNumber == '5+') {
            if (building.Nombre_de_stationnements >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    console.log(buildingArrayFiltered.length);
    }
    
    
    console.log('filterParkings end');
}

function filterGarages(garageNumber){
    console.log('filterGarages start');
    if (garageNumber != '-') {
        console.log(garageNumber);
        tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (garageNumber == '1') {
            if (building.Nombre_de_garages == 1) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '2') {
            if (building.Nombre_de_garages == 2) {
                tempArray.push(building);
                
            }
        }
        if (garageNumber == '3') {
            if (building.Nombre_de_garages == 3) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '4') {
            if (building.Nombre_de_garages == 4) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '5') {
            if (building.Nombre_de_garages == 5) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '1+') {
            if (building.Nombre_de_garages >= 1) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '2+') {
            console.log('were here');
            if (building.Nombre_de_garages >= 2) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '3+') {
            if (building.Nombre_de_garages >= 3) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '4+') {
            if (building.Nombre_de_garages >= 4) {
                tempArray.push(building);
            }
        }
        if (garageNumber == '5+') {
            if (building.Nombre_de_garages >= 5) {
                tempArray.push(building);
            }
        }
    });
    buildingArrayFiltered = tempArray;
    console.log(buildingArrayFiltered.length);
    }
    

    console.log('filterGarages end');
}

function filterPiscine(piscine) {
    console.log('filterPiscine start');
    tempArray = [];
    if (piscine == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Piscine == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterPiscine end');
}

function filterElevator(elevator) {
    console.log('filterElevator start');
    tempArray = [];
    if (elevator == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Ascenseur == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterElevator end');
}

function filterAdaptedMobility(AdaptedMobility) {
    console.log('filterAdaptedMobility start');
    tempArray = [];
    if (AdaptedMobility == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Adapt_e_pour_mobilit_r_duite == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterAdaptedMobility end');
}

function filterWaterfront(waterfront) {
    console.log('filterWaterfront start'); 
    tempArray = [];
    if (waterfront == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Bord_de_l_eau == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterWaterfront end');
}

function filterWaterfrontAccess(waterfrontAccess) {
    console.log('filterWaterfrontAccess start');
    tempArray = [];
    if (waterfrontAccess == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Acc_s_l_eau == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterWaterfrontAccess end');
}

function filterNavigable(navigable) {
    console.log('filterNavigable start');
    tempArray = [];
    if (navigable == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Plan_d_eau_navigable == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterNavigable end');
}

function filterResort(resort) {
    console.log('filterResort start');
    tempArray = [];
    if (resort == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Vill_giature == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterResort end');
}

function filterFurnished(furnished) {
    console.log('filterFurnished start');
    tempArray = [];
    if (furnished == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Meubl == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterFurnished end');
}

function filterSemiFurnished(semiFurnished) {
    console.log('filterSemiFurnished start');
    tempArray = [];
    if (semiFurnished == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Semi_meubl == true) {
                tempArray.push(building);
            }
        });
    buildingArrayFiltered = tempArray;
    }
    console.log('filterSemiFurnished end');
}

async function filterBuildingCharacteric(bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,tenYearsOrLess){
    console.log('filterBuildingCharacteric start');
    /*
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
    */

}

async function filterLand(landMin,landMax){
    console.log('filterLand start');
    /*
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (landMin != null && landMax == null) {
            if (building.land >= landMin) {
                tempArray.push(building);
            }
        }
        else if (landMin == null && landMax != null) {
            if (building.land <= landMax) {
                tempArray.push(building);
            }
        }
        else if (landMin != null && landMax != null) {
            if (building.land <= landMax && building.land >= landMin) {
                tempArray.push(building);
            }
        }
        
    });
    if(landMin != null || landMax != null){
        buildingArrayFiltered = tempArray;
    }
*/
    console.log('filterLand end');
}

async function filterOpenHouse(openHouse){
    console.log('filterOpenHouse start');
    /*
    tempArray=[];
    if (openHouse == true) {
        array.forEach(building => {
            if (building.openHouse == true) {
                tempArray.push(building);
            }
        });
        buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterOpenHouse end');
}

async function filterOpenHouseVirtual(openHouseVirtual){
    console.log('filterOpenHouseVirtual start');
    /*
    tempArray=[];
    if (openHouseVirtual == true) {
        array.forEach(building => {
            if (building.openHouseVirtual == true) {
                tempArray.push(building);
            }
        });
        buildingArrayFiltered = tempArray;
    }
    */
    console.log('filterOpenHouseVirtual end');
}