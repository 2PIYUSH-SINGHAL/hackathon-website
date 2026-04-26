const CONFIG = {
  event: {
    name: "hack.welham",
    edition: "first-edition",
    ribbon: "Inter-School Hackathon · 2026",
    date: "31 July 2026",
    startTime: "09:00 IST",
    themeRevealTime: "31 July · 08:00 IST",
    format: "online · nation-wide",
    deadline: "25 July 2026",
    registrationFormUrl: "#",
    email: "hack@welham.edu.in",
    phone: "+91 xxx xxx xxxx",
    entryFee: "₹499",
    themeEncoded: "YXBwbGU=",
    // Theme reveal time in IST (UTC+5:30) — format: "YYYY-MM-DDTHH:MM:SS+05:30"
    themeRevealUTC: new Date("2026-07-31T08:00:00+05:30").getTime(),
  },

  assets: {
    crest: "assets/welham-crest.png",
    bgSideshows: "assets/bg/image.png",
  },

  downloads: {
    brochure: "assets/downloads/brochure.pdf",
    guidelines: "assets/downloads/event-guidelines.pdf",
    registrationGuide: "assets/downloads/registration-guide.pdf",
  },

  stats: [
    {
      value: "24",
      label: "hours of build",
      sub: "non-stop",
      countable: true,
      count: 24,
      prefix: "",
      suffix: "",
    },
    {
      value: "3",
      label: "tracks",
      sub: "ai · web · cloud",
      countable: true,
      count: 3,
      prefix: "",
      suffix: "",
    },
    { value: "2–4", label: "per team", sub: "same school", countable: false },
    { value: "9–12", label: "class band", sub: "any school", countable: false },
    {
      value: "1",
      label: "team / school",
      sub: "one entry only",
      countable: false,
    },
    { value: "₹499", label: "entry fee", sub: "per team", countable: false },
  ],

  tracks: [
    {
      num: "01",
      short: "A.I.",
      full: "Artificial Intelligence",
      accent: true,
      rotation: "-2deg",
      items: ["Machine learning", "Agents & prompts", "Generative tools"],
    },
    {
      num: "02",
      short: "WEB",
      full: "The Web",
      accent: false,
      rotation: "1deg",
      items: ["Front-end & design", "APIs & databases", "Full-stack apps"],
    },
    {
      num: "03",
      short: "GAME",
      full: "Game Development",
      accent: true,
      rotation: "-1.5deg",
      items: ["2D / 3D games", "Game mechanics & design", "★ Bonus points for polish"],
    },
  ],

  workshop: {
    label: "THE WORKSHOP",
    time: "DAY 1 · 12:00",
    title: "Git & GitHub",
    sub: "60 min · live · optional",
    body: "A hands-on primer on version control — commits, branches, pull requests, and collaborating without stepping on each other's code. Recorded for those who miss it.",
    footer: "→ LED BY MENTOR · TBA",
  },

  miniEvents: [
    {
      num: "№I",
      title: "The Auction",
      time: "DAY 1 · 00:00",
      body: "Bid for tools, APIs, and ideas using a fixed budget of tokens. What you win shapes what you build.",
    },
    {
      num: "№II",
      title: "Constraints",
      time: "DAY 2 · 03:00",
      body: "Each team draws a random constraint — a rule that applies to your build for the rest of the night.",
    },
    {
      num: "№III",
      title: "Media",
      time: "Passive",
      passive: true,
      body: "Public dev blogging contest. Post a build update thread. Best post wins.",
    },
  ],

  timeline: [
    {
      side: "left",
      time: "DAY 1 · 09:00",
      head: "Kick-off",
      desc: "Gates open, keynote, start the clock.",
    },
    {
      side: "right",
      time: "DAY 1 · 12:00",
      head: "Workshop",
      desc: "Intro to building with LLMs (optional).",
    },
    {
      side: "left",
      time: "DAY 1 · 18:00",
      head: "Check-in",
      desc: "Mentor reviews. No judging.",
    },
    {
      side: "right",
      time: "DAY 1 - 2",
      head: "Media",
      desc: "Public dev blogging contest.",
    },
    {
      side: "left",
      time: "DAY 2 · 00:00",
      head: "The Auction",
      desc: "Bid for tools and ideas with a fixed token budget.",
    },
    {
      side: "right",
      time: "DAY 2 · 03:00",
      head: "Constraints",
      desc: "Draw a random constraint for your build.",
    },
    {
      side: "left",
      time: "DAY 2 · 09:30",
      head: "Submissions close",
      desc: "Pens down, demos up.",
    },
    {
      side: "right",
      time: "DAY 2 · 11:00",
      head: "Judging",
      desc: "Teams present to panel · 5 min each.",
    },
    {
      side: "left",
      time: "DAY 2 · 14:00",
      head: "Deliberation",
      desc: "Panel scores in private.",
    },
    {
      side: "right",
      time: "DAY 2 · 15:00",
      head: "Awards",
      desc: "Results, photographs, farewell.",
    },
  ],

  judges: [
    {
      name: "Judge Name 1",
      role: "ROLE · COMPANY",
      image: "assets/images/judge-1.jpg",
      rotation: "-1.5deg",
    },
    {
      name: "Judge Name 2",
      role: "ROLE · COMPANY",
      image: "assets/images/judge-2.jpg",
      rotation: "1.5deg",
    },
    {
      name: "Judge Name 3",
      role: "ROLE · COMPANY",
      image: "assets/images/judge-3.jpg",
      rotation: "1.5deg",
    },
    {
      name: "Judge Name 4",
      role: "ROLE · COMPANY",
      image: "assets/images/judge-4.jpg",
      rotation: "-1.5deg",
    },
  ],

  scorecard: [
    { criterion: "Originality", weight: "25%", desc: "Freshness of idea." },
    { criterion: "Execution", weight: "25%", desc: "Does it actually work?" },
    { criterion: "Impact", weight: "20%", desc: "Who benefits, and how much?" },
    { criterion: "Craft", weight: "15%", desc: "Quality of build & demo." },
    {
      criterion: "Teamwork",
      weight: "15%",
      desc: "How well did you hold together?",
    },
  ],

  faq: [
    {
      q: "Who may enter?",
      a: "Any student in classes 9–12 from any recognised school, in India or abroad.",
    },
    {
      q: "Is there a fee?",
      a: "₹499 per team, paid at registration. This covers platform costs and certificates.",
    },
    {
      q: "How big is a team?",
      a: "Between two and four students. Solo entries aren't permitted.",
    },
    {
      q: "What do I need?",
      a: "A laptop with a stable internet connection.",
    },
    {
      q: "Do I need prior coding experience?",
      a: "We recocmend at least one team member being be able to code. The rest may be designers, writers, or idea people.",
    },
    {
      q: "Where is the hackathon held?",
      a: "Online. You'll get a Zoom invite and video-call links after you register.",
    },
    {
      q: "Will there be any prizes?",
      a: "Certificates for participants, runner-up, champion and a few additional certificates.",
    },
    {
      q: "Can a school send more than one team?",
      a: "No. Each school may submit exactly one entry. The registration form must be filled by the teacher-in-charge using a school email address.",
    },
  ],

  organizer: {
    school: "Welham Boys' School",
    schoolSub: "Dehradun · Est. 1937",
    body: "Organised and run by the Computer Science department and the Tech Society of Welham Boys' School.",
    contact: "hack@welham.edu.in",
    phone: "+91 xxx xxx xxxx",
    motto: "From Strength to Strength",
    mottoLine1: "FROM STRENGTH",
    mottoLine2: "TO STRENGTH",
    name: "Welham Boys' School Hackathon",
    contactHref: "mailto:hack@welham.edu.in",
  },

  team: [
    {
      role: "Faculty Lead",
      name: "Name, Surname",
      sub: "Head, Computer Science",
      image: "assets/images/team-1.jpg",
      rotation: "-1.2deg",
      note: "proud of every one of you. go build.",
    },
    {
      role: "Faculty Co-Lead",
      name: "Name, Surname",
      sub: "Computer Science Dept.",
      image: "assets/images/team-2.jpg",
      rotation: "1.2deg",
      note: "the best code is written with purpose.",
    },
    {
      role: "Lead Organiser",
      name: "Piyush Singhal",
      sub: "Tech Enthusiast",
      image:
        "assets/images/654080599_947231991025727_3647323680011143927_n.jpg",
      facePosition: "50% 18%",
      rotation: "-1.2deg",
      note: "months of work came down to this. make it count.",
    },
    {
      role: "Tracks & Judging",
      name: "Name, Surname",
      sub: "Tech Society",
      image: "assets/images/team-4.jpg",
      rotation: "1.2deg",
      note: "we're watching carefully. impress us.",
    },
    {
      role: "Logistics & Mentors",
      name: "Name, Surname",
      sub: "Tech Society",
      image: "assets/images/team-5.jpg",
      rotation: "-1.2deg",
      note: "we've got you covered. just build.",
    },
    {
      role: "Design & Outreach",
      name: "Name, Surname",
      sub: "Tech Society",
      image: "assets/images/team-6.jpg",
      rotation: "1.2deg",
      note: "make it look as good as it works.",
    },
  ],
};
