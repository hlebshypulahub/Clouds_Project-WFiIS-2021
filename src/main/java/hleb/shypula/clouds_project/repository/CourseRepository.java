package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Course;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends Neo4jRepository<Course, Long> {
}
