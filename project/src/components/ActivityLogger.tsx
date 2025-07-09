import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Calendar, TrendingUp, Award } from 'lucide-react';

interface ActivityLoggerProps {
  updatePoints: (points: number) => void;
}

interface DayActivities {
  yoga: number;
  steps: number;
  water: number;
  meditation: number;
}

const ActivityLogger: React.FC<ActivityLoggerProps> = ({ updatePoints }) => {
  const [activities, setActivities] = useState<{ [key: string]: DayActivities }>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load activities from localStorage
    const savedActivities = localStorage.getItem('healthmate_activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  const activityTypes = [
    {
      key: 'yoga',
      name: 'Yoga',
      icon: '🧘‍♀️',
      color: 'from-purple-500 to-pink-500',
      description: 'Yoga sessions completed'
    },
    {
      key: 'steps',
      name: 'Steps',
      icon: '🚶‍♂️',
      color: 'from-blue-500 to-cyan-500',
      description: 'Walking/running activities'
    },
    {
      key: 'water',
      name: 'Water',
      icon: '💧',
      color: 'from-cyan-500 to-blue-500',
      description: 'Glasses of water consumed'
    },
    {
      key: 'meditation',
      name: 'Meditation',
      icon: '🧠',
      color: 'from-green-500 to-teal-500',
      description: 'Meditation sessions'
    }
  ];

  const getCurrentDayActivities = (): DayActivities => {
    return activities[selectedDate] || { yoga: 0, steps: 0, water: 0, meditation: 0 };
  };

  const incrementActivity = (activityKey: keyof DayActivities) => {
    const currentActivities = getCurrentDayActivities();
    const newActivities = {
      ...activities,
      [selectedDate]: {
        ...currentActivities,
        [activityKey]: currentActivities[activityKey] + 1
      }
    };

    setActivities(newActivities);
    localStorage.setItem('healthmate_activities', JSON.stringify(newActivities));

    // Update points (+10 for each activity)
    const totalPoints = Object.values(newActivities).reduce((total, dayActivities) => {
      return total + (dayActivities.yoga + dayActivities.steps + dayActivities.water + dayActivities.meditation) * 10;
    }, 0);

    updatePoints(totalPoints);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const getTotalPointsForDay = (dayActivities: DayActivities) => {
    return (dayActivities.yoga + dayActivities.steps + dayActivities.water + dayActivities.meditation) * 10;
  };

  const getWeeklyStats = () => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    let weeklyTotal = 0;
    let weeklyActivities = 0;

    Object.keys(activities).forEach(date => {
      const activityDate = new Date(date);
      if (activityDate >= weekStart) {
        const dayActivities = activities[date];
        const dayTotal = dayActivities.yoga + dayActivities.steps + dayActivities.water + dayActivities.meditation;
        weeklyTotal += dayTotal * 10;
        weeklyActivities += dayTotal;
      }
    });

    return { weeklyTotal, weeklyActivities };
  };

  const currentDayActivities = getCurrentDayActivities();
  const todayPoints = getTotalPointsForDay(currentDayActivities);
  const { weeklyTotal, weeklyActivities } = getWeeklyStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Wellness Activity Tracker
        </h2>
        <p className="text-gray-600">Log your daily activities and earn points for a healthier lifestyle</p>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>+10 Points Earned!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Points</p>
              <p className="text-2xl font-bold text-green-600">{todayPoints}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weekly Points</p>
              <p className="text-2xl font-bold text-blue-600">{weeklyTotal}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Weekly Activities</p>
              <p className="text-2xl font-bold text-purple-600">{weeklyActivities}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Select Date
        </h3>
        <input
          type="date"
          value={new Date(selectedDate).toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value).toDateString())}
          max={new Date().toISOString().split('T')[0]}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activityTypes.map((activity) => (
          <motion.div
            key={activity.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center space-y-4">
              <div className="text-4xl">{activity.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{activity.name}</h3>
              <p className="text-sm text-gray-600">{activity.description}</p>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {currentDayActivities[activity.key as keyof DayActivities]}
                  </p>
                  <p className="text-xs text-gray-500">Count</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {currentDayActivities[activity.key as keyof DayActivities] * 10}
                  </p>
                  <p className="text-xs text-gray-500">Points</p>
                </div>
              </div>

              <motion.button
                onClick={() => incrementActivity(activity.key as keyof DayActivities)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-gradient-to-r ${activity.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
              >
                <Plus className="w-5 h-5" />
                <span>Add Activity</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="space-y-4">
          {activityTypes.map((activity) => {
            const weeklyCount = Object.keys(activities).reduce((total, date) => {
              const activityDate = new Date(date);
              const today = new Date();
              const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
              
              if (activityDate >= weekStart) {
                return total + (activities[date][activity.key as keyof DayActivities] || 0);
              }
              return total;
            }, 0);

            return (
              <div key={activity.key} className="flex items-center space-x-4">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{activity.name}</span>
                    <span className="text-sm text-gray-600">{weeklyCount} activities</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${activity.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min((weeklyCount / 7) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityLogger;