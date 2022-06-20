import { IpaginatedServicios, IServiciosItem } from '../models'

export enum ServiciosActionTypes {
  SEARCH_SERVICIOS = 'servicios/search',
  SEARCHING_SERVICIOS = 'servicios/searching',
  FOUND_SERVICIOS = 'servicios/found',
  SEARCHING_SERVICIOS_FAILED = 'servicios/searching_failed',

  LOAD_SERVICIOS = 'servicios/load',
  LOADING_SERVICIOS = 'servicios/loading',
  LOADED_SERVICIOS = 'servicios/loaded',
  LOADING_SERVICIOS_FAILED = 'servicios/loading_failed',

  ADD_SERVICIOS = 'servicios/add',
  ADDING_SERVICIOS = 'servicios/adding',
  ADDED_SERVICIOS = 'servicios/added',
  ADDING_SERVICIOS_FAILED = 'servicios/adding_failed',

  REMOVE_SERVICIO = 'servicios/remove',
  REMOVING_SERVICIO = 'servicios/removing',
  REMOVED_SERVICIO = 'servicios/removed',
  REMOVING_SERVICIO_FAILED = 'servicios/removing_failed',

  EDIT_SERVICIOS = 'servicios/edit',
  EDITING_SERVICIOS = 'servicios/editing',
  EDITED_SERVICIOS = 'servicios/edited',
  EDITING_SERVICIOS_FAILED = 'servicios/editing_failed',
}

