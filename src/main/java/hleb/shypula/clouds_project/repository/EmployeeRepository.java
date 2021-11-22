package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Employee;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends Neo4jRepository<Employee, Long> {

}
