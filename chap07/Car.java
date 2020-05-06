package chap07;

public class Car {
	String model;
	String color;
	int Gear;
	
	Car(String model, String color){
		this.model = model;
		this.color = color;
	}
	
	void EngineOn() {System.out.println("엔진을 킵니다.");}
	void EngineOff() {System.out.println("엔진을 끕니다.");}
	void GearUp() { Gear += 1;}
	void GearDown() { if(Gear > 0) Gear -= 1; else System.out.println("기어가 중립입니다.");}
	void Start() {
		System.out.println("출발합니다.");
	}
	
} 
