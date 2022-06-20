import { IpaginatedTablas2, ITablas2Item } from '../models'

export enum Tablas2ActionTypes {
  SEARCH_TABLAS2 = 'tablas2/search',
  SEARCHING_TABLAS2 = 'tablas2/searching',
  FOUND_TABLAS2 = 'tablas2/found',
  SEARCHING_TABLAS2_FAILED = 'tablas2/searching_failed',

  LOAD_TABLAS2 = 'tablas2/load',
  LOADING_TABLAS2 = 'tablas2/loading',
  LOADED_TABLAS2 = 'tablas2/loaded',
  LOADING_TABLAS2_FAILED = 'tablas2/loading_failed',

  ADD_TABLAS2 = 'tablas2/add',
  ADDING_TABLAS2 = 'tablas2/adding',
  ADDED_TABLAS2 = 'tablas2/added',
  ADDING_TABLAS2_FAILED = 'tablas2/adding_failed',

  REMOVE_TABLA2 = 'tablas2/remove',
  REMOVING_TABLA2 = 'tablas2/removing',
  REMOVED_TABLA2 = 'tablas2/removed',
  REMOVING_TABLA2_FAILED = 'tablas2/removing_failed',

  EDIT_TABLAS2 = 'tablas2/edit',
  EDITING_TABLAS2 = 'tablas2/editing',
  EDITED_TABLAS2 = 'tablas2/edited',
  EDITING_TABLAS2_FAILED = 'tablas2/editing_failed',
}

