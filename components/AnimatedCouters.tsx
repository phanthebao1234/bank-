"use client";
import CountUp from "react-countup";

const AnimatedCouters = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp duration={2} decimals={2} decimal="," prefix="$" end={amount} />
    </div>
  );
};

export default AnimatedCouters;
