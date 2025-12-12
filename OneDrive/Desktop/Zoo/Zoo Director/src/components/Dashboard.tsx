import {
  FileText,
  Eye,
  UserPlus,
  CheckCircle,
  Bell,
  AlertTriangle,
  Users,
  Activity,
  Briefcase,
  HeartPulse,
  Plane,
  Home,
  TrendingUp,
  DollarSign,
  Link2,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

export function Dashboard() {
  const [filterType, setFilterType] = useState('all');

  const quickActions = [
    { label: 'Generate Reports', icon: FileText, color: 'bg-white' },
    { label: 'View Exception Reports', icon: Eye, color: 'bg-white' },
    { label: 'Assign Substitute Duty', icon: UserPlus, color: 'bg-white' },
    { label: 'Approve Random Checks', icon: CheckCircle, color: 'bg-white' },
    { label: 'Escalate Incident', icon: Bell, color: 'bg-white' }
  ];

  const metrics = [
    { label: 'Staff Present', value: 18, icon: Users, color: 'bg-blue-500' },
    { label: 'Staff Absent', value: 3, icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Tasks Assigned', value: 24, icon: Briefcase, color: 'bg-yellow-500' },
    { label: 'Tasks Completed', value: 19, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Random Checks', value: 12, icon: Activity, color: 'bg-purple-500' },
    { label: 'Incidents Today', value: 2, icon: AlertTriangle, color: 'bg-orange-500' }
  ];

  const exceptions = [
    {
      id: 1,
      category: 'Staff Exceptions',
      type: 'critical',
      message: 'Unapproved leave request - Keeper Ramesh',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      category: 'Animal Alerts',
      type: 'critical',
      message: 'Health deterioration - Bengal Tiger (T-04)',
      time: '45 mins ago',
      icon: HeartPulse
    },
    {
      id: 3,
      category: 'Director Gaps',
      type: 'warning',
      message: 'Missed zone coverage - Sector B',
      time: '1 hour ago',
      icon: Activity
    },
    {
      id: 4,
      category: 'Infra Issues',
      type: 'warning',
      message: 'Cage C-12 maintenance overdue',
      time: '3 hours ago',
      icon: Home
    },
    {
      id: 5,
      category: 'Visitor Flags',
      type: 'moderate',
      message: 'High crowd density in Primate section',
      time: '30 mins ago',
      icon: TrendingUp
    },
    {
      id: 6,
      category: 'Emergencies',
      type: 'critical',
      message: 'Medical emergency - Reptile House',
      time: '15 mins ago',
      icon: Bell
    },
    {
      id: 7,
      category: 'System Glitches',
      type: 'informational',
      message: 'Report generation delayed',
      time: '5 hours ago',
      icon: AlertTriangle
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-orange-500 bg-orange-50';
      case 'moderate': return 'border-l-yellow-500 bg-yellow-50';
      case 'informational': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500 text-white';
      case 'warning': return 'bg-orange-500 text-white';
      case 'moderate': return 'bg-yellow-500 text-white';
      case 'informational': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const speciesData = [
    { name: 'Cages', count: 45 },
    { name: 'Animals', count: 120 },
    { name: 'Birds', count: 85 }
  ];

  const roleData = [
    { name: 'Keeper', count: 12 },
    { name: 'Dietician', count: 5 },
    { name: 'Assistant Vet', count: 4 }
  ];

  const budgetData = [
    { name: 'Feed', value: 35 },
    { name: 'Medicine', value: 25 },
    { name: 'Maintenance', value: 40 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  const alertTrendData = [
    { date: 'Mon', count: 5 },
    { date: 'Tue', count: 3 },
    { date: 'Wed', count: 7 },
    { date: 'Thu', count: 4 },
    { date: 'Fri', count: 6 },
    { date: 'Sat', count: 8 },
    { date: 'Sun', count: 2 }
  ];

  const filteredExceptions = filterType === 'all'
    ? exceptions
    : exceptions.filter(e => e.type === filterType);

  return (
    <div className="p-8">
      {/* Quick Actions */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`${action.color} text-black px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors border border-gray-300`}
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 shadow">
              <div className={`${metric.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Exception & Alert Wall */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Exception & Alert Wall</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded ${filterType === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-3 py-1 rounded ${filterType === 'critical' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilterType('warning')}
              className={`px-3 py-1 rounded ${filterType === 'warning' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
            >
              Warning
            </button>
            <button
              onClick={() => setFilterType('moderate')}
              className={`px-3 py-1 rounded ${filterType === 'moderate' ? 'bg-yellow-500 text-white' : 'bg-gray-100'}`}
            >
              Moderate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredExceptions.map((exception) => {
            const Icon = exception.icon;
            return (
              <div
                key={exception.id}
                className={`${getTypeColor(exception.type)} border-l-4 p-4 rounded hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-700" />
                    <span className={`px-2 py-0.5 rounded text-xs ${getBadgeColor(exception.type)}`}>
                      {exception.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{exception.time}</span>
                </div>
                <p className="text-gray-900 mb-2">{exception.message}</p>
                <div className="flex gap-2">
                  <button className="text-xs px-2 py-1 bg-white rounded border border-gray-300 hover:bg-gray-50">
                    View Details
                  </button>
                  <button className="text-xs px-2 py-1 bg-white rounded border border-gray-300 hover:bg-gray-50">
                    Escalate
                  </button>
                  <button className="text-xs px-2 py-1 bg-white rounded border border-gray-300 hover:bg-gray-50">
                    Resolve
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Species Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg text-gray-900 mb-4">Total Cages / Animals / Birds</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={speciesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Staff Role Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg text-gray-900 mb-4">Staff Role Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={roleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg text-gray-900 mb-4">Budget Pie</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Tracker */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg text-gray-900 mb-4">Alert Tracker</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={alertTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