export function searchServicios(searchOptions: TSearchOptions | string, keep?: boolean): ISearchServiciosAction {
  return {
    type: ServiciosActionTypes.SEARCH_SERVICIOS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingServicios(): ISearchingServiciosAction {
  return {
    type: ServiciosActionTypes.SEARCHING_SERVICIOS,
  }
}

export function foundServicios(servicios: IpaginatedServicios, keep?: boolean): IFoundServiciosAction {
  return {
    type: ServiciosActionTypes.FOUND_SERVICIOS,
    keep: keep,
    payload: {
      servicios,
    },
  }
}

export function searchingServiciosFailed(): ISearchingServiciosFailedAction {
  return {
    type: ServiciosActionTypes.SEARCHING_SERVICIOS_FAILED,
  }
}

export function loadServicios(loadOptions: TSearchOptions): ILoadServiciosAction {
  return {
    type: ServiciosActionTypes.LOAD_SERVICIOS,
    loadOptions: loadOptions,
  }
}

export function loadingServicios(): ILoadingServiciosAction {
  return {
    type: ServiciosActionTypes.LOADING_SERVICIOS,
  }
}

export function loadedServicios(servicios: IpaginatedServicios): ILoadedServiciosAction {
  return {
    type: ServiciosActionTypes.LOADED_SERVICIOS,
    payload: {
      servicios,
    },
  }
}

export function loadingServiciosFailed(): ILoadingServiciosFailedAction {
  return {
    type: ServiciosActionTypes.LOADING_SERVICIOS_FAILED,
  }
}

export function addServicios(servicio: IServiciosItem): IAddServiciosAction {
  return {
    type: ServiciosActionTypes.ADD_SERVICIOS,
    payload: servicio,
  }
}

export function addingServicios(): IAddingServiciosAction {
  return {
    type: ServiciosActionTypes.ADDING_SERVICIOS,
  }
}

export function addedServicios(servicios: IpaginatedServicios): IAddedServiciosAction {
  return {
    type: ServiciosActionTypes.ADDED_SERVICIOS,
    payload: {
      servicios,
    },
  }
}

export function addingServiciosFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingServiciosFailedAction {
  return {
    type: ServiciosActionTypes.ADDING_SERVICIOS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeServicio(servicio: IServiciosItem): IRemoveServicioAction {
  return {
    type: ServiciosActionTypes.REMOVE_SERVICIO,
    payload: servicio,
  }
}

export function removingServicio(): IRemovingServicioAction {
  return {
    type: ServiciosActionTypes.REMOVING_SERVICIO,
  }
}

export function removedServicio(): IRemovedServicioAction {
  return {
    type: ServiciosActionTypes.REMOVED_SERVICIO,
  }
}

export function removingServicioFailed(): IRemovingServicioFailedAction {
  return {
    type: ServiciosActionTypes.REMOVING_SERVICIO_FAILED,
  }
}

export function editServicios(servicio: IServiciosItem): IEditServiciosAction {
  return {
    type: ServiciosActionTypes.EDIT_SERVICIOS,
    payload: servicio,
  }
}

export function editingServicios(): IEditingServiciosAction {
  return {
    type: ServiciosActionTypes.EDITING_SERVICIOS,
  }
}

export function editedServicios(servicios: IServiciosItem): IEditedServiciosAction {
  return {
    type: ServiciosActionTypes.EDITED_SERVICIOS,
    payload: servicios,
  }
}

export function editingServiciosFailed(): IEditingServiciosFailedAction {
  return {
    type: ServiciosActionTypes.EDITING_SERVICIOS_FAILED,
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

export interface ISearchServiciosAction {
  type: ServiciosActionTypes.SEARCH_SERVICIOS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingServiciosAction {
  type: ServiciosActionTypes.SEARCHING_SERVICIOS
}

export interface IFoundServiciosAction {
  type: ServiciosActionTypes.FOUND_SERVICIOS
  keep?: boolean
  payload: {
    servicios: IpaginatedServicios
  }
}

export interface ISearchingServiciosFailedAction {
  type: ServiciosActionTypes.SEARCHING_SERVICIOS_FAILED
}

export interface ILoadServiciosAction {
  type: ServiciosActionTypes.LOAD_SERVICIOS
  loadOptions: TSearchOptions
}

export interface ILoadingServiciosAction {
  type: ServiciosActionTypes.LOADING_SERVICIOS
}

export interface ILoadedServiciosAction {
  type: ServiciosActionTypes.LOADED_SERVICIOS
  payload: {
    servicios: IpaginatedServicios
  }
}

export interface ILoadingServiciosFailedAction {
  type: ServiciosActionTypes.LOADING_SERVICIOS_FAILED
}

export interface IAddServiciosAction {
  type: ServiciosActionTypes.ADD_SERVICIOS
  payload: IServiciosItem
}

export interface IAddingServiciosAction {
  type: ServiciosActionTypes.ADDING_SERVICIOS
}

export interface IAddedServiciosAction {
  type: ServiciosActionTypes.ADDED_SERVICIOS
  payload: {
    servicios: IpaginatedServicios
  }
}

export interface IAddingServiciosFailedAction {
  type: ServiciosActionTypes.ADDING_SERVICIOS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveServicioAction {
  type: ServiciosActionTypes.REMOVE_SERVICIO
  payload: IServiciosItem
}

export interface IRemovingServicioAction {
  type: ServiciosActionTypes.REMOVING_SERVICIO
}

export interface IRemovedServicioAction {
  type: ServiciosActionTypes.REMOVED_SERVICIO
}

export interface IRemovingServicioFailedAction {
  type: ServiciosActionTypes.REMOVING_SERVICIO_FAILED
}

export interface IEditServiciosAction {
  type: ServiciosActionTypes.EDIT_SERVICIOS
  payload: IServiciosItem
}

export interface IEditingServiciosAction {
  type: ServiciosActionTypes.EDITING_SERVICIOS
}

export interface IEditedServiciosAction {
  type: ServiciosActionTypes.EDITED_SERVICIOS
  payload: IServiciosItem
}

export interface IEditingServiciosFailedAction {
  type: ServiciosActionTypes.EDITING_SERVICIOS_FAILED
}

export type ServiciosAction =
  | ISearchServiciosAction
  | ISearchingServiciosAction
  | IFoundServiciosAction
  | ISearchingServiciosFailedAction
  | ILoadServiciosAction
  | ILoadingServiciosAction
  | ILoadedServiciosAction
  | ILoadingServiciosFailedAction
  | IAddServiciosAction
  | IAddingServiciosAction
  | IAddedServiciosAction
  | IAddingServiciosFailedAction
  | IRemoveServicioAction
  | IRemovingServicioAction
  | IRemovedServicioAction
  | IRemovingServicioFailedAction
  | IEditServiciosAction
  | IEditingServiciosAction
  | IEditedServiciosAction
  | IEditingServiciosFailedAction
