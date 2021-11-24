 
var buildingArray = [];
var buildingArrayFiltered = [];
var currentUser = [];


ZOHO.embeddedApp.on("PageLoad",entity => {        // This is the information about the current record, if applicable.
            console.log(entity);
            ZOHO.CRM.CONFIG.getCurrentUser().then(function(user){
                currentUser = user;
                console.log(currentUser);
            }); 
            ZOHO.CRM.API.getAllRecords({Entity:"Propri_t_s"})
            .then(function(data){
            console.log(data);
            console.log(data.info.more_records);
            Promise.resolve(resultBuilding = loadAllRecords("Propri_t_s")).then(setBuildingArray);

}) });      
            // Initialize Widget Connection 
ZOHO.embeddedApp.init();

function getCurrentUser(){
    return currentUser;
}

async function resetFilter(){
    console.log('reset');
    await Promise.resolve(resultBuilding = loadAllRecords("Propri_t_s")).then(setBuildingArrayReset);
    console.log('reset done');
    
}

// Building array constructor; we take the promise result and push each building from each page from the promise to a temporary array then put tempArray into buildingArray
function setBuildingArray(result){
    console.log('setBuildingArray start');
    buildingArray = result
    tempArray = [];
    buildingArray.forEach(buidingPage => {
        (buidingPage.data).forEach(building => {
            tempArray.push(building);
        });
    });
    buildingArray = tempArray
    buildingArrayFiltered = buildingArray;
    console.log('unlock');
    filterButton.disabled = false
    console.log('setBuildingArray end');
}

function setBuildingArrayReset(result){
    console.log('setBuildingArrayReset start');
    tempArray = [];
    result.forEach(buidingPage => {
        (buidingPage.data).forEach(building => {
            tempArray.push(building);
        });
    });
    buildingArray = tempArray
    console.log('unlock');
    filterButton.disabled = false
    console.log('setBuildingArrayReset end');
    return buildingArray;
}



// get all record from a specified module
// we disable the filter button so we dont filter before all record are loaded, it enabled back after the building array are set in setBuildingArray
async function loadAllRecords(moduleName) {
    filterButton = document.getElementById('filterButton');
    filterButton.disabled = true;
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
async function filterBuilding(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,attached,tenYearsOrLess,duplex,triplex,quadruplex,quintuplex,landMin,landMax,openHouse,openHouseVirtual,foreclosure,creationDate){
    console.log('filter');
    buildingArrayFiltered = await Promise.resolve(resetFilter());
    await Promise.resolve(asyncFilter(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,attached,tenYearsOrLess,duplex,triplex,quadruplex,quintuplex,landMin,landMax,openHouse,openHouseVirtual,foreclosure,creationDate));
    console.log('filter Done');
    console.log(buildingArrayFiltered.length);
}

// asynchronus filter ; call each filter
async function asyncFilter(priceMin,priceMax,ownershipType,singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot,bedroomNumber,bathroomNumber,parkingNumber,garageNumber,piscine,elevator,adaptedMobility,waterfront,waterfrontAccess,navigable,resort,furnished,semiFurnished,bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,attached,tenYearsOrLess,duplex,triplex,quadruplex,quintuplex,landMin,landMax,openHouse,openHouseVirtual,foreclosure,creationDate){

    console.log('asyncfilter');
    buildingArrayFiltered = await filterOwnershipType(ownershipType);
    console.log(buildingArrayFiltered.length)
    buildingArrayFiltered = await filterByPrice(priceMin,priceMax);
    console.log(buildingArrayFiltered.length)
    buildingArrayFiltered = await filterPropertyType(singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot);
    console.log(buildingArrayFiltered.length)
    await filterBedrooms(bedroomNumber);
    console.log(buildingArrayFiltered.length)
    await filterBathrooms(bathroomNumber);
    console.log(buildingArrayFiltered.length)
    await filterParkings(parkingNumber);
    console.log(buildingArrayFiltered.length)
    await filterGarages(garageNumber);
    console.log(buildingArrayFiltered.length)
    await filterPiscine(piscine);
    console.log(buildingArrayFiltered.length)
    await filterElevator(elevator);
    console.log(buildingArrayFiltered.length)
    await filterAdaptedMobility(adaptedMobility);
    console.log(buildingArrayFiltered.length)
    await filterWaterfront(waterfront);
    console.log(buildingArrayFiltered.length)
    await filterWaterfrontAccess(waterfrontAccess);
    console.log(buildingArrayFiltered.length)
    await filterNavigable(navigable);
    console.log(buildingArrayFiltered.length)
    await filterResort(resort);
    console.log(buildingArrayFiltered.length)
    await filterFurnished(furnished);
    console.log(buildingArrayFiltered.length)
    await filterSemiFurnished(semiFurnished)
    console.log(buildingArrayFiltered.length)
    await filterBuildingCharacteristic(bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,attached,tenYearsOrLess);
    console.log(buildingArrayFiltered.length)
    await filterLand(landMin,landMax);
    console.log(buildingArrayFiltered.length)
    await filterOpenHouse(openHouse);
    console.log(buildingArrayFiltered.length)
    await filterOpenHouseVirtual(openHouseVirtual);
    console.log(buildingArrayFiltered.length)
    await filterPlex(duplex,triplex,quadruplex,quintuplex);
    console.log(buildingArrayFiltered.length)
    await filterForeclosure(foreclosure);
    console.log(buildingArrayFiltered.length)
    await filterCreationDate(creationDate);
    console.log(buildingArrayFiltered.length)
    console.log('asyncfilter Done');

}
//filter building by ownership type aka to buy or to rent
async function filterOwnershipType(ownershipType){
    console.log('filterOwnershipType start');
    tempArray = [];
    buildingArray.forEach(building => {
            if (building.vente_location == 'Location' && ownershipType == 'rent') {
                tempArray.push(building);
            }
            if (building.vente_location == 'Vente' && ownershipType == 'sell') {
                tempArray.push(building);
            }

    });

    buildingArrayFiltered = tempArray;
    console.log('filterOwnershipType Done');

    return buildingArrayFiltered
}

async function filterPropertyType(singleFamilyHome,condoApartment,loftStudio,intergenerational,mobileHome,hobbyFarm,cottage,lot){
    
    console.log('filterPropertyType start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
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

async function filterBuildingCharacteristic(bungalow,splitLevel,semiDetached,newConstruction,centuryHistoric,moreThanOneStory,detached,attached,tenYearsOrLess){
    console.log('filterBuildingCharacteristic start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (bungalow == true) {
            if (building.b_timents == 'Plein-pied') {
                tempArray.push(building);
            }
        }
        if (splitLevel == true) {
            if (building.b_timents == 'Paliers multiples') {
                tempArray.push(building);
            }
        }
        if (semiDetached == true) {
            if (building.b_timents == 'Jumelé') {
                tempArray.push(building);
            }
        }
        if (newConstruction == true) {
            if (building.b_timents == 'Nouvelle construction') {
                tempArray.push(building);
            }
        }
        if (centuryHistoric == true) {
            if (building.b_timents == 'Centenaire/Historique') {
                tempArray.push(building);
            }
        }
        if (moreThanOneStory == true) {
            if (building.b_timents == 'À étages') {
                tempArray.push(building);
            }
        }
        if (detached == true) {
            if (building.b_timents == 'Détaché') {
                tempArray.push(building);
            }
        }
        if (attached == true) {
            if (building.b_timents == 'En rangée') {
                tempArray.push(building);
            }
        }
        if (tenYearsOrLess == true) {
            if (building.b_timents == '10 ans ou moins') {
                tempArray.push(building);
            }
        }
    });
    if (bungalow == true || splitLevel == true || semiDetached == true || newConstruction == true || centuryHistoric == true || moreThanOneStory == true || detached == true || tenYearsOrLess == true) 
    {
        buildingArrayFiltered = tempArray;
    }
    console.log('filterBuildingCharacteristic end');
}

async function filterLand(landMin,landMax){
    console.log('filterLand start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (building.taille_du_terrain_pied_carr != null) {
            if (landMin != null && landMax == 0) {
                if (building.taille_du_terrain_pied_carr >= landMin) {
                    tempArray.push(building);
                }
            }
            else if (landMin == 0 && landMax != null) {
                if (building.taille_du_terrain_pied_carr <= landMax) {
                    tempArray.push(building);
                }
            }
            else if (landMin != null && landMax != null) {
                if (building.taille_du_terrain_pied_carr <= landMax && building.taille_du_terrain_pied_carr >= landMin) {
                    tempArray.push(building);
                }
            } 
        } 
    });
    if(landMin != 0 || landMax != 0){
        buildingArrayFiltered = tempArray;
    }
    console.log('filterLand end');
}

