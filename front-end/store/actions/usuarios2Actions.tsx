import { IpaginatedUsuarios2, IUsuarios2Item } from '../models'

export enum Usuarios2ActionTypes {
  SEARCH_USUARIOS2 = 'usuarios2/search',
  SEARCHING_USUARIOS2 = 'usuarios2/searching',
  FOUND_USUARIOS2 = 'usuarios2/found',
  SEARCHING_USUARIOS2_FAILED = 'usuarios2/searching_failed',

  LOAD_USUARIOS2 = 'usuarios2/load',
  LOADING_USUARIOS2 = 'usuarios2/loading',
  LOADED_USUARIOS2 = 'usuarios2/loaded',
  LOADING_USUARIOS2_FAILED = 'usuarios2/loading_failed',

  ADD_USUARIOS2 = 'usuarios2/add',
  ADDING_USUARIOS2 = 'usuarios2/adding',
  ADDED_USUARIOS2 = 'usuarios2/added',
  ADDING_USUARIOS2_FAILED = 'usuarios2/adding_failed',

  REMOVE_USUARIO2 = 'usuarios2/remove',
  REMOVING_USUARIO2 = 'usuarios2/removing',
  REMOVED_USUARIO2 = 'usuarios2/removed',
  REMOVING_USUARIO2_FAILED = 'usuarios2/removing_failed',

  EDIT_USUARIOS2 = 'usuarios2/edit',
  EDITING_USUARIOS2 = 'usuarios2/editing',
  EDITED_USUARIOS2 = 'usuarios2/edited',
  EDITING_USUARIOS2_FAILED = 'usuarios2/editing_failed',
}

export function searchUsuarios2(searchOptions: TSearchOptions | string, keep?: boolean): ISearchUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.SEARCH_USUARIOS2,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingUsuarios2(): ISearchingUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.SEARCHING_USUARIOS2,
  }
}

export function foundUsuarios2(usuarios2: IpaginatedUsuarios2, keep?: boolean): IFoundUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.FOUND_USUARIOS2,
    keep: keep,
    payload: {
      usuarios2,
    },
  }
}

export function searchingUsuarios2Failed(): ISearchingUsuarios2FailedAction {
  return {
    type: Usuarios2ActionTypes.SEARCHING_USUARIOS2_FAILED,
  }
}

export function loadUsuarios2(loadOptions: TSearchOptions): ILoadUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.LOAD_USUARIOS2,
    loadOptions: loadOptions,
  }
}

export function loadingUsuarios2(): ILoadingUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.LOADING_USUARIOS2,
  }
}

export function loadedUsuarios2(usuarios2: IpaginatedUsuarios2): ILoadedUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.LOADED_USUARIOS2,
    payload: {
      usuarios2,
    },
  }
}

export function loadingUsuarios2Failed(): ILoadingUsuarios2FailedAction {
  return {
    type: Usuarios2ActionTypes.LOADING_USUARIOS2_FAILED,
  }
}

export function addUsuarios2(usuario2: IUsuarios2Item): IAddUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.ADD_USUARIOS2,
    payload: usuario2,
  }
}

export function addingUsuarios2(): IAddingUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.ADDING_USUARIOS2,
  }
}

export function addedUsuarios2(usuarios2: IpaginatedUsuarios2): IAddedUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.ADDED_USUARIOS2,
    payload: {
      usuarios2,
    },
  }
}

export function addingUsuarios2Failed(errData: { data: { message: string; field?: string }; status: number }): IAddingUsuarios2FailedAction {
  return {
    type: Usuarios2ActionTypes.ADDING_USUARIOS2_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeUsuario2(usuario2: IUsuarios2Item): IRemoveUsuario2Action {
  return {
    type: Usuarios2ActionTypes.REMOVE_USUARIO2,
    payload: usuario2,
  }
}

export function removingUsuario2(): IRemovingUsuario2Action {
  return {
    type: Usuarios2ActionTypes.REMOVING_USUARIO2,
  }
}

export function removedUsuario2(): IRemovedUsuario2Action {
  return {
    type: Usuarios2ActionTypes.REMOVED_USUARIO2,
  }
}

export function removingUsuario2Failed(): IRemovingUsuario2FailedAction {
  return {
    type: Usuarios2ActionTypes.REMOVING_USUARIO2_FAILED,
  }
}

export function editUsuarios2(usuario2: IUsuarios2Item): IEditUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.EDIT_USUARIOS2,
    payload: usuario2,
  }
}

