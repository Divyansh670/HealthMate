import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, ShoppingCart, Check, X, Trophy, Headphones, Car, Coffee, Book, Gamepad2, MapPin, Heart, Utensils } from 'lucide-react';

interface RewardsStoreProps {
  userPoints: number;
  updatePoints: (points: number) => void;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ElementType;
  category: string;
  color: string;
  popular?: boolean;
  originalPrice?: string;
}

interface RedeemedReward {
  id: string;
  name: string;
  redeemedAt: string;
  points: number;
}

const RewardsStore: React.FC<RewardsStoreProps> = ({ userPoints, updatePoints }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedReward[]>([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load redeemed rewards from localStorage
    const savedRewards = localStorage.getItem('healthmate_redeemed_rewards');
    if (savedRewards) {
      setRedeemedRewards(JSON.parse(savedRewards));
    }
  }, []);

  const rewards: Reward[] = [
    {
      id: 'gift-voucher-500',
      name: 'Amazon Gift Voucher',
      description: '₹500 Amazon gift card for shopping',
      points: 500,
      icon: Gift,
      category: 'vouchers',
      color: 'from-orange-500 to-red-500',
      popular: true,
      originalPrice: '₹500'
    },
    {
      id: 'gym-pass',
      name: 'Gym Day Pass',
      description: 'One-day access to premium fitness center',
      points: 200,
      icon: Heart,
      category: 'fitness',
      color: 'from-green-500 to-teal-500',
      originalPrice: '₹300'
    },
    {
      id: 'headphones',
      name: 'Wireless Headphones',
      description: 'Premium Bluetooth headphones with noise cancellation',
      points: 800,
      icon: Headphones,
      category: 'electronics',
      color: 'from-blue-500 to-purple-500',
      originalPrice: '₹1,200'
    },
    {
      id: 'coffee-voucher',
      name: 'Coffee Shop Voucher',
      description: '₹200 voucher for your favorite coffee shop',
      points: 150,
      icon: Coffee,
      category: 'food',
      color: 'from-amber-500 to-orange-500',
      originalPrice: '₹200'
    },
    {
      id: 'book-voucher',
      name: 'Book Store Voucher',
      description: '₹300 voucher for books and educational materials',
      points: 250,
      icon: Book,
      category: 'education',
      color: 'from-indigo-500 to-purple-500',
      originalPrice: '₹300'
    },
    {
      id: 'gaming-voucher',
      name: 'Gaming Store Credit',
      description: '₹600 credit for gaming platform purchases',
      points: 600,
      icon: Gamepad2,
      category: 'entertainment',
      color: 'from-pink-500 to-red-500',
      originalPrice: '₹600'
    },
    {
      id: 'travel-voucher',
      name: 'Travel Voucher',
      description: '₹1000 voucher for travel bookings',
      points: 1000,
      icon: MapPin,
      category: 'travel',
      color: 'from-cyan-500 to-blue-500',
      popular: true,
      originalPrice: '₹1,000'
    },
    {
      id: 'ride-voucher',
      name: 'Ride Voucher',
      description: '₹150 voucher for cab rides',
      points: 120,
      icon: Car,
      category: 'transport',
      color: 'from-yellow-500 to-orange-500',
      originalPrice: '₹150'
    },
    {
      id: 'food-voucher',
      name: 'Food Delivery Voucher',
      description: '₹400 voucher for food delivery apps',
      points: 350,
      icon: Utensils,
      category: 'food',
      color: 'from-red-500 to-pink-500',
      originalPrice: '₹400'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Rewards', icon: Gift },
    { id: 'vouchers', name: 'Vouchers', icon: Gift },
    { id: 'fitness', name: 'Fitness', icon: Heart },
    { id: 'electronics', name: 'Electronics', icon: Headphones },
    { id: 'food', name: 'Food & Drinks', icon: Coffee },
    { id: 'entertainment', name: 'Entertainment', icon: Gamepad2 },
    { id: 'travel', name: 'Travel', icon: MapPin }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    if (!selectedReward) return;

    if (userPoints < selectedReward.points) {
      alert('Insufficient points to redeem this reward!');
      return;
    }

    // Deduct points
    const newPoints = userPoints - selectedReward.points;
    updatePoints(newPoints);

    // Add to redeemed rewards
    const newRedeemedReward: RedeemedReward = {
      id: selectedReward.id,
      name: selectedReward.name,
      redeemedAt: new Date().toISOString(),
      points: selectedReward.points
    };

    const updatedRedeemed = [...redeemedRewards, newRedeemedReward];
    setRedeemedRewards(updatedRedeemed);
    localStorage.setItem('healthmate_redeemed_rewards', JSON.stringify(updatedRedeemed));

    // Show success and close modal
    setShowRedeemModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const totalRedeemedPoints = redeemedRewards.reduce((total, reward) => total + reward.points, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          Rewards Store
        </h2>
        <p className="text-gray-600">Redeem your wellness points for exciting rewards</p>
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
            <span>Reward Redeemed Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Points</p>
              <p className="text-2xl font-bold text-orange-600">{userPoints}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rewards Redeemed</p>
              <p className="text-2xl font-bold text-green-600">{redeemedRewards.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Points Spent</p>
              <p className="text-2xl font-bold text-purple-600">{totalRedeemedPoints}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg transition-all text-center ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden"
          >
            {reward.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-bl-lg text-xs font-semibold">
                Popular
              </div>
            )}

            <div className="text-center space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${reward.color} flex items-center justify-center`}>
                <reward.icon className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-orange-600">{reward.points}</span>
                  <span className="text-sm text-gray-500">points</span>
                </div>

                {reward.originalPrice && (
                  <p className="text-xs text-gray-500 mb-3">Worth {reward.originalPrice}</p>
                )}
              </div>

              <motion.button
                onClick={() => handleRedeemClick(reward)}
                disabled={userPoints < reward.points}
                whileHover={{ scale: userPoints >= reward.points ? 1.05 : 1 }}
                whileTap={{ scale: userPoints >= reward.points ? 0.95 : 1 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  userPoints >= reward.points
                    ? `bg-gradient-to-r ${reward.color} text-white hover:shadow-lg`
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{userPoints >= reward.points ? 'Redeem' : 'Insufficient Points'}</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Redeemed Rewards History */}
      {redeemedRewards.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-green-600" />
            Redeemed Rewards
          </h3>
          <div className="space-y-3">
            {redeemedRewards.slice(-5).reverse().map((reward, index) => (
              <motion.div
                key={`${reward.id}-${reward.redeemedAt}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{reward.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(reward.redeemedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">-{reward.points} points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Redeem Confirmation Modal */}
      <AnimatePresence>
        {showRedeemModal && selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${selectedReward.color} flex items-center justify-center mb-4`}>
                  <selectedReward.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirm Redemption
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Are you sure you want to redeem <strong>{selectedReward.name}</strong> for{' '}
                  <strong>{selectedReward.points} points</strong>?
                </p>

                <div className="flex items-center justify-center space-x-2 mb-6">
                  <span className="text-sm text-gray-500">Your points:</span>
                  <span className="font-semibold text-orange-600">{userPoints}</span>
                  <span className="text-sm text-gray-500">→</span>
                  <span className="font-semibold text-green-600">{userPoints - selectedReward.points}</span>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setShowRedeemModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={confirmRedeem}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 bg-gradient-to-r ${selectedReward.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
                  >
                    <Check className="w-5 h-5" />
                    <span>Redeem</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RewardsStore;