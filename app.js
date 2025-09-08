// CodeMate Pro - Advanced AI-Powered Coding Education Platform
// Simulated React-like functionality with routing and state management

// Application State Management
class AppState {
    constructor() {
        this.currentUser = null;
        this.currentRoute = 'login';
        this.currentLanguage = null;
        this.currentModule = null;
        this.currentLesson = 0;
        this.listeners = {};
        
        // Initialize from localStorage
        this.loadState();
    }
    
    loadState() {
        const savedUser = localStorage.getItem('codeMateUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.currentRoute = 'dashboard';
        }
    }
    
    saveState() {
        if (this.currentUser) {
            localStorage.setItem('codeMateUser', JSON.stringify(this.currentUser));
            localStorage.setItem('userProgress', JSON.stringify(Database.getUserProgress(this.currentUser.id)));
        }
    }
    
    setState(newState) {
        Object.assign(this, newState);
        this.saveState();
        this.notifyListeners();
    }
    
    subscribe(callback) {
        const id = Date.now() + Math.random();
        this.listeners[id] = callback;
        return () => delete this.listeners[id];
    }
    
    notifyListeners() {
        Object.values(this.listeners).forEach(callback => callback(this));
    }
}

// Simulated Database
class Database {
    static users = {
        'alex@example.com': {
            id: 'user1',
            email: 'alex@example.com',
            displayName: 'Alex Chen',
            password: 'password123',
            joinDate: '2024-06-15',
            avatar: '🚀',
            currentLevel: 12,
            totalXP: 2847,
            streak: 15,
            preferences: {
                theme: 'dark',
                notifications: true
            }
        }
    };
    
