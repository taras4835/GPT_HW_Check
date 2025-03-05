// src/types.ts


export interface User{
    id:number;
    username:string;
    balance: number;
}
export interface selectedCheck{
    id: number,
    data: any,
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
