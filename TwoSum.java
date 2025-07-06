import java.util.HashMap;
import java.util.Scanner;
import java.util.Arrays;

public class TwoSum {
    public static int[] TwoSum(int[] arr, int size, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < size; i++) {
            int diff = target - arr[i];
            if (map.containsKey(diff)) {
                return new int[] { map.get(diff), i };
            }
            map.put(arr[i], i);
        }
        return new int[] {};
    }

    public static void main(String args[]) {
        int size;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the size of array : ");
        size = sc.nextInt();
        int[] arr = new int[size];
        System.out.println("Enter the elements in array : ");
        for (int i = 0; i < size; i++) {
            arr[i] = sc.nextInt();
        }
        int target;
        System.out.println("Enter the target : ");
        target = sc.nextInt();
        int result[] = TwoSum(arr, size, target);
        System.err.println("Index of the 2 numbers");
        System.out.println(Arrays.toString(result));
    }
}
