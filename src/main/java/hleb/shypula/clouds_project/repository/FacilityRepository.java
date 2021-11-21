package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Facility;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacilityRepository extends Neo4jRepository<Facility, String> {

    Optional<Facility> findByName(String name);

}
