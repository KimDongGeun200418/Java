package chap06;

public class Singleton {
	//객체 하나만 있는거
	//생성자 외부 호출불가 private, 정적필드 private로 생성 자신의 객체 생성 초기화, getIstance()선언
	
	//정적필드
	private static Singleton singleton = new Singleton();
	
	//생성자
	private Singleton() {}
	
	//정적메소드 - 를 통해서만 호출가능
	static Singleton getInstance() {
		return singleton;
	}
	
}
