// CodeMate - AI-Powered Coding Education Platform
// Simulating React-like architecture with vanilla JavaScript

// Application State Management
class AppState {
    constructor() {
        this.currentUser = null;
        this.currentRoute = 'auth';
        this.currentLanguage = null;
        this.currentModule = null;
        this.currentLesson = 1;
        this.isLoading = false;
        this.listeners = new Set();
        
        this.loadPersistedState();
    }
    
    loadPersistedState() {
        try {
            const savedUser = localStorage.getItem('codemate_user');
            
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                this.currentRoute = 'dashboard';
            }
        } catch (error) {
            console.error('Error loading persisted state:', error);
        }
    }
    
    setState(newState) {
        const oldState = { ...this };
        Object.assign(this, newState);
        
        // Persist user data
        if (this.currentUser) {
            localStorage.setItem('codemate_user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('codemate_user');
        }
        
        this.notifyListeners(oldState);
    }
    
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }
    
    notifyListeners(oldState) {
        this.listeners.forEach(callback => {
            try {
                callback(this, oldState);
            } catch (error) {
                console.error('Error in state listener:', error);
            }
        });
    }
}

// Database Simulation
class Database {
    static users = {
        'alex@codemate.com': {
            id: 'user_1',
            email: 'alex@codemate.com',
            displayName: 'Alex Chen',
            password: 'password123',
            avatar: '🚀',
            joinDate: '2024-01-15',
            currentLevel: 12,
            totalXP: 2847,
            streak: 15,
            preferences: {
                emailNotifications: true,
                pushNotifications: true
            }
        }
    };
    
