import React, { useState, useEffect } from 'react';
import { Trophy, Home, User, LogOut, GraduationCap, TrendingUp, CreditCard, FileText, PiggyBank, LineChart, Building, Shield, Smartphone, Lock, DollarSign, Users, Calculator, CheckCircle, Star, Zap, Award, Target, BookOpen, Gift, Flame, BarChart3, Clock, Brain, Sparkles, ShoppingBag, Ticket, Coffee, Film, Plane, Percent, Music, Gamepad2, Pizza } from 'lucide-react';

// תגי הישגים מורחבים
const ACHIEVEMENTS = [
  { id: 'first_topic', title: 'צעד ראשון!', icon: '🎯', desc: 'סיימת נושא ראשון', points: 5 },
  { id: 'five_topics', title: 'בדרך לפסגה', icon: '🚀', desc: 'סיימת 5 נושאים', points: 10 },
  { id: 'all_basic', title: 'מומחה בסיס', icon: '💪', desc: 'סיימת כל הנושאים הבסיסיים', points: 20 },
  { id: 'savings_master', title: 'מלך החיסכון', icon: '👑', desc: 'סיימת כל נושאי החיסכון', points: 20 },
  { id: 'advanced_master', title: 'שחקן מתקדם', icon: '🎖️', desc: 'סיימת כל הנושאים המתקדמים', points: 30 },
  { id: 'quiz_perfect', title: 'גאון פיננסי', icon: '🧠', desc: 'קיבלת 100% בקוויז', points: 15 },
  { id: 'quiz_streak_3', title: 'רצף מושלם!', icon: '🔥', desc: '3 קוויזים מושלמים ברצף', points: 20 },
  { id: 'speed_learner', title: 'לומד מהיר', icon: '⚡', desc: 'סיימת 3 נושאים בפחות משעה', points: 15 },
  { id: 'night_owl', title: 'ינשוף לילה', icon: '🦉', desc: 'למדת אחרי חצות', points: 5 },
  { id: 'early_bird', title: 'ציפור שחר', icon: '🐦', desc: 'למדת לפני 7 בבוקר', points: 5 },
  { id: 'level_5', title: 'רמה 5', icon: '⭐', desc: 'הגעת לרמה 5', points: 25 },
  { id: 'level_10', title: 'רמה 10', icon: '💫', desc: 'הגעת לרמה 10', points: 50 },
  { id: 'completionist', title: 'המשלים', icon: '🏆', desc: 'סיימת את כל הנושאים!', points: 50 },
  { id: 'perfect_student', title: 'תלמיד מצטיין', icon: '🌟', desc: '100% בכל הקוויזים', points: 100 }
];

// הטבות מבנק דיסקונט
const REWARDS = [
  { 
    id: 'coffee', 
    name: 'קפה חינם ☕', 
    description: 'קופון לקפה חינם בקפה גרג', 
    points: 50, 
    icon: <Coffee size={32} />,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    category: 'אוכל'
  },
  { 
    id: 'pizza', 
    name: 'פיצה משפחתית 🍕', 
    description: 'פיצה משפחתית מדומינוס', 
    points: 250, 
    icon: <Pizza size={32} />,
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50',
    category: 'אוכל'
  },
  { 
    id: 'cinema', 
    name: 'כרטיס לקולנוע 🎬', 
    description: 'כרטיס לסרט בסינמה סיטי', 
    points: 100, 
    icon: <Film size={32} />,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    category: 'בילויים'
  },
  { 
    id: 'game', 
    name: 'משחק PlayStation 🎮', 
    description: 'גיפט קארד של ₪150 ל-PlayStation Store', 
    points: 350, 
    icon: <Gamepad2 size={32} />,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    category: 'דיגיטלי'
  },
  { 
    id: 'spotify', 
    name: 'Spotify Premium 🎵', 
    description: 'חודש חינם של Spotify Premium', 
    points: 150, 
    icon: <Music size={32} />,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    category: 'דיגיטלי'
  },
  { 
    id: 'shopping', 
    name: 'קופון קניות 🛍️', 
    description: '10% הנחה באיקאה', 
    points: 200, 
    icon: <ShoppingBag size={32} />,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    category: 'קניות'
  },
  { 
    id: 'fee_waiver', 
    name: 'פטור מעמלה 💳', 
    description: 'פטור מעמלת ניהול חשבון לחודש', 
    points: 75, 
    icon: <Percent size={32} />,
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-green-50',
    category: 'בנקאות'
  },
  { 
    id: 'travel', 
    name: 'הנחה על טיסות ✈️', 
    description: '₪200 הנחה על טיסות לחו"ל', 
    points: 550, 
    icon: <Plane size={32} />,
    color: 'from-sky-500 to-blue-500',
    bgColor: 'bg-sky-50',
    category: 'נסיעות'
  },
  { 
    id: 'concert', 
    name: 'כרטיס לקונצרט 🎤', 
    description: 'כרטיס לקונצרט או הופעה', 
    points: 300, 
    icon: <Ticket size={32} />,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    category: 'בילויים'
  },
  { 
    id: 'giftcard', 
    name: 'גיפט קארד ₪100 🎁', 
    description: 'גיפט קארד לרשת אופנה מובילה', 
    points: 175, 
    icon: <Gift size={32} />,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    category: 'קניות'
  }
];

