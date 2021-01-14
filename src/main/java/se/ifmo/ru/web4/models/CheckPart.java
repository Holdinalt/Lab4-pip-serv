package se.ifmo.ru.web4.models;

public class CheckPart {

    private double k;
    private double b;
    private boolean sign;

    public void addCheckPart(double k, double b, boolean sign){
        this.k = k;
        this.b = b;
        this.sign = sign;
    }

    public boolean check(double x, double y, double r){

        double tempX = x;
        double tempY = y;
        double tempR = r;
        if (r == 0) {
            tempR = 1;
        }
        if (r < 0) {
            tempR = -r;
            tempX = -x;
            tempY = -y;
        }

        if(sign){
            return tempY > k * tempX + b * tempR;
        } else {
            return tempY <= k * tempX + b * tempR;
        }
    }


}
