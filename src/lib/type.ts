export interface SignIn {
    username: string,
    password: string,
}

export interface Tokens {
    access: string,
    refresh: string,
}

export interface Subject {
    id: number
    type: number
    name: string
}

export interface Schedule {
    id: number
    quarter: number
    order: number
    weekday: number
    subject: number
    group: number
    teacher: number
}

export interface Question {
    id: number
    type: number
    cl: number
    text: string
}