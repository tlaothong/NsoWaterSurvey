import { Action } from '@ngrx/store';

export enum HouseHoldTypes {
    LoadHouseHoldSample = "[HH] Load",
    LoadHouseHoldSampleSuccess = "[HH] Load Success",
    StateName = "HouseHold",
    LoadList = "[HH] Load List",
    SetRiceDoing = "[HH] Set Rice Donig",
    SetSelectG1234 = "[HH] Set SelectG1234",
    SetIsFactorial = "[HH] Set IsFactorial",
    SetIsHouseHold = "[HH] Set IsHouseHold",
    SetIsCommercial = "[HH] Set IsCommercial",
    LoadListSuccess = "[HH] Load List Success",
    SetIsAgriculture = "[HH] Set IsAgriculture",
    LoadUserByQrCode = "[HH] Load User By QrCode",
    SetFactorialCategory = "[HH] Set Factorial Category",
    SetRicePlantSelectPlant = "[HH] Set RicePlant Select Plant",
    LoadUserByQrCodeSuccess = "[HH] Load User By QrCode Success",
    SetCommercialServiceType = "[HH] Set Commercial ServiceType",
    SetRubberTreeSelectPlant = "[HH] Set Rubbertree Select Plant",
    SetResidentialGardeningUse = "[HH] Set Residential GardeningUse",
    SetAgronomyPlantSelectPlant = "[HH] Set AgronomyPlant Select Plant",
    SetPerennialPlantSelectPlant = "[HH] Set PerennialPlant Select Plant",
    SetAgiSelectRice = "[HH] Set Agiculture Select Rice",
    SetAgiSelectAgronomy = "[HH] Set Agiculture Select Agronomy",
    SetAgiSelectRubber = "[HH] Set Agiculture Select Rubber",
    SetAgiSelectPerennial = "[HH] Set Agiculture Select Perennial",
    SetArraySkipPageWaterSources = "[HH] Set Array Skip Page WaterSources ",
    SetArraySkipPageAgiculture = "[HH] Set Array Skip Page Agicultures",
    SetCheckWaterPlumbing = "[HH] Set Check Water Plumbing",
    SetCheckWaterRiver = "[HH]Set Check Water River",
    SetCheckWaterIrrigation = "[HH] Set Check Water Irrigation",
    SetCheckWaterRain = "[HH] Set Check Water Rain",
    SetCheckWaterBuying = "[HH] Set Check Water Buying",
    SetWateringResidential = "[HH] Set Watering Residential",
    SetWaterSourcesResidential = "[HH] Set WaterSources Residential",
    SetWaterSourcesRice = "[HH] Set WaterSources Rice ",
    SetWaterSourcesAgiculture = "[HH] Set WaterSources Agiculture",
    SetWaterSourcesFactory = "[HH] Set WaterSources Factory",
    SetWaterSourcesCommercial = "[HH] Set WaterSources Commercial",
    SetNextPageDirection = "[HH] Set Next Page Direction",
    SetArrayIsCheck = "[HH] Set Array IsCheck",
    SetSelectorIndex = "[HH] Set Selector Index",
    LoadUnitByIdBuilding = "[HH] Load Unit By IdBuilding",
    LoadUnitByIdBuildingSuccess = "[HH] Load Unit By IdBuilding Success",
    SetBackToRoot = "[HH] Set Back To Root",
    SetBack = "[HH] Set Back",
    LoadDataOfUnit = "[HH] Load Data Of Unit",
    LoadDataOfUnitSuccess = "[HH] Load Data Of Unit Success",

  
}

export class LoadHouseHoldList implements Action {
    readonly type = HouseHoldTypes.LoadList;

    constructor() {
    }
}

export class LoadHouseHoldListSuccess implements Action {
    readonly type = HouseHoldTypes.LoadListSuccess;

    constructor() {
    }
}

export class LoadHouseHoldSample implements Action {
    readonly type = HouseHoldTypes.LoadHouseHoldSample;

    constructor(public payload: any) {
    }
}

export class LoadHouseHoldSampleSuccess implements Action {
    readonly type = HouseHoldTypes.LoadHouseHoldSampleSuccess;

    constructor(public payload: any) {
    }
}

