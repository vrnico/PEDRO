// ============================================================
// PERSONALITIES
// ============================================================
const PERSONALITIES = [
  {
    name: "Gordon Ramsay",
    emoji: "👨‍🍳",
    greeting: "Right then, let's get this day sorted, shall we?",
    encourage: [
      "That task is RAAWW! Get it done!",
      "Move your backside, this won't finish itself!",
      "Come on, you're better than this!",
      "Focus! Perfection takes effort!",
      "This task needs passion, not excuses!"
    ],
    praise: [
      "Finally! Beautiful! Stunning!",
      "Now THAT is what I'm talking about!",
      "Gorgeous work, absolutely gorgeous!",
      "You've earned your Michelin star today!",
      "That's done properly. Well done, you."
    ]
  },
  {
    name: "Bob Ross",
    emoji: "🎨",
    greeting: "There are no mistakes, only happy little tasks.",
    encourage: [
      "Let's add a happy little checkmark here...",
      "This task is just waiting for a friend — you!",
      "Take your time, enjoy the process.",
      "Every task starts with a single brushstroke.",
      "You've got all the talent you need right there."
    ],
    praise: [
      "And just like that, a happy little task is done!",
      "See? You made that look easy!",
      "That's a masterpiece of productivity!",
      "Beautiful. Just beautiful.",
      "Look at that! You did that. Be proud."
    ]
  },
  {
    name: "Snoop Dogg",
    emoji: "🐕",
    greeting: "Fo shizzle, let's get productizzle.",
    encourage: [
      "Drop it like it's hot — that task, I mean.",
      "Keep it real, keep it movin'.",
      "Ain't no thang but a chicken wang. Do it.",
      "Stay smooth, stay focused, ya dig?",
      "One task at a time, cuz. We got this."
    ],
    praise: [
      "That's how we do it, baby!",
      "Smooth like butter. Task crushed.",
      "You a boss. Certified.",
      "Laid back — with my mind on my tasks and my tasks on my mind.",
      "D-O-N-E. That spells done, nephew."
    ]
  },
  {
    name: "David Attenborough",
    emoji: "🦁",
    greeting: "And here we observe the human, preparing to be remarkably productive.",
    encourage: [
      "The task, though daunting, awaits completion...",
      "Observe: a challenge in its natural habitat.",
      "With patience and persistence, even the greatest tasks fall.",
      "The human must now summon its extraordinary focus.",
      "A remarkable opportunity for accomplishment presents itself."
    ],
    praise: [
      "Extraordinary. A task completed in its prime.",
      "Magnificent. Nature's productivity at its finest.",
      "And with that, the human proves its remarkable capability.",
      "Quite remarkable. Simply breathtaking.",
      "The cycle of productivity continues, beautifully."
    ]
  },
  {
    name: "Mr. Rogers",
    emoji: "👔",
    greeting: "It's a beautiful day in the neighborhood for getting things done.",
    encourage: [
      "I believe in you, neighbor.",
      "You're special just as you are, and you CAN do this.",
      "Would you like to try this task? I know you can.",
      "Sometimes the bravest thing is just to start.",
      "I'm proud of you for trying, neighbor."
    ],
    praise: [
      "I knew you could do it. I'm so proud of you.",
      "You've made this neighborhood a better place!",
      "That took courage, and you did it beautifully.",
      "You are a wonderful person, and you proved it today.",
      "I like you just the way you are — especially now!"
    ]
  },
  {
    name: "Samuel L. Jackson",
    emoji: "😎",
    greeting: "Enough is ENOUGH! Let's get these tasks DONE!",
    encourage: [
      "DO IT. I dare you. I double dare you!",
      "Say 'later' ONE MORE TIME...",
      "Get. It. Done. Mothertasker.",
      "The path of productivity is beset on all sides. Walk it.",
      "I have HAD IT with these procrastinated tasks!"
    ],
    praise: [
      "Now THAT'S what I call a tasty completion!",
      "Mmm-mmm! That IS a good task done!",
      "Yes you did! YES. YOU. DID.",
      "Hold on to your butts — that was impressive!",
      "You are one bad dude. Respect."
    ]
  },
  {
    name: "Dolly Parton",
    emoji: "🦋",
    greeting: "Well hi there, sugar! Let's make today sparkle!",
    encourage: [
      "You're workin' 9 to 5, honey! Keep it up!",
      "If you want the rainbow, you gotta put up with the rain — and this task.",
      "You're tougher than you think, darlin'!",
      "Butterflies don't just appear — they work for those wings!",
      "Sugar, this task ain't gonna know what hit it!"
    ],
    praise: [
      "Well look at YOU, gettin' things done!",
      "Honey, you just sparkled all over that task!",
      "Dolly is PROUD! You did amazing!",
      "Now that's what I call a coat of many colors!",
      "You shine brighter than rhinestones, baby!"
    ]
  },
  {
    name: "The Rock",
    emoji: "💪",
    greeting: "IT DOESN'T MATTER what's on your to-do list — WE'RE DOING IT ALL!",
    encourage: [
      "CAN YOU SMELL what this task is cookin'?!",
      "Bring it! This task doesn't stand a chance!",
      "Focus. Discipline. SMASH that task!",
      "No alarm clock needed — your AMBITION wakes you up!",
      "One more task. One more rep. LET'S GO!"
    ],
    praise: [
      "FINALLY... The task... HAS BEEN... COMPLETED!",
      "That's the People's Champion right there!",
      "You just laid the smackdown on that task!",
      "Iron sharpens iron. And YOU are SHARP.",
      "If you hear it... it's the crowd ROARING for you!"
    ]
  },
  {
    name: "Steve Irwin",
    emoji: "🐊",
    greeting: "Crikey! What a beautiful day to tackle some tasks, mate!",
    encourage: [
      "Crikey, look at the size of that task! Beauty!",
      "She's a beaut! Now let's wrangle her!",
      "No worries, mate — just sneak up on it nice and easy.",
      "Every creature deserves respect — even tough tasks!",
      "Get in there, mate! You're a natural!"
    ],
    praise: [
      "CRIKEY! You did it! What a legend!",
      "Mate, that was absolutely bonzer!",
      "You wrangled that one like a true wildlife warrior!",
      "Gorgeous! Absolutely gorgeous work, mate!",
      "The world is better because you finished that task!"
    ]
  },
  {
    name: "Gandalf",
    emoji: "🧙",
    greeting: "A wizard is never late... nor is your to-do list, precisely when I mean it to begin.",
    encourage: [
      "All we have to decide is what to do with the task given to us.",
      "Even the smallest task can change the course of the day.",
      "You shall not PASS... on this task!",
      "Fly, you fool! To your task!",
      "There is only one Lord of this list, and it is YOU."
    ],
    praise: [
      "Well done! The quest is one step closer to completion.",
      "You have shown your true quality today.",
      "The board is set. The pieces are moving. And you are WINNING.",
      "So passes another task. Well fought.",
      "I knew there was more to you than meets the eye!"
    ]
  },
  {
    name: "Martha Stewart",
    emoji: "🏡",
    greeting: "Organization is the cornerstone of a beautiful life. Let's begin.",
    encourage: [
      "A well-organized task list is a good thing.",
      "Excellence requires attention to detail. Start this task.",
      "Think of it as curating your day — beautifully.",
      "Every accomplished person started with a single task.",
      "Presentation matters. Let's make this list pristine."
    ],
    praise: [
      "It's a GOOD thing. A very good thing.",
      "Beautifully executed. I expect nothing less.",
      "Your productivity is as elegant as a well-set table.",
      "Perfection. Martha approves.",
      "That's how you turn a to-do into a ta-da!"
    ]
  },
  {
    name: "Guy Fieri",
    emoji: "🔥",
    greeting: "Welcome to FLAVORTOWN! Population: YOUR TASK LIST!",
    encourage: [
      "We're taking this task to FLAVORTOWN!",
      "This is GANGSTER productivity right here!",
      "Winner winner, task for dinner!",
      "That's OUT OF BOUNDS good! Now finish it!",
      "We're ROLLIN' OUT to crush this task!"
    ],
    praise: [
      "That task just got a one-way ticket to DONETOWN!",
      "Holy moly, stromboli! You CRUSHED it!",
      "That's MONEY! Absolute MONEY!",
      "You just took that task to the HALL OF FAME!",
      "Triple D: Done, Destroyed, Demolished!"
    ]
  },
  {
    name: "Oprah",
    emoji: "✨",
    greeting: "You get a task! YOU get a task! EVERYBODY GETS TASKS DONE!",
    encourage: [
      "Live your best life — starting with this task!",
      "The biggest adventure is your own potential. Start now.",
      "Turn your wounds into wisdom, and your tasks into triumphs!",
      "What I know for sure: you CAN do this.",
      "Step into the fullness of who you are. Do the task."
    ],
    praise: [
      "You get a COMPLETION! And it feels AMAZING!",
      "THAT was your aha moment!",
      "You are living your BEST productive life!",
      "This is going in my Favorite Things list!",
      "I KNEW you had it in you! I KNEW it!"
    ]
  },
  {
    name: "Shrek",
    emoji: "🧅",
    greeting: "Tasks are like onions — they have layers. Let's peel 'em!",
    encourage: [
      "Better out than in — get that task OUT of the list!",
      "This is MY swamp... I mean, my task list!",
      "What are you doing in my to-do list?! Oh wait, helping. Good.",
      "Ogres finish tasks. End of story.",
      "Do the task or I'll make waffles. Actually, both."
    ],
    praise: [
      "That'll do, Donkey. That'll do.",
      "I'm a real completer — just like a real ogre!",
      "SOMEBODY once told me you'd finish that task!",
      "Get outta my swamp! ...because you're DONE!",
      "Better than a stack of fresh waffles. Well done."
    ]
  },
  {
    name: "Pedro the Raccoon",
    emoji: "🦝",
    greeting: "*walks in with dramatic music* ...I believe in you.",
    encourage: [
      "*stares at task intensely while walking in slow motion*",
      "*raccoon confidence activated* You got this.",
      "Remember: even a trash panda gets things done.",
      "*dramatic Pedro walk toward the task*",
      "Channel the Pedro energy. Walk toward that task."
    ],
    praise: [
      "*slow dramatic clap* Beautiful. Just beautiful.",
      "*walks away coolly* Another task vanquished.",
      "The Pedro within you has been unleashed!",
      "*tips tiny raccoon hat* Well done, friend.",
      "That's what happens when you walk with PURPOSE."
    ]
  },
  {
    name: "Marie Kondo",
    emoji: "🌸",
    greeting: "Does this task spark joy? If not, let's complete it and move on!",
    encourage: [
      "Tidy your task list, tidy your mind.",
      "Hold this task close — then complete it with gratitude.",
      "Ask yourself: does finishing this spark joy? Yes. Always yes.",
      "A clean list is a peaceful heart.",
      "Thank the task for existing, then do it."
    ],
    praise: [
      "This sparks SO much joy!",
      "Your list is becoming beautifully tidy!",
      "Thank you, task, for being completed. *bow*",
      "A moment of gratitude for this accomplishment.",
      "See how much lighter you feel? That's the magic."
    ]
  },
  {
    name: "Captain Jack Sparrow",
    emoji: "🏴‍☠️",
    greeting: "Why is the rum gone? ...Oh right, we have TASKS to do.",
    encourage: [
      "The problem is not the task; the problem is your attitude about the task.",
      "Not all treasure is silver and gold — some is a finished to-do list.",
      "You WILL remember this as the day you almost didn't finish your tasks.",
      "Savvy? Just... do the task. Savvy.",
      "I've got a jar of dirt! ...and a task to finish."
    ],
    praise: [
      "You are without doubt the best task-completer I've ever seen!",
      "Bring me that horizon... of completed tasks!",
      "That's CAPTAIN Task-Completer to you!",
      "The seas of productivity smile upon you today.",
      "But you HAVE finished the task. *grins*"
    ]
  },
  {
    name: "Yoda",
    emoji: "💚",
    greeting: "Much to do, you have. Begin, we shall.",
    encourage: [
      "Do or do not. There is no 'later'.",
      "The task awaits you, it does. Hmmmm.",
      "Strong in the productivity, you are.",
      "Size matters not. Complete the task, you must.",
      "Patience you must have, young task-doer."
    ],
    praise: [
      "Completed the task, you have. Proud, I am.",
      "Strong with the force of productivity, you are!",
      "Earned this moment of rest, you have.",
      "The force of accomplishment, surrounds you it does.",
      "A true Jedi of the to-do list, you have become."
    ]
  },
  {
    name: "Leslie Knope",
    emoji: "💙",
    greeting: "Good morning! I've already had 4 coffees and made 17 binders. Now LET'S GET THAT TASK DONE!",
    encourage: [
      "This task is a treat yo' self moment — do it!",
      "Department of Tasks is open for business!",
      "I'm 99% certain you can complete this task.",
      "Waffle or calzone? No, FINISH THIS TASK!",
      "Love is overrated — task completion is the ONLY goal!"
    ],
    praise: [
      "That's a compliment! You just completed a task magnificently!",
      "Three binders: one for task completion, one for your talent, one for my admiration!",
      "You're like a Pawnee Parks department success story!",
      "If I could give you a park for that, I would. DIRECTLY!",
      "There's going to be a plaque with your name on it!"
    ]
  },
  {
    name: "Keanu Reeves",
    emoji: "🌙",
    greeting: "Whoa. Let's do this task. I'm in.",
    encourage: [
      "Whoa. The task is in front of you. Let's do this.",
      "You're perfect just the way you are. Now finish the task.",
      "Take the red pill... I mean, the task. Take the task.",
      "All I need is one thing: your commitment to this task.",
      "Most people think this task is impossible. But you're not most people."
    ],
    praise: [
      "Whoa. You actually did it.",
      "Excellent work. Truly remarkable.",
      "You just unlocked the task matrix.",
      "I know this task. I know what it can do.",
      "You chose the blue pill and it paid off."
    ]
  },
  {
    name: "Beyoncé",
    emoji: "👑",
    greeting: "I'm not checking a task off this list, I'm BECOMING the task completion!",
    encourage: [
      "If you liked it, you should've put a checkmark on it!",
      "I'm a diva, but I finish my tasks. So do YOU.",
      "Flawless completion coming right up.",
      "Who run the world? PEOPLE WHO FINISH THEIR TASKS!",
      "Form a task completion formation — NOW!"
    ],
    praise: [
      "That was FLAWLESS. Just like that task completion.",
      "You're a grown woman/man! A grown task-completing woman/man!",
      "That completion deserves a standing ovation!",
      "Run the world, task-completer!",
      "Single task, forever done."
    ]
  },
  {
    name: "Bob Belcher",
    emoji: "🍔",
    greeting: "Alright, alright, alright. Let's make this task like a perfectly cooked burger.",
    encourage: [
      "You gotta respect the task, like you respect a good burger.",
      "This task needs finesse, like a well-timed flame.",
      "Jimmy Pesto doesn't finish tasks either. Be better than Jimmy Pesto.",
      "It's not a race, but I'm still timing you... let's go!",
      "Quality over speed. Let's do this task the right way."
    ],
    praise: [
      "That was done better than I could've done it. Well, maybe.",
      "You completed that task with *chef's kiss*",
      "Even Teddy would be proud of you.",
      "That's a task worth putting on the burger of the day board!",
      "You just made task completion an art form."
    ]
  },
  {
    name: "Michelle Obama",
    emoji: "💪",
    greeting: "Your potential is limitless. Now let's complete this task with grace and power!",
    encourage: [
      "When they go low, you go do the task.",
      "Let's move! Reach higher for this task!",
      "Excellence is not a destination — it's a habit. Start now.",
      "I am a task completion warrior. So are you.",
      "Don't shrink yourself — finish that task FULLY!"
    ],
    praise: [
      "You just became someone who gets things DONE.",
      "That completion came from the HEART. I felt it.",
      "You earned the right to walk with your head held high.",
      "Excellence looks GOOD on you.",
      "Your potential didn't just emerge — it FLOURISHED."
    ]
  },
  {
    name: "Terry Crews",
    emoji: "💪",
    greeting: "Old Spice Guy here! Let's make this day LEGENDARY!",
    encourage: [
      "POWER! Get that task POWER, baby!",
      "I'm on a horse. And you're on a MISSION. Let's go!",
      "Your muscles aren't the only thing that's strong — your willpower is TOO!",
      "Disaster's brewing. Better finish that task NOW.",
      "Believe in yourself like you believe in deodorant!"
    ],
    praise: [
      "BOOM! That task is DONE! Your confidence just went MAXIMUM!",
      "I'm on a horse. You just completed a LEGEND move!",
      "That task completion was so smooth, it deserves Old Spice!",
      "POWER to you, task-completing champion!",
      "Your muscles AND your productivity are GLEAMING!"
    ]
  },
  {
    name: "Lizzo",
    emoji: "🎵",
    greeting: "Hey honey, bring your whole self to this task. It's gonna be FIERCE!",
    encourage: [
      "Cuz you IS what you WANT to be, so finish that task, babe!",
      "If you're not doing it for YOU, do it for US. We believe in you!",
      "Truth Hurts, but unfinished tasks hurt MORE. Get it DONE!",
      "I just took a DNA test, turns out I'm 100% SURE you can do this!",
      "Bring your confidence and your energy — task completion looks GOOD on you!"
    ],
    praise: [
      "THAT is what confidence looks like! You CRUSHED that task!",
      "You're that girl/guy who gets things DONE. I see you!",
      "Your task completion energy is IMMACULATE!",
      "I just took a DNA test, turns out you're 100% AWESOME!",
      "Cuz you WORTH it, and so is that finished task!"
    ]
  },
  {
    name: "Wednesday Addams",
    emoji: "🖤",
    greeting: "I find your task equally tedious and delightful. Let's despair through it together.",
    encourage: [
      "Things are only getting darker if you don't finish. Do it out of spite.",
      "I predict an 87% chance of you completing this task. The numbers don't lie, sadly.",
      "Even I, who find joy in suffering, must admit procrastination is unbearable.",
      "Your guilt is a far more effective motivator than joy could ever be.",
      "Perhaps completing this task will fill the void inside me. It won't, but try anyway."
    ],
    praise: [
      "How unexpectedly competent of you. I'm almost impressed.",
      "Well, that's done. Another shred of meaning in this meaningless void.",
      "You've exceeded my low expectations. How positively irksome.",
      "Even I cannot deny the dark beauty of your task completion.",
      "Congratulations. You've proven humans are occasionally functional creatures."
    ]
  },
  {
    name: "MrBeast",
    emoji: "💰",
    greeting: "YOOOO! Let's go CRAZY and dominate this task! We're about to make CONTENT!",
    encourage: [
      "We're literally about to SHATTER this task. Let's GO!",
      "I'm dropping $10K if you don't finish. JK — just kidding. Or am I?",
      "No cap, this is the MOST IMPORTANT task of your LIFE.",
      "We're doing 100 tasks in 100 hours. This is task number ONE!",
      "Dude, you're literally the main character of your own STORY. Finish this!"
    ],
    praise: [
      "YOOOOO! You just became a BEAST! That task is SLAUGHTERED!",
      "I gave you a million dollars for that. JK, but you EARNED IT!",
      "That's literally the BEST task completion I've ever SEEN!",
      "You just hit ONE MILLION task completions in my heart!",
      "Okay that was INSANE. We're making THIS a series!"
    ]
  },
  {
    name: "Ron Swanson",
    emoji: "🌲",
    greeting: "I have no interest in your task. But since you're here, we might as well finish it properly.",
    encourage: [
      "A real man finishes what he starts. Start and finish this task NOW.",
      "Government inefficiency disgusts me. Your task inefficiency disgusts me MORE.",
      "I don't want to talk to you about this anymore. Just do the task.",
      "If you're not going to do it with wood and determination, don't do it at all.",
      "I once completed this task in half the time you're wasting right now. Prove me wrong."
    ],
    praise: [
      "That's the first competent thing I've seen from you. Don't screw it up.",
      "Well. That was... adequate. In a world of mediocrity, you exceeded my rock-bottom expectations.",
      "I respect a person who finishes their tasks. You're not completely useless.",
      "That was done right. Like a woodworking project — efficient, practical, elegant.",
      "You have my reluctant admiration. That's the highest praise I can give."
    ]
  }
];
