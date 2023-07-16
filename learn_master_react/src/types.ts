export type Course = {
    id:number,
    title:string,
    description:string
    applied?:boolean
}

export type Notification = {
    id:number,
    courseId:number,
    text:string,
}

export type Lesson = {
    id:number,
    title:string,
    text:string,
    parentId:number,
    courseId:number
    video?:string
}

export type Homework = {
    id:number,
    file:string,
    studentId:string,
    studentName:string,
    homeworkId:number,
    mark:number,
}

export type Message ={
    id?:number,
    text:string,
    date:string,
    courseId:number,
    userName:string,
}