import { Download, Calendar } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DateRange = 'daily' | 'weekly' | 'monthly' | 'custom';

export function StrategicSummaryReport() {
  const [dateRange, setDateRange] = useState<DateRange>('monthly');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const performanceChartData = [
    { month: 'Jul', staff: 92, animals: 88, infra: 85, visitors: 90 },
    { month: 'Aug', staff: 89, animals: 90, infra: 82, visitors: 93 },
    { month: 'Sep', staff: 94, animals: 87, infra: 88, visitors: 91 },
    { month: 'Oct', staff: 91, animals: 92, infra: 90, visitors: 95 },
    { month: 'Nov', staff: 93, animals: 89, infra: 87, visitors: 92 },
    { month: 'Dec', staff: 95, animals: 91, infra: 89, visitors: 94 }
  ];

  const exportToCSV = () => {
    const headers = ['Month', 'Staff Performance', 'Animal Health', 'Infrastructure', 'Visitor Satisfaction'];
    const csvContent = [
      headers.join(','),
      ...performanceChartData.map(row =>
        [row.month, row.staff, row.animals, row.infra, row.visitors].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `strategic-summary-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg text-gray-900">Strategic Summary Report</h3>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-600" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className="bg-transparent outline-none text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {dateRange === 'custom' && (
        <div className="mb-4 flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <label className="text-sm text-gray-700">From:</label>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">To:</label>
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      )}

      <div className="mb-8">
        <h4 className="text-md text-gray-700 mb-4">Performance Overview</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="staff" fill="#3b82f6" name="Staff Performance" />
            <Bar dataKey="animals" fill="#10b981" name="Animal Health" />
            <Bar dataKey="infra" fill="#f59e0b" name="Infrastructure" />
            <Bar dataKey="visitors" fill="#8b5cf6" name="Visitor Satisfaction" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Staff Performance</p>
          <p className="text-2xl text-blue-600 font-bold">95%</p>
          <p className="text-xs text-gray-500 mt-1">December 2025</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Animal Health</p>
          <p className="text-2xl text-green-600 font-bold">91%</p>
          <p className="text-xs text-gray-500 mt-1">December 2025</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Infrastructure</p>
          <p className="text-2xl text-yellow-600 font-bold">89%</p>
          <p className="text-xs text-gray-500 mt-1">December 2025</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Visitor Satisfaction</p>
          <p className="text-2xl text-purple-600 font-bold">94%</p>
          <p className="text-xs text-gray-500 mt-1">December 2025</p>
        </div>
      </div>
    </div>
  );
}
