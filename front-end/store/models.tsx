export interface ITablas2Item {
  _id?: String
  createdAt: Date

  Nombre: string
  Descripcion: String

  imagen: string
}

export interface IpaginatedTablas2 {
  docs: ITablas2Item[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
export interface IUsuarios2Item {
  _id?: String
  createdAt: Date

  Nombre: string

  Apellido: string
  Email: Number
}

export interface IpaginatedUsuarios2 {
  docs: IUsuarios2Item[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export enum ApiStatus {
  NOTLOADED = 'notloaded',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
}
