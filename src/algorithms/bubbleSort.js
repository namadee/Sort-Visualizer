function* bubbleSortGenerator(arr, setSwappingIndices) {
    let len = arr.length;
    let swapped;
  
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          swap(arr, i, i + 1);
          swapped = true;
          setSwappingIndices(i+1)
          yield [...arr]; // Yield the array after each swap
        }
      }
      len--;
    } while (swapped);
  
    // Sorting complete
    yield arr;
  }
  
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  export default bubbleSortGenerator;
  