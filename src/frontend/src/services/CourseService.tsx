const COURSE_API_BASE_URL: string = "/api/courses";

class CourseService {
    getCourseById(courseId: number): Promise<Response> {
        return fetch(COURSE_API_BASE_URL + "/" + courseId);
    }

    getCourses(): Promise<Response> {
        return fetch(COURSE_API_BASE_URL);
    }
}

export default new CourseService();