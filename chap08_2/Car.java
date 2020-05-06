package chap08_2;

public class Car {
	
	Tire fLTire = new HkTire();
	Tire fRTire = new HkTire();
	Tire bLTire = new HkTire();
	Tire bRTire = new HkTire();
	
	void run() {
		fLTire.roll();
		fRTire.roll();
		bLTire.roll();
		bRTire.roll();
	}
}
