package chap08;

public interface RC {

	//���
	int MAX_VOLUME = 10;
	int MIN_VOLUME = 0;
	
	//�߻�
	public abstract void turnOn();
	public void turnOff();
	public void setVolume(int volume);
	
	//����Ʈ
	default void setMute(boolean mute) {
		if(mute) { System.out.println("���� ó��"); }
		else { System.out.println("���� ����"); }
	}
	
	// ����
	static void cB() {
		System.out.println("������ ��ȯ");
	}
	
}
