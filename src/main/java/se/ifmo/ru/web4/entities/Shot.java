package se.ifmo.ru.web4.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import se.ifmo.ru.web4.models.CheckPart;
import se.ifmo.ru.web4.models.Checker;
import se.ifmo.ru.web4.models.CheckerConfig;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "shots")
public class Shot {
    @Id
    @SequenceGenerator(sequenceName = "shots_id_seq", name = "shots_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shots_id_seq")

    private long id;

    private double x;
    private double y;
    private double r;
    private boolean result;

    public Shot(double x, double y, double r, boolean result) {

        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;

    }


}
