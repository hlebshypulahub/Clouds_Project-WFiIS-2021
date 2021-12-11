package hleb.shypula.clouds_project.controller;

import hleb.shypula.clouds_project.model.Course;
import hleb.shypula.clouds_project.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/not-employee/{employeeId}")
    public List<Course> getCoursesNotEmployee(@PathVariable Long employeeId) {
        return courseRepository.findAllNotEmployee(employeeId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable long id) {
        return ResponseEntity.ok(courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not exist: id = " + id)));
    }

    @GetMapping("/add-course/{courseId}/to-employee/{employeeId}")
    public void addCourseToEmployee(@PathVariable Long courseId, @PathVariable Long employeeId) {
        courseRepository.addCourseToEmployee(courseId, employeeId);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        Course resultCourse = courseRepository.save(course);
//        courseRepository.addEmployee(course.getEmployee().getId(), course.getId());

        return resultCourse;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable long id, @RequestBody Course newCourse) {
        return ResponseEntity.ok(courseRepository.findById(id)
                                                 .map(course -> {
                                                     course.setName(newCourse.getName());
                                                     course.setHours(newCourse.getHours());
                                                     return courseRepository.save(course);
                                                 })
                                                 .orElseGet(() -> {
                                                     newCourse.setId(id);
                                                     return courseRepository.save(newCourse);
                                                 }));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCourse(@PathVariable long id) {
        courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not exist: id = " + id)));

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);

        return ResponseEntity.ok(response);
    }
}
