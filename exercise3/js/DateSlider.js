export default function createSlider(minDate, maxDate, width, onChange) {
  const slider = d3
    .sliderHorizontal()
    .min(minDate)
    .max(maxDate)
    .step(1)
    .width(width)
    .displayValue(true)
    .default([minDate, maxDate])
    .fill("#aaaaaa")
    .tickFormat(d3.timeFormat("%B %d, %Y"))
    .on("onchange", ([leftVal, rightVal]) => {
      var leftDate = d3.timeFormat("%Y/%m/%d")(leftVal); // Format the left date as year/month/day
      var rightDate = d3.timeFormat("%Y/%m/%d")(rightVal); // Format the right date as year/month/day
      onChange(leftDate, rightDate);
    });

  return slider;
}
