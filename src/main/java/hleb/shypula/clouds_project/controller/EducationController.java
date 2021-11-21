package hleb.shypula.clouds_project.controller;

import hleb.shypula.clouds_project.model.Education;
import hleb.shypula.clouds_project.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/educations")
public class EducationController {

    @Autowired
    private EducationRepository educationRepository;

    @GetMapping
    public List<Education> getAllEducations() {
        return educationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable long id) {
        return ResponseEntity.ok(educationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Education not exist: id = " + id)));
    }

    @PostMapping
    public Education createEducation(@RequestBody Education education) {
        return educationRepository.save(education);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable long id, @RequestBody Education newEducation) {
        return ResponseEntity.ok(educationRepository.findById(id)
                                                 .map(education -> {
                                                     education.setName(newEducation.getName());
                                                     education.setGraduationDate(newEducation.getGraduationDate());
                                                     return educationRepository.save(education);
                                                 })
                                                 .orElseGet(() -> {
                                                     newEducation.setId(id);
                                                     return educationRepository.save(newEducation);
                                                 }));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEducation(@PathVariable long id) {
        educationRepository.delete(educationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Education not exist: id = " + id)));

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);

        return ResponseEntity.ok(response);
    }
}
