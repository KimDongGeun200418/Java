package chap08;

public class Tv implements RC, Search {
	
	private int volume;
	
	public void turnOn() { System.out.println("TV를 켭니다."); }	
	
	public void turnOff() { System.out.println("TV를 끕니다."); }
	
	public void setVolume(int volume) {
		if(volume>RC.MAX_VOLUME) {
			this.volume = RC.MAX_VOLUME;
		} else if(volume<RC.MIN_VOLUME) {
			this.volume = RC.MIN_VOLUME;
		} else {
			this.volume = volume;
		}
		System.out.println("현재 TV 볼륨: " + volume);
	}
	
	public void search(String url) { System.out.println(url + "을 검색합니다."); }
	
}
