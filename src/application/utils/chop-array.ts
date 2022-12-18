export function chopArray(array: any[], qty: number) {
  const result = array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / qty);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return result;
}
