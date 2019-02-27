import { HouseHoldActionsType, HouseHoldTypes } from "./household.actions";

export interface HouseHoldState {
    units: any,
    houseHoldSample: any,
    selectG1234: any,
    isHouseHold: boolean,
    isAgriculture: boolean,
    isFactorial: boolean,
    isCommercial: boolean,
    factorialCategory: string,
    residentialGardeningUse: any,
    commercialServiceType: any,
    rubberTreeSelectPlant: any[],
    perennialPlantSelectPlant: any[],
    ricePlantSelectPlant: any[],
    agronomyPlantSelectPlant: any[],
    riceDoing: any,
    agiSelectRice: any,
    agiSelectAgronomy: any,
    agiSelectRubber: any,
    agiSelectPerennial: any,
    arraySkipPageAgiculture: any,
    checkWaterPlumbing: any,
    checkWaterRiver: any,
    checkWaterIrrigation: any,
    checkWaterRain: any,
    checkWaterBuying: any,
    wateringResidential: any,
    waterSourcesResidential: any,
    waterSourcesRice: any,
    waterSourcesAgiculture: any,
    waterSourcesFactory: any,
    waterSourcesCommercial: any,
    nextPageDirection: Array<boolean>,
    arrayIsCheck: Array<number>,
    selectorIndex: any,
    unitByIdBuilding: any,
    backToRoot: any,
    back: any,
    dataOfUnit: any,
}

const initialState: HouseHoldState = {
    units: [],
    houseHoldSample: null,
    selectG1234: null,
    isHouseHold: null,
    isAgriculture: null,
    isFactorial: null,
    isCommercial: null,
    factorialCategory: null,
    residentialGardeningUse: null,
    commercialServiceType: null,
    rubberTreeSelectPlant: [],
    perennialPlantSelectPlant: [],
    ricePlantSelectPlant: [],
    agronomyPlantSelectPlant: [],
    riceDoing: null,
    agiSelectRice: null,
    agiSelectAgronomy: null,
    agiSelectRubber: null,
    agiSelectPerennial: null,
    arraySkipPageAgiculture: null,
    checkWaterPlumbing: null,
    checkWaterRiver: null,
    checkWaterIrrigation: null,
    checkWaterRain: null,
    checkWaterBuying: null,
    wateringResidential: null,
    waterSourcesResidential: null,
    waterSourcesRice: null,
    waterSourcesAgiculture: null,
    waterSourcesFactory: null,
    waterSourcesCommercial: null,
    nextPageDirection: Array<boolean>(),
    arrayIsCheck: Array<number>(),
    selectorIndex: null,
    unitByIdBuilding: [],
    backToRoot: null,
    back: null,
    dataOfUnit: null,
};

