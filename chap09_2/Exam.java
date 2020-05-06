package chap09_2;

public class Exam {
	
	public static void main(String[] args) {
		
		Button btn = new Button();
		
		btn.setOnClickListener(new CallListner());
		btn.touch();
		
		btn.setOnClickListener(new MListener());
		btn.touch();
		
	}
	
}
