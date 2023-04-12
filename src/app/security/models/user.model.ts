export type User ={
    id: number,
    username: string,
    password: string,
    email: string,
    roles: string[]
}

export type JwtToken = {
    access_token: string;
    refresh_token: string;
}