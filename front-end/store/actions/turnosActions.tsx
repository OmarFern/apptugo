import { IpaginatedTurnos, ITurnosItem } from '../models'

export enum TurnosActionTypes {
  SEARCH_TURNOS = 'turnos/search',
  SEARCHING_TURNOS = 'turnos/searching',
  FOUND_TURNOS = 'turnos/found',
  SEARCHING_TURNOS_FAILED = 'turnos/searching_failed',

  LOAD_TURNOS = 'turnos/load',
  LOADING_TURNOS = 'turnos/loading',
  LOADED_TURNOS = 'turnos/loaded',
  LOADING_TURNOS_FAILED = 'turnos/loading_failed',

  ADD_TURNOS = 'turnos/add',
  ADDING_TURNOS = 'turnos/adding',
  ADDED_TURNOS = 'turnos/added',
  ADDING_TURNOS_FAILED = 'turnos/adding_failed',

  REMOVE_TURNO = 'turnos/remove',
  REMOVING_TURNO = 'turnos/removing',
  REMOVED_TURNO = 'turnos/removed',
  REMOVING_TURNO_FAILED = 'turnos/removing_failed',

  EDIT_TURNOS = 'turnos/edit',
  EDITING_TURNOS = 'turnos/editing',
  EDITED_TURNOS = 'turnos/edited',
  EDITING_TURNOS_FAILED = 'turnos/editing_failed',
}

