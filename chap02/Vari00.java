package chap02;

public class Vari00 {
	
	public static void main(String[] args) {
		// ����, $, _ �� ����, setPrice ����
		
		int score = 90; //���ͷ� = �ҽ� �ڵ峻 ���� �Էµ� ��
		/*
		  ���� ���ͷ� 75, 05, 0xA8
		  �Ǽ� ���ͷ� 0.25, 5E-2
		  ���� ���ͷ� 'F', '\n'(�̽������� ����)
		 ���ڿ� ���ͷ� "allu", ""
		 �� ���ͷ� true, false
		 */
		
		int value = 10;
		int result = value + 10;
		System.out.println(result);
		
		//int v3 = v2 + 10
		byte var1 = -128;
		byte var4 = 0;
		byte var5 = 127;
		var5 += 1;
		System.out.println(var5); //�����÷ο�
		//byte var6 = 128; ǥ������ �ʰ�
		
		char c1 = 'A';
		char c2 = 65;
		char c3 = '\u0041';
		int uniCode = c1;
		
		System.out.println(c1);
		System.out.println(c2);
		System.out.println(c3);
		System.out.println(uniCode);
		//�ڹٿ��� ��������� �⺻������ intŸ���� �ȴ�.
		
		long l1 = 10;
		//long l2 = 10000000000000;
		long l3 = 10000000000000L;
		
		//float f1 = 3.14;
		float f2 = 3.14F;
		double f3 = 3.14;
		
		double f4 = 2e-3; // 0.002
		
		
		
	}
	
	
}