// נושאי לימוד מורחבים - 10 נושאים
const TOPICS = [
  {
    id: 1,
    title: 'חשבון בנק - הבסיס',
    icon: <CreditCard size={18} />,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    category: 'בסיסי',
    points: 5,
    duration: '5 דקות',
    content: {
      intro: '💳 חשבון הבנק זה כמו הארנק הדיגיטלי שלך - רק הרבה יותר חזק! בואו נלמד איך להשתמש בו בחכמה.',
      sections: [
        {
          title: 'תסריט חיים אמיתי',
          type: 'story',
          icon: '🎬',
          text: 'יוסי בן 17 רוצה לקנות פלייסטיישן 5 (₪2,500). יש לו ₪1,800 בחשבון. האם כדאי לו להיכנס למינוס?'
        },
        {
          title: 'מה קורה אם נכנסים למינוס?',
          type: 'explanation',
          icon: '⚠️',
          text: 'אם יש לך מסגרת של ₪1,000, אתה יכול להיות במינוס עד ₪1,000. אבל - זה עולה כסף! כל יום במינוס = ריבית. זה כמו לשלם דמי שכירות על כסף שלא שלך.'
        },
        {
          title: 'חישוב מהיר',
          type: 'calculation',
          icon: '🧮',
          items: [
            '💰 יש לך: ₪1,800',
            '🎮 רוצה לקנות: ₪2,500',
            '📊 חסר: ₪700',
            '⏰ במינוס חודש = ₪35 ריבית',
            '💡 פתרון חכם: חכה עוד חודש וחסוך!'
          ]
        },
        {
          title: 'טיפים חכמים',
          type: 'tips',
          icon: '💡',
          items: [
            '✅ תמיד בדוק יתרה לפני קניות גדולות',
            '✅ הפעל התראות SMS - חינם וחוסך כסף',
            '✅ מינוס = אויב שלך. תמיד נסה להישאר בפלוס!',
            '✅ אם אתה חוסך לדבר גדול - פתח פיקדון ותרוויח ריבית'
          ]
        }
      ],
      quiz: [
        {
          question: 'יש לך ₪500 בחשבון ומסגרת ₪1,000. כמה אתה יכול למשוך בסך הכל?',
          options: ['₪500', '₪1,000', '₪1,500', '₪2,000'],
          correct: 2,
          explanation: 'יתרה (₪500) + מסגרת (₪1,000) = ₪1,500 בסך הכל'
        },
        {
          question: 'מה הדבר הכי חשוב לעשות כשנכנסים למינוס?',
          options: ['להתעלם מזה', 'לצאת מזה מהר ככל האפשר', 'למשוך עוד כסף', 'לסגור את החשבון'],
          correct: 1,
          explanation: 'כל יום במינוס עולה כסף! תמיד תצא ממינוס מהר.'
        },
        {
          question: 'כמה עולה להיות במינוס של ₪1,000 במשך חודש (ריבית 6% שנתי)?',
          options: ['₪5', '₪10', '₪50', '₪60'],
          correct: 0,
          explanation: '₪1,000 × 6% ÷ 12 חודשים = ₪5 לחודש'
        }
      ]
    }
  },
  {
    id: 2,
    title: 'כרטיס אשראי - הכוח והסכנה',
    icon: <CreditCard size={18} />,
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-green-50',
    category: 'בסיסי',
    points: 5,
    duration: '6 דקות',
    content: {
      intro: '💳 כרטיס אשראי זה כמו סופר-פאוור. אבל כמו כל כוח גדול - צריך אחריות גדולה!',
      sections: [
        {
          title: 'תסריט: המלכודת של התשלומים',
          type: 'story',
          icon: '🎬',
          text: 'נועה קונה אייפון חדש ב-₪5,000 ב-12 תשלומים. נשמע מעולה - רק ₪417 לחודש! אבל... היא שכחה שגם יש לה תשלומים על נעליים, מחשב נייד וכרטיס למסיבה. פתאום יש לה ₪2,000 תשלומים כל חודש! 😱'
        },
        {
          title: 'המחיר האמיתי של תשלומים',
          type: 'calculation',
          icon: '💰',
          items: [
            '📱 אייפון במזומן: ₪5,000',
            '💳 אייפון ב-12 תשלומים:',
            '→ תשלום חודשי: ₪455',
            '→ סה"כ תשלום: ₪5,460',
            '💸 שילמת ₪460 יותר!',
            '',
            '🎯 זה כמו לקנות 2 משחקים ולשלם על 3!'
          ]
        },
        {
          title: 'הכללים של כרטיס אשראי',
          type: 'tips',
          icon: '📜',
          items: [
            '🚫 אל תקנה בתשלומים אם אתה יכול לשלם במלא',
            '📊 תמיד דע כמה יש לך תשלומים פעילים',
            '⚡ שלם מלא כל חודש - ככה אין ריבית',
            '🎯 השתמש בו רק לדברים שתוכננת',
            '💡 התשלום המינימלי = לא חבר שלך'
          ]
        }
      ],
      quiz: [
        {
          question: 'מה הדרך הכי חכמה להשתמש בכרטיס אשראי?',
          options: ['תמיד לפרוס לתשלומים', 'לשלם מלא כל חודש', 'לשלם רק מינימום', 'להשתמש עד הסוף'],
          correct: 1,
          explanation: 'תשלום מלא = אפס ריבית! זו הדרך הכי חכמה.'
        },
        {
          question: 'קנית נעליים ב-₪600 ב-3 תשלומים עם ריבית 5%. כמה שילמת בסך הכל?',
          options: ['₪600', '₪630', '₪660', '₪700'],
          correct: 1,
          explanation: '₪600 + 5% = ₪630. תמיד שילמת יותר בתשלומים!'
        },
        {
          question: 'מה זה "תשלום מינימלי"?',
          options: ['הסכום הכי נמוך שאתה יכול לשלם', 'חינם לגמרי', 'הסכום המלא', 'הסכום הממוצע'],
          correct: 0,
          explanation: 'תשלום מינימלי זה הסכום הכי קטן שאתה חייב לשלם - אבל זה מלכודת! השאר צובר ריבית!'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'חיסכון - בונים עתיד',
    icon: <PiggyBank size={18} />,
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    category: 'חיסכון',
    points: 7,
    duration: '7 דקות',
    content: {
      intro: '🐷 חיסכון זה לא משעמם! זה בעצם לבנות את החיים שאתה רוצה. בואו נראה איך.',
      sections: [
        {
          title: 'האתגר הגדול: איך להיות עשיר',
          type: 'story',
          icon: '💪',
          text: 'רון בן 16 מחליט לחסוך ₪200 כל חודש. חבר שלו אומר "בשביל מה? זה כלום!". בואו נראה מה קורה אחרי 5 שנים...'
        },
        {
          title: 'הקסם של ריבית דריבית',
          type: 'calculation',
          icon: '✨',
          items: [
            '💰 חיסכון: ₪200 כל חודש',
            '⏰ תקופה: 5 שנים',
            '📈 ריבית: 5% שנתי',
            '',
            '🎯 התוצאה:',
            '→ הפקדת: ₪12,000',
            '→ הריבית הוסיפה: ₪1,500',
            '🏆 יש לך: ₪13,500!',
            '',
            '💡 זה מספיק לרכב יד שנייה או ראש מסע לאירופה!'
          ]
        },
        {
          title: 'אתגר החיסכון של 30 יום',
          type: 'challenge',
          icon: '🔥',
          items: [
            'יום 1: חסוך ₪10',
            'יום 2: חסוך ₪20',
            'יום 3: חסוך ₪30',
            '...',
            'יום 30: חסוך ₪300',
            '',
            '🏆 סה"כ חסכת: ₪4,650!'
          ]
        }
      ],
      quiz: [
        {
          question: 'אם תחסוך ₪100 כל חודש במשך שנה, כמה יהיה לך?',
          options: ['₪1,000', '₪1,200', '₪1,500', '₪2,000'],
          correct: 1,
          explanation: '₪100 × 12 חודשים = ₪1,200'
        },
        {
          question: 'מהו הכלל הכי חשוב בחיסכון?',
          options: ['לחסוך מה שנשאר בסוף החודש', 'לחסוך קודם, להוציא אחר כך', 'לחסוך רק כשיש הרבה כסף', 'לא צריך לחסוך'],
          correct: 1,
          explanation: 'תשלם לעצמך קודם! זה הסוד של עשירים.'
        }
      ]
    }
  },
  {
    id: 4,
    title: 'רכב ראשון - חלום שמתגשם',
    icon: <Target size={18} />,
    color: 'from-green-700 to-emerald-700',
    bgColor: 'bg-green-50',
    category: 'חיסכון',
    points: 10,
    duration: '8 דקות',
    content: {
      intro: '🚗 רכב ראשון! אחד החלומות הגדולים. בואו נראה איך עושים את זה נכון.',
      sections: [
        {
          title: 'המסע לרכב',
          type: 'story',
          icon: '🎯',
          text: 'גיל בן 18 רוצה לקנות רכב ב-₪50,000. במקום לחלום, הוא עושה תוכנית. בואו נראה איך.'
        },
        {
          title: 'תוכנית פעולה חכמה',
          type: 'calculation',
          icon: '📋',
          items: [
            '🎯 מחיר רכב: ₪50,000',
            '💰 צריך להוריד: 30% = ₪15,000',
            '🏦 הלוואה: ₪35,000',
            '',
            '📅 תוכנית החיסכון:',
            '→ חוסך ₪500 כל חודש',
            '→ בעוד 30 חודשים יש לך ₪15,000!',
            '→ + עבודה קיץ = עוד ₪10,000',
            '→ הגעת ליעד ב-2.5 שנים! 🎉'
          ]
        },
        {
          title: 'העלויות הנסתרות של רכב',
          type: 'warning',
          icon: '💸',
          items: [
            '🔧 ביטוח צעירים: ₪500-800/חודש',
            '⛽ דלק: ₪800-1,200/חודש',
            '🔨 תחזוקה: ₪200-400/חודש',
            '🅿️ חניה: ₪100-300/חודש',
            '',
            '📊 סה"כ: ₪1,600-2,700 כל חודש!',
            '💡 וודא שאתה יכול להרשות לעצמך'
          ]
        }
      ],
      quiz: [
        {
          question: 'אתה חוסך ₪600 לחודש. כמה זמן יקח לחסוך ₪15,000?',
          options: ['20 חודשים', '25 חודשים', '30 חודשים', '35 חודשים'],
          correct: 1,
          explanation: '₪15,000 ÷ ₪600 = 25 חודשים'
        },
        {
          question: 'מה הדבר הכי חשוב לבדוק לפני קניית רכב?',
          options: ['רק המחיר', 'רק הצבע', 'עלויות אחזקה חודשיות', 'דעת החברים'],
          correct: 2,
          explanation: 'הרכב זה לא רק המחיר! העלויות החודשיות יכולות להיות גבוהות מאוד.'
        }
      ]
    }
  },
  {
    id: 5,
    title: 'השקעות - רמה מתקדמת',
    icon: <TrendingUp size={18} />,
    color: 'from-emerald-600 to-green-600',
    bgColor: 'bg-emerald-50',
    category: 'חיסכון',
    points: 10,
    duration: '10 דקות',
    content: {
      intro: '📈 השקעות זה לא רק למבוגרים! ככל שתתחיל מוקדם יותר - כך תהיה עשיר יותר.',
      sections: [
        {
          title: 'הסיפור של המיליונר הצעיר',
          type: 'story',
          icon: '💰',
          text: 'בן 16 מקבל ₪10,000 במתנה. החבר שלו קונה בגדים ואייפון חדש. בן משקיע את זה. בגיל 30 - לבן יש ₪50,000! לחבר שלו? אפס.'
        },
        {
          title: 'הקסם של התחלה מוקדמת',
          type: 'calculation',
          icon: '🎯',
          items: [
            '💰 משקיע בגיל 16: ₪10,000',
            '📈 תשואה: 7% שנתי',
            '⏰ עד גיל 30 (14 שנים)',
            '',
            '✨ התוצאה:',
            '→ בגיל 30: ₪25,000',
            '→ בגיל 40: ₪50,000',
            '→ בגיל 50: ₪100,000',
            '→ בגיל 60: ₪200,000!',
            '',
            '🤯 השקעה אחת של ₪10,000 → ₪200,000!'
          ]
        }
      ],
      quiz: [
        {
          question: 'מה קורה אם משקיעים ₪1,000 עם 10% תשואה ל-10 שנים?',
          options: ['₪2,000', '₪2,594', '₪3,000', '₪10,000'],
          correct: 1,
          explanation: 'עם ריבית דריבית של 10% - ₪1,000 הופכים ל-₪2,594!'
        },
        {
          question: 'מתי הזמן הכי טוב להתחיל להשקיע?',
          options: ['רק כשאתה מבוגר', 'כשיש לך מיליון שקל', 'כמה שיותר מוקדם', 'אף פעם'],
          correct: 2,
          explanation: 'הכוח של זמן! ככל שמתחילים מוקדם יותר, כך מרוויחים יותר.'
        }
      ]
    }
  },
  {
    id: 6,
    title: 'עבודה ראשונה - הכנסה ומיסים',
    icon: <DollarSign size={18} />,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    category: 'מתקדם',
    points: 7,
    duration: '6 דקות',
    content: {
      intro: '💼 העבודה הראשונה! מרגש, לא? בואו נבין איך המשכורת באמת עובדת.',
      sections: [
        {
          title: 'הסיפור של המשכורת הראשונה',
          type: 'story',
          icon: '🎬',
          text: 'דנה מקבלת עבודה ראשונה במקדונלדס! שכר: ₪40 לשעה, 25 שעות בשבוע. היא חושבת שתרוויח ₪4,000 בחודש. אבל... יש משהו שנקרא "ניכויים" 😱'
        },
        {
          title: 'חישוב המשכורת האמיתית',
          type: 'calculation',
          icon: '🧮',
          items: [
            '💵 שכר לשעה: ₪40',
            '⏰ שעות בשבוע: 25',
            '📅 שבועות בחודש: 4',
            '',
            '🎯 חישוב:',
            '→ שעות בחודש: 100',
            '→ שכר ברוטו: ₪4,000',
            '→ ביטוח לאומי: ₪168',
            '→ מס הכנסה: ₪400',
            '💰 נטו בכיס: ₪3,432'
          ]
        },
        {
          title: 'למה חשוב לעבוד?',
          type: 'tips',
          icon: '💪',
          items: [
            '💰 הכנסה עצמאית - לא תלוי בהורים',
            '🎓 ניסיון לקורות החיים',
            '👥 מכירים חברים חדשים',
            '🧠 לומדים אחריות וניהול זמן',
            '🎯 חוסכים למטרות גדולות',
            '🚀 בונים עצמאות פיננסית'
          ]
        },
        {
          title: 'טיפים לעבודה ראשונה',
          type: 'tips',
          icon: '✨',
          items: [
            '⏰ תמיד תגיע בזמן',
            '😊 תהיה אדיב ללקוחות',
            '📝 קח אחריות על הטעויות',
            '🎯 תלמד כל הזמן',
            '💼 תשמור על מקצועיות',
            '🤝 תעבוד בצוות'
          ]
        }
      ],
      quiz: [
        {
          question: 'אם שכרך ברוטו הוא ₪5,000, כמה בערך תקבל נטו?',
          options: ['₪5,000', '₪4,500', '₪4,300', '₪3,000'],
          correct: 2,
          explanation: 'אחרי ניכויים (מס + ביטוח לאומי) נשאר בערך ₪4,300'
        },
        {
          question: 'מה זה "שכר ברוטו"?',
          options: ['השכר אחרי מיסים', 'השכר לפני מיסים', 'השכר המינימלי', 'השכר הממוצע'],
          correct: 1,
          explanation: 'ברוטו = לפני ניכויים. נטו = מה שבאמת מגיע לחשבון.'
        }
      ]
    }
  },
  {
    id: 7,
    title: 'קניות באינטרנט בחכמה',
    icon: <Smartphone size={18} />,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
    category: 'מתקדם',
    points: 5,
    duration: '5 דקות',
    content: {
      intro: '🛒 קניות באינטרנט זה כיף! אבל יש כמה טריקים שחשוב לדעת.',
      sections: [
        {
          title: 'המלכודות של קניות אונליין',
          type: 'story',
          icon: '🎬',
          text: 'עומר רואה פרסומת באינסטגרם - "נעלי נייקי ב-70% הנחה!" רק ₪150 במקום ₪500! הוא קונה... ומקבל נעליים מזויפות מסין אחרי 2 חודשים 😭'
        },
        {
          title: 'איך לזהות אתרים מהימנים?',
          type: 'tips',
          icon: '✅',
          items: [
            '🔒 כתובת מתחילה ב-HTTPS (לא HTTP)',
            '⭐ ביקורות מלקוחות אמיתיים',
            '📞 יש מספר טלפון ותמיכה',
            '🏢 יש כתובת פיזית של החברה',
            '💳 אפשרויות תשלום מוכרות',
            '📦 מדיניות החזרות ברורה'
          ]
        },
        {
          title: 'טיפים לחסוך בקניות',
          type: 'tips',
          icon: '💰',
          items: [
            '🔍 תמיד תשווה מחירים (Google Shopping)',
            '🎫 תחפש קופונים והנחות',
            '⏰ תקנה בסיילים (Black Friday)',
            '📱 תשתמש באפליקציות cashback',
            '🤝 תקנה עם חברים למשלוח משותף',
            '❌ אל תקנה בדחף!'
          ]
        },
        {
          title: 'אזהרת זומבי-שופינג!',
          type: 'warning',
          icon: '🧟',
          items: [
            '⚠️ "הוסף לסל" לא אומר "קנה עכשיו"',
            '😱 פרסומות ממוקדות גורמות לך לקנות מה שלא צריך',
            '💸 משלוח חינם רק אם קונים ב-₪200+ = מלכודת',
            '🎁 "עוד רק 2 במלאי!" לרוב לא נכון',
            '⏰ "24 שעות בלבד!" תמיד חוזר'
          ]
        }
      ],
      quiz: [
        {
          question: 'רואה מוצר ב-₪100 עם משלוח ב-₪30. באתר אחר אותו מוצר ב-₪120 עם משלוח חינם. מה יותר כדאי?',
          options: ['האתר הראשון (₪130 סה"כ)', 'האתר השני (₪120 סה"כ)', 'אותו דבר', 'תלוי במוצר'],
          correct: 1,
          explanation: 'תמיד תחשב את המחיר הכולל עם משלוח!'
        },
        {
          question: 'מה זה HTTPS באתר?',
          options: ['מהירות האתר', 'חיבור מאובטח', 'שם החברה', 'סוג המוצר'],
          correct: 1,
          explanation: 'HTTPS = חיבור מוצפן ומאובטח. HTTP = לא בטוח!'
        }
      ]
    }
  },
  {
    id: 8,
    title: 'הונאות ברשת - שמור על עצמך',
    icon: <Shield size={18} />,
    color: 'from-green-600 to-emerald-500',
    bgColor: 'bg-green-50',
    category: 'מתקדם',
    points: 7,
    duration: '7 דקות',
    content: {
      intro: '🛡️ האינטרנט מלא בנוכלים שרוצים את הכסף שלך. בואו נלמד להכיר אותם ולהימנע מהם!',
      sections: [
        {
          title: 'הסיפור של דני - כמעט נפל למלכודת',
          type: 'story',
          icon: '😱',
          text: 'דני מקבל SMS: "זכית באייפון 15 חדש! לחץ כאן!" הוא כמעט לחץ... למזלו, הוא זכר את השיעור הזה וחסך לעצמו ₪5,000!'
        },
        {
          title: 'סוגי ההונאות הפופולריות',
          type: 'warning',
          icon: '🎭',
          items: [
            '📧 פישינג - מיילים מזויפים מהבנק',
            '🎁 "זכית בפרס!" - תמיד רמאות',
            '💰 "השקעה בטוחה 100%!" - אין דבר כזה',
            '👤 מישהו מתחזה לבנק ומבקש פרטים',
            '🔗 קישורים מפוקפקים ב-WhatsApp',
            '💳 "עדכן פרטי אשראי" - הבנק אף פעם לא יבקש'
          ]
        },
        {
          title: 'חוקי ההגנה',
          type: 'tips',
          icon: '🛡️',
          items: [
            '🔒 אף פעם אל תשתף סיסמאות',
            '📱 קוד SMS זה רק שלך',
            '🔗 תמיד בדוק את כתובת האתר',
            '🤔 אם זה נראה מוזר - זה כנראה מוזר',
            '☎️ במקרה של ספק - תתקשר לבנק',
            '🚫 אל תלחץ על קישורים ב-SMS'
          ]
        }
      ],
      quiz: [
        {
          question: 'קיבלת SMS: "זכית ב-₪10,000! לחץ כאן לאישור". מה עושים?',
          options: ['לוחצים מיד!', 'מוחקים ולא נוגעים', 'שולחים לחברים', 'עונים עם פרטי אשראי'],
          correct: 1,
          explanation: 'זו הונאה קלאסית! מוחקים ושוכחים.'
        },
        {
          question: 'הבנק מתקשר ומבקש את קוד ה-SMS שקיבלת. מה עושים?',
          options: ['נותנים לו את הקוד', 'שואלים למה', 'סוגרים ומתקשרים לבנק בעצמנו', 'נותנים רק מחצית'],
          correct: 2,
          explanation: 'הבנק לעולם לא יבקש קוד SMS! זה נוכל. סגור ותתקשר בעצמך לבנק.'
        }
      ]
    }
  },
  {
    id: 9,
    title: 'קריפטו ו-NFT - מה זה ובשביל מה?',
    icon: <Sparkles size={18} />,
    color: 'from-emerald-600 to-green-700',
    bgColor: 'bg-emerald-50',
    category: 'מתקדם',
    points: 10,
    duration: '8 דקות',
    content: {
      intro: '🪙 קריפטו ו-NFT - כולם מדברים על זה. אבל מה זה באמת? ואם זה בשבילך?',
      sections: [
        {
          title: 'הסיפור של הביטקוין',
          type: 'story',
          icon: '₿',
          text: 'בשנת 2010, בחור קנה 2 פיצות ב-10,000 ביטקוין. היום זה שווה... 300 מיליון דולר! 🍕💸 אבל לא כולם עושים רווחים ענקיים - רבים גם מפסידים.'
        },
        {
          title: 'מה זה קריפטו?',
          type: 'explanation',
          icon: '💰',
          text: 'קריפטו זה כסף דיגיטלי שלא שייך לאף מדינה או בנק. זה כמו משחק מחשב שבו יש מטבע וירטואלי - אבל אנשים קונים ומוכרים אותו בכסף אמיתי!'
        },
        {
          title: 'הסכנות והסיכונים',
          type: 'warning',
          icon: '⚠️',
          items: [
            '📉 המחיר משתנה בטירוף - יכול לרדת 50% ביום אחד',
            '🎰 זה יותר הימור מאשר השקעה',
            '😱 הרבה אנשים הפסידו את כל הכסף שלהם',
            '🚫 אין ביטוח - אם תפסיד, אבד',
            '🦈 מלא רמאים ונוכלים',
            '⚖️ עדיין לא מוסדר בישראל'
          ]
        },
        {
          title: 'האם כדאי לקנות קריפטו?',
          type: 'tips',
          icon: '🤔',
          items: [
            '❌ לא אם אתה צריך את הכסף בקרוב',
            '❌ לא אם זה הכסף היחיד שלך',
            '❌ לא אם אתה לא מבין בזה',
            '✅ אולי אם יש לך כסף "עודף" שאתה יכול להפסיד',
            '✅ אולי אם אתה לומד על זה המון',
            '💡 בכל מקרה - רק סכומים קטנים!'
          ]
        }
      ],
      quiz: [
        {
          question: 'מה הסכנה הכי גדולה בקריפטו?',
          options: ['זה לא חוקי', 'אפשר להפסיד הכל', 'זה יקר מדי', 'זה לא קיים'],
          correct: 1,
          explanation: 'המחירים משתנים בטירוף ואין ביטוח - אפשר להפסיד הכל!'
        },
        {
          question: 'מי צריך להשקיע בקריפטו?',
          options: ['כל אחד', 'רק מי שיכול להפסיד את הכסף', 'רק עשירים', 'אף אחד'],
          correct: 1,
          explanation: 'רק אם יש לך כסף עודף שאתה יכול להפסיד בלי שזה ישפיע עליך!'
        }
      ]
    }
  },
  {
    id: 10,
    title: 'ניהול תקציב - בונים הרגלים טובים',
    icon: <Calculator size={18} />,
    color: 'from-green-700 to-emerald-600',
    bgColor: 'bg-green-50',
    category: 'מתקדם',
    points: 10,
    duration: '10 דקות',
    content: {
      intro: '📊 תקציב זה לא משעמם! זה הדרך להגיע לכל מה שאתה רוצה בחיים.',
      sections: [
        {
          title: 'החוק של 50/30/20',
          type: 'explanation',
          icon: '🎯',
          text: 'זה כלל פשוט שעוזר לך לנהל כסף בצורה חכמה: 50% - צרכים (אוכל, דיור, חשבונות). 30% - רצונות (בילויים, קניות, נסיעות). 20% - חיסכון (עתיד, חירום, מטרות).'
        },
        {
          title: 'דוגמא מהחיים',
          type: 'calculation',
          icon: '💰',
          items: [
            '💵 הכנסה חודשית: ₪4,000',
            '',
            '🏠 50% צרכים = ₪2,000:',
            '→ אוכל ושתייה: ₪800',
            '→ תחבורה/דלק: ₪600',
            '→ טלפון/חבילות: ₪200',
            '→ ביגוד בסיסי: ₪400',
            '',
            '🎉 30% רצונות = ₪1,200:',
            '→ יציאות וקולנוע: ₪400',
            '→ קניות כיף: ₪400',
            '→ מסעדות: ₪400',
            '',
            '🐷 20% חיסכון = ₪800'
          ]
        },
        {
          title: 'אפליקציות שעוזרות',
          type: 'tips',
          icon: '📱',
          items: [
            '💚 אפליקציית הבנק - עוקב אחרי הוצאות',
            '📊 Money Manager - ניהול תקציב',
            '🎯 Splitwise - חשבונות משותפים',
            '💰 Cal - חישובון שמור היסטוריה',
            '📈 Excel/Sheets - טבלה אישית'
          ]
        },
        {
          title: 'הטעויות הנפוצות',
          type: 'warning',
          icon: '❌',
          items: [
            'לא לעקוב אחרי הוצאות קטנות (קפה, חטיפים)',
            'לקנות בדחף ללא תכנון',
            'לא לשמור קרן חירום',
            'להשוות את עצמך לאחרים',
            'לא לדבר על כסף עם ההורים'
          ]
        }
      ],
      quiz: [
        {
          question: 'לפי חוק 50/30/20, אם אתה מרוויח ₪3,000 - כמה צריך לחסוך?',
          options: ['₪300', '₪600', '₪900', '₪1,500'],
          correct: 1,
          explanation: '20% מ-₪3,000 = ₪600 לחיסכון'
        },
        {
          question: 'מהי "קרן חירום"?',
          options: ['כסף למקרי חירום', 'חשבון חיסכון רגיל', 'כרטיס אשראי', 'הלוואה מהבנק'],
          correct: 0,
          explanation: 'קרן חירום זה כסף ששומרים בצד למצבים בלתי צפויים!'
        }
      ]
    }
  }
];

export default function DiscountAcademyApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [studiedTopics, setStudiedTopics] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [perfectQuizStreak, setPerfectQuizStreak] = useState(0);
  const [totalQuizzesTaken, setTotalQuizzesTaken] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [studyStartTime, setStudyStartTime] = useState(null);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [purchasedRewards, setPurchasedRewards] = useState([]);
  const [showRewardsStore, setShowRewardsStore] = useState(false);

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
  };

  const selectTopic = (topic) => {
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
        // בדוק אם זה היה הקוויז האחרון
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

  const purchaseReward = (reward) => {
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
                      <p className="text-xs text-green-100">{user.name}</p>
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
                  
                  {/* יתרת נקודות גדולה */}
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
                
                {/* מה אפשר לקנות עכשיו */}
                {points > 0 && (
                  <div className="bg-white/20 rounded-xl p-4 mt-4">
                    <p className="font-bold text-lg mb-2">💰 עם {points} נקודות אתה יכול לקנות:</p>
                    <div className="flex flex-wrap gap-2">
                      {REWARDS.filter(r => r.points <= points && !purchasedRewards.some(p => p.id === r.id))
                        .slice(0, 5)
                        .map(r => (
                          <div key={r.id} className="bg-white/30 px-3 py-1 rounded-full text-sm font-bold">
                            {r.name} ({r.points} נק')
                          </div>
                        ))}
                    </div>
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
                        {/* תג נקודות שהושקעו */}
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
                        {/* תג נקודות גדול */}
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
                <h2 className="text-3xl font-black mb-2">היי {user.name}! 👋</h2>
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
                    {/* תג נקודות */}
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

              {selectedTopic.content.sections.map((section, index) => (
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
                        {section.items.map((item, i) => (
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
                        {section.items.map((item, i) => (
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
                        {section.items.map((item, i) => (
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
                        {section.items.map((item, i) => (
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
                  {/* מונה תשובות */}
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

                  {selectedTopic.content.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {qIndex + 1}. {q.question}
                      </h3>
                      <div className="space-y-3">
                        {q.options.map((option, oIndex) => (
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
                    {selectedTopic.content.quiz.map((q, qIndex) => {
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
                    
                    {/* הודעת ניקוד */}
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
}