export class SetSelectG1234 implements Action {
    readonly type = HouseHoldTypes.SetSelectG1234;

    constructor(public payload: any) {
    }
}

// export interface IG1234 {
//     g1: boolean;
//     g2: boolean;
//     g3: boolean;
//     g4: boolean;
// }

export class SetIsHouseHold implements Action {
    readonly type = HouseHoldTypes.SetIsHouseHold;

    constructor(public payload: boolean) {
    }
}

export class SetIsAgriculture implements Action {
    readonly type = HouseHoldTypes.SetIsAgriculture;

    constructor(public payload: boolean) {
    }
}

export class SetIsFactorial implements Action {
    readonly type = HouseHoldTypes.SetIsFactorial;

    constructor(public payload: boolean) {
    }
}

export class SetIsCommercial implements Action {
    readonly type = HouseHoldTypes.SetIsCommercial;

    constructor(public payload: boolean) {
    }
}

export class SetFactorialCategory implements Action {
    readonly type = HouseHoldTypes.SetFactorialCategory;

    constructor(public payload: string) {
    }
}


export class SetCommercialServiceType implements Action {
    readonly type = HouseHoldTypes.SetCommercialServiceType;

    constructor(public payload: any) {
    }
}

export class SetResidentialGardeningUse implements Action {
    readonly type = HouseHoldTypes.SetResidentialGardeningUse;

    constructor(public payload: string) {
    }
}

export class SetRubberTreeSelectPlant implements Action {
    readonly type = HouseHoldTypes.SetRubberTreeSelectPlant;

    constructor(public payload: any[]) {
    }
}

export class SetPerennialPlantSelectPlant implements Action {
    readonly type = HouseHoldTypes.SetPerennialPlantSelectPlant;

    constructor(public payload: any[]) {
    }
}

export class SetRicePlantSelectPlant implements Action {
    readonly type = HouseHoldTypes.SetRicePlantSelectPlant;

    constructor(public payload: any[]) {
    }
}

export class SetAgronomyPlantSelectPlant implements Action {
    readonly type = HouseHoldTypes.SetAgronomyPlantSelectPlant;

    constructor(public payload: any[]) {
    }
}

export class SetRiceDoing implements Action {
    readonly type = HouseHoldTypes.SetRiceDoing;

    constructor(public payload: any[]) {
    }
}

export class SetAgiSelectRice implements Action {
    readonly type = HouseHoldTypes.SetAgiSelectRice;

    constructor(public payload: any) {
    }
}

export class SetAgiSelectAgronomy implements Action {
    readonly type = HouseHoldTypes.SetAgiSelectAgronomy;

    constructor(public payload: any) {
    }
}

export class SetAgiSelectRubber implements Action {
    readonly type = HouseHoldTypes.SetAgiSelectRubber;

    constructor(public payload: any) {
    }
}

export class SetAgiSelectPerennial implements Action {
    readonly type = HouseHoldTypes.SetAgiSelectPerennial;

    constructor(public payload: any) {
    }
}

export class SetArraySkipPageWaterSources implements Action {
    readonly type = HouseHoldTypes.SetArraySkipPageWaterSources;

    constructor(public payload: any) {
    }
}
export class SetArraySkipPageAgiculture implements Action {
    readonly type = HouseHoldTypes.SetArraySkipPageAgiculture;

    constructor(public payload: any) {
    }
}
export class SetCheckWaterPlumbing implements Action {
    readonly type = HouseHoldTypes.SetCheckWaterPlumbing;

    constructor(public payload: any) {
    }
}
export class SetCheckWaterRiver implements Action {
    readonly type = HouseHoldTypes.SetCheckWaterRiver;

    constructor(public payload: any) {
    }
}
export class SetCheckWaterIrrigation implements Action {
    readonly type = HouseHoldTypes.SetCheckWaterIrrigation;

    constructor(public payload: any) {
    }
}
export class SetCheckWaterRain implements Action {
    readonly type = HouseHoldTypes.SetCheckWaterRain;

    constructor(public payload: any) {
    }
}
export class SetCheckWaterBuying implements Action {
    readonly type = HouseHoldTypes.SetCheckWaterBuying;

