package hleb.shypula.clouds_project.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.Set;

@Node
public class Employee {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private String position;

    @Relationship(type = "WORKS_IN", direction = Relationship.Direction.OUTGOING)
    private Facility facility;

    @Relationship(type = "PARTICIPATED_IN", direction = Relationship.Direction.OUTGOING)
    private Set<Course> courses;

    public Employee() {
    }

    public Employee(String name, String position, Facility facility, Set<Course> courses) {
        this.name = name;
        this.position = position;
        this.facility = facility;
        this.courses = courses;
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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }
}
