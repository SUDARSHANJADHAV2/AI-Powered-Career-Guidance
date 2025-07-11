import java.util.*;

public class BestTimeToBuyAndSell {
    public static int BTTBAS(int[] arr, int size) {
        int min = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : arr) {
            if (price < min) {
                min = price;
            } else {
                int profit = price - min;
                maxProfit = Math.max(profit, maxProfit);
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
        System.out.println(BTTBAS(arr, size));
    }
}
