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
		
		//�߿��Ѱ�
		String strVar1 = "�ſ��";
		String strVar2 = "�ſ��";
		String strVar3 = new String("�ſ��");
		System.out.println(strVar1 == strVar2);
		System.out.println(strVar1 == strVar3);
		System.out.println(strVar1.equals(strVar3));
		
		//||, && ���ǰ��� �ϳ��� ���ǿ� �����ϸ� ��� ����(ȿ����)
		
		
		
		
	}
}
