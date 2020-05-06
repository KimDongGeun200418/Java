package chap08;

public class Tv implements RC, Search {
	
	private int volume;
	
	public void turnOn() { System.out.println("TV�� �մϴ�."); }	
	
	public void turnOff() { System.out.println("TV�� ���ϴ�."); }
	
	public void setVolume(int volume) {
		if(volume>RC.MAX_VOLUME) {
			this.volume = RC.MAX_VOLUME;
		} else if(volume<RC.MIN_VOLUME) {
			this.volume = RC.MIN_VOLUME;
		} else {
			this.volume = volume;
		}
		System.out.println("���� TV ����: " + volume);
	}
	
	public void search(String url) { System.out.println(url + "�� �˻��մϴ�."); }
	
}
