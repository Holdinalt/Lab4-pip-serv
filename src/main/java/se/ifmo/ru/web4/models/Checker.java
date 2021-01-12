package se.ifmo.ru.web4.models;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Scope("session")
@Service
public class Checker {

    CheckPart[] checkParts;

    public Checker(){ };

    public CheckPart[] getCheckParts() {
        return checkParts;
    }

    public void setCheckParts(CheckPart[] checkParts) {
        this.checkParts = checkParts;
    }

    public void makeCheck(String dots) {
        checkParts = makeCheckParts(toArray(dots));
    }

    private float[][] toArray(String dots) {
        float[][] newDotsArray = null;
        try {
            String[] dotsArray = dots.split(",");
            newDotsArray = new float[dotsArray.length][2];
            for (int i = 0; i < dotsArray.length; i++) {
                newDotsArray[i][0] = Float.parseFloat(dotsArray[i].split(":")[0]);
                newDotsArray[i][1] = Float.parseFloat(dotsArray[i].split(":")[1]);
            }
        } catch (Exception e) {
            System.out.println("Проблема с обработкой значений " + dots);
        }
        return newDotsArray;
    }

    private CheckPart[] makeCheckParts(float[][] points) {
        CheckPart[] checkParts = new CheckPart[points.length];
        for (int i = 0; i < points.length; i++) {
            checkParts[i] = makeCheckPart(
                    points[i][0], points[i][1],
                    points[(i + 1) % points.length][0], points[(i + 1) % points.length][1],
                    points[(i + 2) % points.length][0], points[(i + 2) % points.length][1]
            );
        }
        return checkParts;
    }

    private CheckPart makeCheckPart(float x1, float y1, float x2, float y2, float x3, float y3) {
        CheckPart checkPart = new CheckPart();
        float k = (y2 - y1) / (x2 - x1);
        float b = y1 - k * x1;
        if (y3 < k * x3 + b) {
            checkPart.addCheckPart(k, b, false);
            return checkPart;
        } else {
            checkPart.addCheckPart(k, b, true);
            return checkPart;
        }
    }

    public boolean standartCheck(float x, float y, float r) {
        boolean result = false;
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
                result = (y + x >= -1 * tempR / 2); //X<0 Y<=0
            }
        }

        return result;
    }
}
