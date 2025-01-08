import { formatCurrency } from "@/utils";

interface Props {
  label: string;
  amount: number;
  discount?: boolean;
}

export const Amount = ({ label, amount, discount }: Props) => {
  return (
    <div className={`flex justify-between ${discount && 'p-1 text-green-900 bg-green-300'}`}>
      <dt className="font-bold">{label}</dt>

      <dd className="text-gray-900">
        {discount && '- '}  {formatCurrency(amount)}
      </dd>
    </div>
  )
}
