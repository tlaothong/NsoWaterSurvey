import { Action } from '@ngrx/store';

export enum HouseHoldTypes {
    StateName = "HouseHold",
    LoadList = "[HH] Load List",
    LoadListSuccess = "[HH] Load List Success",
    Load = "[HH] Load",
    LoadSuccess = "[HH] Load Success",
    SetFactorialCategory = "[HH] Set Factorial Category",
    SetWaterSource = "[HH] Set WaterSource",
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
    readonly type = HouseHoldTypes.Load;

    constructor() {
    }
}

export class LoadHouseHoldSampleSuccess implements Action {
    readonly type = HouseHoldTypes.LoadSuccess;

    constructor(public payload: any) {
    }
}

export class SetFactorialCategory implements Action {
    readonly type = HouseHoldTypes.SetFactorialCategory;

    constructor(public payload: string) {
    }
}

export class SetWaterSources implements Action {
    readonly type = HouseHoldTypes.SetWaterSource;

    constructor(public payload: any) {
    }
}


export type HouseHoldActionsType =
    LoadHouseHoldList
    | LoadHouseHoldListSuccess
    | LoadHouseHoldSample
    | LoadHouseHoldSampleSuccess
    | SetFactorialCategory
    | SetWaterSources
    ;