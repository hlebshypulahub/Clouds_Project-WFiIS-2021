package hleb.shypula.clouds_project.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
public class Course {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private int hours;

    @Relationship(type = "GAVE", direction = Relationship.Direction.INCOMING)
    private Employee employee;

    @Relationship(type = "TOOK_PlACE", direction = Relationship.Direction.OUTGOING)
    private Facility facility;

    public Course() {
    }

    public Course(String name, int hours, Employee employee, Facility facility) {
        this.name = name;
        this.hours = hours;
        this.employee = employee;
        this.facility = facility;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }
}