export function reducer(state: HouseHoldState = initialState, action: HouseHoldActionsType): HouseHoldState {
    switch (action.type) {
        case HouseHoldTypes.LoadListSuccess:
            return {
                ...state,
            };
        case HouseHoldTypes.SetSelectG1234:
            return {
                ...state,
                selectG1234: action.payload,
                nextPageDirection: listPagesToCheck({
                    ...state,
                    selectG1234: action.payload
                }),
            };
        case HouseHoldTypes.SetIsHouseHold:
            return {
                ...state,
                isHouseHold: action.payload,
            };
        case HouseHoldTypes.SetIsAgriculture:
            return {
                ...state,
                isAgriculture: action.payload,
            };
        case HouseHoldTypes.SetIsFactorial:
            return {
                ...state,
                isFactorial: action.payload,
            };
        case HouseHoldTypes.SetIsCommercial:
            return {
                ...state,
                isCommercial: action.payload,
            };
        case HouseHoldTypes.SetFactorialCategory:
            return {
                ...state,
                factorialCategory: action.payload,
            };
        case HouseHoldTypes.SetCommercialServiceType:
            return {
                ...state,
                commercialServiceType: action.payload,
            };
        case HouseHoldTypes.SetResidentialGardeningUse:
            return {
                ...state,
                residentialGardeningUse: action.payload,
            };

        case HouseHoldTypes.SetRicePlantSelectPlant:
            return {
                ...state,
                ricePlantSelectPlant: action.payload,
            };
        case HouseHoldTypes.SetAgronomyPlantSelectPlant:
            return {
                ...state,
                agronomyPlantSelectPlant: action.payload,
            };
        case HouseHoldTypes.SetRubberTreeSelectPlant:
            return {
                ...state,
                rubberTreeSelectPlant: action.payload,
            };
        case HouseHoldTypes.SetPerennialPlantSelectPlant:
            return {
                ...state,
                perennialPlantSelectPlant: action.payload,
            };
        case HouseHoldTypes.SetRiceDoing:
            return {
                ...state,
                riceDoing: action.payload,
            };
        case HouseHoldTypes.SetAgiSelectRice:
            return {
                ...state,
                agiSelectRice: action.payload,
            };
        case HouseHoldTypes.SetAgiSelectAgronomy:
            return {
                ...state,
                agiSelectAgronomy: action.payload,
            };
        case HouseHoldTypes.SetAgiSelectRubber:
            return {
                ...state,
                agiSelectRubber: action.payload,
            };
        case HouseHoldTypes.SetAgiSelectPerennial:
            return {
                ...state,
                agiSelectPerennial: action.payload,
            };
        case HouseHoldTypes.SetArraySkipPageAgiculture:
            return {
                ...state,
                arraySkipPageAgiculture: action.payload,
                nextPageDirection: listPagesToCheck({
                    ...state,
                    arraySkipPageAgiculture: action.payload,
                }),
            };
        case HouseHoldTypes.SetCheckWaterPlumbing:
            return {
                ...state,
                checkWaterPlumbing: isCheckWater(state.checkWaterPlumbing, action.payload),
                nextPageDirection: listPagesToCheck({
                    ...state,
                    checkWaterPlumbing: isCheckWater(state.checkWaterPlumbing, action.payload),
                }),
            };
        case HouseHoldTypes.SetCheckWaterRiver:
            return {
                ...state,
                checkWaterRiver: isCheckWater(state.checkWaterRiver, action.payload),
                nextPageDirection: listPagesToCheck({
                    ...state,
                    checkWaterRiver: isCheckWater(state.checkWaterRiver, action.payload),
                }),
            };
        case HouseHoldTypes.SetCheckWaterIrrigation:
            return {
                ...state,
                checkWaterIrrigation: isCheckWater(state.checkWaterIrrigation, action.payload),
                nextPageDirection: listPagesToCheck({
                    ...state,
                    checkWaterIrrigation: isCheckWater(state.checkWaterIrrigation, action.payload),
                }),
            };
        case HouseHoldTypes.SetCheckWaterRain:
            return {
                ...state,
                checkWaterRain: isCheckWater(state.checkWaterRain, action.payload),
                nextPageDirection: listPagesToCheck({
                    ...state,
                    checkWaterRain: isCheckWater(state.checkWaterRain, action.payload),
                }),
            };
        case HouseHoldTypes.SetCheckWaterBuying:
            return {
                ...state,
                checkWaterBuying: isCheckWater(state.checkWaterBuying, action.payload),
                nextPageDirection: listPagesToCheck({
                    ...state,
                    checkWaterBuying: isCheckWater(state.checkWaterBuying, action.payload),
                }),
            };
        case HouseHoldTypes.SetWateringResidential:
            return {
                ...state,
                wateringResidential: action.payload,
            };
        case HouseHoldTypes.SetWaterSourcesResidential:
            return {
                ...state,
                waterSourcesResidential: action.payload,
            };
        case HouseHoldTypes.SetWaterSourcesRice:
            return {
                ...state,
                waterSourcesRice: action.payload,
            };
        case HouseHoldTypes.SetWaterSourcesAgiculture:
            return {
                ...state,
                waterSourcesAgiculture: action.payload,
            };
        case HouseHoldTypes.SetWaterSourcesFactory:
            return {
                ...state,
                waterSourcesFactory: action.payload,
            };
        case HouseHoldTypes.SetWaterSourcesCommercial:
            return {
                ...state,
                waterSourcesCommercial: action.payload,
            };
        case HouseHoldTypes.SetNextPageDirection:
            return {
                ...state,
                nextPageDirection: action.payload,
            };
        case HouseHoldTypes.SetArrayIsCheck:
            return {
                ...state,
                arrayIsCheck: action.payload,
            };
        case HouseHoldTypes.SetSelectorIndex:
            return {
                ...state,
                selectorIndex: action.payload,
            };
        case HouseHoldTypes.LoadUnitByIdBuildingSuccess:
            return {
                ...state,
                unitByIdBuilding: action.payload,
            };
        case HouseHoldTypes.SetBackToRoot:
            return {
                ...state,
                backToRoot: action.payload,
            };
        case HouseHoldTypes.SetBack:
            return {
                ...state,
                back: action.payload,
            };
        case HouseHoldTypes.LoadHouseHoldSampleSuccess:
            let s = resetStatesForModel(action.payload);
            console.log("JSON State",JSON.stringify(s));
            return {
                ...state,
                houseHoldSample: action.payload,
                selectG1234: s.selectG1234,
                residentialGardeningUse: s.residentialGardeningUse,
                wateringResidential: s.wateringResidential,
                waterSourcesResidential: s.waterSourcesResidential,
                waterSourcesRice: s.waterSourcesRice,
                waterSourcesAgiculture: s.waterSourcesAgiculture,
                waterSourcesFactory: s.waterSourcesFactory,
                waterSourcesCommercial: s.waterSourcesCommercial,
                arraySkipPageAgiculture: s.agi,
                riceDoing: s.riceDoing,
                agiSelectRice: s.agiSelectRice,
                agiSelectRubber: s.agiSelectRubber,
                agiSelectPerennial: s.agiSelectPerennial,
                ricePlantSelectPlant: s.ricePlantSelectPlant,
                agronomyPlantSelectPlant: s.agronomyPlantSelectPlant,
                rubberTreeSelectPlant: s.rubberTreeSelectPlant,
                perennialPlantSelectPlant: s.perennialPlantSelectPlant,
                factorialCategory: s.factorialCategory,
                commercialServiceType: s.commercialServiceType,
                checkWaterPlumbing: s.checkWaterPlumbing,
                checkWaterRiver: s.checkWaterRiver,
                checkWaterIrrigation: s.checkWaterIrrigation,
                checkWaterRain: s.checkWaterRain,
                checkWaterBuying: s.checkWaterBuying,
                
            };
        default:
            return state;
    }
}

