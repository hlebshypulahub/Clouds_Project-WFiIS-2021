package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Course;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends Neo4jRepository<Course, Long> {

    @Query("MATCH (c:Course), (e:Employee) WHERE NOT (e)--(c) AND id(e)=$employeeId RETURN c")
    List<Course> findAllNotEmployee(Long employeeId);

    @Query("MATCH (e:Employee), (c:Course) WHERE id(e)=$employeeId AND id(c)=$courseId CREATE (e)-[p:PARTICIPATED_IN]->(c)")
    void addCourseToEmployee(Long courseId, Long employeeId);

}
