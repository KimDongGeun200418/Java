package chap03_basic;

import java.util.Scanner;
public class Dowhile {
	
	public static void main(String[] args) {
		
		System.out.println("�޽����� �Է��ϼ���");
		System.out.println("���α׷��� �����Ϸ��� q�� �Է��ϼ���.");
		
		Scanner scanner = new Scanner(System.in);
		String inputString;
		
		do {
			
			System.out.print(">");
			inputString = scanner.nextLine();
			if(inputString == "q") {break;}
			System.out.println(inputString);
		} while(!inputString.equals("q"));
		
		
		
	}//main end
	
}