function resetStatesForModel(model: any): any {
    let objG12345 = {};
    let garden: any;
    if (model) {
        objG12345 = {
            isHouseHold: model.isHouseHold,
            isAgriculture: model.isAgriculture,
            isFactorial: model.isFactorial,
            isCommercial: model.isCommercial,
        }

    }

    let objAgri = {};

    let ag = model && model.agriculture;
    let riceDoing = ag && ag.ricePlant.doing;
    let rubberDoing = ag && ag.rubberTree.doing;
    let listRice
    let listAgronomy
    let listRubber
    let listPerennial


    if (ag) {
        objAgri = {
            ricePlant: ag.ricePlant && ag.ricePlant.doing,
            agronomyPlant: ag.agronomyPlant && ag.agronomyPlant.doing,
            rubberTree: ag.rubberTree && ag.rubberTree.doing,
            perennialPlant: ag.perennialPlant && ag.perennialPlant.doing,
            herbsPlant: ag.herbsPlant && ag.herbsPlant.doing,
            flowerCrop: ag.flowerCrop && ag.flowerCrop.doing,
            mushroomPlant: ag.mushroomPlant && ag.mushroomPlant.doing,
            animalFarm: ag.animalFarm && ag.animalFarm.doing,
            aquaticAnimals: ag.aquaticAnimals && ag.aquaticAnimals.doing,
        };
        if (model.residence && model.residence.gardeningUse) {
            garden = model.residence.gardeningUse;
        }

        riceDoing = ag && ag.ricePlant.doing;
        rubberDoing = ag && ag.rubberTree.doing;
        listAgronomy = ag.agronomyPlant && ag.agronomyPlant.fields.plantings;
        listPerennial = ag.perennialPlant && ag.perennialPlant.fields.plantings;

        if (riceDoing) {
            listRice = ag.ricePlant.fields.plantings;

        }

        if (rubberDoing) {
            listRubber = ag.rubberTree.fields.plantings;
        }
    };

    let wS = [];

    let waterRice = findWaterSourceRice(ag.ricePlant);
    wS.push(waterRice);
    let waterDry = findWaterSourceDry(ag.agronomyPlant);
    wS.push(waterDry);
    let waterRubber = findWaterSourceRubber(ag.rubberTree);
    wS.push(waterRubber);
    let waterPenrenial = findWaterSourcePenrenial(ag.perennialPlant);
    wS.push(waterPenrenial);
    let waterHerb = findWaterSourceHerb(ag.herbsPlant);
    wS.push(waterHerb);
    let waterFlower = findWaterSourceFlower(ag.flowerCrop);
    wS.push(waterFlower);
    let waterMushroom = findWaterSourceMushroom(ag.mushroomPlant);
    wS.push(waterMushroom);
    let waterRes = model && model.residence.waterSources;
    wS.push(waterRes);
    let waterFac = model && model.factory.waterSources;
    wS.push(waterFac);
    let waterCom = model && model.commerce.waterSources;
    wS.push(waterCom);
    let waterAnimalFarm = ag && ag.animalFarm.waterSources;
    wS.push(waterAnimalFarm);


    let checkPlumbing = wS.some(it => it.plumbing == true);
    let checkRiver = wS.some(it => it.river == true);
    let checkIrrigation = wS.some(it => it.irrigation == true);
    let checkRain = wS.some(it => it.rain == true);
    let checkBuying = wS.some(it => it.buying == true);

    // let waterAquatic = findWaterSourceAquticAnimals(ag.aquaticAnimals);

    return {

        selectG1234: objG12345,
        residentialGardeningUse: model && model.residence.gardeningUse,
        agi: objAgri,
        ricePlantSelectPlant: listRice,
        agronomyPlantSelectPlant: listAgronomy,
        rubberTreeSelectPlant: listRubber,
        perennialPlantSelectPlant: listPerennial,
        wateringResidential: model && model.residence.gardeningUse,
        waterSourcesResidential: waterRes,
        waterSourcesRice: waterRice,
        waterSourcesAgiculture: model && model.isAgriculture,
        waterSourcesFactory: waterFac,
        waterSourcesCommercial: waterCom,
        riceDoing: model && model.agriculture.ricePlant.doing,
        agiSelectRice: model && model.agriculture.ricePlant.doing,
        agiSelectRubber: model && model.agriculture.rubberTree.doing,
        agiSelectPerennial: model && model.agriculture.perennialPlant.doing,
        factorialCategory: model && model.factory.category,
        commercialServiceType: model && model.commerce.serviceType,
        checkWaterPlumbing: checkPlumbing,
        checkWaterRiver: checkRiver,
        checkWaterIrrigation: checkIrrigation,
        checkWaterRain: checkRain,
        checkWaterBuying: checkBuying,
    };
}

