const COURSE_API_BASE_URL: string = "/api/courses";

type Course = {
    id: number;
    name: string;
    hours: number;
    facility: object;
    employee: object;
}

class CourseService {
    getCourseById(courseId: number): Promise<Response> {
        return fetch(COURSE_API_BASE_URL + "/" + courseId);
    }

    getCourses(): Promise<Response> {
        return fetch(COURSE_API_BASE_URL);
    }

    getCoursesNotEmployee(employeeId: number): Promise<Response> {
        return fetch(COURSE_API_BASE_URL + "/not-employee/" + employeeId);
    }

    saveCourse(course: Course): Promise<Response> {
        return fetch(COURSE_API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
    }

    addCourseToEmployee(courseId: number, employeeId: number): Promise<Response> {
        return fetch(COURSE_API_BASE_URL + `/add-course/${courseId}/to-employee/${employeeId}`);
    }
}

export default new CourseService();