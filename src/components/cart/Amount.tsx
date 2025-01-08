import { formatCurrency } from "@/utils";

interface Props {
  label: string;
  amount: number;
}

export const Amount = ({ label, amount }: Props) => {
  return (
    <div className="flex justify-between">
      <dt className="font-bold">{label}</dt>

      <dd className="text-gray-900">{formatCurrency(amount)}</dd>
    </div>
  )
}
