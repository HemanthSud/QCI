export const siteMeta = {
  name: "Queen City Ishaare",
  shortName: "QCI",
  tagline: "UNC Charlotte's Premier Bollywood Fusion Dance Team",
  description:
    "Queen City Ishaare is UNC Charlotte's premier Bollywood fusion dance team, bringing South Asian dance, hip-hop, contemporary, and campus performance energy to Charlotte stages.",
  url: "https://qci-xi.vercel.app",
  email: "qcishaare25@gmail.com",
  instagram: "https://www.instagram.com/queencity_ishaare/",
  donateUrl:
    "https://www.gofundme.com/f/fuel-queen-city-ishaares-competition-season?attribution_id=sl:9afa1931-97ff-4a5a-92d2-661f61d2a6b3&lang=en_US&ts=1767645001&utm_campaign=fp_sharesheet&utm_content=amp17_ta&utm_medium=customer&utm_source=copy_link",
  supportStoryUrl:
    "https://www.gofundme.com/f/support-queen-city-ishaare-help-us-compete-nationwide",
  homeImage: "/team-hero.jpg",
  logoImage: "/qci-logo.svg",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/calendar", label: "Calendar" },
  { href: "/support", label: "Donate" },
];

export const danceStyles = [
  "Bollywood",
  "Bhangra",
  "Hip-Hop",
  "Contemporary",
  "Classical",
  "Kuthu",
];

export const homepageStats = [
  {
    value: "2017",
    label: "Earliest public competition trail we could verify",
  },
  {
    value: "20+",
    label: "Dancers trained and recruited in recent leadership bios",
  },
  {
    value: "3rd",
    label: "Place at Jersey Jalwa 2025",
  },
  {
    value: "2026",
    label: "South Asian Showdown finalist season",
  },
];

export const homeStoryStats = [
  {
    value: "10+",
    label: "Seasons",
  },
  {
    value: "25+",
    label: "Members",
  },
  {
    value: "50+",
    label: "Performances",
  },
] as const;

export const homePhotoStrip = [
  {
    caption: "NASHA Showcase",
    src: "/gallery/nasha/nasha-01.jpg",
    position: "50% 18%",
  },
  {
    caption: "Jersey Jalwa",
    src: "/gallery/jalwa/jalwa-08.jpg",
    position: "50% 38%",
  },
  {
    caption: "NASHA Showcase",
    src: "/gallery/nasha/nasha-12.jpg",
    position: "50% 56%",
  },
  {
    caption: "Jersey Jalwa",
    src: "/gallery/jalwa/jalwa-22.jpg",
    position: "50% 28%",
  },
] as const;

function makeGalleryImages(folder: "jalwa" | "nasha", label: string, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const photoNumber = String(index + 1).padStart(2, "0");

    return {
      alt: `${label} photo ${index + 1}`,
      src: `/gallery/${folder}/${folder}-${photoNumber}.jpg`,
    };
  });
}

export const jalwaImages = makeGalleryImages("jalwa", "Jersey Jalwa", 34);
export const nashaImages = makeGalleryImages("nasha", "NASHA Showcase", 27);

export const homeEventHighlights = [
  {
    badge: "Competition",
    meta: "2026",
    title: "South Asian Showdown",
    date: "February 28, 2026",
    detail: "Finalist stage",
    location: "Boston, Massachusetts",
  },
  {
    badge: "Competition",
    meta: "2026",
    title: "Jersey Jalwa",
    date: "This season",
    detail: "Competition weekend",
    location: "New Jersey",
  },
  {
    badge: "Showcase",
    meta: "2026",
    title: "NASHA Showcase",
    date: "This season",
    detail: "Season stage",
    location: "Charlotte, North Carolina",
  },
] as const;

export const dareBoardColumns = [
  {
    price: "$3",
    items: [
      "Crack egg on head",
      "Friend does your makeup",
      "2 shots of hot sauce",
      "Get pied",
    ],
  },
  {
    price: "$4",
    items: [
      "Run and scream in public",
      "Friend picks your outfit",
      "Rap battle",
      "Dropped out prank call to parents",
    ],
  },
  {
    price: "$5",
    items: [
      "Freestyle 30-second dance and post",
      "Ice bucket",
      "Ugly photo on Insta story",
      "Serenade a stranger",
    ],
  },
  {
    price: "$7",
    items: [
      "Wax strip",
      "Jump into a pool",
      "Sing on the UNCC bus",
      "Dance our set in the middle of the Union",
    ],
  },
] as const;

export const auditionChecklist = [
  "Send a DM on Instagram to get the info packet",
  "Virtual auditions are accepted",
  "Materials are sent after inquiry",
  "All dance backgrounds are welcome",
  "Team expectations are shared before auditions",
  "Season updates roll out through Instagram",
] as const;

