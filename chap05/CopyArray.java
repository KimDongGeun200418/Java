package chap05;

public class CopyArray {

	public static void main(String[] args) {
		
		int[] oldArray = {1,2,3};
		int[] newArray = new int[5];
		
		System.arraycopy(oldArray, 0, newArray, 2, oldArray.length);
	
		for(int temp : newArray) {
			
			System.out.println(temp);
			
		}
		
		
		
	}//main-end
	
}
