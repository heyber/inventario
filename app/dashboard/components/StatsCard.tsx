interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-blue-600">
        {value}
      </h3>
    </div>
  );
}