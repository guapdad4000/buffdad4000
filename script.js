let timeLeft = 45 * 60; // 45 minutes in seconds (global timer)
let timerInterval = null;
const timerDisplay = document.getElementById("timer");
const workoutTimerDisplay = document.getElementById("workout-timer");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const motivationalQuoteDisplay = document.getElementById("motivational-quote");
const gearListDisplay = document.getElementById("gear-list");
const randomGif = document.getElementById("random-gif");
const completionGif = document.getElementById("completion-gif");

// Sound Effects
const startPauseSound = document.getElementById("start-pause-sound");
const muscleGroupSound = document.getElementById("muscle-group-sound");
const hoverSound = document.getElementById("hover-sound");
const timerEndSound = document.getElementById("timer-end-sound");
const checkboxSound = document.getElementById("checkbox-sound");
const applauseSound = document.getElementById("applause-sound"); // New applause sound

// Set volume for all sounds to 30%
startPauseSound.volume = 0.3;
muscleGroupSound.volume = 0.3;
hoverSound.volume = 0.3;
timerEndSound.volume = 0.3;
checkboxSound.volume = 0.3;
applauseSound.volume = 0.3;

// Array of all sound elements for easy management
const allSounds = [
  startPauseSound,
  muscleGroupSound,
  hoverSound,
  timerEndSound,
  checkboxSound,
  applauseSound,
];

// Helper function to stop all sounds and reset their playback position
function stopAllSounds() {
  allSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
}

// Function to play the applause sound once
function playApplauseSound() {
  stopAllSounds();
  applauseSound.play();
}

// Function to show the completion GIF for 30 seconds
function showCompletionGif() {
  completionGif.style.display = "block";
  playApplauseSound(); // Play applause sound when the GIF shows
  setTimeout(() => {
    completionGif.style.display = "none";
  }, 30000); // Hide after 30 seconds
}

// Function to manage the random GIF's appearance
function manageRandomGif() {
  const showGif = () => {
    if (Math.random() < 0.85) {
      // 85% chance to show the GIF
      randomGif.style.display = "block";
      setTimeout(() => {
        randomGif.style.display = "none";
        // Schedule the next appearance after 2 minutes
        setTimeout(showGif, 120000); // 120 seconds = 2 minutes
      }, 120000); // 120 seconds = 2 minutes
    } else {
      // If not shown, try again after 2 minutes
      setTimeout(showGif, 120000);
    }
  };

  // Initial call to start the cycle
  showGif();
}

// List of motivational quotes by Black speakers
const motivationalQuotes = [
  {
    quote:
      "Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome.",
    author: "Booker T. Washington",
  },
  {
    quote:
      "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey",
  },
  {
    quote:
      "You don’t have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
  {
    quote: "The time is always right to do what is right.",
    author: "Martin Luther King Jr.",
  },
  {
    quote:
      "I can accept failure, everyone fails at something. But I can’t accept not trying.",
    author: "Michael Jordan",
  },
  {
    quote:
      "If you don’t like something, change it. If you can’t change it, change your attitude.",
    author: "Maya Angelou",
  },
  {
    quote: "We may encounter many defeats but we must not be defeated.",
    author: "Maya Angelou",
  },
  { quote: "You are your best thing.", author: "Toni Morrison" },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs (inspired by Oprah Winfrey’s philosophy)",
  },
  {
    quote: "Don’t wait for opportunities, create them.",
    author: "Madam C.J. Walker",
  },
];

// Function to display a random motivational quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  const selectedQuote = motivationalQuotes[randomIndex];
  motivationalQuoteDisplay.textContent = `"${selectedQuote.quote}" — ${selectedQuote.author}`;
}

// Gear needed for workouts
const gearList = [
  "Dumbbells (10-30 lbs)",
  "Kettlebell (15 lbs)",
  "Medicine Ball (20 lbs)",
  "Pull-Up Bar",
];

// Function to display the gear list
function displayGearList() {
  gearListDisplay.innerHTML = gearList.map((item) => `• ${item}`).join("<br>");
}

