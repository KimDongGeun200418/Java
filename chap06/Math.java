package chap06;

public class Math {
	
	static double PI;
	
	static { PI = 3.1415; }
	
			
	//sum-start
	int sum(int[] values) {
		int tot = 0;
		for(int i : values) {
			tot += i;
		}
		return tot;
	}//sum-end
	
	//sum2-start
	int sum2(int... values) {
		int tot = 0;
		for(int i : values) {
			tot += i;
		}
		return tot;
	}//sum2-end
	
	//plus-start
	static int plus(int x, int y) {
		return x+y;
	}
	static double plus(double x, double y) {
		return x+y;
	}//plus-end
}
