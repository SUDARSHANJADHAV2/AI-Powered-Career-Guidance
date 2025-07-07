public class Quicksort {
    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static int sorrting(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        i++;
        swap(arr, i, high);
        return i;
    }

    public static void sorted(int[] arr, int low, int high) {
        if (low < high) {
            int pivotindex = sorrting(arr, low, high);
            sorted(arr, low, pivotindex - 1);
            sorted(arr, pivotindex + 1, high);
        }
    }

    public static void main(String args[]) {
        int arr[] = { 7, 11, 8, 2, 1 };
        int n = arr.length;
        sorted(arr, 0, n - 1);
        for (int i = 0; i < n; i++) {
            System.out.println(arr[i]);
        }
    }
}