'use client';

import { useState, useEffect } from 'react';
import { Trophy, Home, User, LogOut, GraduationCap, CheckCircle, Star, Zap, Award, Gift, Flame, BarChart3, Clock, Brain, ShoppingBag, Ticket, PiggyBank, Shield } from 'lucide-react';
import { TOPICS, ACHIEVEMENTS, REWARDS } from '@/lib/data';

export default function DiscountAcademyApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [username, setUsername] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [studiedTopics, setStudiedTopics] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [perfectQuizStreak, setPerfectQuizStreak] = useState(0);
  const [totalQuizzesTaken, setTotalQuizzesTaken] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [studyStartTime, setStudyStartTime] = useState<number | null>(null);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [purchasedRewards, setPurchasedRewards] = useState<any[]>([]);
  const [showRewardsStore, setShowRewardsStore] = useState(false);

  // Load student data from API
  useEffect(() => {
    if (user) {
      loadStudentData(user.name);
    }
  }, [user]);

  // Save student data to API
  useEffect(() => {
    if (user) {
      saveStudentData();
    }
  }, [studiedTopics, points, level, achievements, totalQuizzesTaken, totalCorrectAnswers, totalStudyTime, purchasedRewards, perfectQuizStreak]);

  const loadStudentData = async (username: string) => {
    try {
      const response = await fetch(`/api/students?username=${username}`);
      if (response.ok) {
        const data = await response.json();
        setStudiedTopics(data.studiedTopics || []);
        setPoints(data.points || 0);
        setLevel(data.level || 1);
        setAchievements(data.achievements || []);
        setPerfectQuizStreak(data.perfectQuizStreak || 0);
        setTotalQuizzesTaken(data.totalQuizzesTaken || 0);
        setTotalCorrectAnswers(data.totalCorrectAnswers || 0);
        setTotalStudyTime(data.totalStudyTime || 0);
        setPurchasedRewards(data.purchasedRewards || []);
      }
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  const saveStudentData = async () => {
    if (!user) return;
    
    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.name,
          studiedTopics,
          points,
          level,
          achievements,
          perfectQuizStreak,
          totalQuizzesTaken,
          totalCorrectAnswers,
          totalStudyTime,
          purchasedRewards,
        }),
      });
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  const handleLogin = () => {
    if (username.trim()) {
      setUser({ name: username });
      setCurrentScreen('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setCurrentScreen('login');
    setStudiedTopics([]);
    setPoints(0);
    setLevel(1);
    setAchievements([]);
    setPerfectQuizStreak(0);
    setTotalQuizzesTaken(0);
    setTotalCorrectAnswers(0);
    setTotalStudyTime(0);
    setPurchasedRewards([]);
  };

  const selectTopic = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentScreen('learning');
    setShowQuiz(false);
    setQuizComplete(false);
    setQuizAnswers([]);
    setStudyStartTime(Date.now());
  };

  const completeTopic = () => {
    // חישוב זמן למידה
    if (studyStartTime) {
      const studyDuration = Math.floor((Date.now() - studyStartTime) / 1000 / 60); // דקות
      setTotalStudyTime(prev => prev + studyDuration);
      
      // הישג לומד מהיר
      if (studyDuration < 20 && studiedTopics.length >= 2 && !achievements.includes('speed_learner')) {
        setAchievements(prev => [...prev, 'speed_learner']);
        setPoints(prev => prev + 15);
      }
    }

    // הישגים לפי שעה
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 7 && !achievements.includes('night_owl')) {
      setAchievements(prev => [...prev, 'night_owl']);
      setPoints(prev => prev + 5);
    }
    if (hour >= 5 && hour < 7 && !achievements.includes('early_bird')) {
      setAchievements(prev => [...prev, 'early_bird']);
      setPoints(prev => prev + 5);
    }

    if (!studiedTopics.includes(selectedTopic.id)) {
      const newStudied = [...studiedTopics, selectedTopic.id];
      setStudiedTopics(newStudied);
      
      let earnedPoints = selectedTopic.points;
      const newAchievements = [];
      
      // הישגים
      if (newStudied.length === 1 && !achievements.includes('first_topic')) {
        newAchievements.push('first_topic');
        earnedPoints += 5;
      }
      
      if (newStudied.length === 5 && !achievements.includes('five_topics')) {
        newAchievements.push('five_topics');
        earnedPoints += 10;
      }

      const basicTopics = TOPICS.filter(t => t.category === 'בסיסי').map(t => t.id);
      const hasAllBasic = basicTopics.every(id => newStudied.includes(id));
      if (hasAllBasic && !achievements.includes('all_basic')) {
        newAchievements.push('all_basic');
        earnedPoints += 20;
      }

      const savingsTopics = TOPICS.filter(t => t.category === 'חיסכון').map(t => t.id);
      const hasAllSavings = savingsTopics.every(id => newStudied.includes(id));
      if (hasAllSavings && !achievements.includes('savings_master')) {
        newAchievements.push('savings_master');
        earnedPoints += 20;
      }

      const advancedTopics = TOPICS.filter(t => t.category === 'מתקדם').map(t => t.id);
      const hasAllAdvanced = advancedTopics.every(id => newStudied.includes(id));
      if (hasAllAdvanced && !achievements.includes('advanced_master')) {
        newAchievements.push('advanced_master');
        earnedPoints += 30;
      }

      if (newStudied.length === TOPICS.length && !achievements.includes('completionist')) {
        newAchievements.push('completionist');
        earnedPoints += 50;
      }
      
      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
      }
      
      const newPoints = points + earnedPoints;
      setPoints(newPoints);
      
      const newLevel = Math.floor(newPoints / 20) + 1;
      
      // הישגי רמות
      if (newLevel >= 5 && !achievements.includes('level_5')) {
        setAchievements(prev => [...prev, 'level_5']);
        setPoints(prev => prev + 25);
      }
      if (newLevel >= 10 && !achievements.includes('level_10')) {
        setAchievements(prev => [...prev, 'level_10']);
        setPoints(prev => prev + 50);
      }
      
      setLevel(newLevel);
    }
    
    setShowQuiz(true);
  };

  const submitQuiz = () => {
    const correctAnswers = quizAnswers.filter((answer, index) => 
      answer === selectedTopic.content.quiz[index].correct
    ).length;
    
    const totalQuestions = selectedTopic.content.quiz.length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;
    
    setTotalQuizzesTaken(prev => prev + 1);
    setTotalCorrectAnswers(prev => prev + correctAnswers);
    
    // הורדת נקודות על תשובות שגויות
    if (wrongAnswers > 0) {
      const pointsToDeduct = wrongAnswers * 3; // 3 נקודות לכל טעות
      setPoints(prev => Math.max(0, prev - pointsToDeduct)); // לא יורד מתחת ל-0
    }
    
    if (percentage === 100) {
      const newStreak = perfectQuizStreak + 1;
      setPerfectQuizStreak(newStreak);
      
      if (!achievements.includes('quiz_perfect')) {
        setAchievements(prev => [...prev, 'quiz_perfect']);
        setPoints(prev => prev + 15);
      }
      
      if (newStreak >= 3 && !achievements.includes('quiz_streak_3')) {
        setAchievements(prev => [...prev, 'quiz_streak_3']);
        setPoints(prev => prev + 20);
      }

      // בדיקה אם כל הקוויזים מושלמים
      const allTopicsStudied = studiedTopics.length === TOPICS.length;
      if (allTopicsStudied && !achievements.includes('perfect_student')) {
        setAchievements(prev => [...prev, 'perfect_student']);
        setPoints(prev => prev + 100);
      }
    } else {
      setPerfectQuizStreak(0);
    }
    
    setQuizComplete(true);
  };

  const backToDashboard = () => {
    setSelectedTopic(null);
    setCurrentScreen('dashboard');
    setShowQuiz(false);
    setQuizComplete(false);
  };

  const purchaseReward = (reward: any) => {
    if (points >= reward.points) {
      setPoints(prev => prev - reward.points);
      setPurchasedRewards(prev => [...prev, {
        ...reward,
        purchaseDate: new Date().toLocaleDateString('he-IL')
      }]);
    }
  };

  // מסך כניסה
  if (currentScreen === 'login') {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full transform hover:scale-105 transition-all">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <GraduationCap className="text-white" size={56} />
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
              אקדמיית דיסקונט
            </h1>
            <p className="text-gray-600 text-xl font-bold">💚 למידה חכמה לבני נוער</p>
            <p className="text-gray-500 mt-2">10 נושאים | קוויזים | הישגים</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
                <User size={20} />
                <span>השם שלך</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-600 focus:outline-none text-lg"
                placeholder="הכנס את השם שלך"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-black text-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg"
            >
              🚀 בואו נתחיל ללמוד!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // מסך ראשי
  if (currentScreen === 'dashboard') {
    const progressPercent = (studiedTopics.length / TOPICS.length) * 100;
    const earnedAchievements = ACHIEVEMENTS.filter(a => achievements.includes(a.id));
    const quizAccuracy = totalQuizzesTaken > 0 ? Math.round((totalCorrectAnswers / (totalQuizzesTaken * 3)) * 100) : 0;
    
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <GraduationCap size={40} />
                <div>
                  <h1 className="text-3xl font-black">אקדמיית דיסקונט</h1>
                  <p className="text-green-100">למידה חכמה לבני נוער</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowRewardsStore(!showRewardsStore)}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-3 rounded-xl transition-all transform hover:scale-105 font-black shadow-lg"
                >
                  <Gift size={24} />
                  <span>חנות הטבות</span>
                </button>
                
                <div className="text-center">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                    <Star className="text-yellow-300" size={24} />
                    <div>
                      <p className="text-2xl font-black">{points}</p>
                      <p className="text-xs text-green-100">נקודות</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
                    <Trophy className="text-yellow-300" size={24} />
                    <div>
                      <p className="text-2xl font-black">רמה {level}</p>
                      <p className="text-xs text-green-100">{user?.name}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors"
                >
                  <LogOut size={24} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {showRewardsStore ? (
            // מסך חנות הטבות
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowRewardsStore(false)}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 px-6 py-3 rounded-xl transition-colors shadow-lg font-bold"
                >
                  <Home size={20} />
                  <span>חזרה ללמידה</span>
                </button>
                
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-lg">
                  <Star className="text-yellow-500" size={28} />
                  <div>
                    <p className="text-sm text-gray-600">יתרת נקודות</p>
                    <p className="text-2xl font-black text-green-600">{points}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 shadow-xl mb-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-4 rounded-full">
                      <Gift size={40} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black mb-2">חנות ההטבות 🎁</h2>
                      <p className="text-xl">המר את הנקודות שלך להטבות מגניבות!</p>
                    </div>
                  </div>
                  
                  <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
                    <p className="text-sm text-gray-600 mb-1 text-center">יתרת הנקודות שלך:</p>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="text-yellow-500" size={32} />
                      <p className="text-5xl font-black text-green-600">{points}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">נקודות זמינות</p>
                  </div>
                </div>
                {purchasedRewards.length > 0 && (
                  <div className="bg-white/20 rounded-xl p-4 mt-4">
                    <p className="font-bold text-lg">🎉 רכשת {purchasedRewards.length} הטבות עד כה!</p>
                  </div>
                )}
              </div>

              {/* ההטבות שרכשתי */}
              {purchasedRewards.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={28} />
                    <span>ההטבות שלי ({purchasedRewards.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {purchasedRewards.map((reward, index) => (
                      <div key={index} className={`${reward.bgColor} rounded-2xl p-6 border-4 border-green-500 shadow-lg relative`}>
                        <div className="absolute -top-3 -left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-4 py-2 shadow-lg border-4 border-white">
                          <div className="flex items-center gap-1">
                            <Star size={18} className="text-white" />
                            <span className="font-black text-lg">{reward.points}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3 mt-2">
                          <div className={`bg-gradient-to-r ${reward.color} text-white p-3 rounded-xl`}>
                            {reward.icon}
                          </div>
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            ✓ נרכש
                          </div>
                        </div>
                        <h4 className="text-xl font-black text-gray-800 mb-2">{reward.name}</h4>
                        <p className="text-gray-600 mb-3 text-sm">{reward.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">נרכש: {reward.purchaseDate}</span>
                          <span className="bg-gray-200 px-3 py-1 rounded-full font-bold text-xs">
                            {reward.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* חנות ההטבות */}
              <div>
                <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag className="text-blue-500" size={28} />
                  <span>כל ההטבות</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {REWARDS.map(reward => {
                    const canAfford = points >= reward.points;
                    const alreadyPurchased = purchasedRewards.some(p => p.id === reward.id);
                    
                    return (
                      <div 
                        key={reward.id} 
                        className={`${reward.bgColor} rounded-2xl p-6 shadow-lg transition-all relative ${canAfford && !alreadyPurchased ? 'hover:scale-105 cursor-pointer border-2 border-transparent hover:border-green-500' : 'opacity-60'}`}
                      >
                        <div className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-4 py-2 shadow-lg border-4 border-white">
                          <div className="flex items-center gap-1">
                            <Star size={20} className="text-white" />
                            <span className="font-black text-xl">{reward.points}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4 mt-2">
                          <div className={`bg-gradient-to-r ${reward.color} text-white p-3 rounded-xl shadow-md`}>
                            {reward.icon}
                          </div>
                          <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                            {reward.category}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-black text-gray-800 mb-2">{reward.name}</h4>
                        <p className="text-gray-600 mb-4 text-sm">{reward.description}</p>
                        
                        <div className="flex items-center justify-between">
                          {alreadyPurchased ? (
                            <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm w-full text-center">
                              ✓ נרכש בהצלחה
                            </div>
                          ) : canAfford ? (
                            <button
                              onClick={() => purchaseReward(reward)}
                              className={`bg-gradient-to-r ${reward.color} text-white px-5 py-3 rounded-xl font-bold hover:shadow-lg transition-all w-full text-lg flex items-center justify-center gap-2`}
                            >
                              <ShoppingBag size={20} />
                              <span>קנה עכשיו</span>
                            </button>
                          ) : (
                            <div className="w-full">
                              <div className="bg-gray-300 text-gray-600 px-4 py-2 rounded-xl font-bold text-sm text-center mb-2">
                                🔒 לא מספיק נקודות
                              </div>
                              <div className="text-center text-xs text-red-600 font-bold">
                                חסרות לך {reward.points - points} נקודות
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* טיפ */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Zap className="text-blue-500 flex-shrink-0" size={28} />
                  <div>
                    <h4 className="text-xl font-black text-gray-800 mb-2">💡 טיפ חכם!</h4>
                    <p className="text-gray-700 mb-2">כדי לצבור יותר נקודות - תסיים עוד נושאי לימוד, תענה נכון בקוויזים, ותשיג הישגים מיוחדים!</p>
                    <p className="text-red-600 font-bold text-sm">⚠️ זכור: כל תשובה שגויה בקוויז תעלה לך 3 נקודות!</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          // מסך הלמידה הרגיל
          <>
          {/* פרופיל לומד */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 shadow-xl mb-6 text-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-black mb-2">היי {user?.name}! 👋</h2>
                <p className="text-green-100">בואו נמשיך את המסע שלך לעולם הכסף!</p>
                <div className="bg-yellow-100 text-yellow-900 px-3 py-1 rounded-lg mt-2 text-sm font-bold inline-block">
                  ⚠️ זהירות: טעות בקוויז = -3 נקודות
                </div>
              </div>
              <div className="text-center bg-white/20 rounded-xl p-4">
                <p className="text-5xl font-black">{studiedTopics.length}/{TOPICS.length}</p>
                <p className="text-sm text-green-100">נושאים</p>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 flex items-center justify-end px-2"
                style={{ width: `${progressPercent}%` }}
              >
                {progressPercent > 10 && (
                  <Flame size={16} className="text-white animate-pulse" />
                )}
              </div>
            </div>

            {/* סטטיסטיקות */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <BarChart3 size={20} className="mx-auto mb-1" />
                <p className="text-2xl font-bold">{quizAccuracy}%</p>
                <p className="text-xs text-green-100">דיוק קוויזים</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Brain size={20} className="mx-auto mb-1" />
                <p className="text-2xl font-bold">{totalQuizzesTaken}</p>
                <p className="text-xs text-green-100">קוויזים</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Flame size={20} className="mx-auto mb-1" />
                <p className="text-2xl font-bold">{perfectQuizStreak}</p>
                <p className="text-xs text-green-100">רצף מושלם</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Clock size={20} className="mx-auto mb-1" />
                <p className="text-2xl font-bold">{totalStudyTime}</p>
                <p className="text-xs text-green-100">דקות למידה</p>
              </div>
            </div>
          </div>

          {/* הישגים */}
          {earnedAchievements.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
                <Award className="text-yellow-500" size={28} />
                <span>ההישגים שלך 🏆 ({earnedAchievements.length}/{ACHIEVEMENTS.length})</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {earnedAchievements.map(achievement => (
                  <div key={achievement.id} className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 text-center border-2 border-yellow-400 transform hover:scale-105 transition-all relative">
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full px-2 py-1 text-xs font-black shadow-lg">
                      +{achievement.points}
                    </div>
                    
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold text-gray-800 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* נושאים בסיסיים */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2 bg-green-100 p-4 rounded-xl">
              <Zap className="text-green-600" size={28} />
              <span>שלב 1: הבסיס 🎯</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOPICS.filter(t => t.category === 'בסיסי').map(topic => {
                const isStudied = studiedTopics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => selectTopic(topic)}
                    className={`${topic.bgColor} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all shadow-lg hover:shadow-2xl border-4 ${isStudied ? 'border-green-500' : 'border-transparent'} relative overflow-hidden`}
                  >
                    {isStudied && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                        <CheckCircle size={20} />
                      </div>
                    )}
                    
                    <div className={`bg-gradient-to-r ${topic.color} text-white p-3 rounded-xl shadow-md w-fit mb-4`}>
                      {topic.icon}
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{topic.content.intro.substring(0, 60)}...</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full border-2 border-yellow-300">
                          <Star size={16} className="text-yellow-600" />
                          <span className="font-bold text-yellow-600">{topic.points}</span>
                          <span className="text-xs text-yellow-600">נק'</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                          <Clock size={16} className="text-blue-600" />
                          <span className="font-bold text-blue-600 text-xs">{topic.duration}</span>
                        </div>
                      </div>
                      {!isStudied && (
                        <span className="text-green-600 font-bold text-sm">למד →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* חיסכון */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2 bg-emerald-100 p-4 rounded-xl">
              <PiggyBank className="text-emerald-600" size={28} />
              <span>שלב 2: בונים עתיד 🚀</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOPICS.filter(t => t.category === 'חיסכון').map(topic => {
                const isStudied = studiedTopics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => selectTopic(topic)}
                    className={`${topic.bgColor} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all shadow-lg hover:shadow-2xl border-4 ${isStudied ? 'border-green-500' : 'border-transparent'} relative overflow-hidden`}
                  >
                    {isStudied && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                        <CheckCircle size={20} />
                      </div>
                    )}
                    
                    <div className={`bg-gradient-to-r ${topic.color} text-white p-3 rounded-xl shadow-md w-fit mb-4`}>
                      {topic.icon}
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{topic.content.intro.substring(0, 60)}...</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                          <Star size={16} className="text-yellow-600" />
                          <span className="font-bold text-yellow-600">{topic.points}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                          <Clock size={16} className="text-blue-600" />
                          <span className="font-bold text-blue-600 text-xs">{topic.duration}</span>
                        </div>
                      </div>
                      {!isStudied && (
                        <span className="text-green-600 font-bold text-sm">למד →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* מתקדם */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2 bg-green-100 p-4 rounded-xl">
              <Shield className="text-green-700" size={28} />
              <span>שלב 3: רמה מתקדמת 🎖️</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOPICS.filter(t => t.category === 'מתקדם').map(topic => {
                const isStudied = studiedTopics.includes(topic.id);
                return (
                  <div
                    key={topic.id}
                    onClick={() => selectTopic(topic)}
                    className={`${topic.bgColor} rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all shadow-lg hover:shadow-2xl border-4 ${isStudied ? 'border-green-500' : 'border-transparent'} relative overflow-hidden`}
                  >
                    {isStudied && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                        <CheckCircle size={20} />
                      </div>
                    )}
                    
                    <div className={`bg-gradient-to-r ${topic.color} text-white p-3 rounded-xl shadow-md w-fit mb-4`}>
                      {topic.icon}
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{topic.content.intro.substring(0, 60)}...</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                          <Star size={16} className="text-yellow-600" />
                          <span className="font-bold text-yellow-600">{topic.points}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                          <Clock size={16} className="text-blue-600" />
                          <span className="font-bold text-blue-600 text-xs">{topic.duration}</span>
                        </div>
                      </div>
                      {!isStudied && (
                        <span className="text-green-600 font-bold text-sm">למד →</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    );
  }

  // מסך למידה + קוויז
  if (currentScreen === 'learning' && selectedTopic) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <header className={`bg-gradient-to-r ${selectedTopic.color} text-white shadow-xl`}>
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <button
                onClick={backToDashboard}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-colors font-bold"
              >
                <Home size={24} />
                <span>חזרה</span>
              </button>
              <div className="text-center">
                <div className="flex items-center gap-3 justify-center mb-2">
                  {selectedTopic.icon}
                  <h1 className="text-3xl font-black">{selectedTopic.title}</h1>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex items-center gap-1 bg-yellow-300 px-4 py-2 rounded-xl shadow-lg">
                    <Star className="text-yellow-600" size={24} />
                    <span className="font-black text-xl text-gray-800">{selectedTopic.points}</span>
                    <span className="font-bold text-gray-700">נקודות</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="text-white" size={20} />
                    <span className="font-bold">{selectedTopic.duration}</span>
                  </div>
                </div>
              </div>
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {!showQuiz ? (
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className={`${selectedTopic.bgColor} rounded-2xl p-6 mb-8 border-4 ${selectedTopic.color.replace('from-', 'border-').split(' ')[0]}`}>
                <p className="text-xl font-bold text-gray-700 leading-relaxed">{selectedTopic.content.intro}</p>
              </div>

              {selectedTopic.content.sections.map((section: any, index: number) => (
                <div key={index} className="mb-8 bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-3">
                    <span className="text-4xl">{section.icon}</span>
                    <span>{section.title}</span>
                  </h3>

                  {section.type === 'story' && (
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border-l-4 border-green-500">
                      <p className="text-lg text-gray-700 leading-relaxed font-medium">{section.text}</p>
                    </div>
                  )}

                  {section.type === 'explanation' && (
                    <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                      <p className="text-lg text-gray-700 leading-relaxed">{section.text}</p>
                    </div>
                  )}

                  {section.type === 'calculation' && (
                    <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                      <div className="space-y-2 font-mono text-lg">
                        {section.items.map((item: string, i: number) => (
                          <p key={i} className={`${item.includes('🎯') || item.includes('🏆') ? 'font-black text-green-700 text-xl' : 'text-gray-700 font-semibold'}`}>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === 'tips' && (
                    <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
                      <ul className="space-y-3">
                        {section.items.map((item: string, i: number) => (
                          <li key={i} className="text-lg text-gray-700 flex items-start gap-3 font-medium">
                            <span className="text-green-600 text-2xl">✓</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.type === 'warning' && (
                    <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                      <ul className="space-y-3">
                        {section.items.map((item: string, i: number) => (
                          <li key={i} className="text-lg text-gray-700 flex items-start gap-3 font-medium">
                            <span className="text-red-600 text-2xl">⚠️</span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.type === 'challenge' && (
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-l-4 border-orange-500">
                      <ul className="space-y-2">
                        {section.items.map((item: string, i: number) => (
                          <li key={i} className="text-lg text-gray-700 font-bold">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-12 text-center">
                <button
                  onClick={completeTopic}
                  className={`bg-gradient-to-r ${selectedTopic.color} text-white px-12 py-5 rounded-2xl font-black text-2xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3 mx-auto`}
                >
                  <Zap size={28} />
                  <span>בואו לבדיקת ידע! 📝</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black text-gray-800 mb-3 flex items-center gap-3 justify-center">
                  <Trophy className="text-yellow-500" size={40} />
                  <span>בדיקת ידע! 🎯</span>
                </h2>
                <p className="text-gray-600 text-lg">בואו נראה כמה למדת...</p>
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 mt-3 inline-block">
                  <p className="text-sm font-bold text-gray-700">⚠️ שים לב: כל תשובה שגויה = -3 נקודות!</p>
                </div>
                {perfectQuizStreak > 0 && (
                  <div className="mt-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-3 inline-block">
                    <p className="font-bold text-orange-600 flex items-center gap-2">
                      <Flame size={20} />
                      רצף מושלם: {perfectQuizStreak} קוויזים!
                    </p>
                  </div>
                )}
              </div>

              {!quizComplete ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={24} />
                        <span className="font-bold text-gray-700">
                          ענית על {quizAnswers.length} מתוך {selectedTopic.content.quiz.length} שאלות
                        </span>
                      </div>
                      <div className="bg-red-100 px-3 py-1 rounded-lg border-2 border-red-300">
                        <span className="text-red-700 font-bold text-sm">-3 נק' לטעות</span>
                      </div>
                    </div>
                  </div>

                  {selectedTopic.content.quiz.map((q: any, qIndex: number) => (
                    <div key={qIndex} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {qIndex + 1}. {q.question}
                      </h3>
                      <div className="space-y-3">
                        {q.options.map((option: string, oIndex: number) => (
                          <button
                            key={oIndex}
                            onClick={() => {
                              const newAnswers = [...quizAnswers];
                              newAnswers[qIndex] = oIndex;
                              setQuizAnswers(newAnswers);
                            }}
                            className={`w-full text-right p-4 rounded-xl font-semibold transition-all ${
                              quizAnswers[qIndex] === oIndex
                                ? 'bg-green-500 text-white scale-105'
                                : 'bg-white hover:bg-green-100 text-gray-700'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={submitQuiz}
                    disabled={quizAnswers.length !== selectedTopic.content.quiz.length}
                    className={`w-full py-5 rounded-2xl font-black text-2xl transition-all ${
                      quizAnswers.length === selectedTopic.content.quiz.length
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-2xl transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    ✅ שלח תשובות
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-6 mb-8">
                    {selectedTopic.content.quiz.map((q: any, qIndex: number) => {
                      const isCorrect = quizAnswers[qIndex] === q.correct;
                      return (
                        <div key={qIndex} className={`rounded-2xl p-6 border-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                          <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                              <CheckCircle className="text-green-600 flex-shrink-0" size={28} />
                            ) : (
                              <span className="text-red-600 text-2xl">❌</span>
                            )}
                            <h3 className="text-lg font-bold text-gray-800">
                              {qIndex + 1}. {q.question}
                            </h3>
                          </div>
                          <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? '✅ נכון!' : '❌ לא נכון'}
                          </p>
                          <p className="text-gray-700 bg-white rounded-lg p-3">
                            <span className="font-bold">הסבר: </span>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 mb-6">
                    <p className="text-5xl mb-3">
                      {quizAnswers.filter((a, i) => a === selectedTopic.content.quiz[i].correct).length === selectedTopic.content.quiz.length ? '🎉' : '💪'}
                    </p>
                    <p className="text-3xl font-black text-gray-800 mb-2">
                      ענית נכון על {quizAnswers.filter((a, i) => a === selectedTopic.content.quiz[i].correct).length} מתוך {selectedTopic.content.quiz.length}
                    </p>
                    
                    {(() => {
                      const correct = quizAnswers.filter((a, i) => a === selectedTopic.content.quiz[i].correct).length;
                      const wrong = selectedTopic.content.quiz.length - correct;
                      const pointsLost = wrong * 3;
                      
                      if (correct === selectedTopic.content.quiz.length) {
                        return (
                          <div className="bg-green-100 rounded-xl p-4 mt-4 border-2 border-green-400">
                            <p className="text-xl font-black text-green-700 mb-1">מושלם! 🏆</p>
                            <p className="text-green-600">קיבלת את כל הנקודות על הנושא!</p>
                          </div>
                        );
                      } else {
                        return (
                          <div className="bg-red-100 rounded-xl p-4 mt-4 border-2 border-red-400">
                            <p className="text-xl font-black text-red-700 mb-1">⚠️ הפסדת נקודות!</p>
                            <p className="text-red-600">{wrong} תשובות שגויות = -{pointsLost} נקודות</p>
                            <p className="text-gray-600 text-sm mt-2">💡 כל טעות = -3 נקודות</p>
                          </div>
                        );
                      }
                    })()}
                    
                    <p className="text-xl text-gray-600 mt-3">
                      {quizAnswers.filter((a, i) => a === selectedTopic.content.quiz[i].correct).length === selectedTopic.content.quiz.length
                        ? 'אתה גאון! 🏆'
                        : 'תנסה שוב בפעם הבאה! 📚'}
                    </p>
                  </div>

                  <button
                    onClick={backToDashboard}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-2xl font-black text-2xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    🚀 בואו לנושא הבא!
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}