export function searchTurnos(searchOptions: TSearchOptions | string, keep?: boolean): ISearchTurnosAction {
  return {
    type: TurnosActionTypes.SEARCH_TURNOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingTurnos(): ISearchingTurnosAction {
  return {
    type: TurnosActionTypes.SEARCHING_TURNOS,
  }
}

export function foundTurnos(turnos: IpaginatedTurnos, keep?: boolean): IFoundTurnosAction {
  return {
    type: TurnosActionTypes.FOUND_TURNOS,
    keep: keep,
    payload: {
      turnos,
    },
  }
}

export function searchingTurnosFailed(): ISearchingTurnosFailedAction {
  return {
    type: TurnosActionTypes.SEARCHING_TURNOS_FAILED,
  }
}

export function loadTurnos(loadOptions: TSearchOptions): ILoadTurnosAction {
  return {
    type: TurnosActionTypes.LOAD_TURNOS,
    loadOptions: loadOptions,
  }
}

export function loadingTurnos(): ILoadingTurnosAction {
  return {
    type: TurnosActionTypes.LOADING_TURNOS,
  }
}

export function loadedTurnos(turnos: IpaginatedTurnos): ILoadedTurnosAction {
  return {
    type: TurnosActionTypes.LOADED_TURNOS,
    payload: {
      turnos,
    },
  }
}

export function loadingTurnosFailed(): ILoadingTurnosFailedAction {
  return {
    type: TurnosActionTypes.LOADING_TURNOS_FAILED,
  }
}

export function addTurnos(turno: ITurnosItem): IAddTurnosAction {
  return {
    type: TurnosActionTypes.ADD_TURNOS,
    payload: turno,
  }
}

export function addingTurnos(): IAddingTurnosAction {
  return {
    type: TurnosActionTypes.ADDING_TURNOS,
  }
}

export function addedTurnos(turnos: IpaginatedTurnos): IAddedTurnosAction {
  return {
    type: TurnosActionTypes.ADDED_TURNOS,
    payload: {
      turnos,
    },
  }
}

export function addingTurnosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingTurnosFailedAction {
  return {
    type: TurnosActionTypes.ADDING_TURNOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeTurno(turno: ITurnosItem): IRemoveTurnoAction {
  return {
    type: TurnosActionTypes.REMOVE_TURNO,
    payload: turno,
  }
}

export function removingTurno(): IRemovingTurnoAction {
  return {
    type: TurnosActionTypes.REMOVING_TURNO,
  }
}

export function removedTurno(): IRemovedTurnoAction {
  return {
    type: TurnosActionTypes.REMOVED_TURNO,
  }
}

export function removingTurnoFailed(): IRemovingTurnoFailedAction {
  return {
    type: TurnosActionTypes.REMOVING_TURNO_FAILED,
  }
}

export function editTurnos(turno: ITurnosItem): IEditTurnosAction {
  return {
    type: TurnosActionTypes.EDIT_TURNOS,
    payload: turno,
  }
}

export function editingTurnos(): IEditingTurnosAction {
  return {
    type: TurnosActionTypes.EDITING_TURNOS,
  }
}

export function editedTurnos(turnos: ITurnosItem): IEditedTurnosAction {
  return {
    type: TurnosActionTypes.EDITED_TURNOS,
    payload: turnos,
  }
}

export function editingTurnosFailed(): IEditingTurnosFailedAction {
  return {
    type: TurnosActionTypes.EDITING_TURNOS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchTurnosAction {
  type: TurnosActionTypes.SEARCH_TURNOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingTurnosAction {
  type: TurnosActionTypes.SEARCHING_TURNOS
}

export interface IFoundTurnosAction {
  type: TurnosActionTypes.FOUND_TURNOS
  keep?: boolean
  payload: {
    turnos: IpaginatedTurnos
  }
}

export interface ISearchingTurnosFailedAction {
  type: TurnosActionTypes.SEARCHING_TURNOS_FAILED
}

export interface ILoadTurnosAction {
  type: TurnosActionTypes.LOAD_TURNOS
  loadOptions: TSearchOptions
}

export interface ILoadingTurnosAction {
  type: TurnosActionTypes.LOADING_TURNOS
}

export interface ILoadedTurnosAction {
  type: TurnosActionTypes.LOADED_TURNOS
  payload: {
    turnos: IpaginatedTurnos
  }
}

export interface ILoadingTurnosFailedAction {
  type: TurnosActionTypes.LOADING_TURNOS_FAILED
}

export interface IAddTurnosAction {
  type: TurnosActionTypes.ADD_TURNOS
  payload: ITurnosItem
}

export interface IAddingTurnosAction {
  type: TurnosActionTypes.ADDING_TURNOS
}

export interface IAddedTurnosAction {
  type: TurnosActionTypes.ADDED_TURNOS
  payload: {
    turnos: IpaginatedTurnos
  }
}

export interface IAddingTurnosFailedAction {
  type: TurnosActionTypes.ADDING_TURNOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveTurnoAction {
  type: TurnosActionTypes.REMOVE_TURNO
  payload: ITurnosItem
}

export interface IRemovingTurnoAction {
  type: TurnosActionTypes.REMOVING_TURNO
}

export interface IRemovedTurnoAction {
  type: TurnosActionTypes.REMOVED_TURNO
}

export interface IRemovingTurnoFailedAction {
  type: TurnosActionTypes.REMOVING_TURNO_FAILED
}

export interface IEditTurnosAction {
  type: TurnosActionTypes.EDIT_TURNOS
  payload: ITurnosItem
}

export interface IEditingTurnosAction {
  type: TurnosActionTypes.EDITING_TURNOS
}

export interface IEditedTurnosAction {
  type: TurnosActionTypes.EDITED_TURNOS
  payload: ITurnosItem
}

export interface IEditingTurnosFailedAction {
  type: TurnosActionTypes.EDITING_TURNOS_FAILED
}

export type TurnosAction =
  | ISearchTurnosAction
  | ISearchingTurnosAction
  | IFoundTurnosAction
  | ISearchingTurnosFailedAction
  | ILoadTurnosAction
  | ILoadingTurnosAction
  | ILoadedTurnosAction
  | ILoadingTurnosFailedAction
  | IAddTurnosAction
  | IAddingTurnosAction
  | IAddedTurnosAction
  | IAddingTurnosFailedAction
  | IRemoveTurnoAction
  | IRemovingTurnoAction
  | IRemovedTurnoAction
  | IRemovingTurnoFailedAction
  | IEditTurnosAction
  | IEditingTurnosAction
  | IEditedTurnosAction
  | IEditingTurnosFailedAction
