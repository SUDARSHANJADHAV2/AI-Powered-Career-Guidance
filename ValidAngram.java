import java.util.*;

public class ValidAngram {
    public static boolean VA(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        char[] c1 = s.toCharArray();
        char[] c2 = t.toCharArray();
        Arrays.sort(c1);
        Arrays.sort(c2);
        return Arrays.equals(c1, c2);
    }

    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        String s;
        String t;
        System.out.println("Enter String 1 : ");
        s = sc.next();
        System.out.println("Enter String 2 : ");
        t = sc.next();
        System.out.println("Value returned : ");
        System.out.println(VA(s, t));
    }
}