export function editingUsuarios2(): IEditingUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.EDITING_USUARIOS2,
  }
}

export function editedUsuarios2(usuarios2: IUsuarios2Item): IEditedUsuarios2Action {
  return {
    type: Usuarios2ActionTypes.EDITED_USUARIOS2,
    payload: usuarios2,
  }
}

export function editingUsuarios2Failed(): IEditingUsuarios2FailedAction {
  return {
    type: Usuarios2ActionTypes.EDITING_USUARIOS2_FAILED,
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

export interface ISearchUsuarios2Action {
  type: Usuarios2ActionTypes.SEARCH_USUARIOS2
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingUsuarios2Action {
  type: Usuarios2ActionTypes.SEARCHING_USUARIOS2
}

export interface IFoundUsuarios2Action {
  type: Usuarios2ActionTypes.FOUND_USUARIOS2
  keep?: boolean
  payload: {
    usuarios2: IpaginatedUsuarios2
  }
}

export interface ISearchingUsuarios2FailedAction {
  type: Usuarios2ActionTypes.SEARCHING_USUARIOS2_FAILED
}

export interface ILoadUsuarios2Action {
  type: Usuarios2ActionTypes.LOAD_USUARIOS2
  loadOptions: TSearchOptions
}

export interface ILoadingUsuarios2Action {
  type: Usuarios2ActionTypes.LOADING_USUARIOS2
}

export interface ILoadedUsuarios2Action {
  type: Usuarios2ActionTypes.LOADED_USUARIOS2
  payload: {
    usuarios2: IpaginatedUsuarios2
  }
}

export interface ILoadingUsuarios2FailedAction {
  type: Usuarios2ActionTypes.LOADING_USUARIOS2_FAILED
}

export interface IAddUsuarios2Action {
  type: Usuarios2ActionTypes.ADD_USUARIOS2
  payload: IUsuarios2Item
}

export interface IAddingUsuarios2Action {
  type: Usuarios2ActionTypes.ADDING_USUARIOS2
}

export interface IAddedUsuarios2Action {
  type: Usuarios2ActionTypes.ADDED_USUARIOS2
  payload: {
    usuarios2: IpaginatedUsuarios2
  }
}

export interface IAddingUsuarios2FailedAction {
  type: Usuarios2ActionTypes.ADDING_USUARIOS2_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveUsuario2Action {
  type: Usuarios2ActionTypes.REMOVE_USUARIO2
  payload: IUsuarios2Item
}

export interface IRemovingUsuario2Action {
  type: Usuarios2ActionTypes.REMOVING_USUARIO2
}

export interface IRemovedUsuario2Action {
  type: Usuarios2ActionTypes.REMOVED_USUARIO2
}

export interface IRemovingUsuario2FailedAction {
  type: Usuarios2ActionTypes.REMOVING_USUARIO2_FAILED
}

export interface IEditUsuarios2Action {
  type: Usuarios2ActionTypes.EDIT_USUARIOS2
  payload: IUsuarios2Item
}

export interface IEditingUsuarios2Action {
  type: Usuarios2ActionTypes.EDITING_USUARIOS2
}

export interface IEditedUsuarios2Action {
  type: Usuarios2ActionTypes.EDITED_USUARIOS2
  payload: IUsuarios2Item
}

export interface IEditingUsuarios2FailedAction {
  type: Usuarios2ActionTypes.EDITING_USUARIOS2_FAILED
}

export type Usuarios2Action =
  | ISearchUsuarios2Action
  | ISearchingUsuarios2Action
  | IFoundUsuarios2Action
  | ISearchingUsuarios2FailedAction
  | ILoadUsuarios2Action
  | ILoadingUsuarios2Action
  | ILoadedUsuarios2Action
  | ILoadingUsuarios2FailedAction
  | IAddUsuarios2Action
  | IAddingUsuarios2Action
  | IAddedUsuarios2Action
  | IAddingUsuarios2FailedAction
  | IRemoveUsuario2Action
  | IRemovingUsuario2Action
  | IRemovedUsuario2Action
  | IRemovingUsuario2FailedAction
  | IEditUsuarios2Action
  | IEditingUsuarios2Action
  | IEditedUsuarios2Action
  | IEditingUsuarios2FailedAction