    static curriculum = {
        python: {
            title: "Python Programming",
            icon: "🐍",
            description: "Learn Python from basics to advanced topics",
            modules: [
                {
                    id: 1,
                    title: "Python Basics",
                    description: "Variables, data types, and basic operations",
                    difficulty: "Beginner",
                    estimatedTime: "2 hours",
                    lessons: [
                        {
                            id: 1,
                            title: "Introduction to Python",
                            content: `
                                <h2>Welcome to Python Programming!</h2>
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
# Comments help explain your code`,
                            exercise: {
                                title: "Your First Program",
                                description: "Create a program that prints your name and favorite programming language.",
                                starterCode: "# Write your first Python program here\n# Print your name and favorite language",
                                solution: `print("My name is Alex")
print("My favorite language is Python!")`
                            }
                        },
                        {
                            id: 2,
                            title: "Variables and Data Types",
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
                                
                                <h3>Creating Variables</h3>
                                <p>In Python, you don't need to declare variable types explicitly:</p>
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
print(f"x={x}, y={y}, z={z}")`,
                            exercise: {
                                title: "Personal Information",
                                description: "Create variables for your personal information and display them using f-strings.",
                                starterCode: "# Create variables for your personal information\n# Use f-strings to display them nicely",
                                solution: `name = "Alex"
age = 20
height = 5.9
is_programmer = True
hobby = "coding"

print(f"Hi! My name is {name}")
print(f"I am {age} years old and {height} feet tall")
print(f"Am I a programmer? {is_programmer}")
print(f"My favorite hobby is {hobby}")`
                            }
                        },
                        {
                            id: 3,
                            title: "String Operations",
                            content: `
                                <h2>Working with Strings</h2>
                                <p>Strings are sequences of characters. Python provides many powerful string methods and operations.</p>
                                
                                <h3>String Methods</h3>
                                <ul>
                                    <li><code>.upper()</code> - Convert to uppercase</li>
                                    <li><code>.lower()</code> - Convert to lowercase</li>
                                    <li><code>.strip()</code> - Remove whitespace</li>
                                    <li><code>.replace()</code> - Replace text</li>
                                    <li><code>.split()</code> - Split into list</li>
                                </ul>
                            `,
                            codeExample: `message = "  Hello, Python World!  "

# String methods
print(f"Original: '{message}'")
print(f"Upper: {message.upper()}")
print(f"Lower: {message.lower()}")
print(f"Stripped: '{message.strip()}'")
print(f"Replaced: {message.replace('Python', 'Amazing')}")
print(f"Split: {message.strip().split(', ')}")

# String formatting
name = "Alice"
score = 95.5
print(f"{name} scored {score:.1f}% on the test!")`,
                            exercise: {
                                title: "Text Processor",
                                description: "Create a program that processes user input text with various string operations.",
                                starterCode: "# Create a text processing program",
                                solution: `text = "  Welcome to PYTHON programming!  "

print("Original text:", repr(text))
print("Cleaned:", text.strip())
print("Lowercase:", text.strip().lower())
print("Title case:", text.strip().title())
print("Word count:", len(text.strip().split()))
print("Contains 'PYTHON':", "PYTHON" in text)`
                            }
                        }
                    ],
                    exercises: [
                        {
                            title: "Calculator",
                            description: "Build a simple calculator that performs basic arithmetic operations.",
                            starterCode: "# Build a simple calculator\n# Ask user for two numbers and an operation",
                            solution: `# Simple Calculator
num1 = float(input("Enter first number: "))
operator = input("Enter operator (+, -, *, /): ")
num2 = float(input("Enter second number: "))

if operator == '+':
    result = num1 + num2
elif operator == '-':
    result = num1 - num2
elif operator == '*':
    result = num1 * num2
elif operator == '/':
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Error: Division by zero!"
else:
    result = "Error: Invalid operator!"

print(f"Result: {result}")`
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Control Structures",
                    description: "If/else statements and loops",
                    difficulty: "Beginner",
                    estimatedTime: "3 hours",
                    lessons: [
                        {
                            id: 1,
                            title: "Conditional Statements",
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

print(f"Your grade is: {grade}")`,
                            exercise: {
                                title: "Grade Calculator",
                                description: "Create a program that converts numerical scores to letter grades.",
                                starterCode: "# Grade calculator program",
                                solution: `score = int(input("Enter your score (0-100): "))

if score >= 90:
    grade = "A"
    message = "Excellent work!"
elif score >= 80:
    grade = "B"
    message = "Good job!"
elif score >= 70:
    grade = "C"
    message = "Satisfactory"
elif score >= 60:
    grade = "D"
    message = "Needs improvement"
else:
    grade = "F"
    message = "Please study harder"

print(f"Grade: {grade}")
print(message)`
                            }
                        },
                        {
                            id: 2,
                            title: "Loops - For and While",
                            content: `
                                <h2>Repeating Code with Loops</h2>
                                <p>Loops allow you to repeat code multiple times efficiently.</p>
                                
                                <h3>For Loops</h3>
                                <p>Use for loops when you know how many times to repeat:</p>
                                
                                <h3>While Loops</h3>
                                <p>Use while loops when you need to repeat until a condition is met:</p>
                            `,
                            codeExample: `# For loop with range
print("Counting from 1 to 5:")
for i in range(1, 6):
    print(f"Count: {i}")

# For loop with list
fruits = ["apple", "banana", "orange"]
print("\nFruits in my basket:")
for fruit in fruits:
    print(f"- {fruit}")

# While loop
count = 0
print("\nCountdown:")
while count < 5:
    print(f"T-minus {5 - count}")
    count += 1
print("Blast off! 🚀")

# Loop with break and continue
print("\nNumbers 1-10, skipping 5:")
for num in range(1, 11):
    if num == 5:
        continue  # Skip 5
    if num == 8:
        break     # Stop at 8
    print(num)`,
                            exercise: {
                                title: "Number Guessing Game",
                                description: "Create a number guessing game using loops and conditionals.",
                                starterCode: "import random\n# Create a number guessing game",
                                solution: `import random

# Number guessing game
secret_number = random.randint(1, 10)
max_attempts = 3
attempts = 0

print("Welcome to the Number Guessing Game!")
print("I'm thinking of a number between 1 and 10.")
print(f"You have {max_attempts} attempts.")

while attempts < max_attempts:
    guess = int(input("Enter your guess: "))
    attempts += 1
    
    if guess == secret_number:
        print(f"Congratulations! You guessed it in {attempts} attempts!")
        break
    elif guess < secret_number:
        print("Too low!")
    else:
        print("Too high!")
    
    remaining = max_attempts - attempts
    if remaining > 0:
        print(f"You have {remaining} attempts left.")
    else:
        print(f"Game over! The number was {secret_number}")
        
print("Thanks for playing!")`
                            }
                        }
                    ],
                    exercises: [
                        {
                            title: "Pattern Printer",
                            description: "Use nested loops to create various patterns.",
                            starterCode: "# Create pattern printing program",
                            solution: `# Pattern printer
rows = 5

print("Pattern 1 - Right Triangle:")
for i in range(1, rows + 1):
    for j in range(i):
        print("*", end="")
    print()

print("\nPattern 2 - Pyramid:")
for i in range(1, rows + 1):
    # Print spaces
    for j in range(rows - i):
        print(" ", end="")
    # Print stars
    for k in range(2 * i - 1):
        print("*", end="")
    print()

print("\nPattern 3 - Number Triangle:")
for i in range(1, rows + 1):
    for j in range(1, i + 1):
        print(j, end="")
    print()`
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Data Structures",
                    description: "Lists, dictionaries, and sets",
                    difficulty: "Intermediate",
                    estimatedTime: "4 hours",
                    lessons: [
                        {
                            id: 1,
                            title: "Working with Lists",
                            content: `
                                <h2>Python Lists - Dynamic Arrays</h2>
                                <p>Lists are ordered collections that can hold different types of data. They're mutable, meaning you can change them after creation.</p>
                                
                                <h3>List Operations</h3>
                                <ul>
                                    <li><code>.append()</code> - Add item to end</li>
                                    <li><code>.insert()</code> - Add item at specific position</li>
                                    <li><code>.remove()</code> - Remove first occurrence</li>
                                    <li><code>.pop()</code> - Remove and return item</li>
                                    <li><code>.sort()</code> - Sort the list</li>
                                </ul>
                            `,
                            codeExample: `# Creating and manipulating lists
fruits = ['apple', 'banana', 'orange']
print(f"Original list: {fruits}")

# Adding items
fruits.append('grape')
fruits.insert(1, 'kiwi')
print(f"After additions: {fruits}")

# Accessing items
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")
print(f"Slice [1:3]: {fruits[1:3]}")

# List methods
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"Original numbers: {numbers}")
print(f"Length: {len(numbers)}")
print(f"Max: {max(numbers)}")
print(f"Sum: {sum(numbers)}")

# Sorting
numbers.sort()
print(f"Sorted: {numbers}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")`,
                            exercise: {
                                title: "To-Do List Manager",
                                description: "Create a simple to-do list manager with add, remove, and display functions.",
                                starterCode: "# Build a to-do list manager",
                                solution: `# To-Do List Manager
todo_list = []

def add_task(task):
    todo_list.append(task)
    print(f"Added: '{task}'")

def remove_task(task):
    if task in todo_list:
        todo_list.remove(task)
        print(f"Removed: '{task}'")
    else:
        print(f"Task '{task}' not found")

def display_tasks():
    if todo_list:
        print("\nYour To-Do List:")
        for i, task in enumerate(todo_list, 1):
            print(f"{i}. {task}")
    else:
        print("No tasks in your list!")

# Demo usage
add_task("Buy groceries")
add_task("Study Python")
add_task("Exercise")
display_tasks()
remove_task("Buy groceries")
display_tasks()`
                            }
                        }
                    ],
                    exercises: [
                        {
                            title: "Contact Book",
                            description: "Build a contact management system using dictionaries.",
                            starterCode: "# Contact book using dictionaries",
                            solution: `# Contact Book
contacts = {}

def add_contact(name, phone, email=""):
    contacts[name] = {
        'phone': phone,
        'email': email
    }
    print(f"Added contact: {name}")

def find_contact(name):
    if name in contacts:
        contact = contacts[name]
        print(f"Name: {name}")
        print(f"Phone: {contact['phone']}")
        print(f"Email: {contact['email']}")
    else:
        print(f"Contact '{name}' not found")

def list_contacts():
    if contacts:
        print("\\nAll Contacts:")
        for name in sorted(contacts.keys()):
            print(f"- {name}: {contacts[name]['phone']}")
    else:
        print("No contacts saved")

# Demo
add_contact("Alice", "555-1234", "alice@email.com")
add_contact("Bob", "555-5678")
list_contacts()
find_contact("Alice")`
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Functions & Modules",
                    description: "Creating reusable code with functions",
                    difficulty: "Intermediate",
                    estimatedTime: "3 hours",
                    lessons: [],
                    exercises: []
                },
                {
                    id: 5,
                    title: "Object-Oriented Programming",
                    description: "Classes, objects, and inheritance",
                    difficulty: "Advanced",
                    estimatedTime: "5 hours",
                    lessons: [],
                    exercises: []
                },
                {
                    id: 6,
                    title: "File Handling & Exceptions",
                    description: "Working with files and error handling",
                    difficulty: "Advanced",
                    estimatedTime: "4 hours",
                    lessons: [],
                    exercises: []
                },
                {
                    id: 7,
                    title: "Advanced Topics",
                    description: "Generators, decorators, and web APIs",
                    difficulty: "Expert",
                    estimatedTime: "6 hours",
                    lessons: [],
                    exercises: []
                }
            ]
        },
        javascript: {
            title: "JavaScript Programming",
            icon: "⚡",
            description: "Master JavaScript for web development",
            modules: [
                {
                    id: 1,
                    title: "JavaScript Fundamentals",
                    description: "Variables, functions, and basic concepts",
                    difficulty: "Beginner",
                    estimatedTime: "3 hours",
                    lessons: [
                        {
                            id: 1,
                            title: "Introduction to JavaScript",
                            content: `
                                <h2>Welcome to JavaScript!</h2>
                                <p>JavaScript is the programming language of the web. Originally created for browsers, it's now used everywhere: web development, mobile apps, desktop applications, and even servers.</p>
                                
                                <h3>What makes JavaScript special?</h3>
                                <ul>
                                    <li><strong>Dynamic:</strong> Variables can change types</li>
                                    <li><strong>Interpreted:</strong> No compilation needed</li>
                                    <li><strong>Event-driven:</strong> Responds to user interactions</li>
                                    <li><strong>Versatile:</strong> Frontend, backend, mobile, desktop</li>
                                </ul>
                            `,
                            codeExample: `// Your first JavaScript program
console.log("Hello, JavaScript World!");

// Variables in JavaScript
let message = "Welcome to JavaScript!";
const year = 2024;
var isLearning = true;

console.log(message);
console.log("Current year:", year);
console.log("Am I learning?", isLearning);

// JavaScript is dynamic
let dynamicVariable = "I'm a string";
console.log(typeof dynamicVariable); // "string"

dynamicVariable = 42;
console.log(typeof dynamicVariable); // "number"

dynamicVariable = true;
console.log(typeof dynamicVariable); // "boolean"`,
                            exercise: {
                                title: "Interactive Greeting",
                                description: "Create a program that greets users based on the time of day.",
                                starterCode: "// Create an interactive greeting",
                                solution: `// Interactive greeting based on time
const currentHour = new Date().getHours();
let greeting;

if (currentHour < 12) {
    greeting = "Good morning";
} else if (currentHour < 17) {
    greeting = "Good afternoon";
} else {
    greeting = "Good evening";
}

const userName = "JavaScript Learner";
console.log(\`\${greeting}, \${userName}!\`);
console.log("Welcome to your coding journey!");
console.log(\`It's currently \${currentHour}:00\`);`
                            }
                        }
                    ],
                    exercises: []
                },
                {
                    id: 2,
                    title: "DOM & Events",
                    description: "Manipulating web pages with JavaScript",
                    difficulty: "Beginner",
                    estimatedTime: "4 hours",
                    lessons: [],
                    exercises: []
                },
                {
                    id: 3,
                    title: "ES6+ Features",
                    description: "Modern JavaScript features and syntax",
                    difficulty: "Intermediate",
                    estimatedTime: "3 hours",
                    lessons: [],
                    exercises: []
                },
                {
                    id: 4,
                    title: "Web APIs & AJAX",
                    description: "Working with external APIs and data",
                    difficulty: "Intermediate",
                    estimatedTime: "4 hours",
                    lessons: [],
                    exercises: []
                },
                {
                    id: 5,
                    title: "Frontend Frameworks Intro",
                    description: "Introduction to React and component-based development",
                    difficulty: "Advanced",
                    estimatedTime: "5 hours",
                    lessons: [],
                    exercises: []
                }
            ]
        },
        java: {
            title: "Java Programming",
            icon: "☕",
            description: "Learn Java for enterprise development",
            modules: [
                {id: 1, title: "Java Basics", difficulty: "Beginner", estimatedTime: "3 hours", lessons: [], exercises: []},
                {id: 2, title: "OOP Concepts", difficulty: "Intermediate", estimatedTime: "4 hours", lessons: [], exercises: []},
                {id: 3, title: "Collections Framework", difficulty: "Intermediate", estimatedTime: "4 hours", lessons: [], exercises: []},
                {id: 4, title: "Exception Handling", difficulty: "Advanced", estimatedTime: "3 hours", lessons: [], exercises: []},
                {id: 5, title: "File I/O & Streams", difficulty: "Advanced", estimatedTime: "4 hours", lessons: [], exercises: []},
                {id: 6, title: "Multithreading", difficulty: "Expert", estimatedTime: "5 hours", lessons: [], exercises: []},
                {id: 7, title: "Spring Framework", difficulty: "Expert", estimatedTime: "6 hours", lessons: [], exercises: []}
            ]
        }
    };
    
    static userProgress = {
        'user1': {
            languages: {
                python: {
                    currentModule: 3,
                    completedModules: [1, 2],
                    totalTimeSpent: 8.5,
                    accuracy: 87.3,
                    exercisesCompleted: 12,
                    lessons: {
                        1: { completed: [1, 2, 3], current: null },
                        2: { completed: [1, 2], current: null },
                        3: { completed: [], current: 1 }
                    }
                },
                javascript: {
                    currentModule: 2,
                    completedModules: [1],
                    totalTimeSpent: 3.2,
                    accuracy: 92.1,
                    exercisesCompleted: 4,
                    lessons: {
                        1: { completed: [1], current: null },
                        2: { completed: [], current: 1 }
                    }
                }
            },
            badges: [
                {id: 'first_steps', name: 'First Steps', icon: '🎯', earned: true},
                {id: 'week_streak', name: '7-Day Streak', icon: '🔥', earned: true},
                {id: 'hundred_problems', name: 'Century Mark', icon: '💯', earned: true},
                {id: 'night_coder', name: 'Night Owl', icon: '🌙', earned: true},
                {id: 'python_basics', name: 'Python Basics', icon: '🐍', earned: false}
            ],
            weeklyStats: {
                currentWeek: '2025-09-02',
                hoursThisWeek: 12.5,
                problemsSolved: 23
            }
        }
    };
    
    static authenticate(email, password) {
        const user = this.users[email];
        if (user && user.password === password) {
            return { ...user };
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
        
        // Initialize progress
        this.userProgress[userId] = {
            languages: {},
            badges: [{id: 'welcome', name: 'Welcome!', icon: '👋', earned: true}],
            weeklyStats: {
                currentWeek: new Date().toISOString().split('T')[0],
                hoursThisWeek: 0,
                problemsSolved: 0
            }
        };
        
        return this.users[userData.email];
    }
    
    static getUserProgress(userId) {
        return this.userProgress[userId] || { languages: {}, badges: [], weeklyStats: {} };
    }
    
    static updateProgress(userId, languageId, progressData) {
        if (!this.userProgress[userId]) {
            this.userProgress[userId] = { languages: {}, badges: [], weeklyStats: {} };
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
        
        // Update XP and level
        const user = Object.values(this.users).find(u => u.id === userId);
        if (user) {
            user.totalXP += progressData.xpGained || 0;
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
}

// Router System
class Router {
    constructor(appState) {
        this.appState = appState;
        this.routes = {
            'login': () => this.showPage('login-page'),
            'dashboard': () => this.showPage('dashboard-page'),
            'languages': () => this.showPage('languages-page'),
            'learning-path': () => this.showPage('learning-path-page'),
            'module': () => this.showPage('module-page'),
            'editor': () => this.showPage('editor-page'),
            'challenges': () => this.showPage('challenges-page'),
            'profile': () => this.showPage('profile-page')
        };
        
        this.appState.subscribe(() => this.render());
    }
    
    navigate(route, params = {}) {
        this.appState.setState({ 
            currentRoute: route,
            routeParams: params
        });
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
        }
        
        // Show/hide navbar
        const navbar = document.getElementById('navbar');
        if (pageId === 'login-page') {
            navbar.style.display = 'none';
        } else {
            navbar.style.display = 'block';
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

// Application Components
class Components {
    static renderDashboard(user, progress) {
        // Update user info
        document.getElementById('user-name').textContent = user.displayName;
        document.getElementById('streak-count').textContent = user.streak;
        document.getElementById('xp-count').textContent = user.totalXP.toLocaleString();
        
        // Update progress overview
        const progressOverview = document.querySelector('.progress-overview');
        if (progressOverview && progress.languages) {
            const languages = Object.keys(progress.languages);
            progressOverview.innerHTML = languages.map(lang => {
                const langProgress = progress.languages[lang];
                const curriculum = Database.getCurriculum(lang);
                const percentage = Math.round((langProgress.completedModules.length / curriculum.modules.length) * 100);
                
                return `
                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="language-name">${curriculum.icon} ${curriculum.title}</span>
                            <span class="progress-percent">${percentage}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        // Initialize activity chart
        setTimeout(() => Components.initActivityChart(), 100);
    }
    
    static renderLanguages(user, progress) {
        const languagesGrid = document.querySelector('.languages-grid');
        if (!languagesGrid) return;
        
        const languages = ['python', 'javascript', 'java'];
        
        languagesGrid.innerHTML = languages.map(langId => {
            const curriculum = Database.getCurriculum(langId);
            const userLangProgress = progress.languages[langId];
            
            let progressPercent = 0;
            let moduleText = 'Not Started';
            let stats = {
                modules: `0/${curriculum.modules.length} Complete`,
                exercises: '0 Completed',
                time: '0 hours'
            };
            
            if (userLangProgress) {
                progressPercent = Math.round((userLangProgress.completedModules.length / curriculum.modules.length) * 100);
                moduleText = `Module ${userLangProgress.currentModule} of ${curriculum.modules.length} - ${progressPercent}% Complete`;
                stats = {
                    modules: `${userLangProgress.completedModules.length}/${curriculum.modules.length} Complete`,
                    exercises: `${userLangProgress.exercisesCompleted} Completed`,
                    time: `${userLangProgress.totalTimeSpent} hours`
                };
            }
            
            return `
                <div class="language-card" data-language="${langId}">
                    <div class="language-header">
                        <div class="language-icon">${curriculum.icon}</div>
                        <div class="language-info">
                            <h3>${curriculum.title}</h3>
                            <p>${curriculum.description}</p>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <span class="progress-text">${moduleText}</span>
                    </div>
                    <div class="language-stats">
                        <div class="stat">
                            <span class="stat-label">Modules:</span>
                            <span class="stat-value">${stats.modules}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Exercises:</span>
                            <span class="stat-value">${stats.exercises}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Time:</span>
                            <span class="stat-value">${stats.time}</span>
                        </div>
                    </div>
                    <div class="language-actions">
                        <button class="btn btn-primary language-continue" data-language="${langId}">
                            ${userLangProgress ? 'Continue Learning' : 'Start Learning'}
                        </button>
                        <button class="btn btn-outline language-overview" data-language="${langId}">View Modules</button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add event listeners
        Components.addLanguageEventListeners();
    }
    
    static renderLearningPath(languageId, progress) {
        const curriculum = Database.getCurriculum(languageId);
        if (!curriculum) return;
        
        // Update header
        document.getElementById('current-language-icon').textContent = curriculum.icon;
        document.getElementById('current-language-title').textContent = curriculum.title;
        document.getElementById('current-language-description').textContent = curriculum.description;
        
        // Render modules
        const modulesContainer = document.getElementById('modules-container');
        const userProgress = progress.languages[languageId] || { completedModules: [], currentModule: 1 };
        
        modulesContainer.innerHTML = curriculum.modules.map(module => {
            const isCompleted = userProgress.completedModules.includes(module.id);
            const isCurrent = module.id === userProgress.currentModule;
            const isLocked = module.id > userProgress.currentModule && !isCompleted;
            
            let cardClass = 'module-card';
            if (isCompleted) cardClass += ' completed';
            if (isCurrent) cardClass += ' current';
            
            let statusIcon = '🔒';
            if (isCompleted) statusIcon = '✅';
            else if (isCurrent) statusIcon = '🎯';
            else if (!isLocked) statusIcon = '⭐';
            
            return `
                <div class="${cardClass}" data-module="${module.id}" ${isLocked ? 'data-locked="true"' : ''}>
                    <div class="module-header">
                        <div class="module-number">${statusIcon}</div>
                        <div class="module-info">
                            <h3>${module.title}</h3>
                            <p>${module.description}</p>
                        </div>
                    </div>
                    <div class="module-meta">
                        <span class="difficulty ${module.difficulty.toLowerCase()}">${module.difficulty}</span>
                        <span class="time-estimate">${module.estimatedTime}</span>
                    </div>
                    <div class="module-progress">
                        <div class="progress-indicator">
                            <span class="lessons-count">${module.lessons.length} lessons</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click listeners
        Components.addModuleEventListeners(languageId);
    }
    
    static renderModule(languageId, moduleId, lessonId = 1) {
        const module = Database.getModule(languageId, moduleId);
        if (!module || !module.lessons.length) return;
        
        // Update header
        document.getElementById('current-module-title').textContent = module.title;
        document.getElementById('current-module-difficulty').textContent = module.difficulty;
        document.getElementById('current-module-time').textContent = module.estimatedTime;
        
        // Render lesson list
        const lessonList = document.getElementById('lesson-list');
        lessonList.innerHTML = module.lessons.map((lesson, index) => {
            const isActive = lesson.id === lessonId;
            const isCompleted = index < lessonId - 1; // Simple completion logic
            
            return `
                <div class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                     data-lesson="${lesson.id}">
                    <div class="lesson-status">
                        ${isCompleted ? '✓' : isActive ? '▶' : index + 1}
                    </div>
                    <span class="lesson-title">${lesson.title}</span>
                </div>
            `;
        }).join('');
        
        // Render current lesson content
        Components.renderLessonContent(module.lessons.find(l => l.id === lessonId));
        
        // Add event listeners
        Components.addLessonEventListeners(languageId, moduleId, module.lessons);
    }
    
    static renderLessonContent(lesson) {
        if (!lesson) return;
        
        const lessonContent = document.getElementById('lesson-content');
        
        lessonContent.innerHTML = `
            <div class="lesson-text">
                ${lesson.content}
            </div>
            ${lesson.codeExample ? `
                <div class="code-example">
                    <h4>Example:</h4>
                    <pre><code>${lesson.codeExample}</code></pre>
                </div>
            ` : ''}
            ${lesson.exercise ? `
                <div class="lesson-exercise">
                    <h4>🎯 Practice Exercise: ${lesson.exercise.title}</h4>
                    <p>${lesson.exercise.description}</p>
                    <div class="exercise-actions">
                        <button class="btn btn-primary" onclick="openCodeEditor('${lesson.exercise.starterCode}')">
                            Try in Editor
                        </button>
                        <button class="btn btn-outline" onclick="showSolution('${lesson.exercise.solution}')">
                            Show Solution
                        </button>
                    </div>
                </div>
            ` : ''}
        `;
    }
    
    static initActivityChart() {
        const canvas = document.getElementById('activityChart');
        if (!canvas || window.activityChart) return;
        
        const ctx = canvas.getContext('2d');
        const weekData = [2.5, 1.8, 3.2, 2.1, 4.0, 1.5, 2.8];
        
        window.activityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Coding Hours',
                    data: weekData,
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
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    static addLanguageEventListeners() {
        document.querySelectorAll('.language-continue').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const languageId = e.target.dataset.language;
                app.router.navigate('learning-path');
                app.state.setState({ currentLanguage: languageId });
            });
        });
        
        document.querySelectorAll('.language-overview').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const languageId = e.target.dataset.language;
                app.router.navigate('learning-path');
                app.state.setState({ currentLanguage: languageId });
            });
        });
    }
    
    static addModuleEventListeners(languageId) {
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (card.dataset.locked === 'true') {
                    alert('Complete previous modules to unlock this one!');
                    return;
                }
                
                const moduleId = parseInt(card.dataset.module);
                app.router.navigate('module');
                app.state.setState({ 
                    currentLanguage: languageId,
                    currentModule: moduleId,
                    currentLesson: 1
                });
            });
        });
    }
    
    static addLessonEventListeners(languageId, moduleId, lessons) {
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const lessonId = parseInt(item.dataset.lesson);
                Components.renderModule(languageId, moduleId, lessonId);
                app.state.setState({ currentLesson: lessonId });
            });
        });
        
        // Navigation buttons
        document.getElementById('prev-lesson').onclick = () => {
            const currentLesson = app.state.currentLesson;
            if (currentLesson > 1) {
                Components.renderModule(languageId, moduleId, currentLesson - 1);
                app.state.setState({ currentLesson: currentLesson - 1 });
            }
        };
        
        document.getElementById('next-lesson').onclick = () => {
            const currentLesson = app.state.currentLesson;
            if (currentLesson < lessons.length) {
                Components.renderModule(languageId, moduleId, currentLesson + 1);
                app.state.setState({ currentLesson: currentLesson + 1 });
                
                // Update progress
                Database.updateProgress(app.state.currentUser.id, languageId, {
                    xpGained: 25
                });
            }
        };
    }
}

// Code Editor functionality
class CodeEditor {
    static init() {
        const runBtn = document.getElementById('run-code');
        const clearBtn = document.getElementById('clear-output');
        
        if (runBtn) {
            runBtn.addEventListener('click', this.runCode);
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', this.clearOutput);
        }
    }
    
    static runCode() {
        const codeEditor = document.getElementById('code-editor');
        const codeOutput = document.getElementById('code-output');
        const runBtn = document.getElementById('run-code');
        
        if (!codeEditor || !codeOutput) return;
        
        const code = codeEditor.value;
        
        // Show loading state
        runBtn.textContent = '⏳ Running...';
        runBtn.disabled = true;
        
        // Simulate code execution
        setTimeout(() => {
            const outputs = CodeEditor.simulateExecution(code);
            codeOutput.innerHTML = outputs.map(output => 
                `<div class="output-line ${output.type}">${output.text}</div>`
            ).join('');
            
            runBtn.textContent = '▶ Run Code';
            runBtn.disabled = false;
            
            // Update AI hints
            CodeEditor.updateAIHints(code);
        }, 1500);
    }
    
    static simulateExecution(code) {
        const outputs = [];
        
        try {
            // Simple output simulation based on code content
            if (code.includes('print(') || code.includes('console.log(')) {
                outputs.push({type: 'success', text: 'Hello, World!'});
                outputs.push({type: 'success', text: 'Code executed successfully!'});
                outputs.push({type: '', text: `Execution time: ${(Math.random() * 0.5).toFixed(3)}s`});
            } else if (code.trim() === '') {
                outputs.push({type: 'error', text: 'No code to execute'});
            } else {
                outputs.push({type: '', text: 'Code analysis complete'});
                outputs.push({type: 'success', text: 'No syntax errors found'});
            }
        } catch (error) {
            outputs.push({type: 'error', text: 'Runtime error: ' + error.message});
        }
        
        return outputs;
    }
    
    static updateAIHints(code) {
        const hintsContainer = document.getElementById('ai-hints');
        if (!hintsContainer) return;
        
        const hints = [];
        
        if (code.includes('for ') && code.includes('range(')) {
            hints.push('💡 Great use of for loops with range!');
        }
        if (code.includes('def ')) {
            hints.push('💡 Functions make your code reusable and organized');
        }
        if (code.includes('#')) {
            hints.push('💡 Good job using comments to explain your code');
        }
        if (!code.trim()) {
            hints.push('💡 Try writing a simple print statement to get started');
        }
        
        hintsContainer.innerHTML = hints.map(hint => 
            `<div class="hint">${hint}</div>`
        ).join('');
    }
    
    static clearOutput() {
        const codeOutput = document.getElementById('code-output');
        if (codeOutput) {
            codeOutput.innerHTML = '<div class="output-line">Output cleared.</div>';
        }
    }
}

// Global app instance
let app;

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = Database.authenticate(email, password);
    if (user) {
        app.state.setState({ 
            currentUser: user,
            currentRoute: 'dashboard'
        });
        
        // Show success message
        showNotification('Welcome back, ' + user.displayName + '! 🎉', 'success');
    } else {
        showNotification('Invalid email or password. Try: alex@example.com / password123', 'error');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (Database.users[email]) {
        showNotification('User already exists!', 'error');
        return;
    }
    
    const user = Database.createUser({
        displayName: name,
        email: email,
        password: password
    });
    
    app.state.setState({ 
        currentUser: user,
        currentRoute: 'dashboard'
    });
    
    showNotification('Account created successfully! Welcome to CodeMate Pro! 🚀', 'success');
}

function handleDemoLogin() {
    const user = Database.authenticate('alex@example.com', 'password123');
    if (user) {
        app.state.setState({ 
            currentUser: user,
            currentRoute: 'dashboard'
        });
        showNotification('Welcome to the demo! 🚀', 'success');
    }
}

function handleLogout() {
    localStorage.removeItem('codeMateUser');
    localStorage.removeItem('userProgress');
    app.state.setState({ 
        currentUser: null,
        currentRoute: 'login'
    });
    showNotification('Logged out successfully!', 'success');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#00FF85' : type === 'error' ? '#FF0099' : '#1E90FF'};
        color: #000;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function openCodeEditor(starterCode) {
    app.router.navigate('editor');
    setTimeout(() => {
        const editor = document.getElementById('code-editor');
        if (editor && starterCode) {
            editor.value = starterCode;
        }
    }, 100);
}

function showSolution(solution) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>💡 Solution</h3>
                <button class="close-modal" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="code-example">
                    <pre><code>${solution}</code></pre>
                </div>
                <p style="color: var(--color-text-secondary); margin-top: 16px;">
                    Remember: The goal is to learn! Try to understand each line before copying.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="openCodeEditor(\`${solution.replace(/`/g, '\\`')}\`)">
                    Copy to Editor
                </button>
                <button class="btn btn-outline" onclick="this.closest('.modal').remove()">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Challenge timer
function startChallengeTimer() {
    let timeLeft = 23 * 3600 + 45 * 60 + 12; // 23:45:12 in seconds
    
    const timerElement = document.getElementById('challenge-timer');
    if (!timerElement) return;
    
    const updateTimer = () => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        if (timeLeft < 0) {
            timeLeft = 24 * 3600; // Reset to 24 hours
        }
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Avatar modal functions
function openAvatarModal() {
    const modal = document.getElementById('avatar-modal');
    modal.classList.remove('hidden');
}

function saveAvatar() {
    const selectedAvatar = document.querySelector('.avatar-option.active');
    if (selectedAvatar && app.state.currentUser) {
        const newAvatar = selectedAvatar.dataset.avatar;
        app.state.currentUser.avatar = newAvatar;
        
        // Update UI
        document.querySelector('.avatar-display').textContent = newAvatar;
        document.querySelector('.current-user .avatar').textContent = newAvatar;
        
        app.state.saveState();
        closeModal('avatar-modal');
        showNotification(`Avatar updated to ${newAvatar}!`, 'success');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 CodeMate Pro initializing...');
    
    // Initialize app state and router
    app = {
        state: new AppState(),
        router: null
    };
    
    app.router = new Router(app.state);
    
    // Initialize components
    CodeEditor.init();
    
    // Set up authentication forms
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Auth tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show/hide forms
            const isLogin = tab.dataset.tab === 'login';
            document.getElementById('login-form').classList.toggle('hidden', !isLogin);
            document.getElementById('signup-form').classList.toggle('hidden', isLogin);
        });
    });
    
    // Demo login button
    document.getElementById('google-login').addEventListener('click', handleDemoLogin);
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Navigation event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = link.dataset.route;
            app.router.navigate(route);
        });
    });
    
    // Back button listeners
    document.getElementById('back-to-languages').addEventListener('click', () => {
        app.router.navigate('languages');
    });
    
    document.getElementById('back-to-modules').addEventListener('click', () => {
        app.router.navigate('learning-path');
    });
    
    // Challenge start buttons
    document.querySelectorAll('.challenge-start').forEach(btn => {
        btn.addEventListener('click', () => {
            app.router.navigate('editor');
            setTimeout(() => {
                const editor = document.getElementById('code-editor');
                if (editor) {
                    editor.value = `# Two Sum Problem
# Given an array of integers, return indices of two numbers that add up to a target.

def two_sum(nums, target):
    # Your solution here
    pass

# Test cases
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # Expected: [0, 1]`;
                }
            }, 100);
            showNotification('🎯 Challenge loaded in editor! Good luck!', 'success');
        });
    });
    
    // Avatar change button
    document.querySelector('.avatar-change').addEventListener('click', openAvatarModal);
    
    // Avatar option selection
    document.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Save avatar button
    document.getElementById('save-avatar').addEventListener('click', saveAvatar);
    
    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            closeModal(modalId);
        });
    });
    
    // Subscribe to state changes
    app.state.subscribe((state) => {
        if (state.currentUser) {
            const progress = Database.getUserProgress(state.currentUser.id);
            
            switch (state.currentRoute) {
                case 'dashboard':
                    Components.renderDashboard(state.currentUser, progress);
                    break;
                case 'languages':
                    Components.renderLanguages(state.currentUser, progress);
                    break;
                case 'learning-path':
                    if (state.currentLanguage) {
                        Components.renderLearningPath(state.currentLanguage, progress);
                    }
                    break;
                case 'module':
                    if (state.currentLanguage && state.currentModule) {
                        Components.renderModule(state.currentLanguage, state.currentModule, state.currentLesson);
                    }
                    break;
            }
        }
    });
    
    // Start challenge timer
    startChallengeTimer();
    
    // Initial render
    app.router.render();
    
    console.log('✅ CodeMate Pro initialized successfully!');
});

// Export for debugging
window.app = app;
window.Database = Database;