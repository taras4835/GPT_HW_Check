// src/types.ts


export interface User{
    id:number;
    name:string;
}

export interface IForm{
    login:string;
    password:string;
    email?:string;
    role?:string;
    company?:string;
    token?: string;
  }


export interface iLoginResult{
    token: string;

    user: User;
}
