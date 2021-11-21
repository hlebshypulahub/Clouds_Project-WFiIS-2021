package hleb.shypula.clouds_project.repository;

import hleb.shypula.clouds_project.model.Employee;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends Neo4jRepository<Employee, Long> {

    @Query("MATCH (e:Employee) WHERE id(e)=$id return (e)")
    Optional<Employee> findById(long id);

    @Query("MATCH (e:Employee) RETURN (e)")
    List<Employee> findAllEmployees();

}
