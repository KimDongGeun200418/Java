package chap03_basic;

public class DefaultThings {
	public static void main(String[] args) {
		
		/*
		int apple = 1;
		double piece = 0.1;
		int number = 7;
		
		double result = apple - number*piece;
		System.out.println(result);
		
		*/
		int apple = 1;
		int totalP = apple * 10;
		int number = 7;
				
		int temp = totalP - number;
		double result = temp/10.0;
		System.out.println(result);
		
		/*
		 
		 Double.isInfinite()
		 Double.isNaN()
		 
		 3 + 3.0 + "JDK"  == 6.0JDK
		 
		 
		  */
		double test1 = 0.1;
		float test2 = 0.1f;
		
		System.out.println(test1);
		System.out.println(test2);
		System.out.println(test1 == test2);
		System.out.println((float)test1 == test2);
		
		//중요한것
		String strVar1 = "신용권";
		String strVar2 = "신용권";
		String strVar3 = new String("신용권");
		System.out.println(strVar1 == strVar2);
		System.out.println(strVar1 == strVar3);
		System.out.println(strVar1.equals(strVar3));
		
		//||, && 앞의것이 하나라도 조건에 부합하면 계산 멈춤(효율적)
		
		
		
		
	}
}
