package chap09;

public class OutExam {
	public static void main(String[] args) {
		
		Outter outter = new Outter();
		Outter.Nested nested = outter.new Nested();
		nested.print();
		
	}
}
