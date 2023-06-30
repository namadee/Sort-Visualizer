function* selectionSortGenerator(arr, setSwappingIndex) {
    for (var i = 0; i < arr.length; i++) {
        let min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (i !== min) {
            [arr[ i ],arr[min]]= [arr[min],arr[ i ]];
            setSwappingIndex(i);
            console.log(arr)
            yield [...arr];
        }
    }
    yield arr
}

export default selectionSortGenerator;