public class BinarySearch {
    public static int BSA(int[] arr, int len, int key) {
        int start = 0;
        int end = len - 1;
        while (start <= end) {
            int mid = (start + end) / 2;
            if (arr[mid] == key) {
                return mid;
            } else if (key > arr[mid]) {
                start = mid + 1;

            } else {
                end = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String args[]) {
        int arr[] = { 20, 25, 30, 35, 40 };
        int len = arr.length;
        int key = 40;
        System.out.println(BSA(arr, len, key));

    }
}
