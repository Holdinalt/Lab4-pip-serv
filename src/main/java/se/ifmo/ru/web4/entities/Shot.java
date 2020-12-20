package se.ifmo.ru.web4.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

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

    public Shot(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        check();
    }

    public void check() {
        double tempR = r;
        if (r == 0) {
            tempR = 1;
        }
        if (r < 0) {
            tempR = -r;
            x = -x;
            y = -y;
        }

        if (x >= 0) {
            if (y > 0) {
                result = false; // X>=0 Y>0
            } else if (!(y > 0)) {
                result = (y >= tempR * -1 && x <= tempR / 2); //X>=0 Y<=0
            }
        } else if (!(x >= 0)) {
            if (y > 0) {
                result = (x * x + y * y <= (tempR * tempR) / 4); // X<0 Y>0
            } else if (!(y > 0)) {
                result =  (y + x >= -1 * tempR / 2); //X<0 Y<=0
            }
        }
    }
}
