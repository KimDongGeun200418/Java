package chap03_basic;

public class chap03_basic2 {
	public static void main(String[] args) {
		
		int n = 70;
		
		if(n > 100) {
			
			System.out.println("100보다 더 커용");
			
		}else if(n>50) {
			
			System.out.println("50보단커용");
			
		}
		
		System.out.println((int)(Math.random()*10 + 1)); //(int)(Math.random()*16+5) 5~16사이 정수
		
		//switch문
		switch((int)(Math.random()*4+1)) {
		
		case 1:
			System.out.println("1번이 나왔습니다.");
			break;
		case 2:
			System.out.println("2번이 나왔습니다.");
			break;
		case 3:
			System.out.println("3번이 나왔습니다.");
			break;
		default:
			System.out.println("4번이 나왔습니다.");
			break;
		
		}//스위치문end
		
		int sum = 0;
		//for문
		for(int i = 1 ; i<=100 ; i++) {
			
			sum += i;
			
		}
		System.out.println(sum); 
		
		int wi = 0;
		//while문
		while(wi < 10){
			
			int brn = (int)(Math.random()*10 + 1);
			System.out.println(brn);
			if(brn > 9) {
				
				System.out.println("운이 좋으시네요");
				break;
				
			}
			wi += 1;
			if(wi == 10) {
				System.out.println("운이 나쁘시네요");
			}
		}
		
		
	}
}
