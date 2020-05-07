package chap02;

public class Vari00 {
	
	public static void main(String[] args) {
		// 문자, $, _ 로 시작, setPrice 관례
		
		int score = 90; //리터럴 = 소스 코드내 직접 입력된 값
		/*
		  정수 리터럴 75, 05, 0xA8
		  실수 리터럴 0.25, 5E-2
		  문자 리터럴 'F', '\n'(이스케이프 문자)
		 문자열 리터럴 "allu", ""
		 논리 리터럴 true, false
		 */
		
		int value = 10;
		int result = value + 10;
		System.out.println(result);
		
		//int v3 = v2 + 10
		byte var1 = -128;
		byte var4 = 0;
		byte var5 = 127;
		var5 += 1;
		System.out.println(var5); //오버플로우
		//byte var6 = 128; 표현범위 초과
		
		char c1 = 'A';
		char c2 = 65;
		char c3 = '\u0041';
		int uniCode = c1;
		
		System.out.println(c1);
		System.out.println(c2);
		System.out.println(c3);
		System.out.println(uniCode);
		//자바에서 정수연산시 기본적으로 int타입이 된다.
		
		long l1 = 10;
		//long l2 = 10000000000000;
		long l3 = 10000000000000L;
		
		//float f1 = 3.14;
		float f2 = 3.14F;
		double f3 = 3.14;
		
		double f4 = 2e-3; // 0.002
		
		
		
	}
	
	
}
