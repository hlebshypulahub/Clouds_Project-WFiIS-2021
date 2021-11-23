package hleb.shypula.clouds_project.controller;

import hleb.shypula.clouds_project.model.Facility;
import hleb.shypula.clouds_project.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/facilities")
public class FacilityController {

    @Autowired
    private FacilityRepository facilityRepository;

    @GetMapping
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    @GetMapping("/{name}")
    public ResponseEntity<Facility> getFacilityByName(@PathVariable String name) {
        return ResponseEntity.ok(facilityRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Facility not exist: name = " + name)));
    }

    @PostMapping
    public Facility createFacility(@RequestBody Facility facility) {
        return facilityRepository.save(facility);
    }

    @PutMapping("/{name}")
    public ResponseEntity<Facility> updateFacility(@PathVariable String name, @RequestBody Facility newFacility) {
        return ResponseEntity.ok(facilityRepository.findByName(name)
                                                   .map(facility -> {
                                                       facility.setCity(newFacility.getCity());
                                                       return facilityRepository.save(facility);
                                                   })
                                                   .orElseGet(() -> {
                                                       newFacility.setName(name);
                                                       return facilityRepository.save(newFacility);
                                                   }));
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Map<String, Boolean>> deleteFacility(@PathVariable String name) {
        facilityRepository.delete(facilityRepository.findByName(name).orElseThrow(() -> new ResourceNotFoundException("Facility not exist: name = " + name)));

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);

        return ResponseEntity.ok(response);
    }
}