    static curriculum = {
        python: {
            title: 'Python Programming',
            icon: '🐍',
            description: 'Learn Python from basics to advanced topics',
            totalModules: 7,
            modules: [
                {
                    id: 1,
                    title: 'Python Basics',
                    description: 'Variables, data types, and basic operations',
                    difficulty: 'beginner',
                    estimatedTime: '2 hours',
                    lessons: [
                        {
                            id: 1,
                            title: 'Introduction to Python',
                            content: `
                                <h2>Welcome to Python Programming! 🐍</h2>
                                <p>Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python has become one of the most popular programming languages in the world.</p>
                                
                                <h3>Why Learn Python?</h3>
                                <ul>
                                    <li><strong>Easy to Learn:</strong> Python's syntax is clean and intuitive</li>
                                    <li><strong>Versatile:</strong> Used in web development, data science, AI, automation</li>
                                    <li><strong>Large Community:</strong> Extensive libraries and community support</li>
                                    <li><strong>High Demand:</strong> Popular in the job market</li>
                                </ul>
                                
                                <h3>Your First Python Program</h3>
                                <p>Let's start with the classic "Hello, World!" program:</p>
                            `,
                            codeExample: `print("Hello, World!")
print("Welcome to Python programming!")

# This is a comment - it won't be executed
# Comments help explain your code

name = "Alex"
print(f"Hello, {name}!")`
                        },
                        {
                            id: 2,
                            title: 'Variables and Data Types',
                            content: `
                                <h2>Working with Variables and Data Types</h2>
                                <p>Variables are containers that store data values. Python has several built-in data types that you'll use frequently.</p>
                                
                                <h3>Basic Data Types</h3>
                                <ul>
                                    <li><strong>int:</strong> Integers (whole numbers)</li>
                                    <li><strong>float:</strong> Decimal numbers</li>
                                    <li><strong>str:</strong> Strings (text)</li>
                                    <li><strong>bool:</strong> Boolean (True/False)</li>
                                </ul>
                            `,
                            codeExample: `# Integer
age = 25
print(f"Age: {age}, Type: {type(age)}")

# Float  
height = 5.8
print(f"Height: {height}, Type: {type(height)}")

# String
name = "Alice"
print(f"Name: {name}, Type: {type(name)}")

# Boolean
is_student = True
print(f"Student: {is_student}, Type: {type(is_student)}")

# Multiple assignment
x, y, z = 1, 2.5, "Hello"
print(f"x={x}, y={y}, z={z}")`
                        },
                        {
                            id: 3,
                            title: 'String Operations',
                            content: `
                                <h2>Working with Strings</h2>
                                <p>Strings are sequences of characters. Python provides many powerful string methods and operations.</p>
                                
                                <h3>Common String Methods</h3>
                                <ul>
                                    <li><code>.upper()</code> - Convert to uppercase</li>
                                    <li><code>.lower()</code> - Convert to lowercase</li>
                                    <li><code>.strip()</code> - Remove whitespace</li>
                                    <li><code>.replace()</code> - Replace text</li>
                                </ul>
                            `,
                            codeExample: `message = "  Hello, Python World!  "

# String methods
print(f"Original: '{message}'")
print(f"Upper: {message.upper()}")
print(f"Lower: {message.lower()}")
print(f"Stripped: '{message.strip()}'")
print(f"Replaced: {message.replace('Python', 'Amazing')}")

# String formatting
name = "Alice"
score = 95.5
print(f"{name} scored {score:.1f}% on the test!")`
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Control Structures',
                    description: 'If/else statements and loops',
                    difficulty: 'beginner',
                    estimatedTime: '3 hours',
                    lessons: [
                        {
                            id: 1,
                            title: 'Conditional Statements',
                            content: `
                                <h2>Making Decisions with If/Else</h2>
                                <p>Conditional statements allow your program to make decisions based on different conditions.</p>
                                
                                <h3>If Statement Structure</h3>
                                <ul>
                                    <li><code>if</code> - Execute if condition is True</li>
                                    <li><code>elif</code> - Alternative condition</li>
                                    <li><code>else</code> - Execute if all conditions are False</li>
                                </ul>
                            `,
                            codeExample: `# Basic if statement
age = 18

if age >= 18:
    print("You are an adult")
    print("You can vote!")
else:
    print("You are a minor")
    print(f"Wait {18 - age} more years")

# Multiple conditions with elif
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")`
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Data Structures',
                    description: 'Lists, dictionaries, and sets',
                    difficulty: 'intermediate',
                    estimatedTime: '4 hours',
                    lessons: [
                        {
                            id: 1,
                            title: 'Working with Lists',
                            content: `
                                <h2>Python Lists - Dynamic Arrays</h2>
                                <p>Lists are ordered collections that can hold different types of data. They're mutable, meaning you can change them after creation.</p>
                            `,
                            codeExample: `# Creating and manipulating lists
fruits = ['apple', 'banana', 'orange']
print(f"Original list: {fruits}")

# Adding items
fruits.append('grape')
fruits.insert(1, 'kiwi')
print(f"After additions: {fruits}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")`
                        }
                    ]
                }
            ]
        },
        javascript: {
            title: 'JavaScript Programming',
            icon: '⚡',
            description: 'Master JavaScript for web development',
            totalModules: 5,
            modules: [
                {
                    id: 1,
                    title: 'JavaScript Fundamentals',
                    description: 'Variables, functions, and basic concepts',
                    difficulty: 'beginner',
                    estimatedTime: '3 hours',
                    lessons: [
                        {
                            id: 1,
                            title: 'Introduction to JavaScript',
                            content: `
                                <h2>Welcome to JavaScript! ⚡</h2>
                                <p>JavaScript is the programming language of the web. Originally created for browsers, it's now used everywhere.</p>
                            `,
                            codeExample: `// Your first JavaScript program
console.log("Hello, JavaScript World!");

// Variables in JavaScript
let message = "Welcome to JavaScript!";
const year = 2024;
var isLearning = true;

console.log(message);
console.log("Current year:", year);`
                        }
                    ]
                }
            ]
        },
        java: {
            title: 'Java Programming',
            icon: '☕',
            description: 'Learn Java for enterprise development',
            totalModules: 6,
            modules: [
                {
                    id: 1,
                    title: 'Java Basics',
                    description: 'Classes, objects, and fundamentals',
                    difficulty: 'beginner',
                    estimatedTime: '3 hours',
                    lessons: []
                }
            ]
        }
    };
    
    static userProgress = {
        'user_1': {
            languages: {
                python: {
                    currentModule: 3,
                    completedModules: [1, 2],
                    totalTimeSpent: 8.5,
                    accuracy: 87.3,
                    exercisesCompleted: 12,
                    lessons: {
                        1: [1, 2, 3],
                        2: [1],
                        3: []
                    }
                },
                javascript: {
                    currentModule: 1,
                    completedModules: [],
                    totalTimeSpent: 3.2,
                    accuracy: 92.1,
                    exercisesCompleted: 4,
                    lessons: {
                        1: [1]
                    }
                }
            },
            badges: [
                {id: 'first_login', name: 'Welcome Aboard', icon: '👋', earned: true, earnedDate: '2024-01-15'},
                {id: 'first_lesson', name: 'First Steps', icon: '🎯', earned: true, earnedDate: '2024-01-15'},
                {id: 'week_streak', name: 'Consistency King', icon: '🔥', earned: true, earnedDate: '2024-01-22'},
                {id: 'hundred_problems', name: 'Century Club', icon: '💯', earned: true, earnedDate: '2024-02-01'},
                {id: 'python_master', name: 'Python Master', icon: '🐍', earned: false}
            ],
            weeklyStats: [2.5, 1.8, 3.2, 2.1, 4.0, 1.5, 2.8]
        }
    };
    
    static challenges = [
        {
            id: 'two_sum',
            title: 'Two Sum Problem',
            description: 'Given an array of integers and a target sum, return indices of two numbers that add up to the target.',
            difficulty: 'easy',
            xpReward: 50,
            category: 'Algorithms',
            featured: true,
            starterCode: `# Two Sum Problem
# Given an array of integers, return indices of two numbers that add up to a target.

def two_sum(nums, target):
    # Your solution here
    pass

# Test cases
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # Expected: [0, 1]`
        },
        {
            id: 'reverse_string',
            title: 'Reverse String',
            description: 'Write a function to reverse a string.',
            difficulty: 'easy',
            xpReward: 25,
            category: 'String Manipulation'
        },
        {
            id: 'fibonacci',
            title: 'Fibonacci Sequence',
            description: 'Generate the nth Fibonacci number efficiently.',
            difficulty: 'medium',
            xpReward: 75,
            category: 'Dynamic Programming'
        }
    ];
    
    static leaderboard = [
        {rank: 1, name: 'CodeNinja', avatar: '🥷', score: 5420},
        {rank: 2, name: 'PyMaster', avatar: '🐍', score: 4890},
        {rank: 3, name: 'JSWizard', avatar: '⚡', score: 4250},
        {rank: 4, name: 'JavaGuru', avatar: '☕', score: 3800},
        {rank: 5, name: 'CppHero', avatar: '⚙️', score: 3200},
        {rank: 6, name: 'Alex Chen', avatar: '🚀', score: 2847, current: true}
    ];
    
    static authenticate(email, password) {
        const user = this.users[email];
        if (user && user.password === password) {
            return { ...user, password: undefined };
        }
        return null;
    }
    
    static createUser(userData) {
        const userId = 'user_' + Date.now();
        this.users[userData.email] = {
            id: userId,
            ...userData,
            joinDate: new Date().toISOString().split('T')[0],
            currentLevel: 1,
            totalXP: 0,
            streak: 0,
            avatar: '🚀'
        };
        
        this.userProgress[userId] = {
            languages: {},
            badges: [{id: 'welcome', name: 'Welcome!', icon: '👋', earned: true}],
            weeklyStats: [0, 0, 0, 0, 0, 0, 0]
        };
        
        return { ...this.users[userData.email], password: undefined };
    }
    
    static getUserProgress(userId) {
        return this.userProgress[userId] || { 
            languages: {}, 
            badges: [], 
            weeklyStats: [0, 0, 0, 0, 0, 0, 0] 
        };
    }
    
    static updateUserProgress(userId, languageId, progressData) {
        if (!this.userProgress[userId]) {
            this.userProgress[userId] = { languages: {}, badges: [], weeklyStats: [0, 0, 0, 0, 0, 0, 0] };
        }
        
        if (!this.userProgress[userId].languages[languageId]) {
            this.userProgress[userId].languages[languageId] = {
                currentModule: 1,
                completedModules: [],
                totalTimeSpent: 0,
                accuracy: 0,
                exercisesCompleted: 0,
                lessons: {}
            };
        }
        
        Object.assign(this.userProgress[userId].languages[languageId], progressData);
        
        // Update user XP and level
        const user = Object.values(this.users).find(u => u.id === userId);
        if (user && progressData.xpGained) {
            user.totalXP += progressData.xpGained;
            user.currentLevel = Math.floor(user.totalXP / 250) + 1;
        }
    }
    
    static getCurriculum(languageId) {
        return this.curriculum[languageId] || null;
    }
    
    static getModule(languageId, moduleId) {
        const curriculum = this.getCurriculum(languageId);
        return curriculum ? curriculum.modules.find(m => m.id === moduleId) : null;
    }
    
    static getChallenge(challengeId) {
        return this.challenges.find(c => c.id === challengeId);
    }
}

// Router System
class Router {
    constructor(appState) {
        this.appState = appState;
        this.routes = {
            'auth': () => this.showPage('auth-page'),
            'dashboard': () => this.showPage('dashboard-page'),
            'languages': () => this.showPage('languages-page'),
            'learning-path': () => this.showPage('learning-path-page'),
            'module': () => this.showPage('module-page'),
            'challenges': () => this.showPage('challenges-page'),
            'profile': () => this.showPage('profile-page')
        };
        
        this.appState.subscribe((newState, oldState) => {
            if (newState.currentRoute !== oldState.currentRoute) {
                this.render();
            }
        });
    }
    
    navigate(route, params = {}) {
        this.appState.setState({ 
            currentRoute: route,
            routeParams: params
        });
    }
    
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
        }
        
        // Show/hide navbar
        const navbar = document.getElementById('navbar');
        if (pageId === 'auth-page') {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    }
    
    render() {
        const route = this.appState.currentRoute;
        if (this.routes[route]) {
            this.routes[route]();
            this.updateNavigation();
        }
    }
    
    updateNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-route="${this.appState.currentRoute}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Component Renderer
class ComponentRenderer {
    static renderDashboard(user, progress) {
        // Update user info in navbar
        const navAvatar = document.getElementById('nav-user-avatar');
        const navName = document.getElementById('nav-user-name');
        const navLevel = document.getElementById('nav-user-level');
        
        if (navAvatar) navAvatar.textContent = user.avatar;
        if (navName) navName.textContent = user.displayName.split(' ')[0];
        if (navLevel) navLevel.textContent = `Level ${user.currentLevel}`;
        
        // Update streak
        const streakEl = document.getElementById('user-streak');
        if (streakEl) streakEl.textContent = user.streak;
        
        // Update stats
        const xpEl = document.getElementById('total-xp');
        const levelEl = document.getElementById('user-level-display');
        const timeEl = document.getElementById('time-spent');
        const accuracyEl = document.getElementById('accuracy-rate');
        
        if (xpEl) xpEl.textContent = user.totalXP.toLocaleString();
        if (levelEl) levelEl.textContent = `Level ${user.currentLevel}`;
        
        // Calculate overall accuracy
        let totalAccuracy = 0;
        let languageCount = 0;
        Object.values(progress.languages).forEach(lang => {
            if (lang.accuracy > 0) {
                totalAccuracy += lang.accuracy;
                languageCount++;
            }
        });
        const avgAccuracy = languageCount > 0 ? (totalAccuracy / languageCount) : 0;
        if (accuracyEl) accuracyEl.textContent = `${avgAccuracy.toFixed(1)}%`;
        
        // Calculate total time
        let totalTime = 0;
        Object.values(progress.languages).forEach(lang => {
            totalTime += lang.totalTimeSpent || 0;
        });
        if (timeEl) timeEl.textContent = `${totalTime.toFixed(1)}h`;
        
        // Render learning progress
        this.renderLearningProgress(progress);
        
        // Render recent badges
        this.renderRecentBadges(progress.badges);
        
        // Render daily challenge
        this.renderDailyChallenge();
        
        // Initialize weekly chart
        setTimeout(() => this.initWeeklyChart(progress.weeklyStats), 100);
    }
    
    static renderLearningProgress(progress) {
        const container = document.getElementById('learning-progress');
        if (!container) return;
        
        const languages = Object.keys(progress.languages);
        
        if (languages.length === 0) {
            container.innerHTML = '<p class="text-muted">No progress yet. Start learning a language!</p>';
            return;
        }
        
        container.innerHTML = languages.map(langId => {
            const langProgress = progress.languages[langId];
            const curriculum = Database.getCurriculum(langId);
            if (!curriculum) return '';
            
            const percentage = Math.round((langProgress.completedModules.length / curriculum.modules.length) * 100);
            
            return `
                <div class="progress-item" style="margin-bottom: 16px;">
                    <div class="flex justify-between items-center" style="margin-bottom: 8px;">
                        <span class="language-name">${curriculum.icon} ${curriculum.title}</span>
                        <span style="color: var(--color-primary); font-weight: 600;">${percentage}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    static renderRecentBadges(badges) {
        const container = document.getElementById('recent-badges');
        if (!container) return;
        
        const earnedBadges = badges.filter(b => b.earned).slice(-4);
        const totalBadges = badges.length;
        const earnedCount = badges.filter(b => b.earned).length;
        
        container.innerHTML = `
            <div class="badge-grid">
                ${earnedBadges.map(badge => `
                    <div class="badge-item earned" title="${badge.name}">
                        <div class="badge-icon">${badge.icon}</div>
                        <div class="badge-name">${badge.name}</div>
                    </div>
                `).join('')}
            </div>
            <p class="text-muted mt-16">${earnedCount} of ${totalBadges} badges earned</p>
        `;
    }
    
    static renderDailyChallenge() {
        const container = document.getElementById('daily-challenge');
        if (!container) return;
        
        const featuredChallenge = Database.challenges.find(c => c.featured);
        
        container.innerHTML = `
            <div class="challenge-info">
                <h4>${featuredChallenge.title}</h4>
                <div class="challenge-meta" style="margin-bottom: 12px;">
                    <span class="challenge-difficulty ${featuredChallenge.difficulty}">${featuredChallenge.difficulty}</span>
                    <span class="xp-reward">+${featuredChallenge.xpReward} XP</span>
                </div>
                <p class="text-muted">${featuredChallenge.description}</p>
            </div>
            <button class="btn btn-primary mt-16" onclick="window.app.openChallenge('${featuredChallenge.id}')">
                Start Challenge
            </button>
        `;
    }
    
    static renderLanguages(user, progress) {
        const container = document.getElementById('languages-grid');
        if (!container) return;
        
        const languages = ['python', 'javascript', 'java'];
        
        container.innerHTML = languages.map(langId => {
            const curriculum = Database.getCurriculum(langId);
            const userProgress = progress.languages[langId];
            
            let progressPercent = 0;
            let moduleText = 'Not Started';
            let stats = {
                modules: `0/${curriculum.modules.length}`,
                exercises: '0',
                time: '0h'
            };
            
            if (userProgress) {
                progressPercent = Math.round((userProgress.completedModules.length / curriculum.modules.length) * 100);
                moduleText = userProgress.completedModules.length > 0 
                    ? `${userProgress.completedModules.length}/${curriculum.modules.length} modules completed`
                    : `Module ${userProgress.currentModule} in progress`;
                    
                stats = {
                    modules: `${userProgress.completedModules.length}/${curriculum.modules.length}`,
                    exercises: `${userProgress.exercisesCompleted || 0}`,
                    time: `${userProgress.totalTimeSpent || 0}h`
                };
            }
            
            return `
                <div class="language-card" onclick="window.app.selectLanguage('${langId}')">
                    <div class="language-header">
                        <div class="language-icon">${curriculum.icon}</div>
                        <div>
                            <h3 class="language-title">${curriculum.title}</h3>
                            <p class="language-description">${curriculum.description}</p>
                        </div>
                    </div>
                    
                    <div class="language-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <div class="progress-text">${moduleText}</div>
                    </div>
                    
                    <div class="language-stats">
                        <div class="language-stat">
                            <span class="stat-value">${stats.modules}</span>
                            <span class="stat-label">Modules</span>
                        </div>
                        <div class="language-stat">
                            <span class="stat-value">${stats.exercises}</span>
                            <span class="stat-label">Exercises</span>
                        </div>
                        <div class="language-stat">
                            <span class="stat-value">${stats.time}</span>
                            <span class="stat-label">Time</span>
                        </div>
                    </div>
                    
                    <div class="language-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); window.app.startLearning('${langId}')">
                            ${userProgress ? 'Continue Learning' : 'Start Learning'}
                        </button>
                        <button class="btn btn-outline" onclick="event.stopPropagation(); window.app.viewModules('${langId}')">
                            View Modules
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    static renderLearningPath(languageId, progress) {
        const curriculum = Database.getCurriculum(languageId);
        if (!curriculum) return;
        
        // Update header
        const iconEl = document.getElementById('current-path-icon');
        const titleEl = document.getElementById('current-path-title');
        const descEl = document.getElementById('current-path-description');
        
        if (iconEl) iconEl.textContent = curriculum.icon;
        if (titleEl) titleEl.textContent = curriculum.title;
        if (descEl) descEl.textContent = curriculum.description;
        
        // Render modules
        const container = document.getElementById('modules-grid');
        if (!container) return;
        
        const userProgress = progress.languages[languageId] || { completedModules: [], currentModule: 1 };
        
        container.innerHTML = curriculum.modules.map(module => {
            const isCompleted = userProgress.completedModules.includes(module.id);
            const isCurrent = module.id === userProgress.currentModule;
            const isLocked = module.id > userProgress.currentModule && !isCompleted;
            
            let cardClass = 'module-card';
            if (isCompleted) cardClass += ' completed';
            if (isCurrent) cardClass += ' current';
            if (isLocked) cardClass += ' locked';
            
            let statusText = '🔒 Locked';
            if (isCompleted) statusText = '✅ Completed';
            else if (isCurrent) statusText = '🎯 Current';
            else if (!isLocked) statusText = '⭐ Available';
            
            return `
                <div class="${cardClass}" onclick="window.app.openModule('${languageId}', ${module.id})" 
                     ${isLocked ? 'style="cursor: not-allowed;"' : ''}>
                    <div class="module-header">
                        <div class="module-number">${module.id}</div>
                        <div class="module-info">
                            <h3>${module.title}</h3>
                            <p class="module-description">${module.description}</p>
                        </div>
                    </div>
                    
                    <div class="module-meta">
                        <span class="difficulty ${module.difficulty}">${module.difficulty}</span>
                        <span class="time-estimate">${module.estimatedTime}</span>
                    </div>
                    
                    <div class="module-status" style="margin-top: 12px;">
                        <small class="text-muted">${statusText}</small>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    static renderModule(languageId, moduleId, lessonId = 1, progress) {
        const module = Database.getModule(languageId, moduleId);
        if (!module) return;
        
        // Update header
        const titleEl = document.getElementById('current-module-title');
        const diffEl = document.getElementById('current-module-difficulty');
        const timeEl = document.getElementById('current-module-time');
        
        if (titleEl) titleEl.textContent = module.title;
        if (diffEl) diffEl.textContent = module.difficulty;
        if (timeEl) timeEl.textContent = module.estimatedTime;
        
        // Render lesson list
        const lessonList = document.getElementById('lesson-list');
        if (lessonList) {
            const userProgress = progress.languages[languageId] || { lessons: {} };
            const completedLessons = userProgress.lessons[moduleId] || [];
            
            lessonList.innerHTML = module.lessons.map((lesson, index) => {
                const isActive = lesson.id === lessonId;
                const isCompleted = completedLessons.includes(lesson.id);
                
                let itemClass = 'lesson-item';
                if (isActive) itemClass += ' active';
                if (isCompleted) itemClass += ' completed';
                
                return `
                    <div class="${itemClass}" onclick="window.app.openLesson(${lesson.id})">
                        <div class="lesson-status">
                            ${isCompleted ? '✓' : isActive ? '▶' : lesson.id}
                        </div>
                        <span>${lesson.title}</span>
                    </div>
                `;
            }).join('');
        }
        
        // Render lesson content
        const currentLesson = module.lessons.find(l => l.id === lessonId);
        this.renderLessonContent(currentLesson);
        
        // Update navigation buttons
        this.updateLessonNavigation(module.lessons, lessonId, languageId, moduleId);
    }
    
    static renderLessonContent(lesson) {
        const container = document.getElementById('lesson-content');
        if (!container || !lesson) return;
        
        container.innerHTML = `
            <div class="lesson-content-wrapper">
                <div class="lesson-text">
                    ${lesson.content}
                </div>
                
                ${lesson.codeExample ? `
                    <div class="code-example">
                        <pre><code>${lesson.codeExample}</code></pre>
                    </div>
                ` : ''}
                
                <div class="lesson-actions mt-16">
                    <button class="btn btn-outline" onclick="window.app.openCodeEditor(\`${lesson.codeExample || '# Start coding here...'}\`)">
                        Try in Editor
                    </button>
                    <button class="btn btn-primary" onclick="window.app.completeLesson()">
                        Mark Complete
                    </button>
                </div>
            </div>
        `;
    }
    
    static updateLessonNavigation(lessons, currentLessonId, languageId, moduleId) {
        const prevBtn = document.getElementById('prev-lesson');
        const nextBtn = document.getElementById('next-lesson');
        
        if (!prevBtn || !nextBtn) return;
        
        const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
        
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= lessons.length - 1;
        
        prevBtn.onclick = () => {
            if (currentIndex > 0) {
                window.app.openLesson(lessons[currentIndex - 1].id);
            }
        };
        
        nextBtn.onclick = () => {
            if (currentIndex < lessons.length - 1) {
                window.app.openLesson(lessons[currentIndex + 1].id);
            }
        };
    }
    
    static renderChallenges() {
        // Render featured challenge
        const featuredChallenge = Database.challenges.find(c => c.featured);
        const featuredContainer = document.getElementById('featured-challenge');
        
        if (featuredContainer && featuredChallenge) {
            featuredContainer.innerHTML = `
                <div class="challenge-header">
                    <h3>${featuredChallenge.title}</h3>
                    <div class="challenge-meta">
                        <span class="challenge-difficulty ${featuredChallenge.difficulty}">${featuredChallenge.difficulty}</span>
                        <span class="xp-reward">+${featuredChallenge.xpReward} XP</span>
                    </div>
                </div>
                <p class="text-muted mb-16">${featuredChallenge.description}</p>
                <button class="btn btn-primary" onclick="window.app.openChallenge('${featuredChallenge.id}')">
                    Start Challenge
                </button>
            `;
        }
        
        // Render challenge list
        const container = document.getElementById('challenges-list');
        if (container) {
            const regularChallenges = Database.challenges.filter(c => !c.featured);
            
            container.innerHTML = regularChallenges.map(challenge => `
                <div class="challenge-card">
                    <h4>${challenge.title}</h4>
                    <div class="challenge-meta mb-12">
                        <span class="challenge-difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                        <span class="xp-reward">+${challenge.xpReward} XP</span>
                    </div>
                    <p class="text-muted mb-16">${challenge.description}</p>
                    <button class="btn btn-outline" onclick="window.app.openChallenge('${challenge.id}')">
                        Solve Challenge
                    </button>
                </div>
            `).join('');
        }
        
        // Render leaderboard
        this.renderLeaderboard();
        
        // Render challenge stats
        this.renderChallengeStats();
        
        // Start countdown timer
        this.startChallengeCountdown();
    }
    
    static renderLeaderboard() {
        const container = document.getElementById('leaderboard');
        if (!container) return;
        
        container.innerHTML = Database.leaderboard.map(player => `
            <div class="leaderboard-item ${player.current ? 'current' : ''}">
                <span class="rank ${player.rank <= 3 ? ['', 'gold', 'silver', 'bronze'][player.rank] : ''}">${player.rank}</span>
                <div class="player-avatar">${player.avatar}</div>
                <span class="player-name">${player.name}</span>
                <span class="player-score">${player.score.toLocaleString()}</span>
            </div>
        `).join('');
    }
    
    static renderChallengeStats() {
        const container = document.getElementById('challenge-stats');
        if (!container) return;
        
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <div class="text-center">
                    <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">24</div>
                    <div class="text-muted" style="font-size: 12px;">Solved</div>
                </div>
                <div class="text-center">
                    <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">87%</div>
                    <div class="text-muted" style="font-size: 12px;">Success Rate</div>
                </div>
                <div class="text-center">
                    <div style="font-size: 24px; font-weight: bold; color: var(--color-primary);">15</div>
                    <div class="text-muted" style="font-size: 12px;">Streak</div>
                </div>
            </div>
        `;
    }
    
    static renderProfile(user, progress) {
        // Update profile info
        const avatarEl = document.getElementById('profile-avatar');
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        const levelEl = document.getElementById('profile-level');
        const xpEl = document.getElementById('profile-xp');
        const streakEl = document.getElementById('profile-streak');
        
        if (avatarEl) avatarEl.textContent = user.avatar;
        if (nameEl) nameEl.textContent = user.displayName;
        if (emailEl) emailEl.textContent = user.email;
        if (levelEl) levelEl.textContent = `Level ${user.currentLevel}`;
        if (xpEl) xpEl.textContent = user.totalXP.toLocaleString();
        if (streakEl) streakEl.textContent = user.streak;
        
        // Update settings
        const emailNotifEl = document.getElementById('email-notifications');
        const pushNotifEl = document.getElementById('push-notifications');
        
        if (emailNotifEl) emailNotifEl.checked = user.preferences.emailNotifications;
        if (pushNotifEl) pushNotifEl.checked = user.preferences.pushNotifications;
        
        // Render achievements
        this.renderAchievements(progress.badges);
    }
    
    static renderAchievements(badges) {
        const container = document.getElementById('achievements-list');
        if (!container) return;
        
        container.innerHTML = badges.map(badge => `
            <div class="achievement-item ${badge.earned ? 'earned' : ''}" style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px; border-radius: 8px;">
                <span style="font-size: 24px;">${badge.icon}</span>
                <div>
                    <div style="font-weight: 600;">${badge.name}</div>
                    <div class="text-muted" style="font-size: 12px;">
                        ${badge.earned ? `Earned on ${badge.earnedDate || 'Unknown'}` : 'Not earned yet'}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    static initWeeklyChart(weeklyStats) {
        const canvas = document.getElementById('weekly-chart');
        if (!canvas || window.weeklyChart) return;
        
        const ctx = canvas.getContext('2d');
        
        window.weeklyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Coding Hours',
                    data: weeklyStats,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        },
                        grid: {
                            color: 'var(--color-border)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'var(--color-text-secondary)'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    static startChallengeCountdown() {
        let timeLeft = 23 * 3600 + 45 * 60 + 12; // 23:45:12 in seconds
        
        const updateCountdown = () => {
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            const timerElement = document.getElementById('challenge-countdown');
            if (timerElement) {
                timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
            
            timeLeft--;
            if (timeLeft < 0) {
                timeLeft = 24 * 3600; // Reset to 24 hours
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// Code Editor
class CodeEditor {
    static init() {
        const runBtn = document.getElementById('run-code');
        const clearBtn = document.getElementById('clear-output');
        
        if (runBtn) {
            runBtn.addEventListener('click', this.runCode.bind(this));
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', this.clearOutput);
        }
    }
    
    static runCode() {
        const editor = document.getElementById('code-editor');
        const output = document.getElementById('code-output');
        const runBtn = document.getElementById('run-code');
        
        if (!editor || !output) return;
        
        const code = editor.value;
        
        // Show loading state
        runBtn.textContent = '⏳ Running...';
        runBtn.disabled = true;
        
        // Simulate code execution
        setTimeout(() => {
            const results = this.simulateExecution(code);
            output.innerHTML = results.map(result => 
                `<div class="output-line ${result.type}">${result.text}</div>`
            ).join('');
            
            runBtn.textContent = '▶ Run';
            runBtn.disabled = false;
        }, 1000);
    }
    
    static simulateExecution(code) {
        const results = [];
        
        try {
            if (!code.trim()) {
                results.push({type: 'error', text: 'No code to execute'});
                return results;
            }
            
            // Simple simulation based on code content
            if (code.includes('print(') || code.includes('console.log(')) {
                results.push({type: 'success', text: 'Hello, World!'});
                results.push({type: 'success', text: 'Code executed successfully!'});
            } else if (code.includes('def ') || code.includes('function ')) {
                results.push({type: '', text: 'Function defined successfully'});
            } else {
                results.push({type: '', text: 'Code syntax is valid'});
            }
            
            results.push({type: '', text: `Execution time: ${(Math.random() * 0.5).toFixed(3)}s`});
            
        } catch (error) {
            results.push({type: 'error', text: `Error: ${error.message}`});
        }
        
        return results;
    }
    
    static clearOutput() {
        const output = document.getElementById('code-output');
        if (output) {
            output.innerHTML = '<div class="output-line">Output cleared.</div>';
        }
    }
}

// Toast Notifications
class Toast {
    static show(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    }
    
    static success(message) {
        this.show(message, 'success');
    }
    
    static error(message) {
        this.show(message, 'error');
    }
    
    static warning(message) {
        this.show(message, 'warning');
    }
}

// Main Application Class
class CodeMateApp {
    constructor() {
        this.state = new AppState();
        this.router = new Router(this.state);
        this.init();
    }
    
    init() {
        // Hide loading spinner after delay
        setTimeout(() => {
            const loadingSpinner = document.getElementById('loading-spinner');
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
            
            this.setupEventListeners();
            this.setupStateSubscription();
            this.router.render();
        }, 1500);
    }
    
    setupEventListeners() {
        // Auth forms
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const demoBtn = document.getElementById('demo-login');
        
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
        if (registerForm) {
            registerForm.addEventListener('submit', this.handleRegister.bind(this));
        }
        if (demoBtn) {
            demoBtn.addEventListener('click', this.handleDemoLogin.bind(this));
        }
        
        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', this.handleAuthTab.bind(this));
        });
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavigation.bind(this));
        });
        
        // User menu
        const userMenu = document.querySelector('.user-menu');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (userMenu) {
            userMenu.addEventListener('click', this.toggleUserMenu);
        }
        if (logoutBtn) {
            logoutBtn.addEventListener('click', this.handleLogout.bind(this));
        }
        
        // Back buttons
        const backToLanguages = document.getElementById('back-to-languages');
        const backToPath = document.getElementById('back-to-path');
        
        if (backToLanguages) {
            backToLanguages.addEventListener('click', () => {
                this.router.navigate('languages');
            });
        }
        if (backToPath) {
            backToPath.addEventListener('click', () => {
                this.router.navigate('learning-path');
            });
        }
        
        // Profile actions
        const changeAvatar = document.getElementById('change-avatar');
        const saveAvatar = document.getElementById('save-avatar');
        const saveSettings = document.getElementById('save-settings');
        
        if (changeAvatar) {
            changeAvatar.addEventListener('click', this.openAvatarModal);
        }
        if (saveAvatar) {
            saveAvatar.addEventListener('click', this.saveAvatar.bind(this));
        }
        if (saveSettings) {
            saveSettings.addEventListener('click', this.saveSettings.bind(this));
        }
        
        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', this.closeModal);
        });
        
        // Avatar selection
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.addEventListener('click', this.selectAvatar);
        });
        
        // Code editor
        CodeEditor.init();
    }
    
    setupStateSubscription() {
        this.state.subscribe((newState, oldState) => {
            if (newState.currentUser) {
                const progress = Database.getUserProgress(newState.currentUser.id);
                
                switch (newState.currentRoute) {
                    case 'dashboard':
                        ComponentRenderer.renderDashboard(newState.currentUser, progress);
                        break;
                    case 'languages':
                        ComponentRenderer.renderLanguages(newState.currentUser, progress);
                        break;
                    case 'learning-path':
                        if (newState.currentLanguage) {
                            ComponentRenderer.renderLearningPath(newState.currentLanguage, progress);
                        }
                        break;
                    case 'module':
                        if (newState.currentLanguage && newState.currentModule) {
                            ComponentRenderer.renderModule(
                                newState.currentLanguage, 
                                newState.currentModule, 
                                newState.currentLesson,
                                progress
                            );
                        }
                        break;
                    case 'challenges':
                        ComponentRenderer.renderChallenges();
                        break;
                    case 'profile':
                        ComponentRenderer.renderProfile(newState.currentUser, progress);
                        break;
                }
            }
        });
    }
    
    // Authentication methods
    handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const user = Database.authenticate(email, password);
        if (user) {
            this.state.setState({
                currentUser: user,
                currentRoute: 'dashboard'
            });
            Toast.success(`Welcome back, ${user.displayName}! 🎉`);
        } else {
            Toast.error('Invalid credentials. Try the demo account.');
        }
    }
    
    handleRegister(event) {
        event.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        if (password !== confirmPassword) {
            Toast.error('Passwords do not match');
            return;
        }
        
        if (Database.users[email]) {
            Toast.error('User already exists');
            return;
        }
        
        const user = Database.createUser({
            displayName: name,
            email,
            password
        });
        
        this.state.setState({
            currentUser: user,
            currentRoute: 'dashboard'
        });
        Toast.success('Account created successfully! 🚀');
    }
    
    handleDemoLogin() {
        const user = Database.authenticate('alex@codemate.com', 'password123');
        if (user) {
            this.state.setState({
                currentUser: user,
                currentRoute: 'dashboard'
            });
            Toast.success('Welcome to CodeMate! Try exploring the features.');
        } else {
            Toast.error('Demo account not available');
        }
    }
    
    handleLogout() {
        this.state.setState({
            currentUser: null,
            currentRoute: 'auth'
        });
        Toast.success('Logged out successfully');
    }
    
    handleAuthTab(event) {
        const tab = event.target;
        const isLogin = tab.dataset.tab === 'login';
        
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        
        if (loginForm && registerForm) {
            loginForm.classList.toggle('hidden', !isLogin);
            registerForm.classList.toggle('hidden', isLogin);
        }
    }
    
    // Navigation methods
    handleNavigation(event) {
        event.preventDefault();
        const route = event.target.dataset.route;
        this.router.navigate(route);
    }
    
    toggleUserMenu() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
    
    // Learning methods
    selectLanguage(languageId) {
        this.state.setState({
            currentLanguage: languageId,
            currentRoute: 'learning-path'
        });
    }
    
    startLearning(languageId) {
        this.state.setState({
            currentLanguage: languageId,
            currentRoute: 'learning-path'
        });
    }
    
    viewModules(languageId) {
        this.state.setState({
            currentLanguage: languageId,
            currentRoute: 'learning-path'
        });
    }
    
    openModule(languageId, moduleId) {
        const progress = Database.getUserProgress(this.state.currentUser.id);
        const userProgress = progress.languages[languageId] || { completedModules: [], currentModule: 1 };
        
        if (moduleId > userProgress.currentModule && !userProgress.completedModules.includes(moduleId)) {
            Toast.warning('Complete previous modules to unlock this one!');
            return;
        }
        
        this.state.setState({
            currentLanguage: languageId,
            currentModule: moduleId,
            currentLesson: 1,
            currentRoute: 'module'
        });
    }
    
    openLesson(lessonId) {
        this.state.setState({
            currentLesson: lessonId
        });
    }
    
    completeLesson() {
        const { currentUser, currentLanguage, currentModule, currentLesson } = this.state;
        const progress = Database.getUserProgress(currentUser.id);
        
        if (!progress.languages[currentLanguage]) {
            progress.languages[currentLanguage] = { lessons: {} };
        }
        if (!progress.languages[currentLanguage].lessons[currentModule]) {
            progress.languages[currentLanguage].lessons[currentModule] = [];
        }
        
        const completedLessons = progress.languages[currentLanguage].lessons[currentModule];
        if (!completedLessons.includes(currentLesson)) {
            completedLessons.push(currentLesson);
            
            Database.updateUserProgress(currentUser.id, currentLanguage, {
                xpGained: 25
            });
            
            Toast.success('Lesson completed! +25 XP 🎉');
            
            // Update user XP in state
            const updatedUser = { ...currentUser, totalXP: currentUser.totalXP + 25 };
            this.state.setState({ currentUser: updatedUser });
        }
    }
    
    // Challenge methods
    openChallenge(challengeId) {
        const challenge = Database.getChallenge(challengeId);
        if (challenge && challenge.starterCode) {
            this.openCodeEditor(challenge.starterCode);
            Toast.success('Challenge loaded in editor! Good luck! 🎯');
        } else {
            this.openCodeEditor('# Challenge code will be provided here...');
        }
    }
    
    // Code editor methods
    openCodeEditor(code = '') {
        const modal = document.getElementById('editor-modal');
        const editor = document.getElementById('code-editor');
        
        if (modal) {
            modal.classList.remove('hidden');
        }
        if (editor && code) {
            editor.value = code;
        }
    }
    
    // Profile methods
    openAvatarModal() {
        const modal = document.getElementById('avatar-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
    
    selectAvatar(event) {
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('active'));
        event.target.classList.add('active');
    }
    
    saveAvatar() {
        const selectedAvatar = document.querySelector('.avatar-option.active');
        if (selectedAvatar && this.state.currentUser) {
            const newAvatar = selectedAvatar.dataset.avatar;
            const updatedUser = { ...this.state.currentUser, avatar: newAvatar };
            
            this.state.setState({ currentUser: updatedUser });
            this.closeModal();
            Toast.success(`Avatar updated to ${newAvatar}!`);
        }
    }
    
    saveSettings() {
        const emailNotifications = document.getElementById('email-notifications');
        const pushNotifications = document.getElementById('push-notifications');
        
        if (!emailNotifications || !pushNotifications || !this.state.currentUser) return;
        
        const updatedUser = {
            ...this.state.currentUser,
            preferences: {
                emailNotifications: emailNotifications.checked,
                pushNotifications: pushNotifications.checked
            }
        };
        
        this.state.setState({ currentUser: updatedUser });
        Toast.success('Settings saved successfully!');
    }
    
    // Modal methods
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.app = new CodeMateApp();
        console.log('🤖 CodeMate initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize CodeMate:', error);
        Toast.error('Failed to initialize application');
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    if (window.Toast) {
        Toast.error('An error occurred. Please refresh the page.');
    }
});

// Export for debugging
window.Database = Database;
window.Toast = Toast;