export const truncateWithEllipses = (
  text: string,
  max: number = 130,
): string => {
  return text.substr(0, max - 1) + (text.length > max ? " ..." : "");
};
export const resizeContentFeedViewCard = (
  MAX_WIDTH: number,
  MIN_WIDTH: number,
): number => {
  const resultsRow = document.getElementById("listContainer");
  const computedStyle = resultsRow && getComputedStyle(resultsRow);

  //6vw margin applied , 94 vw available,4vw padding applied,90vw available
  const vw = resultsRow
    ? resultsRow.clientWidth -
      (parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight))
    : document.documentElement.clientWidth * 0.9;

  const finalValues = {
    numC: 0,
    minGap: 10000,
    ans: MAX_WIDTH,
  };

  new Array(MAX_WIDTH - MIN_WIDTH + 1).fill(1).map((_, idx) => {
    const count = idx + MIN_WIDTH;
    //17.5px is the right hand side margin for each minimal card
    const num = Math.floor(vw / (count + 17.5));
    const leftOver = vw - (num * count + num * 17.5);
    const incrCount = count + Math.floor(leftOver / num);

    const updatedLeftOver = vw - (num * incrCount + num * 217.5);

    if (
      num > finalValues.numC ||
      (finalValues.numC - num <= 1 &&
        finalValues.numC / num < 2 &&
        updatedLeftOver < finalValues.minGap &&
        incrCount <= MAX_WIDTH + 10)
    ) {
      finalValues.ans = incrCount;
      finalValues.minGap = updatedLeftOver;
      finalValues.numC = num;
    }
  });
  //constant value for smaller screens
  if (document.documentElement.clientWidth < 620) {
    finalValues.ans = Math.min(300, document.documentElement.clientWidth - 45);
  } else {
    if (finalValues.numC === 1) {
      finalValues.ans = Math.min(finalValues.ans, 0.75 * vw);
    }
  }
  if (finalValues.numC === 1 && resultsRow) {
    resultsRow.style.justifyContent = "center";
    resultsRow.style.display = "flex";
    resultsRow.style.flexWrap = "wrap";
  }
  return finalValues.ans;
};

export default {
  truncateWithEllipses,
};
