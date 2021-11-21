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
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable long id) {
        return ResponseEntity.ok(courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not exist: id = " + id)));
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseRepository.save(course);
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
