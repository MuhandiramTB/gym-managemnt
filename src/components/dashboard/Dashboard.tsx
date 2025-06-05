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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin!</h1>
        <p className="mt-1 text-gray-500">Here's what's happening at your gym today.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <metric.icon className="h-5 w-5" />
              <span>{metric.name}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-semibold text-gray-900">
                {metric.value}
              </span>
              <span
                className={`text-sm ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Title>Membership Growth</Title>
          <AreaChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            categories={['Active Members', 'New Signups']}
            colors={['blue', 'green']}
          />
        </Card>

        <Card>
          <Title>Package Distribution</Title>
          <DonutChart
            className="mt-4 h-72"
            data={packageData}
            category="members"
            index="name"
            colors={['blue', 'cyan', 'indigo', 'violet']}
          />
        </Card>
      </div>

      {/* Attendance and Activities Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <Title>Weekly Attendance</Title>
          <BarChart
            className="mt-4 h-72"
            data={attendanceData}
            index="day"
            categories={['Morning', 'Afternoon', 'Evening']}
            colors={['blue', 'cyan', 'indigo']}
          />
        </Card>

        <div className="space-y-6">
          {/* Upcoming Classes */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Title>Upcoming Classes</Title>
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((class_) => (
                <div key={class_.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{class_.name}</h3>
                    <p className="text-sm text-gray-500">{class_.time} • {class_.instructor}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{class_.capacity}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <Title>Recent Activities</Title>
              <ChartBarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.member} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{activity.member}</h3>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <Title>Quick Actions</Title>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <UserPlusIcon className="h-5 w-5" />
            Add New Member
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            <CalendarIcon className="h-5 w-5" />
            Schedule Class
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
            <CurrencyDollarIcon className="h-5 w-5" />
            Process Payment
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <ArrowTrendingUpIcon className="h-5 w-5" />
            View Reports
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 