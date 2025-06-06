import React from 'react';
import { Card, Title, AreaChart, DonutChart, BarChart } from '@tremor/react';
import {
  UsersIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  ClockIcon,
  CalendarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const metrics = [
  {
    name: 'Active Members',
    value: '2,851',
    change: '+4.75%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'New Signups',
    value: '42',
    change: '+28.5%',
    changeType: 'positive',
    icon: UserPlusIcon,
  },
  {
    name: 'Revenue',
    value: '$48,294',
    change: '+10.2%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Attendance Today',
    value: '384',
    change: '-2.3%',
    changeType: 'negative',
    icon: ClockIcon,
  },
];

const chartdata = [
  {
    date: '2024-01',
    'Active Members': 2100,
    'New Signups': 35,
  },
  {
    date: '2024-02',
    'Active Members': 2300,
    'New Signups': 38,
  },
  {
    date: '2024-03',
    'Active Members': 2851,
    'New Signups': 42,
  },
];

const packageData = [
  {
    name: 'Monthly',
    members: 1204,
  },
  {
    name: 'Yearly',
    members: 856,
  },
  {
    name: 'Personal Training',
    members: 428,
  },
  {
    name: 'Group Classes',
    members: 363,
  },
];

const attendanceData = [
  {
    day: 'Mon',
    'Morning': 120,
    'Afternoon': 85,
    'Evening': 150,
  },
  {
    day: 'Tue',
    'Morning': 110,
    'Afternoon': 95,
    'Evening': 140,
  },
  {
    day: 'Wed',
    'Morning': 130,
    'Afternoon': 90,
    'Evening': 160,
  },
  {
    day: 'Thu',
    'Morning': 125,
    'Afternoon': 88,
    'Evening': 155,
  },
  {
    day: 'Fri',
    'Morning': 115,
    'Afternoon': 92,
    'Evening': 145,
  },
];

const upcomingClasses = [
  {
    name: 'Yoga Flow',
    time: '09:00 AM',
    instructor: 'Sarah Johnson',
    capacity: '15/20',
  },
  {
    name: 'HIIT Training',
    time: '11:00 AM',
    instructor: 'Mike Wilson',
    capacity: '18/20',
  },
  {
    name: 'CrossFit',
    time: '02:00 PM',
    instructor: 'David Brown',
    capacity: '12/15',
  },
];

const recentActivities = [
  {
    member: 'John Doe',
    action: 'Renewed membership',
    time: '2 hours ago',
  },
  {
    member: 'Jane Smith',
    action: 'Booked personal training',
    time: '3 hours ago',
  },
  {
    member: 'Mike Johnson',
    action: 'Joined group class',
    time: '4 hours ago',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white">Welcome back, Admin! 👋</h1>
        <p className="mt-1 text-indigo-50/90">Here's what's happening at your gym today.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20 transition-all duration-300 hover:ring-indigo-500/50"
          >
            <div className="flex items-center space-x-2 text-sm text-gray-100">
              <metric.icon className="h-5 w-5 text-indigo-300" />
              <span>{metric.name}</span>
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-semibold text-white">
                {metric.value}
              </span>
              <span
                className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Membership Growth</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-100">
              <span className="h-2 w-2 rounded-full bg-indigo-300"></span>
              <span>Active Members</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 ml-4"></span>
              <span>New Signups</span>
            </div>
          </div>
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={['Active Members', 'New Signups']}
            colors={['indigo', 'cyan']}
            showLegend={false}
            showGridLines={true}
            showAnimation={true}
            showTooltip={true}
            showXAxis={true}
            showYAxis={true}
            yAxisWidth={40}
            valueFormatter={(value) => value.toLocaleString()}
            customTooltip={({ payload, active }) => {
              if (!active || !payload || !payload[0] || !payload[1]) return null;
              const activeMembers = payload[0].value ?? 0;
              const newSignups = payload[1].value ?? 0;
              return (
                <div className="rounded-lg bg-white/10 p-3 shadow-lg ring-1 ring-white/20">
                  <p className="text-sm text-gray-100">{payload[0].payload.date}</p>
                  <p className="text-sm font-medium text-indigo-300">
                    Active Members: {activeMembers.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-cyan-300">
                    New Signups: {newSignups.toLocaleString()}
                  </p>
                </div>
              );
            }}
          />
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Package Distribution</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-100">
              <span className="h-2 w-2 rounded-full bg-indigo-300"></span>
              <span>Monthly</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 ml-4"></span>
              <span>Yearly</span>
            </div>
          </div>
          <DonutChart
            className="mt-4 h-72"
            data={packageData}
            category="members"
            index="name"
            colors={['indigo', 'cyan', 'purple', 'violet']}
            showAnimation={true}
            showTooltip={true}
            valueFormatter={(value) => value.toLocaleString()}
            customTooltip={({ payload, active }) => {
              if (!active || !payload || !payload[0]) return null;
              const value = payload[0].value ?? 0;
              return (
                <div className="rounded-lg bg-white/10 p-3 shadow-lg ring-1 ring-white/20">
                  <p className="text-sm font-medium text-white">{payload[0].name}</p>
                  <p className="text-sm text-gray-100">
                    Members: {value.toLocaleString()}
                  </p>
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* Attendance and Activities Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Weekly Attendance</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-100">
              <span className="h-2 w-2 rounded-full bg-indigo-300"></span>
              <span>Morning</span>
              <span className="h-2 w-2 rounded-full bg-cyan-300 ml-4"></span>
              <span>Afternoon</span>
              <span className="h-2 w-2 rounded-full bg-purple-300 ml-4"></span>
              <span>Evening</span>
            </div>
          </div>
          <BarChart
            className="mt-4 h-72"
            data={attendanceData}
            index="day"
            categories={['Morning', 'Afternoon', 'Evening']}
            colors={['indigo', 'cyan', 'purple']}
            showAnimation={true}
            showTooltip={true}
            showGridLines={true}
            showXAxis={true}
            showYAxis={true}
            yAxisWidth={40}
            valueFormatter={(value) => value.toLocaleString()}
            customTooltip={({ payload, active }) => {
              if (!active || !payload || !payload[0] || !payload[1] || !payload[2]) return null;
              const morning = payload[0].value ?? 0;
              const afternoon = payload[1].value ?? 0;
              const evening = payload[2].value ?? 0;
              return (
                <div className="rounded-lg bg-white/10 p-3 shadow-lg ring-1 ring-white/20">
                  <p className="text-sm text-gray-100">{payload[0].payload.day}</p>
                  <p className="text-sm font-medium text-indigo-300">
                    Morning: {morning.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-cyan-300">
                    Afternoon: {afternoon.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-purple-300">
                    Evening: {evening.toLocaleString()}
                  </p>
                </div>
              );
            }}
          />
        </div>

        <div className="space-y-6">
          {/* Upcoming Classes */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Upcoming Classes</h3>
              <CalendarIcon className="h-5 w-5 text-indigo-300" />
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((class_) => (
                <div
                  key={class_.name}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10"
                >
                  <div>
                    <h3 className="font-medium text-white">{class_.name}</h3>
                    <p className="text-sm text-gray-100">{class_.time} • {class_.instructor}</p>
                  </div>
                  <span className="text-sm font-medium text-indigo-300">{class_.capacity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
              <ChartBarIcon className="h-5 w-5 text-indigo-300" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.member}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10"
                >
                  <div>
                    <h3 className="font-medium text-white">{activity.member}</h3>
                    <p className="text-sm text-gray-100">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-200">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 shadow-xl ring-1 ring-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-3 text-white font-medium transition-all duration-300 hover:from-indigo-400 hover:to-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25">
            <UserPlusIcon className="h-5 w-5" />
            Add New Member
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3 text-white font-medium transition-all duration-300 hover:from-purple-400 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/25">
            <CalendarIcon className="h-5 w-5" />
            Schedule Class
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-3 text-white font-medium transition-all duration-300 hover:from-cyan-400 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/25">
            <CurrencyDollarIcon className="h-5 w-5" />
            Process Payment
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 px-4 py-3 text-white font-medium transition-all duration-300 hover:from-violet-400 hover:to-violet-500 hover:shadow-lg hover:shadow-violet-500/25">
            <ArrowTrendingUpIcon className="h-5 w-5" />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 