async function filterOpenHouse(openHouse){
    console.log('filterOpenHouse start');
    tempArray=[];
    if (openHouse === true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Visite_libre == true) {
                tempArray.push(building);
            }
        });
        buildingArrayFiltered = tempArray;
    }
    console.log('filterOpenHouse end');
}

async function filterOpenHouseVirtual(openHouseVirtual){
    console.log('filterOpenHouseVirtual start');
    tempArray=[];
    if (openHouseVirtual == true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Visite_virtuel_libre	 == true) {
                tempArray.push(building);
            }
        });
        buildingArrayFiltered = tempArray;
    }
    console.log('filterOpenHouseVirtual end');
}

function getBuildingArray(){
    return buildingArrayFiltered;
}

function filterPlex(duplex,triplex,quadruplex,quintuplex){
    console.log('filterPlex start');
    tempArray = [];
    buildingArrayFiltered.forEach(building => {
        if (duplex == true) {
            if (building.Plex == 'Duplex') {
                tempArray.push(building);
            }
        }
        if (triplex == true) {
            if (building.Plex == 'Triplex') {
                tempArray.push(building);
            }
        }
        if (quadruplex == true) {
            if (building.Plex == 'Quadruplex') {
                tempArray.push(building);
            }
        }
        if (quintuplex == true) {
            if (building.Plex == 'Quintuplex') {
                tempArray.push(building);
            }
        }
    });
    if (duplex == true || triplex == true || quadruplex == true || quintuplex == true) 
    {
        buildingArrayFiltered = tempArray;
    }
    console.log('filterPlex end');
}

async function filterForeclosure(foreclosure){
    console.log('filterForeclosure start');
    tempArray=[];
    if (foreclosure === true) {
        buildingArrayFiltered.forEach(building => {
            if (building.Reprise_de_finance == true) {
                tempArray.push(building);
            }
        });
        buildingArrayFiltered = tempArray;
    }
    console.log('filterForeclosure end');
}

async function filterCreationDate(creationDate){
    console.log('filterCreationDate start');
    tempArray=[];
    if (creationDate != null) {
        buildingArrayFiltered.forEach(building => {
            if (building.Created_Time >= creationDate) {
                tempArray.push(building);
            }
        });
        buildingArrayFiltered = tempArray;
    }
    console.log('filterCreationDate end');
}