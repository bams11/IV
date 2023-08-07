export default function createSlider(minDate, maxDate, width) {
  console.log(minDate, maxDate);
  const slider = d3
    .sliderHorizontal()
    .min(minDate)
    .max(maxDate)
    .width(width)
    .displayValue(true)
    .default(minDate)
    .fill("#aaaaaa")
    .tickFormat(d3.timeFormat("%Y"));
  // .on("onchange", (value) => {
  //   onChange(value);
  // });

  return slider;
}
