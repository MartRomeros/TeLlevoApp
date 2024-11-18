export interface pasajero {
    id?: number,
    username: string,
    email: string,
    password: string
}

export interface conductor {
    id?: number,
    username: string,
    email: string,
    password: string,
    tipoUsuario:string,
    patente: string,
    marca: string
}

export interface user {
    email: string,
    password: string
}