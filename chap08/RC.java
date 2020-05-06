package chap08;

public interface RC {

	//상수
	int MAX_VOLUME = 10;
	int MIN_VOLUME = 0;
	
	//추상
	public abstract void turnOn();
	public void turnOff();
	public void setVolume(int volume);
	
	//디폴트
	default void setMute(boolean mute) {
		if(mute) { System.out.println("무음 처리"); }
		else { System.out.println("무음 해제"); }
	}
	
	// 정적
	static void cB() {
		System.out.println("건전지 교환");
	}
	
}
