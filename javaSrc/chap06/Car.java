package chap06;

public class Car {
	
	String color;
	int speed;
	int gear;
	
	//持失切浦
	public Car() {
		this("",0,0);
	}
	public Car(String color, int speed) { 
		this(color, speed, 0);
	}
	public Car(String color, int speed, int gear) {
		this.color = color;
		this.speed = speed;
		this.gear = gear;
	}
	//持失切浦-end
	
	void speedUp(int s) {
		speed += s;
	}
	
	//getter, setter
	public int getSpeed() {
		return speed;
	}
	public void setSpeed(int speed) {
		this.speed = speed;
	}
	
}