function findWaterSourceRice(water) {
    let fields = water && water.fields;
    let waterSourceRice = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourceRice = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourceRice
}

function findWaterSourceDry(water) {
    let fields = water && water.fields;
    let waterSourceDry = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourceDry = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourceDry
}

function findWaterSourceRubber(water) {
    let fields = water && water.fields;
    let waterSourceRubber = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourceRubber = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourceRubber
}

function findWaterSourcePenrenial(water) {
    let fields = water && water.fields;
    let waterSourcePenrenial = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourcePenrenial = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourcePenrenial
}

function findWaterSourceHerb(water) {
    let fields = water && water.fields;
    let waterSourceHerb = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourceHerb = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourceHerb
}

function findWaterSourceFlower(water) {
    let fields = water && water.fields;
    let waterSourceFlower = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourceFlower = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourceFlower
}

function findWaterSourceMushroom(water) {
    let fields = water && water.fields;
    let waterSourceMushroom = {
        plumbing: false,
        underGround: false,
        river: false,
        pool: false,
        irrigation: false,
        rain: false,
        buying: false,
        rainingAsIs: false,
        hasOther: false,
        other: "water",
    };
    fields.forEach(f => {
        if (f && f.waterSources) {
            waterSourceMushroom = {
                plumbing: f.waterSources.some(p => p.plumbing == true),
                underGround: f.waterSources.some(p => p.underGround == true),
                river: f.waterSources.some(p => p.river == true),
                pool: f.waterSources.some(p => p.pool == true),
                irrigation: f.waterSources.some(p => p.irrigation == true),
                rain: f.waterSources.some(p => p.rain == true),
                buying: f.waterSources.some(p => p.buying == true),
                rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
                hasOther: f.waterSources.some(p => p.hasOther == true),
                other: "water",
            };
        }
    });
    return waterSourceMushroom
}

// function findWaterSourceAnimalFarm(water) {
//     let fields = water && water.fields;
//     let waterSourceAnimalFarm = {
//         plumbing: false,
//         underGround: false,
//         river: false,
//         pool: false,
//         irrigation: false,
//         rain: false,
//         buying: false,
//         rainingAsIs: false,
//         hasOther: false,
//         other: "water",
//     };
//     fields.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAnimalFarm = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     return waterSourceAnimalFarm
// }