export function searchTablas2(searchOptions: TSearchOptions | string, keep?: boolean): ISearchTablas2Action {
  return {
    type: Tablas2ActionTypes.SEARCH_TABLAS2,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingTablas2(): ISearchingTablas2Action {
  return {
    type: Tablas2ActionTypes.SEARCHING_TABLAS2,
  }
}

export function foundTablas2(tablas2: IpaginatedTablas2, keep?: boolean): IFoundTablas2Action {
  return {
    type: Tablas2ActionTypes.FOUND_TABLAS2,
    keep: keep,
    payload: {
      tablas2,
    },
  }
}

export function searchingTablas2Failed(): ISearchingTablas2FailedAction {
  return {
    type: Tablas2ActionTypes.SEARCHING_TABLAS2_FAILED,
  }
}

export function loadTablas2(loadOptions: TSearchOptions): ILoadTablas2Action {
  return {
    type: Tablas2ActionTypes.LOAD_TABLAS2,
    loadOptions: loadOptions,
  }
}

export function loadingTablas2(): ILoadingTablas2Action {
  return {
    type: Tablas2ActionTypes.LOADING_TABLAS2,
  }
}

export function loadedTablas2(tablas2: IpaginatedTablas2): ILoadedTablas2Action {
  return {
    type: Tablas2ActionTypes.LOADED_TABLAS2,
    payload: {
      tablas2,
    },
  }
}

export function loadingTablas2Failed(): ILoadingTablas2FailedAction {
  return {
    type: Tablas2ActionTypes.LOADING_TABLAS2_FAILED,
  }
}

export function addTablas2(tabla2: ITablas2Item): IAddTablas2Action {
  return {
    type: Tablas2ActionTypes.ADD_TABLAS2,
    payload: tabla2,
  }
}

export function addingTablas2(): IAddingTablas2Action {
  return {
    type: Tablas2ActionTypes.ADDING_TABLAS2,
  }
}

export function addedTablas2(tablas2: IpaginatedTablas2): IAddedTablas2Action {
  return {
    type: Tablas2ActionTypes.ADDED_TABLAS2,
    payload: {
      tablas2,
    },
  }
}

export function addingTablas2Failed(errData: { data: { message: string; field?: string }; status: number }): IAddingTablas2FailedAction {
  return {
    type: Tablas2ActionTypes.ADDING_TABLAS2_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeTabla2(tabla2: ITablas2Item): IRemoveTabla2Action {
  return {
    type: Tablas2ActionTypes.REMOVE_TABLA2,
    payload: tabla2,
  }
}

export function removingTabla2(): IRemovingTabla2Action {
  return {
    type: Tablas2ActionTypes.REMOVING_TABLA2,
  }
}

export function removedTabla2(): IRemovedTabla2Action {
  return {
    type: Tablas2ActionTypes.REMOVED_TABLA2,
  }
}

export function removingTabla2Failed(): IRemovingTabla2FailedAction {
  return {
    type: Tablas2ActionTypes.REMOVING_TABLA2_FAILED,
  }
}

export function editTablas2(tabla2: ITablas2Item): IEditTablas2Action {
  return {
    type: Tablas2ActionTypes.EDIT_TABLAS2,
    payload: tabla2,
  }
}

export function editingTablas2(): IEditingTablas2Action {
  return {
    type: Tablas2ActionTypes.EDITING_TABLAS2,
  }
}

export function editedTablas2(tablas2: ITablas2Item): IEditedTablas2Action {
  return {
    type: Tablas2ActionTypes.EDITED_TABLAS2,
    payload: tablas2,
  }
}

export function editingTablas2Failed(): IEditingTablas2FailedAction {
  return {
    type: Tablas2ActionTypes.EDITING_TABLAS2_FAILED,
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

export interface ISearchTablas2Action {
  type: Tablas2ActionTypes.SEARCH_TABLAS2
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingTablas2Action {
  type: Tablas2ActionTypes.SEARCHING_TABLAS2
}

export interface IFoundTablas2Action {
  type: Tablas2ActionTypes.FOUND_TABLAS2
  keep?: boolean
  payload: {
    tablas2: IpaginatedTablas2
  }
}

export interface ISearchingTablas2FailedAction {
  type: Tablas2ActionTypes.SEARCHING_TABLAS2_FAILED
}

export interface ILoadTablas2Action {
  type: Tablas2ActionTypes.LOAD_TABLAS2
  loadOptions: TSearchOptions
}

export interface ILoadingTablas2Action {
  type: Tablas2ActionTypes.LOADING_TABLAS2
}

export interface ILoadedTablas2Action {
  type: Tablas2ActionTypes.LOADED_TABLAS2
  payload: {
    tablas2: IpaginatedTablas2
  }
}

export interface ILoadingTablas2FailedAction {
  type: Tablas2ActionTypes.LOADING_TABLAS2_FAILED
}

export interface IAddTablas2Action {
  type: Tablas2ActionTypes.ADD_TABLAS2
  payload: ITablas2Item
}

export interface IAddingTablas2Action {
  type: Tablas2ActionTypes.ADDING_TABLAS2
}

export interface IAddedTablas2Action {
  type: Tablas2ActionTypes.ADDED_TABLAS2
  payload: {
    tablas2: IpaginatedTablas2
  }
}

export interface IAddingTablas2FailedAction {
  type: Tablas2ActionTypes.ADDING_TABLAS2_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveTabla2Action {
  type: Tablas2ActionTypes.REMOVE_TABLA2
  payload: ITablas2Item
}

export interface IRemovingTabla2Action {
  type: Tablas2ActionTypes.REMOVING_TABLA2
}

export interface IRemovedTabla2Action {
  type: Tablas2ActionTypes.REMOVED_TABLA2
}

export interface IRemovingTabla2FailedAction {
  type: Tablas2ActionTypes.REMOVING_TABLA2_FAILED
}

export interface IEditTablas2Action {
  type: Tablas2ActionTypes.EDIT_TABLAS2
  payload: ITablas2Item
}

export interface IEditingTablas2Action {
  type: Tablas2ActionTypes.EDITING_TABLAS2
}

export interface IEditedTablas2Action {
  type: Tablas2ActionTypes.EDITED_TABLAS2
  payload: ITablas2Item
}

export interface IEditingTablas2FailedAction {
  type: Tablas2ActionTypes.EDITING_TABLAS2_FAILED
}

export type Tablas2Action =
  | ISearchTablas2Action
  | ISearchingTablas2Action
  | IFoundTablas2Action
  | ISearchingTablas2FailedAction
  | ILoadTablas2Action
  | ILoadingTablas2Action
  | ILoadedTablas2Action
  | ILoadingTablas2FailedAction
  | IAddTablas2Action
  | IAddingTablas2Action
  | IAddedTablas2Action
  | IAddingTablas2FailedAction
  | IRemoveTabla2Action
  | IRemovingTabla2Action
  | IRemovedTabla2Action
  | IRemovingTabla2FailedAction
  | IEditTablas2Action
  | IEditingTablas2Action
  | IEditedTablas2Action
  | IEditingTablas2FailedAction
