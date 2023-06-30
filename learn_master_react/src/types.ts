export type Course = {
    id:number,
    name:string,
    description:string
    applied?:boolean
}

export type Notification = {
    id:number,
    courseId:number,
    studentId:number,
    text:string,
}