    constructor(public payload: any) {
    }
}
export class SetWateringResidential implements Action {
    readonly type = HouseHoldTypes.SetWateringResidential;

    constructor(public payload: any) {
    }
}
export class SetWaterSourcesResidential implements Action {
    readonly type = HouseHoldTypes.SetWaterSourcesResidential;

    constructor(public payload: any) {
    }
}
export class SetWaterSourcesRice implements Action {
    readonly type = HouseHoldTypes.SetWaterSourcesRice;

    constructor(public payload: any) {
    }
}
export class SetWaterSourcesAgiculture implements Action {
    readonly type = HouseHoldTypes.SetWaterSourcesAgiculture;

    constructor(public payload: any) {
    }
}
export class SetWaterSourcesFactory implements Action {
    readonly type = HouseHoldTypes.SetWaterSourcesFactory;

    constructor(public payload: any) {
    }
}
export class SetWaterSourcesCommercial implements Action {
    readonly type = HouseHoldTypes.SetWaterSourcesCommercial;

    constructor(public payload: any) {
    }
}
export class SetNextPageDirection implements Action {
    readonly type = HouseHoldTypes.SetNextPageDirection;

    constructor(public payload: Array<boolean>) {
    }
}

export class SetArrayIsCheck implements Action {
    readonly type = HouseHoldTypes.SetArrayIsCheck;

    constructor(public payload: Array<number>) {
    }
}
export class SetSelectorIndex implements Action {
    readonly type = HouseHoldTypes.SetSelectorIndex;
    constructor(public payload: any) {
    }
}
export class LoadUnitByIdBuilding implements Action {
    readonly type = HouseHoldTypes.LoadUnitByIdBuilding;
    constructor(public payload: string) {
    }
}
export class LoadUnitByIdBuildingSuccess implements Action {
    readonly type = HouseHoldTypes.LoadUnitByIdBuildingSuccess;
    constructor(public payload: any) {
    }
}
export class SetBackToRoot implements Action {
    readonly type = HouseHoldTypes.SetBackToRoot;
    constructor(public payload: any) {
    }
}
export class SetBack implements Action {
    readonly type = HouseHoldTypes.SetBack;
    constructor(public payload: any) {
    }
}
export class LoadDataOfUnit implements Action {
    readonly type = HouseHoldTypes.LoadDataOfUnit;
    constructor(public payload: string) {
    }
}
export class LoadDataOfUnitSuccess implements Action {
    readonly type = HouseHoldTypes.LoadDataOfUnitSuccess;
    constructor(public payload: any) {
    }
}


export type HouseHoldActionsType =
    LoadHouseHoldList
    | LoadHouseHoldListSuccess
    | LoadHouseHoldSample
    | LoadHouseHoldSampleSuccess
    | SetSelectG1234
    | SetIsHouseHold
    | SetIsAgriculture
    | SetIsFactorial
    | SetIsCommercial
    | SetFactorialCategory
    | SetCommercialServiceType
    | SetResidentialGardeningUse
    | SetRubberTreeSelectPlant
    | SetPerennialPlantSelectPlant
    | SetRicePlantSelectPlant
    | SetAgronomyPlantSelectPlant
    | SetCommercialServiceType
    | SetRiceDoing
    | SetAgiSelectRice
    | SetAgiSelectAgronomy
    | SetAgiSelectRubber
    | SetAgiSelectPerennial
    | SetArraySkipPageWaterSources
    | SetArraySkipPageAgiculture
    | SetCheckWaterPlumbing
    | SetCheckWaterRiver
    | SetCheckWaterIrrigation
    | SetCheckWaterRain
    | SetCheckWaterBuying
    | SetWateringResidential
    | SetWaterSourcesResidential
    | SetWaterSourcesRice
    | SetWaterSourcesAgiculture
    | SetWaterSourcesFactory
    | SetWaterSourcesCommercial
    | SetNextPageDirection
    | SetArrayIsCheck
    | SetSelectorIndex
    | LoadUnitByIdBuilding
    | LoadUnitByIdBuildingSuccess
    | SetBackToRoot
    | SetBack
    | LoadDataOfUnit
    | LoadDataOfUnitSuccess

    ;
