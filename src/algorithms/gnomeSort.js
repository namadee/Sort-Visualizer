function* gnomeSortGenerator(arr, setSwappingIndex) {
    function moveBack(i) {
        for( ; i > 0 && arr[i-1] > arr[i]; i--) {
            swap(arr, i, i-1);          
        }
    }
    for (var i = 1; i < arr.length; i++) {
        if (arr[i-1] > arr[i]) moveBack(i);
        setSwappingIndex(i);
        yield [...arr];
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

export default gnomeSortGenerator;