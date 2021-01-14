package se.ifmo.ru.web4.models;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;


public class Checker {

    private boolean checkTypeStandard = true;

    public void printCheckTypeStandard(){
        if(checkTypeStandard){
            System.out.println("Regular");
        }else {
            System.out.println("Smart");
        }
    }

    public String getCheckTypeStandardString(){
        if(checkTypeStandard){
            return "Regular";
        }else {
            return "Smart";
        }
    }

    public boolean check(double x, double y, double r){
        if(checkTypeStandard){
            System.out.println("Regular");
        }else {
            System.out.println("Smart");
        }
        boolean result = true;
        if(checkTypeStandard){
            result = standardCheck(x, y, r);
        } else {
            for (CheckPart part : checkParts){
                if(!part.check(x, y, r)){
                    result = false;
                    break;
                }
            }
        }
        return result;
    }

    CheckPart[] checkParts;

    public Checker(){ }

    public CheckPart[] getCheckParts() {
        return checkParts;
    }

    public void setCheckParts(CheckPart[] checkParts) {
        this.checkParts = checkParts;
    }

    public void makeCheckerFromArray(double[][] dots) {
        checkTypeStandard = false;
        checkParts = makeCheckParts(dots);
    }

    public void makeCheckerFromString(String dots) {
        checkTypeStandard = false;
        checkParts = makeCheckParts(toArray(dots));
    }

    private double[][] toArray(String dots) {
        double[][] newDotsArray = null;
        try {
            String[] dotsArray = dots.split(",");
            newDotsArray = new double[dotsArray.length][2];
            for (int i = 0; i < dotsArray.length; i++) {
                newDotsArray[i][0] = Double.parseDouble(dotsArray[i].split(":")[0]);
                newDotsArray[i][1] = Double.parseDouble(dotsArray[i].split(":")[1]);
            }
        } catch (Exception e) {
            System.out.println("Проблема с обработкой значений " + dots);
        }
        return newDotsArray;
    }

    private CheckPart[] makeCheckParts(double[][] points) {
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

    private CheckPart makeCheckPart(double x1, double y1, double x2, double y2, double x3, double y3) {
        CheckPart checkPart = new CheckPart();
        double k = (y2 - y1) / (x2 - x1);
        double b = y1 - k * x1;
        if (y3 < k * x3 + b) {
            checkPart.addCheckPart(k, b, false);
            return checkPart;
        } else {
            checkPart.addCheckPart(k, b, true);
            return checkPart;
        }
    }

    public boolean standardCheck(double x, double y, double r) {
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

    public void clear(){
        this.checkTypeStandard = true;
        this.checkParts = new CheckPart[0];
    }
}
