import java.util.*;

public class BestTimeToBuyAndSell2 {
    public static int BTTBAS2(int[] arr, int size) {
        int maxProfit = 0;
        for (int i = 1; i < size; i++) {
            if (arr[i] > arr[i - 1]) {
                maxProfit += arr[i] - arr[i - 1];
            }
        }
        return maxProfit;
    }

    public static void main(String args[]) {
        int size;
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Size : ");
        size = sc.nextInt();
        int arr[] = new int[size];
        System.out.println("Enter the Prices in array : ");
        for (int i = 0; i < size; i++) {
            arr[i] = sc.nextInt();
        }
        System.out.println("Profit : ");
        System.out.println(BTTBAS2(arr, size));
    }

}