export const homepageFeatures = [
  {
    title: "Narrative-driven sets",
    description:
      "QCI doesn't just dance through tracks. Every set is built like a live short film, with pacing, stakes, and a payoff.",
  },
  {
    title: "Circuit-ready rehearsal culture",
    description:
      "Recent public member profiles describe a team shaped by choreography, logistics, fundraising, production, and relentless practice.",
  },
  {
    title: "Charlotte roots, national ambition",
    description:
      "From campus shows to out-of-state competitions, the team carries UNCC energy into every performance weekend.",
  },
];

export const homepageServiceGrid = [
  {
    index: "01",
    title: "Competition Sets",
    description:
      "Narrative-first routines built for collegiate competition weekends, with music, props, and pacing treated like a full production.",
  },
  {
    index: "02",
    title: "Campus Performances",
    description:
      "High-impact appearances that keep QCI visible across UNCC's cultural events, showcases, and student life calendar.",
  },
  {
    index: "03",
    title: "Guest Bookings",
    description:
      "Custom performances for cultural nights, showcases, private events, and collaborations that need real stage presence.",
  },
  {
    index: "04",
    title: "Fundraising Activations",
    description:
      "Pop-ups, socials, and ticketed events designed to support the season while keeping the brand active between competitions.",
  },
  {
    index: "05",
    title: "Creative Direction",
    description:
      "From costume logic to spacing and transitions, the team approaches every set with a clear visual system and performance intent.",
  },
  {
    index: "06",
    title: "Community Energy",
    description:
      "A team culture that blends discipline, mentorship, and joy so the work feels tight on stage and connected off it.",
  },
] as const;

export const recognitionSlides = [
  {
    quote: "UNCC's premier Bollywood dance team.",
    source: "Season fundraiser",
    year: "2026",
  },
  {
    quote: "A diverse group of passionate students from all class years.",
    source: "South Asian Showdown listing",
    year: "2026",
  },
  {
    quote: "Helped lead the team to their first first-place victory.",
    source: "Former captain bio",
    year: "Alumni era",
  },
] as const;

export const historyTimeline = [
  {
    year: "2017",
    title: "Early circuit years",
    description: "QCI shows up in the Southeast collegiate dance circuit.",
  },
  {
    year: "2019",
    title: "Charlotte presence",
    description: "The team keeps building a visible regional footprint.",
  },
  {
    year: "2025",
    title: "Podium momentum",
    description: "Jersey Jalwa marks a major recent competition moment.",
  },
  {
    year: "2026",
    title: "Finalist stage",
    description: "South Asian Showdown brings the current era to Boston.",
  },
];

export const aboutPillars = [
  {
    title: "Fusion",
    description: "Bollywood roots with hip-hop, contemporary, classical, and South Asian styles.",
  },
  {
    title: "Student-run",
    description: "Captains, choreographers, production, fundraising, and PR all run through the team.",
  },
  {
    title: "Competition",
    description: "Rehearsals, clean-up, travel, costumes, and stage weekends drive the season.",
  },
  {
    title: "Community",
    description: "Campus performances, showcases, and fundraisers keep QCI connected to Charlotte.",
  },
];

export const teamStructure = [
  {
    title: "Captains & creative direction",
    description:
      "Set the tone, shape the vision, and keep the full season moving from first rehearsal to competition weekend.",
  },
  {
    title: "Choreography & clean-up",
    description:
      "Build transitions, lock formations, refine textures, and sharpen every section until the whole set feels unmistakably QCI.",
  },
  {
    title: "Production & logistics",
    description:
      "Music editing, props, costumes, spacing plans, travel coordination, and all the unglamorous work that makes a polished set possible.",
  },
  {
    title: "Fundraising & outreach",
    description:
      "Support campaigns, sponsor outreach, ticketed events, social content, and community partnerships that keep the season alive.",
  },
];

export const fundingUses = [
  {
    title: "Travel & lodging",
    description: "Gas, flights, hotels, and competition weekend travel.",
  },
  {
    title: "Competition fees",
    description: "Registration costs for the circuit.",
  },
  {
    title: "Costumes & props",
    description: "The visual details that make the set stage-ready.",
  },
  {
    title: "Production expenses",
    description: "Music, edits, media, and final production needs.",
  },
];

export const supportWays = [
  {
    title: "Back the season fund",
    description: "Use the GoFundMe above to support the current season.",
    href: "#gofundme",
    label: "View campaign",
  },
  {
    title: "Book QCI for your event",
    description: "Bring the team to a campus show, cultural night, or showcase.",
    href: `mailto:${siteMeta.email}`,
    label: "Book the team",
  },
  {
    title: "Sponsor or partner",
    description: "Partner with QCI for the season.",
    href: `mailto:${siteMeta.email}?subject=QCI%20Sponsorship%20Inquiry`,
    label: "Start a partnership",
  },
];

