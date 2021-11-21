package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Education;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends Neo4jRepository<Education, Long> {
}
