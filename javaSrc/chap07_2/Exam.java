package chap07_2;

public class Exam {

	public static void main(String[] args) {
		
		Sound sound = new Sound();
		Cat cat = new Cat();
		Dog dog = new Dog();
		//System.out.println(cat == animal);
		
		sound.PlaySound(cat);
		sound.PlaySound(dog);
		
	}
	
}
