package chap08;

public class Audio implements RC {

	private int volume;
	private boolean mute;
	
	public void turnOn() { System.out.println("Audio�� �մϴ�."); }	
	
	public void turnOff() { System.out.println("Audio�� ���ϴ�."); }
	
	public void setVolume(int volume) {
		if(volume>RC.MAX_VOLUME) {
			this.volume = RC.MAX_VOLUME;
		} else if(volume<RC.MIN_VOLUME) {
			this.volume = RC.MIN_VOLUME;
		} else {
			this.volume = volume;
		}
		System.out.println("���� Audio ����: " + volume);
	}
	
	public void setMute(boolean mute) {
		this.mute = mute;
		if(mute) { System.out.println("Audio���� ó��"); }
		else { System.out.println("Audio���� ����"); }
	}
	
}