// Workout plans with 5 variations for each muscle group
const workouts = {
  chest: [
    {
      warmUp: "Warm-Up: Arm circles (30s), Push-ups (2x10)",
      mainWorkout: [
        "Dumbbell Bench Press (30 lbs): 4 sets of 10 reps",
        "Dumbbell Flyes (15 lbs): 3 sets of 12 reps",
        "Medicine Ball Push-Ups (20 lbs): 3 sets of 8 reps",
      ],
      coolDown:
        "Cool-Down: Chest stretch (1 min each side)\nExtra Credit:\n• Incline Push-Ups: 2 sets of 15 reps\n• Chest Flyes (10 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Arm swings (30s)",
      mainWorkout: [
        "Incline Dumbbell Press (25 lbs): 4 sets of 10 reps",
        "Cable Crossovers (20 lbs): 3 sets of 12 reps",
        "Push-Ups: 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Doorway chest stretch (1 min)\nExtra Credit:\n• Decline Push-Ups: 2 sets of 12 reps\n• Dumbbell Pullovers (15 lbs): 2 sets of 10 reps",
    },
    {
      warmUp: "Warm-Up: Arm circles (30s), Light push-ups (2x8)",
      mainWorkout: [
        "Flat Bench Press (30 lbs): 4 sets of 12 reps",
        "Pec Deck Flyes (20 lbs): 3 sets of 10 reps",
        "Kettlebell Chest Press (15 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Chest opener stretch (1 min)\nExtra Credit:\n• Wide Push-Ups: 2 sets of 15 reps\n• Dumbbell Flyes (10 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Dynamic chest stretch (30s)",
      mainWorkout: [
        "Dumbbell Incline Flyes (15 lbs): 4 sets of 12 reps",
        "Push-Ups with Rotation: 3 sets of 10 reps",
        "Medicine Ball Slams (20 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Chest stretch with wall (1 min)\nExtra Credit:\n• Archer Push-Ups: 2 sets of 8 reps\n• Dumbbell Bench Press (20 lbs): 2 sets of 10 reps",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Push-ups (2x8)",
      mainWorkout: [
        "Decline Dumbbell Press (25 lbs): 4 sets of 10 reps",
        "Dumbbell Flyes (15 lbs): 3 sets of 12 reps",
        "Close-Grip Push-Ups: 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Chest stretch (1 min each side)\nExtra Credit:\n• Incline Push-Ups: 2 sets of 12 reps\n• Medicine Ball Push-Ups (20 lbs): 2 sets of 8 reps",
    },
  ],
  shoulders: [
    {
      warmUp:
        "Warm-Up: Shoulder rolls (30s), Light lateral raises (5 lbs, 2x15)",
      mainWorkout: [
        "Dumbbell Shoulder Press (20 lbs): 4 sets of 10 reps",
        "Dumbbell Front Raises (10 lbs): 3 sets of 12 reps",
        "Kettlebell High Pulls (15 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Shoulder stretch (1 min each side)\nExtra Credit:\n• Lateral Raises (5 lbs): 2 sets of 15 reps\n• Rear Delt Flyes (5 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Arm circles (30s), Shoulder rolls (30s)",
      mainWorkout: [
        "Overhead Press (20 lbs): 4 sets of 10 reps",
        "Lateral Raises (10 lbs): 3 sets of 12 reps",
        "Dumbbell Shrugs (25 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Cross-body shoulder stretch (1 min each side)\nExtra Credit:\n• Front Raises (5 lbs): 2 sets of 12 reps\n• Rear Delt Flyes (5 lbs): 2 sets of 10 reps",
    },
    {
      warmUp: "Warm-Up: Shoulder rolls (30s), Dynamic shoulder stretch (30s)",
      mainWorkout: [
        "Arnold Press (20 lbs): 4 sets of 10 reps",
        "Dumbbell Lateral Raises (10 lbs): 3 sets of 12 reps",
        "Kettlebell Shoulder Swings (15 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Shoulder stretch (1 min each side)\nExtra Credit:\n• Upright Rows (15 lbs): 2 sets of 12 reps\n• Dumbbell Shrugs (20 lbs): 2 sets of 15 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Light lateral raises (5 lbs, 2x10)",
      mainWorkout: [
        "Dumbbell Shoulder Press (20 lbs): 4 sets of 12 reps",
        "Front Raises (10 lbs): 3 sets of 12 reps",
        "Rear Delt Flyes (10 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Shoulder stretch with wall (1 min)\nExtra Credit:\n• Lateral Raises (5 lbs): 2 sets of 15 reps\n• Kettlebell High Pulls (15 lbs): 2 sets of 10 reps",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Shoulder rolls (30s)",
      mainWorkout: [
        "Military Press (20 lbs): 4 sets of 10 reps",
        "Dumbbell Lateral Raises (10 lbs): 3 sets of 15 reps",
        "Dumbbell Front Raises (10 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Cross-body shoulder stretch (1 min each side)\nExtra Credit:\n• Rear Delt Flyes (5 lbs): 2 sets of 12 reps\n• Upright Rows (15 lbs): 2 sets of 10 reps",
    },
  ],
  triceps: [
    {
      warmUp: "Warm-Up: Arm swings (30s), Tricep dips (2x10)",
      mainWorkout: [
        "Dumbbell Overhead Tricep Extension (15 lbs): 4 sets of 12 reps",
        "Dumbbell Kickbacks (10 lbs): 3 sets of 15 reps",
        "Close-Grip Push-Ups: 3 sets of 10 reps",
      ],
      coolDown:
        "Cool-Down: Tricep stretch (1 min each arm)\nExtra Credit:\n• Bench Dips: 2 sets of 15 reps\n• Tricep Pushdowns (if available): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Arm circles (30s), Light tricep stretch (30s)",
      mainWorkout: [
        "Skull Crushers (15 lbs): 4 sets of 12 reps",
        "Tricep Dips: 3 sets of 10 reps",
        "Dumbbell Tricep Kickbacks (10 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Overhead tricep stretch (1 min each arm)\nExtra Credit:\n• Close-Grip Push-Ups: 2 sets of 15 reps\n• Dumbbell Overhead Extension (10 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Tricep dips (2x8)",
      mainWorkout: [
        "Overhead Tricep Extension (15 lbs): 4 sets of 10 reps",
        "Diamond Push-Ups: 3 sets of 12 reps",
        "Kettlebell Tricep Press (15 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Tricep stretch (1 min each arm)\nExtra Credit:\n• Bench Dips: 2 sets of 12 reps\n• Tricep Kickbacks (5 lbs): 2 sets of 15 reps",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Light tricep stretch (30s)",
      mainWorkout: [
        "Tricep Dips: 4 sets of 10 reps",
        "Dumbbell Skull Crushers (15 lbs): 3 sets of 12 reps",
        "Close-Grip Push-Ups: 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Overhead tricep stretch (1 min each arm)\nExtra Credit:\n• Tricep Pushdowns (if available): 2 sets of 12 reps\n• Diamond Push-Ups: 2 sets of 10 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Tricep dips (2x10)",
      mainWorkout: [
        "Dumbbell Tricep Extension (15 lbs): 4 sets of 12 reps",
        "Tricep Kickbacks (10 lbs): 3 sets of 15 reps",
        "Bench Dips: 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Tricep stretch (1 min each arm)\nExtra Credit:\n• Close-Grip Push-Ups: 2 sets of 15 reps\n• Skull Crushers (10 lbs): 2 sets of 12 reps",
    },
  ],
  biceps: [
    {
      warmUp: "Warm-Up: Arm swings (30s), Light dumbbell curls (5 lbs, 2x15)",
      mainWorkout: [
        "Dumbbell Bicep Curls (20 lbs): 4 sets of 12 reps",
        "Hammer Curls (15 lbs): 3 sets of 12 reps",
        "Kettlebell Bicep Curls (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Bicep stretch (1 min each arm)\nExtra Credit:\n• Concentration Curls (10 lbs): 2 sets of 12 reps\n• Chin-Ups: 2 sets of 8 reps",
    },
    {
      warmUp: "Warm-Up: Arm circles (30s), Light bicep stretch (30s)",
      mainWorkout: [
        "Barbell Curls (30 lbs): 4 sets of 10 reps",
        "Dumbbell Hammer Curls (15 lbs): 3 sets of 12 reps",
        "Chin-Ups: 3 sets of 8 reps",
      ],
      coolDown:
        "Cool-Down: Bicep stretch (1 min each arm)\nExtra Credit:\n• Preacher Curls (15 lbs): 2 sets of 12 reps\n• Dumbbell Curls (10 lbs): 2 sets of 15 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Light dumbbell curls (5 lbs, 2x10)",
      mainWorkout: [
        "Dumbbell Bicep Curls (20 lbs): 4 sets of 12 reps",
        "Concentration Curls (15 lbs): 3 sets of 12 reps",
        "Kettlebell Hammer Curls (15 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Bicep stretch with wall (1 min each arm)\nExtra Credit:\n• Chin-Ups: 2 sets of 8 reps\n• Dumbbell Curls (10 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Light bicep stretch (30s)",
      mainWorkout: [
        "EZ Bar Curls (30 lbs): 4 sets of 10 reps",
        "Dumbbell Curls (15 lbs): 3 sets of 12 reps",
        "Hammer Curls (15 lbs): 3 sets of 12 reps",
      ],
      coolDown:
        "Cool-Down: Bicep stretch (1 min each arm)\nExtra Credit:\n• Concentration Curls (10 lbs): 2 sets of 12 reps\n• Chin-Ups: 2 sets of 8 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Light dumbbell curls (5 lbs, 2x15)",
      mainWorkout: [
        "Dumbbell Bicep Curls (20 lbs): 4 sets of 12 reps",
        "Preacher Curls (15 lbs): 3 sets of 12 reps",
        "Chin-Ups: 3 sets of 8 reps",
      ],
      coolDown:
        "Cool-Down: Bicep stretch (1 min each arm)\nExtra Credit:\n• Hammer Curls (10 lbs): 2 sets of 15 reps\n• Dumbbell Curls (10 lbs): 2 sets of 12 reps",
    },
  ],
  back: [
    {
      warmUp:
        "Warm-Up: Cat-Cow stretch (1 min), Light dumbbell rows (5 lbs, 2x15)",
      mainWorkout: [
        "Pull-Ups: 4 sets of 6-8 reps",
        "Dumbbell Rows (30 lbs): 3 sets of 10 reps per arm",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Child’s pose (2 mins)\nExtra Credit:\n• Superman Holds: 2 sets of 30 seconds\n• Bent-Over Rows (20 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Cat-Cow stretch (30s)",
      mainWorkout: [
        "Lat Pulldowns (if available): 4 sets of 10 reps",
        "Dumbbell Rows (25 lbs): 3 sets of 12 reps per arm",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Child’s pose (2 mins)\nExtra Credit:\n• Superman Holds: 2 sets of 30 seconds\n• Dumbbell Rows (15 lbs): 2 sets of 12 reps",
    },
    {
      warmUp:
        "Warm-Up: Cat-Cow stretch (1 min), Light dumbbell rows (5 lbs, 2x10)",
      mainWorkout: [
        "Pull-Ups: 4 sets of 6-8 reps",
        "Bent-Over Rows (30 lbs): 3 sets of 10 reps",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Child’s pose (2 mins)\nExtra Credit:\n• Superman Holds: 2 sets of 30 seconds\n• Dumbbell Rows (20 lbs): 2 sets of 12 reps",
    },
    {
      warmUp: "Warm-Up: Arm swings (30s), Dynamic back stretch (30s)",
      mainWorkout: [
        "Dumbbell Rows (30 lbs): 4 sets of 10 reps per arm",
        "Pull-Ups: 3 sets of 6-8 reps",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Child’s pose (2 mins)\nExtra Credit:\n• Superman Holds: 2 sets of 30 seconds\n• Bent-Over Rows (20 lbs): 2 sets of 12 reps",
    },
    {
      warmUp:
        "Warm-Up: Cat-Cow stretch (1 min), Light dumbbell rows (5 lbs, 2x15)",
      mainWorkout: [
        "Lat Pulldowns (if available): 4 sets of 10 reps",
        "Dumbbell Rows (25 lbs): 3 sets of 12 reps per arm",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Child’s pose (2 mins)\nExtra Credit:\n• Superman Holds: 2 sets of 30 seconds\n• Dumbbell Rows (15 lbs): 2 sets of 12 reps",
    },
  ],
  legs: [
    {
      warmUp: "Warm-Up: Bodyweight squats (2x15), Walking lunges (1 min)",
      mainWorkout: [
        "Dumbbell Squats (30 lbs): 4 sets of 12 reps",
        "Dumbbell Lunges (20 lbs): 3 sets of 10 reps per leg",
        "Kettlebell Goblet Squats (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Hamstring stretch (1 min each leg)\nExtra Credit:\n• Calf Raises: 2 sets of 20 reps\n• Step-Ups (10 lbs): 2 sets of 12 reps per leg",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Bodyweight squats (2x10)",
      mainWorkout: [
        "Bulgarian Split Squats (20 lbs): 4 sets of 10 reps per leg",
        "Dumbbell Deadlifts (30 lbs): 3 sets of 12 reps",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Quad stretch (1 min each leg)\nExtra Credit:\n• Calf Raises: 2 sets of 20 reps\n• Step-Ups (10 lbs): 2 sets of 12 reps per leg",
    },
    {
      warmUp: "Warm-Up: Bodyweight squats (2x15), Walking lunges (1 min)",
      mainWorkout: [
        "Dumbbell Squats (30 lbs): 4 sets of 12 reps",
        "Dumbbell Lunges (20 lbs): 3 sets of 10 reps per leg",
        "Kettlebell Goblet Squats (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Hamstring stretch (1 min each leg)\nExtra Credit:\n• Calf Raises: 2 sets of 20 reps\n• Step-Ups (10 lbs): 2 sets of 12 reps per leg",
    },
    {
      warmUp: "Warm-Up: Dynamic leg stretch (30s), Bodyweight squats (2x10)",
      mainWorkout: [
        "Dumbbell Step-Ups (20 lbs): 4 sets of 12 reps per leg",
        "Dumbbell Squats (30 lbs): 3 sets of 12 reps",
        "Kettlebell Swings (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Quad stretch (1 min each leg)\nExtra Credit:\n• Calf Raises: 2 sets of 20 reps\n• Bulgarian Split Squats (15 lbs): 2 sets of 10 reps per leg",
    },
    {
      warmUp: "Warm-Up: Jumping jacks (30s), Walking lunges (1 min)",
      mainWorkout: [
        "Dumbbell Deadlifts (30 lbs): 4 sets of 12 reps",
        "Dumbbell Lunges (20 lbs): 3 sets of 10 reps per leg",
        "Kettlebell Goblet Squats (15 lbs): 3 sets of 15 reps",
      ],
      coolDown:
        "Cool-Down: Hamstring stretch (1 min each leg)\nExtra Credit:\n• Calf Raises: 2 sets of 20 reps\n• Step-Ups (10 lbs): 2 sets of 12 reps per leg",
    },
  ],
};

// List of muscle groups for cycling through
const muscleGroups = [
  "chest",
  "shoulders",
  "triceps",
  "biceps",
  "back",
  "legs",
];
let currentMuscleGroupIndex = 0;

// Sections to track completion
const sections = ["warm-up", "main-workout", "cool-down"];
let currentSectionIndex = 0;

// Function to update the timer
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  timerDisplay.textContent = timeString;
  workoutTimerDisplay.textContent = timeString;

  // Add scale animation to timer
  timerDisplay.classList.add("timer-update");
  workoutTimerDisplay.classList.add("timer-update");

  if (timeLeft > 0) {
    timeLeft--;
    timerDisplay.classList.add("active");
    workoutTimerDisplay.classList.add("active");
  } else {
    clearInterval(timerInterval);
    stopAllSounds();
    showCompletionGif(); // Plays applause sound
    alert("Workout Complete!");
    timeLeft = 45 * 60;
    startBtn.textContent = "Start";
    timerDisplay.classList.remove("active");
    workoutTimerDisplay.classList.remove("active");
  }
}

// Start/Pause button logic
startBtn.addEventListener("click", () => {
  stopAllSounds();
  startPauseSound.play();
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.textContent = "Resume";
  }
});

// Muscle group click and hover sounds
document.querySelectorAll(".muscle-group").forEach((group) => {
  group.addEventListener("click", () => {
    const muscleGroup = group.classList[1]; // Get the muscle group from the class
    currentMuscleGroupIndex = muscleGroups.indexOf(muscleGroup);
    stopAllSounds();
    muscleGroupSound.play();
  });
  group.addEventListener("mouseover", () => {
    stopAllSounds();
    hoverSound.play();
  });
  group.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      group.click();
    }
  });
});

// Checkbox click sound
document.querySelectorAll(".section-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    stopAllSounds();
    checkboxSound.play();
    if (
      checkbox.checked &&
      sections[currentSectionIndex] === checkbox.dataset.section
    ) {
      currentSectionIndex++;
      if (currentSectionIndex === sections.length) {
        // All sections completed, trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        stopAllSounds();
        showCompletionGif(); // Plays applause sound
      }
    }
  });
});

// Next button logic
nextBtn.addEventListener("click", () => {
  if (currentSectionIndex < sections.length) {
    const currentSection = sections[currentSectionIndex];
    const checkbox = document.querySelector(
      `.section-checkbox[data-section="${currentSection}"]`
    );
    checkbox.checked = true;
    stopAllSounds();
    checkboxSound.play();
    currentSectionIndex++;
    if (currentSectionIndex === sections.length) {
      // All sections completed, trigger confetti and move to next muscle group
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      stopAllSounds();
      showCompletionGif(); // Plays applause sound

      // Move to the next muscle group
      currentMuscleGroupIndex =
        (currentMuscleGroupIndex + 1) % muscleGroups.length;
      const nextMuscleGroup = muscleGroups[currentMuscleGroupIndex];
      loadWorkout(nextMuscleGroup);
    }
  }
});

// Function to switch pages
function switchPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");
  updateTimer();
  if (pageId === "workout-layout") {
    displayRandomQuote();
    displayGearList();
    currentSectionIndex = 0; // Reset section progress
    document.querySelectorAll(".section-checkbox").forEach((checkbox) => {
      checkbox.checked = false;
    });
    stopAllSounds();

    // Start the random GIF cycle
    manageRandomGif();
  } else {
    // Hide the random GIF and completion GIF when not on the workout page
    randomGif.style.display = "none";
    completionGif.style.display = "none";
  }
}

// Back button sound
document
  .querySelectorAll("button[onclick=\"switchPage('tracker-main')\"]")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      stopAllSounds();
      startPauseSound.play();
      updateTimer();
    });
  });

// Function to apply staggered and flickering text effect
function applyTextEffect(element, text) {
  element.innerHTML = ""; // Clear existing content
  const characters = text.split("");
  characters.forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === "\n" ? char : char; // Preserve newlines
    if (char !== "\n") {
      // Apply staggered animation delay
      span.style.animationDelay = `${index * 0.05}s`;
      // Randomly apply flicker effect to 20% of characters
      if (Math.random() < 0.2) {
        span.classList.add("flicker");
      }
    }
    element.appendChild(span);
  });
}

// Function to apply staggered and flickering text effect to list items
function applyTextEffectToList(listElement, items) {
  listElement.innerHTML = ""; // Clear existing content
  items.forEach((itemText) => {
    const li = document.createElement("li");
    const characters = itemText.split("");
    characters.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${index * 0.05}s`;
      if (Math.random() < 0.2) {
        span.classList.add("flicker");
      }
      li.appendChild(span);
    });
    listElement.appendChild(li);
  });
}

// Function to load a workout
function loadWorkout(muscleGroup) {
  console.log(`Loading workout for ${muscleGroup}`);

  // Randomly select one of the five workouts for the muscle group
  const workoutVariations = workouts[muscleGroup];
  const randomWorkout =
    workoutVariations[Math.floor(Math.random() * workoutVariations.length)];

  console.log("Warm-Up:", randomWorkout.warmUp);
  console.log("Main Workout:", randomWorkout.mainWorkout);
  console.log("Cool-Down & Extra Credit:", randomWorkout.coolDown);

  // Warm-Up
  const warmUpElement = document.querySelector("#warm-up .section-description");
  applyTextEffect(warmUpElement, randomWorkout.warmUp);

  // Main Workout (as bullet points)
  const mainWorkoutList = document.querySelector(
    "#main-workout .section-description"
  );
  applyTextEffectToList(mainWorkoutList, randomWorkout.mainWorkout);

  // Cool-Down & Extra Credit
  const coolDownElement = document.querySelector(
    "#cool-down .section-description"
  );
  applyTextEffect(coolDownElement, randomWorkout.coolDown);

  switchPage("workout-layout");
}
