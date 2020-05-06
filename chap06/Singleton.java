package chap06;

public class Singleton {
	//��ü �ϳ��� �ִ°�
	//������ �ܺ� ȣ��Ұ� private, �����ʵ� private�� ���� �ڽ��� ��ü ���� �ʱ�ȭ, getIstance()����
	
	//�����ʵ�
	private static Singleton singleton = new Singleton();
	
	//������
	private Singleton() {}
	
	//�����޼ҵ� - �� ���ؼ��� ȣ�Ⱑ��
	static Singleton getInstance() {
		return singleton;
	}
	
}
