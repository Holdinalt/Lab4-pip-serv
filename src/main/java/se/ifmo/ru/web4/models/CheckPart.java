package se.ifmo.ru.web4.models;

public class CheckPart {

    private float k;
    private float b;
    private boolean sign;

    public void addCheckPart(float k, float b, boolean sign){
        this.k = k;
        this.b = b;
        this.sign = sign;
    }

    public boolean check(float y, float x){
        if(sign){
            return y > k * x + b;
        } else {
            return y <= k * x + b;
        }
    }

}
