package chap08;

public class Audio implements RC {

	private int volume;
	private boolean mute;
	
	public void turnOn() { System.out.println("Audio를 켭니다."); }	
	
	public void turnOff() { System.out.println("Audio를 끕니다."); }
	
	public void setVolume(int volume) {
		if(volume>RC.MAX_VOLUME) {
			this.volume = RC.MAX_VOLUME;
		} else if(volume<RC.MIN_VOLUME) {
			this.volume = RC.MIN_VOLUME;
		} else {
			this.volume = volume;
		}
		System.out.println("현재 Audio 볼륨: " + volume);
	}
	
	public void setMute(boolean mute) {
		this.mute = mute;
		if(mute) { System.out.println("Audio무음 처리"); }
		else { System.out.println("Audio무음 해제"); }
	}
	
}
