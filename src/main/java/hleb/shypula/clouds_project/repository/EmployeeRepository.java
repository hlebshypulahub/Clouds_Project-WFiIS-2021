package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Employee;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends Neo4jRepository<Employee, Long> {

    @Query("MATCH (e)-[p:PARTICIPATED_IN]->(c:Course) WHERE id(e)=$id RETURN SUM(c.hours)")
    Integer getHoursSum(long id);

    @Query("MATCH (e:Employee)-[p:PARTICIPATED_IN]->(c) WHERE id(e)=$id DELETE p")
    void resetCourses(long id);

}