export const calendarArchive = [
  {
    date: "Nov 18, 2017",
    kind: "Competition",
    title: "ATL Tamasha",
    location: "Atlanta, Georgia",
    status: "Archive",
    description:
      "One of the earliest public competition lineups we found featuring QCI in the Southeast dance circuit.",
  },
  {
    date: "Mar 16, 2019",
    kind: "Regional showcase",
    title: "CLT Pulse season",
    location: "Charlotte, North Carolina",
    status: "Archive",
    description:
      "Public sponsor materials from the CLT Pulse era describe QCI as UNCC's competitive Bollywood team.",
  },
  {
    date: "Jan 18, 2025",
    kind: "Community event",
    title: "QCI Angel and Devil Party",
    location: "Concord, North Carolina",
    status: "Archive",
    description:
      "A ticketed team event that shows the social and fundraising side of the QCI season.",
  },
  {
    date: "Feb 2025",
    kind: "Competition",
    title: "Jersey Jalwa 2025",
    location: "New Jersey",
    status: "Podium",
    description:
      "A publicly listed music track credits Queen City Ishaare with a third-place finish at Jersey Jalwa 2025.",
  },
  {
    date: "Aug 23, 2025",
    kind: "Campus nightlife",
    title: "UNCC Back-to-School Bash",
    location: "Charlotte, North Carolina",
    status: "Archive",
    description:
      "QCI appeared publicly as a co-presenter alongside other community and student groups for the fall kickoff event.",
  },
  {
    date: "Feb 28, 2026",
    kind: "Competition",
    title: "South Asian Showdown 2026",
    location: "Boston, Massachusetts",
    status: "Finalist",
    description:
      "Queen City Ishaare was listed among the ten selected teams for one of the country's highest-profile Bollywood showcases.",
  },
];

export const calendarBuckets = [
  {
    title: "Competition weekends",
    description: "Confirmed competition weekends will show here.",
  },
  {
    title: "Campus performances",
    description: "On-campus performances and showcases.",
  },
  {
    title: "Fundraisers & socials",
    description: "Team fundraisers, socials, and ticketed events.",
  },
  {
    title: "Collaborations & bookings",
    description: "Partner events and booking dates.",
  },
];

export const galleryCards = [
  {
    title: "Full-cast energy",
    caption: "When the formation locks and the whole room feels it.",
    variant: "image" as const,
    size: "large" as const,
    position: "50% 25%",
  },
  {
    title: "Jersey Jalwa '25",
    caption: "Podium season. High stakes. Sharper edges.",
    variant: "poster" as const,
    size: "small" as const,
    accent: "sunset",
  },
  {
    title: "Precision in motion",
    caption: "Texture, timing, and the kind of clean-up audiences notice even if they can't name it.",
    variant: "image" as const,
    size: "medium" as const,
    position: "50% 50%",
  },
  {
    title: "South Asian Showdown",
    caption: "Boston finalist stage, 2026.",
    variant: "poster" as const,
    size: "medium" as const,
    accent: "night",
  },
  {
    title: "Built in rehearsal",
    caption: "Every final hit starts as one more rep after everyone is tired.",
    variant: "image" as const,
    size: "small" as const,
    position: "20% 50%",
  },
  {
    title: "Queen City pulse",
    caption: "Bollywood, bhangra, hip-hop, contemporary, and classical lines in one living system.",
    variant: "poster" as const,
    size: "large" as const,
    accent: "jade",
  },
];

export const videoTimelineEntries = [
  {
    year: "2026",
    embedUrl: "https://www.youtube.com/embed/_BNEzyjdav0",
    watchUrl: "https://www.youtube.com/watch?v=_BNEzyjdav0",
  },
  {
    year: "2025",
    embedUrl: "https://www.youtube.com/embed/fNjySm8f9mM?start=361",
    watchUrl: "https://www.youtube.com/watch?v=fNjySm8f9mM&t=361s",
  },
  {
    year: "2024",
    embedUrl: "https://www.youtube.com/embed/yYbVQIUNnWE",
    watchUrl: "https://www.youtube.com/watch?v=yYbVQIUNnWE",
  },
  {
    year: "2022",
    embedUrl: "https://www.youtube.com/embed/GPhe0vP71FQ",
    watchUrl: "https://www.youtube.com/watch?v=GPhe0vP71FQ",
  },
  {
    year: "2020",
    embedUrl: "https://www.youtube.com/embed/H_MPKUwlw_I",
    watchUrl: "https://www.youtube.com/watch?v=H_MPKUwlw_I",
  },
  {
    year: "2019",
    embedUrl: "https://www.youtube.com/embed/20-9XRC3rFE",
    watchUrl: "https://www.youtube.com/watch?v=20-9XRC3rFE",
  },
  {
    year: "2018",
    embedUrl: "https://www.youtube.com/embed/pyzN5SW4YUM",
    watchUrl: "https://www.youtube.com/watch?v=pyzN5SW4YUM",
  },
  {
    year: "2017",
    embedUrl: "https://www.youtube.com/embed/YJN8wEaUXt8",
    watchUrl: "https://www.youtube.com/watch?v=YJN8wEaUXt8",
  },
  {
    year: "2016",
    embedUrl: "https://www.youtube.com/embed/Em47V-wE7Kw?start=18",
    watchUrl: "https://www.youtube.com/watch?v=Em47V-wE7Kw&t=18s",
  },
] as const;
