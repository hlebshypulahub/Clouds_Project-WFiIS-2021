package hleb.shypula.clouds_project.model;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

import java.time.LocalDate;

@Node
public class Education {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    private LocalDate graduationDate;

    public Education() {
    }

    public Education(String name, LocalDate graduationDate) {
        this.name = name;
        this.graduationDate = graduationDate;
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

    public LocalDate getGraduationDate() {
        return graduationDate;
    }

    public void setGraduationDate(LocalDate graduationDate) {
        this.graduationDate = graduationDate;
    }
}
