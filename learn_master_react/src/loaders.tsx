import { getCourseById, getHomework, getHomeworkFile, getHomeworks, getLessonById, getLessons, getMessages, getVideoByLessonId } from "./app/api";
import { Homework, Lesson, Message } from "./types";

export async function loaderLessons ({params}:any){

    let courseId:number = +params.courseId;
    let course = await getCourseById(courseId);
    let lessons:Lesson[] =  await getLessons(courseId);
    return {lessons, course};
}

export async function loaderLesson({params}:any) {

    let lessonId:number = +(params.lessonId);
    let lesson = await getLessonById(lessonId);
    let urlVideo = await getVideoByLessonId(lessonId);
    debugger;

    return {lesson, urlVideo};
}

export async function addLessonLoader({params}:any){
    let courseId = params.courseId;
    let parentId = params.parentId;

    debugger;
    return {courseId, parentId }
}

export async function homeworksLoader({params}:any){
    let lessonId = params.lessonId;
    let homeworks:Homework[] = await getHomeworks(lessonId);
    return homeworks;

}

export async function homeworkLoader({params}:any){
    let homeworkId = params.homeworkId;
    let urlImg = await getHomeworkFile(homeworkId);
    let homework = await getHomework(homeworkId);
    return {urlImg, homework};
}

export async function chatLoader({params}:any){
    let courseId:number = params.courseId;
    let loadedMessages:Message[] = await getMessages(courseId);
    return {courseId, loadedMessages};
}