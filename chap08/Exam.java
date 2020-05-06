package chap08;

public class Exam {
	
	public static void main(String[] args) {
		
		RC.cB();
		
		RC rc;
		rc = new Tv();
		
		rc.turnOn();
		rc.turnOff();
		rc.setMute(true);
		rc.setMute(false);
		
		rc = new Audio();
		rc.turnOn();
		rc.turnOff();
		rc.setMute(true);
		rc.setMute(false);
		
	}
	
}
