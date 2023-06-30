function* mergeSortGenerator(array, setSwappingIndices) {
    if (array.length <= 1) {
      yield array;
      return;
    }
  
    const mid = Math.floor(array.length / 2);
    const leftArray = array.slice(0, mid);
    const rightArray = array.slice(mid);
  
    const leftGenerator = mergeSortGenerator(leftArray);
    const rightGenerator = mergeSortGenerator(rightArray);
  
    let leftResult = leftGenerator.next();
    let rightResult = rightGenerator.next();
  
    while (!leftResult.done && !rightResult.done) {
      const mergedArray = merge(leftResult.value, rightResult.value);
      yield mergedArray;
  
      leftResult = leftGenerator.next();
      rightResult = rightGenerator.next();
    }
  
    const mergedArray = merge(leftResult.value, rightResult.value);
    yield mergedArray;
  }
  
  function merge(left, right) {
    const mergedArray = [];
    let i = 0;
    let j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        mergedArray.push(left[i]);
        i++;
      } else {
        mergedArray.push(right[j]);
        j++;
      }
    }
  
    while (i < left.length) {
      mergedArray.push(left[i]);
      i++;
    }
  
    while (j < right.length) {
      mergedArray.push(right[j]);
      j++;
    }
  
    return mergedArray;
  }
  
  export default mergeSortGenerator;
  