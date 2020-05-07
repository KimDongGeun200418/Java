package chap08_3;

public class VeExam {

	public static void main(String[] args) {
		
		Driver driver = new Driver();
		
		Bus bus = new Bus();
		Taxi taxi = new Taxi();
		
		driver.drive(taxi);
		driver.drive(bus);
		
		Vehicle vehicle = new Bus();
		//vehicle.check();
		Bus bus2 = (Bus) vehicle;
		bus2.run();
		bus2.check();
	
	} 
	
}
