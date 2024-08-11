import React from "react";

const CustomCandle = (props) => {
  const { x, y, width, height, payload } = props;
  const openY = y + (height * (1 - (payload.Open - payload.Low) / (payload.High - payload.Low)));
  const closeY = y + (height * (1 - (payload.Close - payload.Low) / (payload.High - payload.Low)));
  const highY = y + (height * (1 - (payload.High - payload.Low) / (payload.High - payload.Low)));
  const lowY = y + (height * (1 - (payload.Low - payload.Low) / (payload.High - payload.Low)));

  const isRising = payload.Close > payload.Open;
  const color = isRising ? "#26a69a" : "#ef5350";

  return (
    <g>
      {/* High to Low Line */}
      <line
        x1={x + width / 2}
        x2={x + width / 2}
        y1={highY}
        y2={lowY}
        stroke={color}
        strokeWidth={2}
      />
      {/* Open to Close Rect */}
      <rect
        x={x}
        y={Math.min(openY, closeY)}
        width={width}
        height={Math.abs(closeY - openY)}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
};

export default CustomCandle;