// function findWaterSourceAquticAnimals(water) {
//     let fish = water && water.fish;
//     let shrimp = water && water.fish;
//     let frog = water && water.frog;
//     let crocodile = water && water.crocodile;
//     let snappingTurtle = water && water.crocodile;
//     let crab = water && water.fish;
//     let shellFish = water && water.fish;
//     let turtle = water && water.crocodile;
//     let reddish = water && water.fish;

//     let waterSourceAqutic = {
//         plumbing: false,
//         underGround: false,
//         river: false,
//         pool: false,
//         irrigation: false,
//         rain: false,
//         buying: false,
//         rainingAsIs: false,
//         hasOther: false,
//         other: "water",
//     };
//     fish.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     shrimp.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     frog.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     crocodile.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     snappingTurtle.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     crab.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     shellFish.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     turtle.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });
//     reddish.forEach(f => {
//         if (f && f.waterSources) {
//             waterSourceAqutic = {
//                 plumbing: f.waterSources.some(p => p.plumbing == true),
//                 underGround: f.waterSources.some(p => p.underGround == true),
//                 river: f.waterSources.some(p => p.river == true),
//                 pool: f.waterSources.some(p => p.pool == true),
//                 irrigation: f.waterSources.some(p => p.irrigation == true),
//                 rain: f.waterSources.some(p => p.rain == true),
//                 buying: f.waterSources.some(p => p.buying == true),
//                 rainingAsIs: f.waterSources.some(p => p.rainingAsIs == true),
//                 hasOther: f.waterSources.some(p => p.hasOther == true),
//                 other: "water",
//             };
//         }
//     });

//     return waterSourceAqutic
// }

function listPagesToCheck(state: HouseHoldState): Array<boolean> {
    console.log(JSON.stringify(state.selectG1234));
    let arr: Array<boolean> = state.nextPageDirection;
    arr[0] = (state.selectG1234 && state.selectG1234.isHouseHold) ? true : false;
    arr[20] = (state.selectG1234 && state.selectG1234.isHouseHold) ? true : false;
    arr[1] = (state.selectG1234 && state.selectG1234.isAgriculture) ? true : false;
    arr[11] = (state.selectG1234 && state.selectG1234.isFactorial) ? true : false;
    arr[12] = (state.selectG1234 && state.selectG1234.isCommercial) ? true : false;
    for (let i = 2; i <= 10; i++) {
        arr[i] = arr[1]
    }

    if (state.arraySkipPageAgiculture) {
        arr[2] = (state.arraySkipPageAgiculture.ricePlant && state.arraySkipPageAgiculture.ricePlant.doing) ? true : false;
        arr[3] = (state.arraySkipPageAgiculture.agronomyPlant && state.arraySkipPageAgiculture.agronomyPlant.doing) ? true : false;
        arr[4] = (state.arraySkipPageAgiculture.rubberTree && state.arraySkipPageAgiculture.rubberTree.doing) ? true : false;
        arr[5] = (state.arraySkipPageAgiculture.perennialPlant && state.arraySkipPageAgiculture.perennialPlant.doing) ? true : false;
        arr[6] = (state.arraySkipPageAgiculture.herbsPlant && state.arraySkipPageAgiculture.herbsPlant.doing) ? true : false;
        arr[7] = (state.arraySkipPageAgiculture.flowerCrop && state.arraySkipPageAgiculture.flowerCrop.doing) ? true : false;
        arr[8] = (state.arraySkipPageAgiculture.mushroomPlant && state.arraySkipPageAgiculture.mushroomPlant.doing) ? true : false;
        arr[9] = (state.arraySkipPageAgiculture.animalFarm && state.arraySkipPageAgiculture.animalFarm.doing) ? true : false;
        arr[10] = (state.arraySkipPageAgiculture.aquaticAnimals && state.arraySkipPageAgiculture.aquaticAnimals.doing) ? true : false;
    }

    arr[13] = (state.checkWaterPlumbing) ? true : false;
    arr[15] = (state.checkWaterRiver) ? true : false;
    arr[17] = (state.checkWaterIrrigation) ? true : false;
    arr[18] = (state.checkWaterRain) ? true : false;
    arr[19] = (state.checkWaterBuying) ? true : false;


    return arr;
}

function isCheckWater(checkWater: boolean, payload: boolean): boolean {
    return checkWater ? true : payload;
}
