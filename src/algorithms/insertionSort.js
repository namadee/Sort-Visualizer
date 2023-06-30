function* insertionSortGenerator(arr, setSwappingIndex) {
  let len = arr.length;
  let i, key, j;

  for (i = 1; i < len; i++) {
    key = arr[i];
    j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    arr[j + 1] = key;
    setSwappingIndex(j + 1);
    yield [...arr];
  }

  //sorting complete
  yield arr;
}


export default insertionSortGenerator;
