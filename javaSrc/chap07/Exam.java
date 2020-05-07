package chap07;

public class Exam {
	
	public static void main(String[] args) {
		
		SportsCar myCar = new SportsCar();
		
		System.out.println(myCar.color);
		System.out.println(myCar.model);
		System.out.println(myCar.Gear);
		System.out.println(myCar.MaxSpeed);
		myCar.GearDown();
		myCar.GearUp();
		System.out.println(myCar.Gear);
		myCar.Start();
		myCar.GearUp();
		myCar.Start();
	}
	
} 
