\# # Discount Academy - Technical Documentation



\## Project Overview



\*\*Discount Academy\*\* is an interactive financial literacy platform designed for teenagers, branded for Discount Bank. The application gamifies financial education through topics, quizzes, achievements, and rewards.



\## Table of Contents



1\. \[Core Features](#core-features)

2\. \[Technical Architecture](#technical-architecture)

3\. \[Data Structures](#data-structures)

4\. \[State Management](#state-management)

5\. \[User Flow](#user-flow)

6\. \[Points System Logic](#points-system-logic)

7\. \[Achievement System](#achievement-system)

8\. \[Rewards Store](#rewards-store)

9\. \[UI/UX Design Principles](#uiux-design-principles)

10\. \[Future Enhancements](#future-enhancements)



---



\## Core Features



\### 1. Learning Topics

\- \*\*3 Financial Topics\*\* covering:

&nbsp; - Bank accounts and overdrafts

&nbsp; - Savings and compound interest

&nbsp; - Online shopping safety

\- Each topic includes:

&nbsp; - Educational content with stories and tips

&nbsp; - Interactive quizzes (2-3 questions per topic)

&nbsp; - Point rewards upon completion



\### 2. Gamification

\- \*\*Points System\*\*: Earn points by completing topics and quizzes

\- \*\*Levels\*\*: Automatic level progression based on points (20 points per level)

\- \*\*Achievements\*\*: 7 unique badges for various milestones

\- \*\*Streak Tracking\*\*: Monitor perfect quiz performance



\### 3. Rewards Store

\- \*\*5 Real Rewards\*\* from Discount Bank:

&nbsp; - Coffee voucher (50 points)

&nbsp; - Movie ticket (100 points)

&nbsp; - Spotify Premium (150 points)

&nbsp; - Pizza (250 points)

&nbsp; - PlayStation gift card (350 points)



\### 4. Penalty System

\- \*\*-3 points\*\* for each incorrect quiz answer

\- Encourages careful learning and thoughtful responses



---



\## Technical Architecture



\### Technology Stack

\- \*\*Framework\*\*: React 18+ with Hooks

\- \*\*Language\*\*: JavaScript/JSX

\- \*\*Styling\*\*: Tailwind CSS (utility-first)

\- \*\*Icons\*\*: Lucide React

\- \*\*State Management\*\*: React useState hooks (local state)



\### Component Structure



```

DiscountAcademyApp (Root)

├── Login Screen

├── Dashboard Screen

│   ├── User Profile Header

│   ├── Progress Tracker

│   ├── Achievements Display

│   ├── Topics Grid

│   └── Rewards Store

└── Learning Screen

&nbsp;   ├── Topic Content

&nbsp;   ├── Quiz Interface

&nbsp;   └── Results Display

```



---



\## Data Structures



\### 1. ACHIEVEMENTS Array

```javascript

\[

&nbsp; {

&nbsp;   id: string,           // Unique identifier

&nbsp;   title: string,        // Achievement name (Hebrew)

&nbsp;   icon: string,         // Emoji icon

&nbsp;   desc: string,         // Description (Hebrew)

&nbsp;   points: number        // Bonus points awarded

&nbsp; }

]

```



\*\*Available Achievements:\*\*

\- `first\_topic`: Complete first topic (+5 points)

\- `five\_topics`: Complete 5 topics (+10 points)

\- `all\_basic`: Complete all basic topics (+20 points)

\- `savings\_master`: Complete all savings topics (+20 points)

\- `advanced\_master`: Complete all advanced topics (+30 points)

\- `quiz\_perfect`: Get 100% on a quiz (+15 points)

\- `quiz\_streak\_3`: Get 3 perfect quizzes in a row (+20 points)



\### 2. REWARDS Array

```javascript

\[

&nbsp; {

&nbsp;   id: string,           // Unique identifier

&nbsp;   name: string,         // Reward name (Hebrew)

&nbsp;   description: string,  // Reward details (Hebrew)

&nbsp;   points: number,       // Cost in points

&nbsp;   icon: JSX.Element,    // React icon component

&nbsp;   color: string,        // Gradient classes

&nbsp;   bgColor: string,      // Background color class

&nbsp;   category: string      // Category (Hebrew)

&nbsp; }

]

```



\### 3. TOPICS Array

```javascript

\[

&nbsp; {

&nbsp;   id: number,

&nbsp;   title: string,

&nbsp;   icon: JSX.Element,

&nbsp;   color: string,        // Gradient for styling

&nbsp;   bgColor: string,

&nbsp;   category: string,     // 'בסיסי' | 'חיסכון' | 'מתקדם'

&nbsp;   points: number,       // Base points for completion

&nbsp;   duration: string,     // Estimated time

&nbsp;   content: {

&nbsp;     intro: string,

&nbsp;     sections: \[

&nbsp;       {

&nbsp;         title: string,

&nbsp;         type: string,   // 'story' | 'tips' | 'calculation'

&nbsp;         icon: string,

&nbsp;         text?: string,  // For 'story' type

&nbsp;         items?: \[]      // For 'tips' and 'calculation'

&nbsp;       }

&nbsp;     ],

&nbsp;     quiz: \[

&nbsp;       {

&nbsp;         question: string,

&nbsp;         options: string\[],

&nbsp;         correct: number,    // Index of correct answer

&nbsp;         explanation: string

&nbsp;       }

&nbsp;     ]

&nbsp;   }

&nbsp; }

]

```



---



\## State Management



\### Application State



```javascript

// Screen Navigation

const \[currentScreen, setCurrentScreen] = useState('login')

// Values: 'login' | 'dashboard' | 'learning'



// User Data

const \[user, setUser] = useState(null)

// Object: { name: string }



const \[username, setUsername] = useState('')



// Learning Progress

const \[selectedTopic, setSelectedTopic] = useState(null)

const \[studiedTopics, setStudiedTopics] = useState(\[])

// Array of topic IDs that have been completed



// Gamification

const \[points, setPoints] = useState(0)

const \[level, setLevel] = useState(1)

const \[achievements, setAchievements] = useState(\[])

// Array of achievement IDs that have been unlocked



// Quiz State

const \[showQuiz, setShowQuiz] = useState(false)

const \[quizAnswers, setQuizAnswers] = useState(\[])

// Array of selected answer indices

const \[quizComplete, setQuizComplete] = useState(false)



// Statistics

const \[perfectQuizStreak, setPerfectQuizStreak] = useState(0)

const \[totalQuizzesTaken, setTotalQuizzesTaken] = useState(0)



// Rewards

const \[purchasedRewards, setPurchasedRewards] = useState(\[])

// Array of purchased reward objects with purchaseDate

const \[showRewardsStore, setShowRewardsStore] = useState(false)

```



---



\## User Flow



\### 1. Login Flow

```

User enters name → Validation (non-empty) → Set user state → Navigate to dashboard

```



\### 2. Learning Flow

```

Select topic → View content → Click "Complete" → Take quiz → Submit answers → 

View results → Calculate points → Update achievements → Return to dashboard

```



\### 3. Rewards Flow

```

View rewards store → Check point balance → Select reward → 

Validate sufficient points → Deduct points → Add to purchased rewards

```



---



\## Points System Logic



\### Earning Points



\#### 1. Topic Completion

```javascript

// Base points from topic

earnedPoints = selectedTopic.points



// Example: Basic topic = 5 points, Advanced topic = 10 points

```



\#### 2. Achievement Bonuses

```javascript

// Automatically triggered when conditions are met

if (newStudied.length === 1) {

&nbsp; earnedPoints += 5  // First topic achievement

}



if (newStudied.length === 5) {

&nbsp; earnedPoints += 10  // Five topics achievement

}



// Category completion

if (allBasicTopicsCompleted) {

&nbsp; earnedPoints += 20

}

```



\#### 3. Quiz Performance

```javascript

// Perfect quiz (100% correct)

if (percentage === 100) {

&nbsp; points += 15  // Quiz perfect achievement

&nbsp; 

&nbsp; // Streak bonus

&nbsp; if (perfectQuizStreak >= 3) {

&nbsp;   points += 20  // Three perfect quizzes in a row

&nbsp; }

}

```



\### Losing Points



\#### Quiz Penalties

```javascript

// Calculate wrong answers

const wrongAnswers = totalQuestions - correctAnswers



// Deduct 3 points per wrong answer

const pointsToDeduct = wrongAnswers \* 3



// Apply penalty (cannot go below 0)

setPoints(prev => Math.max(0, prev - pointsToDeduct))

```



\### Level Calculation

```javascript

// Automatic level progression

const newLevel = Math.floor(points / 20) + 1



// Examples:

// 0-19 points = Level 1

// 20-39 points = Level 2

// 40-59 points = Level 3

// etc.

```



---



\## Achievement System



\### Achievement Triggers



\#### Progress-Based Achievements

```javascript

// Check after each topic completion

if (studiedTopics.length === 1 \&\& !achievements.includes('first\_topic')) {

&nbsp; unlockAchievement('first\_topic', 5)

}



if (studiedTopics.length === 5 \&\& !achievements.includes('five\_topics')) {

&nbsp; unlockAchievement('five\_topics', 10)

}

```



\#### Category-Based Achievements

```javascript

// Check if all topics in a category are completed

const basicTopics = TOPICS.filter(t => t.category === 'בסיסי')

const hasAllBasic = basicTopics.every(id => studiedTopics.includes(id))



if (hasAllBasic \&\& !achievements.includes('all\_basic')) {

&nbsp; unlockAchievement('all\_basic', 20)

}

```



\#### Performance-Based Achievements

```javascript

// Perfect quiz

if (correctAnswers === totalQuestions) {

&nbsp; if (!achievements.includes('quiz\_perfect')) {

&nbsp;   unlockAchievement('quiz\_perfect', 15)

&nbsp; }

&nbsp; 

&nbsp; // Update streak

&nbsp; const newStreak = perfectQuizStreak + 1

&nbsp; 

&nbsp; // Streak achievement

&nbsp; if (newStreak >= 3 \&\& !achievements.includes('quiz\_streak\_3')) {

&nbsp;   unlockAchievement('quiz\_streak\_3', 20)

&nbsp; }

} else {

&nbsp; // Reset streak on failure

&nbsp; setPerfectQuizStreak(0)

}

```



\### Achievement Display Logic

```javascript

// Filter earned achievements

const earnedAchievements = ACHIEVEMENTS.filter(

&nbsp; achievement => achievements.includes(achievement.id)

)



// Display count: X/7 achievements

```



---



\## Rewards Store



\### Purchase Validation

```javascript

const canAfford = points >= reward.points

const alreadyPurchased = purchasedRewards.some(p => p.id === reward.id)



// Button states:

// 1. Already purchased → Show "✓ נרכש בהצלחה"

// 2. Can afford → Show "קנה עכשיו" (enabled)

// 3. Cannot afford → Show "🔒 לא מספיק נקודות" (disabled)

```



\### Purchase Logic

```javascript

function purchaseReward(reward) {

&nbsp; if (points >= reward.points) {

&nbsp;   // Deduct points

&nbsp;   setPoints(prev => prev - reward.points)

&nbsp;   

&nbsp;   // Add to purchased rewards with timestamp

&nbsp;   setPurchasedRewards(prev => \[

&nbsp;     ...prev, 

&nbsp;     {

&nbsp;       ...reward,

&nbsp;       purchaseDate: new Date().toLocaleDateString('he-IL')

&nbsp;     }

&nbsp;   ])

&nbsp; }

}

```



\### Reward Categories

\- \*\*אוכל\*\* (Food): Coffee, Pizza

\- \*\*בילויים\*\* (Entertainment): Cinema, Concerts

\- \*\*דיגיטלי\*\* (Digital): Spotify, PlayStation

\- \*\*קניות\*\* (Shopping): Gift cards

\- \*\*בנקאות\*\* (Banking): Fee waivers



---



\## UI/UX Design Principles



\### Color Scheme

\- \*\*Primary\*\*: Green shades (`from-green-600 to-emerald-600`)

&nbsp; - Represents Discount Bank branding

\- \*\*Accent\*\*: Yellow/Orange for rewards and highlights

\- \*\*Status Colors\*\*:

&nbsp; - Green: Success, completed, correct

&nbsp; - Red: Error, incorrect answers

&nbsp; - Blue: Information, progress



\### Design Patterns



\#### 1. Card-Based Layout

```jsx

// All major elements use rounded cards with shadows

className="bg-white rounded-3xl p-8 shadow-2xl"

```



\#### 2. Gradient Backgrounds

```jsx

// Headers and important elements use gradients

className="bg-gradient-to-r from-green-600 to-emerald-600"

```



\#### 3. Interactive Feedback

```jsx

// Hover effects on interactive elements

className="hover:scale-105 transition-all"

```



\#### 4. Visual Hierarchy

\- Large text for important information (3xl-5xl)

\- Icons paired with text for clarity

\- Consistent spacing with Tailwind's spacing scale



\### Responsive Design

```jsx

// Grid layouts adapt to screen size

className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

```



\### Accessibility

\- Right-to-left (RTL) layout for Hebrew text

\- Clear visual indicators for completed items

\- Disabled states for unavailable actions

\- Color + icon combinations (not color alone)



---



\## Future Enhancements



\### Phase 2 Features

1\. \*\*Expanded Content\*\*

&nbsp;  - Add 7 more topics (total of 10)

&nbsp;  - Include advanced topics: Crypto, Budgeting, First Job

&nbsp;  - Video content integration



2\. \*\*Enhanced Gamification\*\*

&nbsp;  - Leaderboards (compare with friends)

&nbsp;  - Daily challenges

&nbsp;  - Seasonal events

&nbsp;  - More achievement types (time-based, social)



3\. \*\*Social Features\*\*

&nbsp;  - Share achievements on social media

&nbsp;  - Challenge friends to quizzes

&nbsp;  - Group learning sessions



4\. \*\*Progress Tracking\*\*

&nbsp;  - Detailed analytics dashboard

&nbsp;  - Learning time tracking

&nbsp;  - Topic difficulty ratings

&nbsp;  - Personalized recommendations



5\. \*\*Rewards System\*\*

&nbsp;  - More reward options (15-20 total)

&nbsp;  - Partner integrations (restaurants, stores)

&nbsp;  - Digital wallet for virtual rewards

&nbsp;  - Reward expiration dates



\### Technical Improvements

1\. \*\*Backend Integration\*\*

&nbsp;  - User authentication and profiles

&nbsp;  - Data persistence (database)

&nbsp;  - API for content management

&nbsp;  - Real-time leaderboards



2\. \*\*State Management\*\*

&nbsp;  - Migrate to Redux or Zustand for complex state

&nbsp;  - Implement persistent storage (localStorage/sessionStorage alternatives)

&nbsp;  - Add state recovery after page refresh



3\. \*\*Testing\*\*

&nbsp;  - Unit tests for core logic

&nbsp;  - Integration tests for user flows

&nbsp;  - E2E tests with Cypress/Playwright



4\. \*\*Performance\*\*

&nbsp;  - Code splitting and lazy loading

&nbsp;  - Image optimization

&nbsp;  - Caching strategies



5\. \*\*Accessibility\*\*

&nbsp;  - WCAG 2.1 AA compliance

&nbsp;  - Screen reader optimization

&nbsp;  - Keyboard navigation support



\### Content Expansion

```

Current: 3 topics

Phase 2: 10 topics



Categories:

\- Basic (2 topics): Bank accounts, Credit cards

\- Savings (3 topics): Savings basics, First car, Investments

\- Advanced (5 topics): First job, Online shopping, Scams, Crypto, Budgeting

```



---



\## API Specifications (Future)



\### Authentication

```

POST /api/auth/login

Body: { username: string, password: string }

Response: { token: string, user: User }

```



\### User Progress

```

GET /api/user/progress

Response: {

&nbsp; studiedTopics: number\[],

&nbsp; points: number,

&nbsp; level: number,

&nbsp; achievements: string\[],

&nbsp; purchasedRewards: Reward\[]

}



POST /api/user/complete-topic

Body: { topicId: number }

Response: { points: number, newAchievements: string\[] }

```



\### Quiz Submission

```

POST /api/quiz/submit

Body: { topicId: number, answers: number\[] }

Response: {

&nbsp; correct: number,

&nbsp; total: number,

&nbsp; pointsEarned: number,

&nbsp; pointsDeducted: number,

&nbsp; newAchievements: string\[]

}

```



\### Rewards

```

GET /api/rewards

Response: Reward\[]



POST /api/rewards/purchase

Body: { rewardId: string }

Response: { success: boolean, remainingPoints: number }

```



---



\## Development Guidelines



\### Code Style

\- Use functional components with hooks

\- Keep components under 300 lines

\- Extract reusable logic into custom hooks

\- Use descriptive variable names

\- Add comments for complex logic



\### File Structure

```

src/

├── components/

│   ├── LoginScreen.jsx

│   ├── Dashboard.jsx

│   ├── LearningScreen.jsx

│   ├── RewardsStore.jsx

│   └── common/

│       ├── TopicCard.jsx

│       ├── AchievementBadge.jsx

│       └── QuizQuestion.jsx

├── data/

│   ├── achievements.js

│   ├── rewards.js

│   └── topics.js

├── hooks/

│   ├── usePoints.js

│   ├── useAchievements.js

│   └── useQuiz.js

├── utils/

│   ├── calculations.js

│   └── validation.js

└── App.jsx

```



\### Git Workflow

```

main (production)

├── develop (staging)

&nbsp;   ├── feature/topic-expansion

&nbsp;   ├── feature/rewards-store

&nbsp;   └── bugfix/quiz-validation

```



\### Environment Variables

```

VITE\_API\_URL=https://api.discount-academy.com

VITE\_ENV=production

VITE\_ENABLE\_ANALYTICS=true

```



---



\## Deployment Checklist



\- \[ ] Run build: `npm run build`

\- \[ ] Test production build locally

\- \[ ] Update environment variables

\- \[ ] Run tests: `npm test`

\- \[ ] Check bundle size

\- \[ ] Verify RTL layout

\- \[ ] Test on mobile devices

\- \[ ] Validate accessibility

\- \[ ] Update documentation

\- \[ ] Tag release in Git



---



\## Support and Maintenance



\### Monitoring

\- Track user engagement metrics

\- Monitor quiz completion rates

\- Analyze reward redemption patterns

\- Identify drop-off points in user flow



\### Bug Reporting

Users should report issues including:

\- Device and browser information

\- Steps to reproduce

\- Expected vs actual behavior

\- Screenshots if applicable



\### Update Schedule

\- Minor updates: Weekly

\- Major features: Monthly

\- Security patches: As needed

\- Content updates: Bi-weekly



---



\## License and Credits



\*\*Developed for\*\*: Discount Bank Israel  

\*\*Target Audience\*\*: Teenagers (ages 13-18)  

\*\*Language\*\*: Hebrew (RTL)  

\*\*Framework\*\*: React + Tailwind CSS  

\*\*Icons\*\*: Lucide React  



---



\## Contact



For technical questions or contributions:

\- \*\*Development Team\*\*: dev@discount-academy.com

\- \*\*Content Team\*\*: content@discount-academy.com

\- \*\*Support\*\*: support@discount-academy.com



---



\*\*Document Version\*\*: 1.0  

\*\*Last Updated\*\*: 2025  

\*\*Status\*\*: Production ReadyDiscount Academy - Technical Documentation



\## Project Overview



\*\*Discount Academy\*\* is an interactive financial literacy platform designed for teenagers, branded for Discount Bank. The application gamifies financial education through topics, quizzes, achievements, and rewards.



\## Table of Contents



1\. \[Core Features](#core-features)

2\. \[Technical Architecture](#technical-architecture)

3\. \[Data Structures](#data-structures)

4\. \[State Management](#state-management)

5\. \[User Flow](#user-flow)

6\. \[Points System Logic](#points-system-logic)

7\. \[Achievement System](#achievement-system)

8\. \[Rewards Store](#rewards-store)

9\. \[UI/UX Design Principles](#uiux-design-principles)

10\. \[Future Enhancements](#future-enhancements)



---



\## Core Features



\### 1. Learning Topics

\- \*\*3 Financial Topics\*\* covering:

&nbsp; - Bank accounts and overdrafts

&nbsp; - Savings and compound interest

&nbsp; - Online shopping safety

\- Each topic includes:

&nbsp; - Educational content with stories and tips

&nbsp; - Interactive quizzes (2-3 questions per topic)

&nbsp; - Point rewards upon completion



\### 2. Gamification

\- \*\*Points System\*\*: Earn points by completing topics and quizzes

\- \*\*Levels\*\*: Automatic level progression based on points (20 points per level)

\- \*\*Achievements\*\*: 7 unique badges for various milestones

\- \*\*Streak Tracking\*\*: Monitor perfect quiz performance



\### 3. Rewards Store

\- \*\*5 Real Rewards\*\* from Discount Bank:

&nbsp; - Coffee voucher (50 points)

&nbsp; - Movie ticket (100 points)

&nbsp; - Spotify Premium (150 points)

&nbsp; - Pizza (250 points)

&nbsp; - PlayStation gift card (350 points)



\### 4. Penalty System

\- \*\*-3 points\*\* for each incorrect quiz answer

\- Encourages careful learning and thoughtful responses



---



\## Technical Architecture



\### Technology Stack

\- \*\*Framework\*\*: React 18+ with Hooks

\- \*\*Language\*\*: JavaScript/JSX

\- \*\*Styling\*\*: Tailwind CSS (utility-first)

\- \*\*Icons\*\*: Lucide React

\- \*\*State Management\*\*: React useState hooks (local state)



\### Component Structure



```

DiscountAcademyApp (Root)

├── Login Screen

├── Dashboard Screen

│   ├── User Profile Header

│   ├── Progress Tracker

│   ├── Achievements Display

│   ├── Topics Grid

│   └── Rewards Store

└── Learning Screen

&nbsp;   ├── Topic Content

&nbsp;   ├── Quiz Interface

&nbsp;   └── Results Display

```



---



\## Data Structures



\### 1. ACHIEVEMENTS Array

```javascript

\[

&nbsp; {

&nbsp;   id: string,           // Unique identifier

&nbsp;   title: string,        // Achievement name (Hebrew)

&nbsp;   icon: string,         // Emoji icon

&nbsp;   desc: string,         // Description (Hebrew)

&nbsp;   points: number        // Bonus points awarded

&nbsp; }

]

```



\*\*Available Achievements:\*\*

\- `first\_topic`: Complete first topic (+5 points)

\- `five\_topics`: Complete 5 topics (+10 points)

\- `all\_basic`: Complete all basic topics (+20 points)

\- `savings\_master`: Complete all savings topics (+20 points)

\- `advanced\_master`: Complete all advanced topics (+30 points)

\- `quiz\_perfect`: Get 100% on a quiz (+15 points)

\- `quiz\_streak\_3`: Get 3 perfect quizzes in a row (+20 points)



\### 2. REWARDS Array

```javascript

\[

&nbsp; {

&nbsp;   id: string,           // Unique identifier

&nbsp;   name: string,         // Reward name (Hebrew)

&nbsp;   description: string,  // Reward details (Hebrew)

&nbsp;   points: number,       // Cost in points

&nbsp;   icon: JSX.Element,    // React icon component

&nbsp;   color: string,        // Gradient classes

&nbsp;   bgColor: string,      // Background color class

&nbsp;   category: string      // Category (Hebrew)

&nbsp; }

]

```



\### 3. TOPICS Array

```javascript

\[

&nbsp; {

&nbsp;   id: number,

&nbsp;   title: string,

&nbsp;   icon: JSX.Element,

&nbsp;   color: string,        // Gradient for styling

&nbsp;   bgColor: string,

&nbsp;   category: string,     // 'בסיסי' | 'חיסכון' | 'מתקדם'

&nbsp;   points: number,       // Base points for completion

&nbsp;   duration: string,     // Estimated time

&nbsp;   content: {

&nbsp;     intro: string,

&nbsp;     sections: \[

&nbsp;       {

&nbsp;         title: string,

&nbsp;         type: string,   // 'story' | 'tips' | 'calculation'

&nbsp;         icon: string,

&nbsp;         text?: string,  // For 'story' type

&nbsp;         items?: \[]      // For 'tips' and 'calculation'

&nbsp;       }

&nbsp;     ],

&nbsp;     quiz: \[

&nbsp;       {

&nbsp;         question: string,

&nbsp;         options: string\[],

&nbsp;         correct: number,    // Index of correct answer

&nbsp;         explanation: string

&nbsp;       }

&nbsp;     ]

&nbsp;   }

&nbsp; }

]

```



---



\## State Management



\### Application State



```javascript

// Screen Navigation

const \[currentScreen, setCurrentScreen] = useState('login')

// Values: 'login' | 'dashboard' | 'learning'



// User Data

const \[user, setUser] = useState(null)

// Object: { name: string }



const \[username, setUsername] = useState('')



// Learning Progress

const \[selectedTopic, setSelectedTopic] = useState(null)

const \[studiedTopics, setStudiedTopics] = useState(\[])

// Array of topic IDs that have been completed



// Gamification

const \[points, setPoints] = useState(0)

const \[level, setLevel] = useState(1)

const \[achievements, setAchievements] = useState(\[])

// Array of achievement IDs that have been unlocked



// Quiz State

const \[showQuiz, setShowQuiz] = useState(false)

const \[quizAnswers, setQuizAnswers] = useState(\[])

// Array of selected answer indices

const \[quizComplete, setQuizComplete] = useState(false)



// Statistics

const \[perfectQuizStreak, setPerfectQuizStreak] = useState(0)

const \[totalQuizzesTaken, setTotalQuizzesTaken] = useState(0)



// Rewards

const \[purchasedRewards, setPurchasedRewards] = useState(\[])

// Array of purchased reward objects with purchaseDate

const \[showRewardsStore, setShowRewardsStore] = useState(false)

```



---



\## User Flow



\### 1. Login Flow

```

User enters name → Validation (non-empty) → Set user state → Navigate to dashboard

```



\### 2. Learning Flow

```

Select topic → View content → Click "Complete" → Take quiz → Submit answers → 

View results → Calculate points → Update achievements → Return to dashboard

```



\### 3. Rewards Flow

```

View rewards store → Check point balance → Select reward → 

Validate sufficient points → Deduct points → Add to purchased rewards

```



---



\## Points System Logic



\### Earning Points



\#### 1. Topic Completion

```javascript

// Base points from topic

earnedPoints = selectedTopic.points



// Example: Basic topic = 5 points, Advanced topic = 10 points

```



\#### 2. Achievement Bonuses

```javascript

// Automatically triggered when conditions are met

if (newStudied.length === 1) {

&nbsp; earnedPoints += 5  // First topic achievement

}



if (newStudied.length === 5) {

&nbsp; earnedPoints += 10  // Five topics achievement

}



// Category completion

if (allBasicTopicsCompleted) {

&nbsp; earnedPoints += 20

}

```



\#### 3. Quiz Performance

```javascript

// Perfect quiz (100% correct)

if (percentage === 100) {

&nbsp; points += 15  // Quiz perfect achievement

&nbsp; 

&nbsp; // Streak bonus

&nbsp; if (perfectQuizStreak >= 3) {

&nbsp;   points += 20  // Three perfect quizzes in a row

&nbsp; }

}

```



\### Losing Points



\#### Quiz Penalties

```javascript

// Calculate wrong answers

const wrongAnswers = totalQuestions - correctAnswers



// Deduct 3 points per wrong answer

const pointsToDeduct = wrongAnswers \* 3



// Apply penalty (cannot go below 0)

setPoints(prev => Math.max(0, prev - pointsToDeduct))

```



\### Level Calculation

```javascript

// Automatic level progression

const newLevel = Math.floor(points / 20) + 1



// Examples:

// 0-19 points = Level 1

// 20-39 points = Level 2

// 40-59 points = Level 3

// etc.

```



---



\## Achievement System



\### Achievement Triggers



\#### Progress-Based Achievements

```javascript

// Check after each topic completion

if (studiedTopics.length === 1 \&\& !achievements.includes('first\_topic')) {

&nbsp; unlockAchievement('first\_topic', 5)

}



if (studiedTopics.length === 5 \&\& !achievements.includes('five\_topics')) {

&nbsp; unlockAchievement('five\_topics', 10)

}

```



\#### Category-Based Achievements

```javascript

// Check if all topics in a category are completed

const basicTopics = TOPICS.filter(t => t.category === 'בסיסי')

const hasAllBasic = basicTopics.every(id => studiedTopics.includes(id))



if (hasAllBasic \&\& !achievements.includes('all\_basic')) {

&nbsp; unlockAchievement('all\_basic', 20)

}

```



\#### Performance-Based Achievements

```javascript

// Perfect quiz

if (correctAnswers === totalQuestions) {

&nbsp; if (!achievements.includes('quiz\_perfect')) {

&nbsp;   unlockAchievement('quiz\_perfect', 15)

&nbsp; }

&nbsp; 

&nbsp; // Update streak

&nbsp; const newStreak = perfectQuizStreak + 1

&nbsp; 

&nbsp; // Streak achievement

&nbsp; if (newStreak >= 3 \&\& !achievements.includes('quiz\_streak\_3')) {

&nbsp;   unlockAchievement('quiz\_streak\_3', 20)

&nbsp; }

} else {

&nbsp; // Reset streak on failure

&nbsp; setPerfectQuizStreak(0)

}

```



\### Achievement Display Logic

```javascript

// Filter earned achievements

const earnedAchievements = ACHIEVEMENTS.filter(

&nbsp; achievement => achievements.includes(achievement.id)

)



// Display count: X/7 achievements

```



---



\## Rewards Store



\### Purchase Validation

```javascript

const canAfford = points >= reward.points

const alreadyPurchased = purchasedRewards.some(p => p.id === reward.id)



// Button states:

// 1. Already purchased → Show "✓ נרכש בהצלחה"

// 2. Can afford → Show "קנה עכשיו" (enabled)

// 3. Cannot afford → Show "🔒 לא מספיק נקודות" (disabled)

```



\### Purchase Logic

```javascript

function purchaseReward(reward) {

&nbsp; if (points >= reward.points) {

&nbsp;   // Deduct points

&nbsp;   setPoints(prev => prev - reward.points)

&nbsp;   

&nbsp;   // Add to purchased rewards with timestamp

&nbsp;   setPurchasedRewards(prev => \[

&nbsp;     ...prev, 

&nbsp;     {

&nbsp;       ...reward,

&nbsp;       purchaseDate: new Date().toLocaleDateString('he-IL')

&nbsp;     }

&nbsp;   ])

&nbsp; }

}

```



\### Reward Categories

\- \*\*אוכל\*\* (Food): Coffee, Pizza

\- \*\*בילויים\*\* (Entertainment): Cinema, Concerts

\- \*\*דיגיטלי\*\* (Digital): Spotify, PlayStation

\- \*\*קניות\*\* (Shopping): Gift cards

\- \*\*בנקאות\*\* (Banking): Fee waivers



---



\## UI/UX Design Principles



\### Color Scheme

\- \*\*Primary\*\*: Green shades (`from-green-600 to-emerald-600`)

&nbsp; - Represents Discount Bank branding

\- \*\*Accent\*\*: Yellow/Orange for rewards and highlights

\- \*\*Status Colors\*\*:

&nbsp; - Green: Success, completed, correct

&nbsp; - Red: Error, incorrect answers

&nbsp; - Blue: Information, progress



\### Design Patterns



\#### 1. Card-Based Layout

```jsx

// All major elements use rounded cards with shadows

className="bg-white rounded-3xl p-8 shadow-2xl"

```



\#### 2. Gradient Backgrounds

```jsx

// Headers and important elements use gradients

className="bg-gradient-to-r from-green-600 to-emerald-600"

```



\#### 3. Interactive Feedback

```jsx

// Hover effects on interactive elements

className="hover:scale-105 transition-all"

```



\#### 4. Visual Hierarchy

\- Large text for important information (3xl-5xl)

\- Icons paired with text for clarity

\- Consistent spacing with Tailwind's spacing scale



\### Responsive Design

```jsx

// Grid layouts adapt to screen size

className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

```



\### Accessibility

\- Right-to-left (RTL) layout for Hebrew text

\- Clear visual indicators for completed items

\- Disabled states for unavailable actions

\- Color + icon combinations (not color alone)



---



\## Future Enhancements



\### Phase 2 Features

1\. \*\*Expanded Content\*\*

&nbsp;  - Add 7 more topics (total of 10)

&nbsp;  - Include advanced topics: Crypto, Budgeting, First Job

&nbsp;  - Video content integration



2\. \*\*Enhanced Gamification\*\*

&nbsp;  - Leaderboards (compare with friends)

&nbsp;  - Daily challenges

&nbsp;  - Seasonal events

&nbsp;  - More achievement types (time-based, social)



3\. \*\*Social Features\*\*

&nbsp;  - Share achievements on social media

&nbsp;  - Challenge friends to quizzes

&nbsp;  - Group learning sessions



4\. \*\*Progress Tracking\*\*

&nbsp;  - Detailed analytics dashboard

&nbsp;  - Learning time tracking

&nbsp;  - Topic difficulty ratings

&nbsp;  - Personalized recommendations



5\. \*\*Rewards System\*\*

&nbsp;  - More reward options (15-20 total)

&nbsp;  - Partner integrations (restaurants, stores)

&nbsp;  - Digital wallet for virtual rewards

&nbsp;  - Reward expiration dates



\### Technical Improvements

1\. \*\*Backend Integration\*\*

&nbsp;  - User authentication and profiles

&nbsp;  - Data persistence (database)

&nbsp;  - API for content management

&nbsp;  - Real-time leaderboards



2\. \*\*State Management\*\*

&nbsp;  - Migrate to Redux or Zustand for complex state

&nbsp;  - Implement persistent storage (localStorage/sessionStorage alternatives)

&nbsp;  - Add state recovery after page refresh



3\. \*\*Testing\*\*

&nbsp;  - Unit tests for core logic

&nbsp;  - Integration tests for user flows

&nbsp;  - E2E tests with Cypress/Playwright



4\. \*\*Performance\*\*

&nbsp;  - Code splitting and lazy loading

&nbsp;  - Image optimization

&nbsp;  - Caching strategies



5\. \*\*Accessibility\*\*

&nbsp;  - WCAG 2.1 AA compliance

&nbsp;  - Screen reader optimization

&nbsp;  - Keyboard navigation support



\### Content Expansion

```

Current: 3 topics

Phase 2: 10 topics



Categories:

\- Basic (2 topics): Bank accounts, Credit cards

\- Savings (3 topics): Savings basics, First car, Investments

\- Advanced (5 topics): First job, Online shopping, Scams, Crypto, Budgeting

```



---



\## API Specifications (Future)



\### Authentication

```

POST /api/auth/login

Body: { username: string, password: string }

Response: { token: string, user: User }

```



\### User Progress

```

GET /api/user/progress

Response: {

&nbsp; studiedTopics: number\[],

&nbsp; points: number,

&nbsp; level: number,

&nbsp; achievements: string\[],

&nbsp; purchasedRewards: Reward\[]

}



POST /api/user/complete-topic

Body: { topicId: number }

Response: { points: number, newAchievements: string\[] }

```



\### Quiz Submission

```

POST /api/quiz/submit

Body: { topicId: number, answers: number\[] }

Response: {

&nbsp; correct: number,

&nbsp; total: number,

&nbsp; pointsEarned: number,

&nbsp; pointsDeducted: number,

&nbsp; newAchievements: string\[]

}

```



\### Rewards

```

GET /api/rewards

Response: Reward\[]



POST /api/rewards/purchase

Body: { rewardId: string }

Response: { success: boolean, remainingPoints: number }

```



---



\## Development Guidelines



\### Code Style

\- Use functional components with hooks

\- Keep components under 300 lines

\- Extract reusable logic into custom hooks

\- Use descriptive variable names

\- Add comments for complex logic



\### File Structure

```

src/

├── components/

│   ├── LoginScreen.jsx

│   ├── Dashboard.jsx

│   ├── LearningScreen.jsx

│   ├── RewardsStore.jsx

│   └── common/

│       ├── TopicCard.jsx

│       ├── AchievementBadge.jsx

│       └── QuizQuestion.jsx

├── data/

│   ├── achievements.js

│   ├── rewards.js

│   └── topics.js

├── hooks/

│   ├── usePoints.js

│   ├── useAchievements.js

│   └── useQuiz.js

├── utils/

│   ├── calculations.js

│   └── validation.js

└── App.jsx

```



\### Git Workflow

```

main (production)

├── develop (staging)

&nbsp;   ├── feature/topic-expansion

&nbsp;   ├── feature/rewards-store

&nbsp;   └── bugfix/quiz-validation

```



\### Environment Variables

```

VITE\_API\_URL=https://api.discount-academy.com

VITE\_ENV=production

VITE\_ENABLE\_ANALYTICS=true

```



---



\## Deployment Checklist



\- \[ ] Run build: `npm run build`

\- \[ ] Test production build locally

\- \[ ] Update environment variables

\- \[ ] Run tests: `npm test`

\- \[ ] Check bundle size

\- \[ ] Verify RTL layout

\- \[ ] Test on mobile devices

\- \[ ] Validate accessibility

\- \[ ] Update documentation

\- \[ ] Tag release in Git



---



\## Support and Maintenance



\### Monitoring

\- Track user engagement metrics

\- Monitor quiz completion rates

\- Analyze reward redemption patterns

\- Identify drop-off points in user flow



\### Bug Reporting

Users should report issues including:

\- Device and browser information

\- Steps to reproduce

\- Expected vs actual behavior

\- Screenshots if applicable



\### Update Schedule

\- Minor updates: Weekly

\- Major features: Monthly

\- Security patches: As needed

\- Content updates: Bi-weekly



---



\## License and Credits



\*\*Developed for\*\*: Discount Bank Israel  

\*\*Target Audience\*\*: Teenagers (ages 13-18)  

\*\*Language\*\*: Hebrew (RTL)  

\*\*Framework\*\*: React + Tailwind CSS  

\*\*Icons\*\*: Lucide React  



---



\## Contact



For technical questions or contributions:

\- \*\*Development Team\*\*: dev@discount-academy.com

\- \*\*Content Team\*\*: content@discount-academy.com

\- \*\*Support\*\*: support@discount-academy.com



---



\*\*Document Version\*\*: 1.0  

\*\*Last Updated\*\*: 2025  

\*\*Status\*\*: Production Ready

