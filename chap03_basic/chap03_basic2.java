package chap03_basic;

public class chap03_basic2 {
	public static void main(String[] args) {
		
		int n = 70;
		
		if(n > 100) {
			
			System.out.println("100���� �� Ŀ��");
			
		}else if(n>50) {
			
			System.out.println("50����Ŀ��");
			
		}
		
		System.out.println((int)(Math.random()*10 + 1)); //(int)(Math.random()*16+5) 5~16���� ����
		
		//switch��
		switch((int)(Math.random()*4+1)) {
		
		case 1:
			System.out.println("1���� ���Խ��ϴ�.");
			break;
		case 2:
			System.out.println("2���� ���Խ��ϴ�.");
			break;
		case 3:
			System.out.println("3���� ���Խ��ϴ�.");
			break;
		default:
			System.out.println("4���� ���Խ��ϴ�.");
			break;
		
		}//����ġ��end
		
		int sum = 0;
		//for��
		for(int i = 1 ; i<=100 ; i++) {
			
			sum += i;
			
		}
		System.out.println(sum); 
		
		int wi = 0;
		//while��
		while(wi < 10){
			
			int brn = (int)(Math.random()*10 + 1);
			System.out.println(brn);
			if(brn > 9) {
				
				System.out.println("���� �����ó׿�");
				break;
				
			}
			wi += 1;
			if(wi == 10) {
				System.out.println("���� ���ڽó׿�");
			}
		}
		
		
	}
}
