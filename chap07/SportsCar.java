package chap07;

public class SportsCar extends Car {
	int MaxSpeed = 300;
	int GetMaxSpeed(){ return MaxSpeed; }
	
	SportsCar(){
		super("Maserati", "Gold");		
	}
	@Override
	void Start() {
		if(Gear > 1)System.out.println("더 빨리 출발합니다.");
		else super.Start();
	}
	
} 
