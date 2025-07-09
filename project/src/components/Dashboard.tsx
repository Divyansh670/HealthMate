import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Gift, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Activity
} from 'lucide-react';

interface DashboardProps {
  userPoints: number;
}

const Dashboard: React.FC<DashboardProps> = ({ userPoints }) => {
  const [userName, setUserName] = useState('');
  const [weeklyGoal] = useState(300);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [todayActivities, setTodayActivities] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const savedHealthCard = localStorage.getItem('healthmate_card');
    if (savedHealthCard) {
      const cardData = JSON.parse(savedHealthCard);
      setUserName(cardData.fullName || 'User');
    }

    // Calculate weekly progress
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekActivities = localStorage.getItem('healthmate_activities');
    
    if (weekActivities) {
      const activities = JSON.parse(weekActivities);
      let weeklyPoints = 0;
      let todayCount = 0;
      const todayStr = new Date().toDateString();
      
      Object.keys(activities).forEach(date => {
        const activityDate = new Date(date);
        if (activityDate >= weekStart) {
          const dayActivities = activities[date];
          weeklyPoints += (dayActivities.yoga + dayActivities.steps + dayActivities.water + dayActivities.meditation) * 10;
          
          if (date === todayStr) {
            todayCount = dayActivities.yoga + dayActivities.steps + dayActivities.water + dayActivities.meditation;
          }
        }
      });
      
      setWeeklyProgress(weeklyPoints);
      setTodayActivities(todayCount);
    }
  }, []);

  const progressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  const quickActions = [
    {
      title: 'Health Card',
      description: 'Generate your digital health ID',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
      path: '/health-card'
    },
    {
      title: 'Log Activity',
      description: 'Track your wellness activities',
      icon: Heart,
      color: 'from-green-500 to-green-600',
      path: '/activities'
    },
    {
      title: 'Rewards Store',
      description: 'Redeem your earned points',
      icon: Gift,
      color: 'from-orange-500 to-orange-600',
      path: '/rewards'
    }
  ];

  const stats = [
    {
      title: 'Total Points',
      value: userPoints,
      icon: Award,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Weekly Progress',
      value: `${weeklyProgress}/${weeklyGoal}`,
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Today\'s Activities',
      value: todayActivities,
      icon: Activity,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'This Week',
      value: `${Math.round(progressPercentage)}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {userName || 'User'}! 👋
          </h2>
          <p className="text-lg opacity-90">
            Ready to continue your wellness journey today?
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Weekly Goal Progress</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>This Week</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {weeklyProgress} / {weeklyGoal} points
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          {progressPercentage >= 100 
            ? '🎉 Congratulations! You\'ve reached your weekly goal!'
            : `Keep going! You need ${weeklyGoal - weeklyProgress} more points to reach your weekly goal.`
          }
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => navigate(action.path)}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
          >
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;