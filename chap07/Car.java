package chap07;

public class Car {
	String model;
	String color;
	int Gear;
	
	Car(String model, String color){
		this.model = model;
		this.color = color;
	}
	
	void EngineOn() {System.out.println("������ ŵ�ϴ�.");}
	void EngineOff() {System.out.println("������ ���ϴ�.");}
	void GearUp() { Gear += 1;}
	void GearDown() { if(Gear > 0) Gear -= 1; else System.out.println("�� �߸��Դϴ�.");}
	void Start() {
		System.out.println("����մϴ�.");
	}
	
} 
