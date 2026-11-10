// ===== EDIT ME =====
window.SITE = {
  name: "Jeremy Chai",
  resume: "https://49a22ab1-689c-4939-b6f2-538fadcadb23.filesusr.com/ugd/ed2347_0639eac526fe4e6e83f090cbdcc3bf08.pdf", // swap to "assets/resume.pdf" once downloaded
  github: "https://github.com/Zathral",
  linkedin: "https://www.linkedin.com/in/jeremy-chai-b45a88368/",
  email: "" // add an address to show an Email button
};

// Gallery/cover helper: local file in assets/ + Wix URL used as a fallback until you've downloaded the file
const W = (id, ext = "png") => `https://static.wixstatic.com/media/ed2347_${id}~mv2.${ext}`;
const yt = id => `https://www.youtube.com/embed/${id}`;

window.PROJECTS = [
{
  slug: "tervanix", title: "Tervanix", tag: "Data Engineering", year: "2026",
  sub: "Real-time fall and near-miss monitoring for construction sites, from wearable sensor to supervisor dashboard.",
  short: "Sensors → MQTT → PostgreSQL → live supervisor dashboard.",
  cover: ["tervanix-cover.jpg", W("d8934aa4551b4f60bcc68854827522bd", "jpg")],
  meta: [["Role", "Data pipeline, server-side detection, PostgreSQL design, integration & debugging"], ["Stack", "Nesso N1 · BLE · MQTT · Python · PostgreSQL · Drizzle · Next.js / NestJS"], ["Type", "Team project (Data Engineering)"]],
  links: [["View fall-analysis repo", "https://github.com/minhtribui153/fall-analysis"]],
  sections: [
    ["The problem", ["Construction sites are high-risk, and slip-trip-fall, fall-from-height and near-miss events can happen without a supervisor noticing. Wearable detection is hard because running, jumping or sitting down fast can look like a fall and cause false alarms.", ["Collect real-time movement data from a wearable Nesso N1", "Detect FFH, STF and near-miss events while reducing false alarms", "Link each wearable to the right worker through monitoring sessions", "Keep raw sensor data and events in PostgreSQL and alert supervisors live"]]],
    ["My role", ["I worked mainly on the data pipeline, server-side detection logic, PostgreSQL schema, system integration, testing and debugging.", ["Built and refined the explainable detection.py fall and near-miss detector (SMV, rotation, tilt change, post-event movement)", "Built the MQTT-to-PostgreSQL flow with validation and duplicate protection via session and sequence IDs", "Designed the schema for workers, devices, sessions, readings, classifications and alerts", "Calibrated rules against real recorded IMU data to cut false positives"]]],
    ["How it works", ["Nesso N1 → MQTT → Python processing → PostgreSQL → dashboard. BLE is used only to register a device to a worker session.", "A monitoring session records Worker ↔ Device ↔ Time Period, so a wearable can be reassigned without losing the ownership of historical readings. One architectural call was dropping Kafka from the prototype: it added complexity without benefit at this scale."]],
    ["Outcome", ["The prototype showed the full Sense → Collect → Process → Detect → Store → Visualise → Act loop, including fall alerts with acknowledgement, a post-fall inactivity escalation, and an SMV graph so supervisors can inspect the movement behind a label.", "Main limitation: the ML model and rules kept evolving late, so there was no large controlled dataset for reliable accuracy or F1 figures. Next steps are a bigger labelled multi-user dataset and per-class evaluation."]]
  ],
  videos: [{ mp4: ["tervanix-demo.mp4", "https://video.wixstatic.com/video/ed2347_6bc1a02db72a4fbc940b19a543429575/480p/mp4/file.mp4"], cap: "Fall / trip demo" }],
  gallery: [
    ["tervanix-ui2.jpg", W("3288366df47541d5b7a55ceb69e491e5", "jpg"), "Nesso N1 UI, page 2"],
    ["tervanix-db.jpg", W("bccc4b66ea4e4bd4bebc074e35631d37", "jpeg"), "Database stores fall incident data"],
    ["tervanix-dashboard.jpg", W("7dc8fcd336ca4a5a991edfc71343a44b", "jpg"), "Dashboard: workers and recent incidents"],
    ["tervanix-graph.jpg", W("ba7a6b33cb454db6a48bc2185fdd0a15", "jpg"), "Live magnitude graph of a worker's movement"]
  ]
},
{
  slug: "morning-brief", title: "The Morning Brief", tag: "AI · Full Stack", year: "2026",
  sub: "An AI-powered personal morning dashboard: news, Singapore weather and markets, summarised by a tsundere assistant.",
  short: "News, weather and market moves, analysed by (Tsundere) AI.",
  cover: ["morning-cover.png", W("8dac33ece4464920a37a34a9832c2001")],
  meta: [["Role", "Full stack developer, AI integration, systems debugging"], ["Stack", "FastAPI · Vercel · Gemini · yfinance · Open-Meteo · Supabase"], ["Type", "Solo, self-initiated · June 2026"]],
  links: [["Open the live site", "https://morning-ai-dashboard-website-projec.vercel.app/"]],
  sections: [
    ["The problem", ["Getting a clear morning picture of markets, local news, global events and weather meant hopping between four or five apps, which turned into doomscrolling. I wanted one dashboard with Singapore and global coverage plus an AI briefing, running on free tiers indefinitely."]],
    ["What it does", [["A daily AI morning brief from Gemini, with name-aware caching", "Categorised news (World, Singapore, Finance, Tech) with AI bullet summaries", "Singapore weather, hourly forecast, rain probability and AQI", "Markets watchlist with live prices, sparklines and per-stock news", "Fear and greed sentiment gauge, entity heatmap and trend detector", "Historical price charts (7 / 30 / 90 day) with sentiment overlays", "An AI chatbot with RAG over 7 days of stored market history"]]],
    ["Debugging highlights", ["Vercel 404s led to several vercel.json iterations. An invisible sentiment gauge came down to an SVG arc sweep flag. Forecasts 8 hours off were a UTC vs SGT mismatch. A perpetually loading page was blocking sync calls inside async functions, fixed with asyncio.to_thread() and client-side timeouts.", "To survive 429 and 503 errors I built a waterfall fallback across an ordered list of Gemini models, silently moving to the next quota bucket. Then the Tsundere Update: a system-instruction persona that leads every answer in character without hurting accuracy."]],
    ["What I learned", ["Cloud behaviour diverges from local behaviour, infrastructure debugging needs the same rigour as app debugging, and shipping a working V1 then layering features keeps the baseline from breaking."]]
  ],
  videos: [{ mp4: ["morning-demo.mp4", "https://video.wixstatic.com/video/ed2347_998c7a96db9e460396d82ec560dd5dec/1080p/mp4/file.mp4"], cap: "Some of the functions of the website" }],
  gallery: [
    ["morning-main.png", W("7692ca175dd54e61a1ff54246870077c"), "Main page: market, news and weather summaries"],
    ["morning-news.png", W("a8d9ad2b9b0741d7b225a36bce34931b"), "News sources and 5-hour weather"],
    ["morning-market.png", W("9223c16520d447b1b38389f41231c2fa"), "Market trends and sentiment gauge"],
    ["morning-trends.png", W("2ead2422daa8410ea5c52a97f33c18a3"), "Word trend detector and in-depth chart viewer"],
    ["morning-chat.png", W("e82213212a3b448593094d015f68f34d"), "AI assistant chatbot and about page"]
  ]
},
{
  slug: "iot-plant-care", title: "IoT Smart Plant Care", tag: "IoT · Accessibility", year: "2026",
  sub: "Automated, transparent plant care with a gesture-controlled, hands-free interface.",
  short: "Sensors, automation and a gesture menu for hands-free care.",
  cover: ["iot-prototype.png", W("17518f46cfcb486fbaf1456c7759cbc1")],
  meta: [["Role", "IoT developer and data integration"], ["Stack", "Arduino Uno · Raspberry Pi · Grove sensors · Python · Flask · MySQL"], ["Type", "2-person project (Bryan & Jeremy) · Feb 2026 · Distinction"]],
  links: [],
  sections: [
    ["The problem", ["Indoor plants suffer from irregular watering, unstable temperatures and too little light. Existing smart systems are often black boxes with no insight or override, and rely on touchscreens or buttons that exclude people with limited hand mobility.", ["Monitor soil moisture, temperature and UV in real time", "Automate watering and UV supplementation with manual override", "Show actionable plant insights on a web dashboard", "Support hands-free control through gestures"]]],
    ["My role", [["UV supplement control logic and moisture / temperature warnings", "Threshold-based automation and manual override via menus", "Arduino optimisation to stop freezes and memory crashes", "Serial communication from Arduino to Raspberry Pi", "Logging readings into MySQL and supporting the Flask dashboard"]]],
    ["Hard problems", ["The Arduino's limited SRAM caused random freezes. Wrapping strings in F(), swapping int for byte, removing String objects and simplifying the menu fixed it.", "Serial data was getting corrupted, so we sent each reading as one comma-separated line in a fixed order and parsed only lines with the expected number of float values."]],
    ["Outcome", ["A working prototype with real-time monitoring, automated care, a gesture menu on the LCD, a database-backed Flask dashboard and warnings. It earned a Distinction and strengthened my embedded optimisation, sensor integration and accessibility-focused design."]]
  ],
  videos: [{ yt: yt("eRXABW8A0ls"), cap: "Full demo: gesture menu, sensor readings and automated responses" }],
  gallery: [
    ["iot-serial.png", W("67b45cd58ae846aa8622c1dc1d514976"), "Serial port data sent"],
    ["iot-database.png", W("9a28d7499aa84f0886556bd57849fcbf"), "MySQL backend"],
    ["iot-dashboard.png", W("7725cf7029984eeaabfbe14a2c9669e0"), "Flask dashboard"]
  ]
},
{
  slug: "nytc", title: "NYTC Season 1", tag: "AI · Drones", year: "2023",
  sub: "Singapore's national AI competition for secondary schools: AI-controlled drones, image recognition and supervised ML. Top 8 nationally.",
  short: "National AI and drone competition across 51 schools. Top 8 finish.",
  cover: ["nytc-team.png", W("b3b5bc7791f241d5b774e293da6eb65f")],
  meta: [["Role", "Supervised ML programmer and image recognition drone programmer"], ["Stack", "DJI Tello · DJITelloPy · OpenCV · Vertex AutoML · decision trees"], ["When", "July – August 2023 · Google Singapore"]],
  links: [],
  sections: [
    ["The competition", ["The National Youth Tech Championship 2023 was co-organised by IMDA and Google. Teams built AI models to fly drones through autonomous obstacle courses. I joined on my own initiative with three friends from Yishun Secondary's robotics club."]],
    ["What I built", [["Connected the Tello to a laptop over its Wi-Fi and streamed video via UDP", "Integrated the camera feed with the recognition pipeline (Python, OpenCV)", "Trained image classifiers with Vertex AI and predictions with decision trees and other supervised methods", "Tested and debugged drone-to-software communication and latency"]]],
    ["Result", ["We reached the top 20 semi-finalists, then the top 8 teams nationally, finishing despite laggy drone connections. The experience sparked my long-term interest in AI competitions."]]
  ],
  videos: [
    { yt: yt("0IXbLVpy92Y"), cap: "Round 1: first drone-control attempts under time pressure" },
    { yt: yt("MQQY74hlvgE"), cap: "Semi-finals: training image and prediction models" },
    { yt: yt("pnkgLk2WeEU"), cap: "Finals: the drone race" }
  ],
  gallery: [
    ["nytc-automl.png", W("dc2758f38d33401bba7d9970222783ae"), "AutoML technical brief & boot camp"],
    ["nytc-semifinal.png", W("4972ba86a6b94a0389b0973b747e10ba"), "Semi-finals qualification"],
    ["nytc-model.png", W("d8db325721264f8c8f4a5bbfe6ab9cb9"), "Prediction model learning process"],
    ["nytc-lego.png", W("7865751e7f9a4567a05b8ade77b0b3b2"), "LEGO image recognition dataset"],
    ["nytc-finalist.png", W("f7e89d2e573640bebd1cab0787483bc9"), "Finalist qualification standings"]
  ]
},
{
  slug: "keep-prompting", title: "Keep Prompting and Nobody Explodes", tag: "Game · AI", year: "2026",
  sub: "An open-house game where an AI defuser can see the bomb and you only have the manual.",
  short: "A solo KTANE-style game with an AI as the other player.",
  cover: ["kpane-main.png", W("b6330d45caed4a518ab56ab27b38fb56")],
  meta: [["Role", "Game design, AI integration, modules, manual, leaderboard, visual design"], ["Stack", "Single HTML file · Gemini API · JavaScript · SVG · Web Speech API"], ["Type", "Solo project"]],
  links: [["View the repository", "https://github.com/Zathral/Keep-Prompting-and-Nobody-Explodes"]],
  sections: [
    ["The problem", ["Open houses struggle to explain AI and Data Engineering to Sec 3-4 students who have never coded. I wanted a game anyone could play in about five minutes with no setup, with a leaderboard to bring them back and real concepts hidden inside."]],
    ["Making the AI play fair", ["The AI defuser only knows what is on the bomb and must not give everything away. It gets a hidden view of each module, replies in structured JSON, and the bomb picture fills in only for facts it said aloud. I iterated on the prompt and forgiving parsing so multi-part questions work."]],
    ["Content and polish", [["Nearly 30 randomised modules across four tiers: ETL ordering, SQL joins, KNN, gradient descent, resistor bands, Ohm's law, PWM and more", "Scoring, Easy / Hard leaderboards, tutorial bomb with a coach, notes pad and calculator", "Phone layout, kid-friendly sketchy style and a voice Defuser mode (beta)", "Redesigned after student playtests"]]],
    ["Reflection", ["Players learn without noticing: to win they write clear prompts, ask follow-ups and read technical info. Limitation: only informal playtests, so future work is logging anonymous run data to tune difficulty."]]
  ],
  videos: [],
  gallery: [
    ["kpane-start.png", W("0657d3ba036b46b5b70b51298fc3fc0e"), "Starting window"]
  ]
}
];
