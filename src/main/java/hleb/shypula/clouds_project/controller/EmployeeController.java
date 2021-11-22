package hleb.shypula.clouds_project.controller;

import hleb.shypula.clouds_project.model.Employee;
import hleb.shypula.clouds_project.repository.EmployeeRepository;
import hleb.shypula.clouds_project.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
        return ResponseEntity.ok(employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist: id = " + id)));
    }

    @GetMapping("/for-{name}")
    public List<Employee> getEmployeesForFacility(@PathVariable String name) {
        return employeeRepository.findAll().stream().filter(employee ->
                employee.getFacility() != null && employee.getFacility().getName().equals(name)
        ).collect(Collectors.toList());
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee newEmployee) {
        return ResponseEntity.ok(employeeRepository.findById(id)
                                                   .map(employee -> {
                                                       employee.setName(newEmployee.getName());
                                                       employee.setPosition(newEmployee.getPosition());
                                                       employee.setFacility(newEmployee.getFacility());
                                                       employee.setCourses(newEmployee.getCourses());
                                                       return employeeRepository.save(employee);
                                                   })
                                                   .orElseGet(() -> {
                                                       newEmployee.setId(id);
                                                       return employeeRepository.save(newEmployee);
                                                   }));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable long id) {
        employeeRepository.delete(employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist: id = " + id)));

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);

        return ResponseEntity.ok(response);
    }
}
