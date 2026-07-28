import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  TabType,
  Language,
  UserRole,
  UserAccount,
  SubscriptionStatus,
  StoreCategory,
  StoreItem,
  FoodItem,
  ClientData,
  SuccessStory,
  SubscriptionPlan,
  SystemSettings,
  IntakeQuestionnaire,
  ProgressLog,
  WorkoutProgram,
  ExerciseItem,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_STORE_CATEGORIES,
  INITIAL_STORE_ITEMS,
  INITIAL_FOOD_DATABASE,
  INITIAL_CLIENTS,
  INITIAL_SUCCESS_STORIES,
  INITIAL_SUBSCRIPTION_PLANS,
  INITIAL_SYSTEM_SETTINGS,
  INITIAL_PROGRESS_LOGS,
  INITIAL_WORKOUT_PROGRAMS,
  INITIAL_EXERCISES,
} from '../data/mockData';
import { storage } from '../lib/storage';
import { authService } from '../services/auth.service';

interface AppContextType {
  // Navigation & UI State
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isRtl: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;

  // Auth & Roles
  user: UserAccount | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, role: UserRole, password?: string) => void;
  logout: () => void;
  subscriptionStatus: SubscriptionStatus;
  setSubscriptionStatus: (status: SubscriptionStatus) => void;
  isSubscribed: boolean;

  // Points & Gamification
  points: number;
  addPoints: (amount: number, reasonEn?: string, reasonAr?: string) => void;

  // System Settings (Admin Toggles)
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  toggleTabVisibility: (tab: TabType) => void;

  // Store Management
  categories: StoreCategory[];
  storeItems: StoreItem[];
  addCategory: (cat: Omit<StoreCategory, 'id'>) => void;
  updateCategory: (id: string, cat: Partial<StoreCategory>) => void;
  deleteCategory: (id: string) => void;
  addStoreItem: (item: Omit<StoreItem, 'id'>) => void;
  updateStoreItem: (id: string, item: Partial<StoreItem>) => void;
  deleteStoreItem: (id: string) => void;

  // Food Database
  foods: FoodItem[];
  addFood: (food: Omit<FoodItem, 'id'>) => void;
  updateFood: (id: string, food: Partial<FoodItem>) => void;
  deleteFood: (id: string) => void;

  // Clients & Coach Portal
  clients: ClientData[];
  setClients: React.Dispatch<React.SetStateAction<ClientData[]>>;

  // Success Stories
  stories: SuccessStory[];
  addStory: (story: Omit<SuccessStory, 'id'>) => void;
  updateStory: (id: string, story: Partial<SuccessStory>) => void;
  deleteStory: (id: string) => void;

  // Subscriptions
  subscriptions: SubscriptionPlan[];
  addSubscription: (sub: Omit<SubscriptionPlan, 'id'>) => void;
  updateSubscription: (id: string, sub: Partial<SubscriptionPlan>) => void;
  deleteSubscription: (id: string) => void;

  // Intake & Progress
  userIntake: IntakeQuestionnaire | null;
  submitIntake: (intake: IntakeQuestionnaire) => void;
  progressLogs: ProgressLog[];
  addProgressLog: (log: Omit<ProgressLog, 'id'>) => void;

  // Workouts & Exercises
  workoutPrograms: WorkoutProgram[];
  exercises: ExerciseItem[];
  addProgram: (prog: Omit<WorkoutProgram, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = [
  'user',
  'sub_status',
  'user_intake',
  'settings',
  'categories',
  'store_items',
  'foods',
  'clients',
  'stories',
  'subscriptions',
  'progress_logs',
  'programs',
  'sidebar_collapsed',
  'app_lang',
];

function detectLanguage(): Language {
  // 1. Previously saved language preference
  const saved = storage.get<string | null>('app_lang', null);
  if (saved === 'en' || saved === 'ar') return saved;

  // 2. Browser language / navigator.languages
  const browserLangs = typeof navigator !== 'undefined' ? (navigator.languages || [navigator.language]) : [];
  for (const l of browserLangs) {
    const code = l.toLowerCase().split('-')[0];
    if (code === 'ar') return 'ar';
    if (code === 'en') return 'en';
  }

  // 3. Default
  return 'en';
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [lang, setLang] = useState<Language>(detectLanguage);
  const isRtl = lang === 'ar';

  // Auth User & Role
  const [user, setUser] = useState<UserAccount | null>(() => {
    return storage.get<UserAccount | null>('user', INITIAL_USER);
  });

  const [role, setRoleState] = useState<UserRole>(() => user?.role || 'user');

  // Subscription Status Management
  const [subscriptionStatus, setSubscriptionStatusState] = useState<SubscriptionStatus>(() => {
    const savedSub = storage.get<SubscriptionStatus | null>('sub_status', null);
    if (savedSub) return savedSub;
    return user?.subscriptionStatus || 'Active';
  });

  const setSubscriptionStatus = (status: SubscriptionStatus) => {
    setSubscriptionStatusState(status);
    storage.set('sub_status', status);
    setUser((prev) => {
      if (prev) {
        const updatedUser = { ...prev, subscriptionStatus: status };
        storage.set('user', updatedUser);
        return updatedUser;
      }
      return prev;
    });
  };

  const isSubscribed = subscriptionStatus === 'Active';

  // Sync RTL
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    storage.set('app_lang', lang);
  }, [isRtl, lang]);

  // Sidebar Collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return storage.get<boolean>('sidebar_collapsed', false);
  });

  const toggleSidebarCollapse = () => {
    const next = !isSidebarCollapsed;
    setIsSidebarCollapsed(next);
    storage.set('sidebar_collapsed', next);
  };

  // Points
  const [points, setPoints] = useState<number>(() => user?.points || 12450);

  const addPoints = (amount: number, _reasonEn?: string, _reasonAr?: string) => {
    setPoints((p) => p + amount);
  };

  useEffect(() => {
    setUser((prev) => {
      if (prev) {
        const updatedUser = { ...prev, points };
        storage.set('user', updatedUser);
        return updatedUser;
      }
      return prev;
    });
  }, [points]);

  // System Settings
  const [settings, setSettings] = useState<SystemSettings>(() => {
    return storage.get<SystemSettings>('settings', INITIAL_SYSTEM_SETTINGS);
  });

  useEffect(() => {
    storage.set('settings', settings);
  }, [settings]);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleTabVisibility = (tab: TabType) => {
    setSettings((prev) => ({
      ...prev,
      visibleTabs: {
        ...prev.visibleTabs,
        [tab]: !prev.visibleTabs[tab],
      },
    }));
  };

  // Auth actions
  const login = (email: string, selectedRole: UserRole, password?: string) => {
    if (password) {
      authService.login(email, password).then((res) => {
        setUser(res.user);
        setRoleState(res.user.role);
        setSubscriptionStatusState(res.user.subscriptionStatus);
        setPoints(res.user.points);
      }).catch(() => {
        const loggedUser: UserAccount = {
          ...INITIAL_USER,
          email,
          role: selectedRole,
        };
        setUser(loggedUser);
        setRoleState(selectedRole);
        setSubscriptionStatusState(loggedUser.subscriptionStatus);
        setPoints(loggedUser.points);
        storage.set('user', loggedUser);
      });
      return;
    }

    const loggedUser: UserAccount = {
      ...INITIAL_USER,
      email,
      role: selectedRole,
    };
    setUser(loggedUser);
    setRoleState(selectedRole);
    setSubscriptionStatusState(loggedUser.subscriptionStatus);
    setPoints(loggedUser.points);
    storage.set('user', loggedUser);
  };

  const logout = () => {
    authService.logout();
    setUser(INITIAL_USER);
    setRoleState('user');
    setSubscriptionStatusState('Guest');
    setPoints(INITIAL_USER.points);
    setCategories(INITIAL_STORE_CATEGORIES);
    setStoreItems(INITIAL_STORE_ITEMS);
    setFoods(INITIAL_FOOD_DATABASE);
    setClients(INITIAL_CLIENTS);
    setStories(INITIAL_SUCCESS_STORIES);
    setSubscriptions(INITIAL_SUBSCRIPTION_PLANS);
    setProgressLogs(INITIAL_PROGRESS_LOGS);
    setWorkoutPrograms(INITIAL_WORKOUT_PROGRAMS);
    setSettings(INITIAL_SYSTEM_SETTINGS);
    setUserIntake(INITIAL_CLIENTS[0]?.intakeAnswers || null);
    storage.removeMany(STORAGE_KEYS);
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser((prev) => {
      if (prev) {
        const updated = { ...prev, role: newRole };
        storage.set('user', updated);
        return updated;
      }
      return prev;
    });
  };

  // Store Categories
  const [categories, setCategories] = useState<StoreCategory[]>(() => {
    return storage.get<StoreCategory[]>('categories', INITIAL_STORE_CATEGORIES);
  });

  const [storeItems, setStoreItems] = useState<StoreItem[]>(() => {
    return storage.get<StoreItem[]>('store_items', INITIAL_STORE_ITEMS);
  });

  useEffect(() => {
    storage.set('categories', categories);
  }, [categories]);

  useEffect(() => {
    storage.set('store_items', storeItems);
  }, [storeItems]);

  const addCategory = (cat: Omit<StoreCategory, 'id'>) => {
    const newCat: StoreCategory = { ...cat, id: `cat-${Date.now()}` };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (id: string, cat: Partial<StoreCategory>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...cat } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addStoreItem = (item: Omit<StoreItem, 'id'>) => {
    const newItem: StoreItem = { ...item, id: `item-${Date.now()}` };
    setStoreItems((prev) => [...prev, newItem]);
  };

  const updateStoreItem = (id: string, item: Partial<StoreItem>) => {
    setStoreItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
  };

  const deleteStoreItem = (id: string) => {
    setStoreItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Food Database
  const [foods, setFoods] = useState<FoodItem[]>(() => {
    return storage.get<FoodItem[]>('foods', INITIAL_FOOD_DATABASE);
  });

  useEffect(() => {
    storage.set('foods', foods);
  }, [foods]);

  const addFood = (food: Omit<FoodItem, 'id'>) => {
    const newFood: FoodItem = { ...food, id: `food-${Date.now()}` };
    setFoods((prev) => [...prev, newFood]);
  };

  const updateFood = (id: string, food: Partial<FoodItem>) => {
    setFoods((prev) => prev.map((f) => (f.id === id ? { ...f, ...food } : f)));
  };

  const deleteFood = (id: string) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  // Clients
  const [clients, setClients] = useState<ClientData[]>(() => {
    return storage.get<ClientData[]>('clients', INITIAL_CLIENTS);
  });

  useEffect(() => {
    storage.set('clients', clients);
  }, [clients]);

  // Success Stories
  const [stories, setStories] = useState<SuccessStory[]>(() => {
    return storage.get<SuccessStory[]>('stories', INITIAL_SUCCESS_STORIES);
  });

  useEffect(() => {
    storage.set('stories', stories);
  }, [stories]);

  const addStory = (story: Omit<SuccessStory, 'id'>) => {
    const newS: SuccessStory = { ...story, id: `story-${Date.now()}` };
    setStories((prev) => [...prev, newS]);
  };

  const updateStory = (id: string, story: Partial<SuccessStory>) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, ...story } : s)));
  };

  const deleteStory = (id: string) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>(() => {
    return storage.get<SubscriptionPlan[]>('subscriptions', INITIAL_SUBSCRIPTION_PLANS);
  });

  useEffect(() => {
    storage.set('subscriptions', subscriptions);
  }, [subscriptions]);

  const addSubscription = (sub: Omit<SubscriptionPlan, 'id'>) => {
    const newSub: SubscriptionPlan = { ...sub, id: `sub-${Date.now()}` };
    setSubscriptions((prev) => [...prev, newSub]);
  };

  const updateSubscription = (id: string, sub: Partial<SubscriptionPlan>) => {
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? { ...s, ...sub } : s)));
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
  };

  // User Intake Questionnaire
  const [userIntake, setUserIntake] = useState<IntakeQuestionnaire | null>(() => {
    return storage.get<IntakeQuestionnaire | null>('user_intake', INITIAL_CLIENTS[0]?.intakeAnswers || null);
  });

  const submitIntake = (intake: IntakeQuestionnaire) => {
    setUserIntake(intake);
    storage.set('user_intake', intake);
    addPoints(200, 'Submitted Evaluation Quiz', 'إكمال الاستبيان التقييمي');
  };

  // Progress Logs
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>(() => {
    return storage.get<ProgressLog[]>('progress_logs', INITIAL_PROGRESS_LOGS);
  });

  useEffect(() => {
    storage.set('progress_logs', progressLogs);
  }, [progressLogs]);

  const addProgressLog = (log: Omit<ProgressLog, 'id'>) => {
    const newLog: ProgressLog = { ...log, id: `log-${Date.now()}` };
    setProgressLogs((prev) => [...prev, newLog]);
    addPoints(100, 'Logged Weight & Body Stats', 'تسجيل القياسات والوزن');
  };

  // Workout Programs & Exercises
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>(() => {
    return storage.get<WorkoutProgram[]>('programs', INITIAL_WORKOUT_PROGRAMS);
  });

  useEffect(() => {
    storage.set('programs', workoutPrograms);
  }, [workoutPrograms]);

  const [exercises] = useState<ExerciseItem[]>(INITIAL_EXERCISES);

  const addProgram = (prog: Omit<WorkoutProgram, 'id'>) => {
    const newProg: WorkoutProgram = { ...prog, id: `prog-${Date.now()}` };
    setWorkoutPrograms((prev) => [...prev, newProg]);
  };

  const value = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      lang,
      setLang,
      isRtl,
      isSidebarCollapsed,
      toggleSidebarCollapse,
      user,
      role,
      setRole,
      login,
      logout,
      subscriptionStatus,
      setSubscriptionStatus,
      isSubscribed,
      points,
      addPoints,
      settings,
      updateSettings,
      toggleTabVisibility,
      categories,
      storeItems,
      addCategory,
      updateCategory,
      deleteCategory,
      addStoreItem,
      updateStoreItem,
      deleteStoreItem,
      foods,
      addFood,
      updateFood,
      deleteFood,
      clients,
      setClients,
      stories,
      addStory,
      updateStory,
      deleteStory,
      subscriptions,
      addSubscription,
      updateSubscription,
      deleteSubscription,
      userIntake,
      submitIntake,
      progressLogs,
      addProgressLog,
      workoutPrograms,
      exercises,
      addProgram,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      activeTab, lang, isRtl, isSidebarCollapsed, user, role,
      subscriptionStatus, isSubscribed, points, settings,
      categories, storeItems, foods, clients, stories,
      subscriptions, userIntake, progressLogs, workoutPrograms, exercises,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
