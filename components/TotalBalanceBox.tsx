import CountUp from "react-countup";
import { formatAmount } from "@/lib/utils.ts";
import AnimatedCouters from './AnimatedCouters';
import DoughtnutChart from '@/components/DoughtnutChart.tsx';

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart"><DoughtnutChart /></div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Account Bank: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCouters amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
