export interface Scene {
  id: string;
  emoji: string;
  title: string;
  description: string;
  prompt: string;
  caption: string;
  hashtags: string;
  stats: { netWorth: string; followers: string; larpLevel: string };
}

export const scenes: Scene[] = [
  {
    id: "lambo",
    emoji: "🏎️",
    title: "Lambo & Mansion",
    description: "Pull up to your $15M crib in a matte black Urus",
    prompt:
      "A confident young man standing next to a matte black Lamborghini Urus in the driveway of a modern $15 million mansion with palm trees and a fountain, golden hour warm lighting, photorealistic, 8k, shot on Canon EOS R5, shallow depth of field",
    caption:
      "Just another Tuesday. Pulled the Urus out to grab groceries. The mansion's almost too big for one person tbh... almost. 🏠💰",
    hashtags: "#CryptoLife #LamboOrRamen #MadeIt #NeverSelling",
    stats: { netWorth: "$34M", followers: "847K", larpLevel: "∞" },
  },
  {
    id: "trader",
    emoji: "📈",
    title: "100x Trading Desk",
    description: "6 monitors, green candles, impossible PnL screenshots",
    prompt:
      "A young man sitting at a professional trading desk with 6 curved monitors showing green candlestick charts and cryptocurrency prices, dark room lit by screen glow, energy drinks on desk, photorealistic, 8k, cinematic lighting",
    caption:
      'Up $2.3M on $PEPE this week. Not even my biggest position. The screens don\'t lie (but I do). 📊🚀',
    hashtags: "#TraderLife #100x #DiamondHands #GreenCandles",
    stats: { netWorth: "$12M", followers: "423K", larpLevel: "∞" },
  },
  {
    id: "jet",
    emoji: "✈️",
    title: "Private Jet Life",
    description: 'Wheels up. Champagne. "The grind pays off" caption ready',
    prompt:
      "A young man relaxing inside a luxurious private jet cabin, cream leather seats, champagne glass in hand, window showing clouds and sunset, warm cabin lighting, photorealistic, 8k, shot on Sony A7R IV",
    caption:
      'Wheels up to Dubai for a "meeting." The meeting is poolside at the Burj Al Arab. Business casual. 🥂✈️',
    hashtags: "#JetLife #Dubai #Hustle #TheGrindPaysOff",
    stats: { netWorth: "$67M", followers: "1.2M", larpLevel: "∞" },
  },
  {
    id: "crypto",
    emoji: "💰",
    title: "Crypto Whale",
    description: "$47M wallet, diamond hands, WAGMI energy",
    prompt:
      "A young man sitting in a minimalist modern office looking at a large screen showing a crypto wallet with $47 million balance, multiple Bitcoin and Ethereum logos visible, neon blue ambient lighting, photorealistic, 8k",
    caption:
      "47 million in the wallet. Been holding since ETH was $8. They called me crazy. I call them poor. 🐋💎",
    hashtags: "#CryptoWhale #WAGMI #DiamondHands #Generational",
    stats: { netWorth: "$47M", followers: "2.1M", larpLevel: "∞" },
  },
  {
    id: "yacht",
    emoji: "🛥️",
    title: "Yacht Party",
    description: "Mediterranean vibes, bottles, sunset, the whole flex",
    prompt:
      "A young man standing on the deck of a 120 foot luxury superyacht in the Mediterranean sea, crystal blue water, sunset in background, champagne bottles on table, white and gold yacht interior visible, photorealistic, 8k, drone shot angle",
    caption:
      'Just a casual Wednesday in the Mediterranean. The yacht\'s only 120ft, thinking of upgrading. 🌊🍾',
    hashtags: "#YachtLife #Mediterranean #Living #Blessed",
    stats: { netWorth: "$89M", followers: "3.4M", larpLevel: "∞" },
  },
  {
    id: "rolex",
    emoji: "⌚",
    title: "Watch Collection",
    description: "Patek, AP, Richard Mille — casual $500K on the wrist",
    prompt:
      "Close-up of a young man's wrist wearing a Patek Philippe Nautilus watch, sitting in the back of a Rolls Royce, leather interior visible, natural daylight, photorealistic, 8k, macro photography style, shallow depth of field",
    caption:
      "Can't decide between the Nautilus and the Royal Oak today. First world problems when your wrist game is $500K deep. ⌚💎",
    hashtags: "#WatchCollection #Patek #AP #WristGame",
    stats: { netWorth: "$22M", followers: "567K", larpLevel: "∞" },
  },
  {
    id: "penthouse",
    emoji: "🏙️",
    title: "Penthouse View",
    description: "Floor-to-ceiling glass, city skyline, you made it",
    prompt:
      "A young man standing by floor-to-ceiling windows of a luxury penthouse apartment on the 73rd floor, panoramic city skyline at night with city lights, modern minimalist interior, coffee in hand, photorealistic, 8k, cinematic wide angle",
    caption:
      'Morning coffee hits different on floor 73. The city looks so small from up here. Literally and figuratively. ☕🏙️',
    hashtags: "#PenthouseLife #ViewFromTheTop #MadeIt #CityViews",
    stats: { netWorth: "$28M", followers: "912K", larpLevel: "∞" },
  },
  {
    id: "celeb",
    emoji: "🌟",
    title: "Celebrity Status",
    description: "Red carpet, paparazzi, VIP everything",
    prompt:
      "A young man walking the red carpet at a Hollywood premiere, wearing a tailored black suit, camera flashes from paparazzi, velvet rope barriers, photographers in background, photorealistic, 8k, editorial photography style",
    caption:
      'Third red carpet this week. My publicist says I need to "be more exclusive." I say the people need me. 📸⭐',
    hashtags: "#Celebrity #RedCarpet #Famous #VIP",
    stats: { netWorth: "$150M", followers: "15M", larpLevel: "∞" },
  },
];

export interface GalleryItem {
  id: string;
  persona: string;
  handle: string;
  sceneId: string;
  caption: string;
  likes: string;
  comments: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    persona: "CryptoKing_2024",
    handle: "@cryptoking2024",
    sceneId: "lambo",
    caption: "New whip who dis 🏎️ #blessed #cryptomoney",
    likes: "12.4K",
    comments: "847",
  },
  {
    id: "g2",
    persona: "WhaleAlert99",
    handle: "@whalealert99",
    sceneId: "trader",
    caption: "Just another 6-figure day at the desk 📈",
    likes: "8.9K",
    comments: "623",
  },
  {
    id: "g3",
    persona: "JetSetterDAO",
    handle: "@jetsetterdao",
    sceneId: "jet",
    caption: "Wheels up. Closed a deal mid-flight 🛫",
    likes: "24.1K",
    comments: "1.2K",
  },
  {
    id: "g4",
    persona: "DiamondHands420",
    handle: "@diamondhands420",
    sceneId: "crypto",
    caption: "Still holding. Still winning. 💎🙌",
    likes: "31.7K",
    comments: "2.1K",
  },
  {
    id: "g5",
    persona: "YachtWeekAlpha",
    handle: "@yachtweekalpha",
    sceneId: "yacht",
    caption: "Office for the week. Don't @ me 🛥️",
    likes: "19.3K",
    comments: "956",
  },
  {
    id: "g6",
    persona: "WristGameChad",
    handle: "@wristgamechad",
    sceneId: "rolex",
    caption: "The AP hits different in Monaco ⌚",
    likes: "15.6K",
    comments: "1.4K",
  },
  {
    id: "g7",
    persona: "PenthouseVibes",
    handle: "@penthousevibes",
    sceneId: "penthouse",
    caption: "73rd floor mornings 🏙️ you wouldn't get it",
    likes: "22.8K",
    comments: "1.8K",
  },
  {
    id: "g8",
    persona: "RedCarpetRich",
    handle: "@redcarpetrich",
    sceneId: "celeb",
    caption: "They said I couldn't. Then they asked for photos. 📸",
    likes: "45.2K",
    comments: "3.4K",
  },
  {
    id: "g9",
    persona: "SOLionaire",
    handle: "@solionaire",
    sceneId: "lambo",
    caption: "From ramen to Revuelto. Solana changed my life 🍜→🏎️",
    likes: "28.9K",
    comments: "2.7K",
  },
  {
    id: "g10",
    persona: "DeFi_Degen_77",
    handle: "@defidegen77",
    sceneId: "trader",
    caption: "6 screens because I have 6 figures to watch 📊",
    likes: "11.2K",
    comments: "534",
  },
  {
    id: "g11",
    persona: "RugProof_Rick",
    handle: "@rugproofrick",
    sceneId: "jet",
    caption: "Flying to consensus. First class or first out 🚀",
    likes: "16.7K",
    comments: "892",
  },
  {
    id: "g12",
    persona: "NFT_Flipper_Pro",
    handle: "@nftflipperpro",
    sceneId: "yacht",
    caption: "Bought this yacht with jpeg money. No cap. 🖼️🛥️",
    likes: "33.4K",
    comments: "4.1K",
  },
];

export const larpOfTheDay = [
  {
    sceneId: "lambo",
    persona: "MoonBoy_Alpha",
    handle: "@moonboyalpha",
    caption: "Went from sleeping in my car to sleeping in a mansion with 6 cars. Crypto is undefeated. 🏎️🏠",
    likes: "67.2K",
    comments: "5.4K",
    shares: "12.1K",
  },
  {
    sceneId: "trader",
    persona: "GigaBrain_Trader",
    handle: "@gigabraintrader",
    caption: "My portfolio just passed my age in millions. I'm 24. Not bad for a college dropout. 📈💰",
    likes: "89.1K",
    comments: "7.2K",
    shares: "18.3K",
  },
  {
    sceneId: "jet",
    persona: "SkyHighSOL",
    handle: "@skyhighsol",
    caption: "Taking meetings at 40,000 feet. The WiFi up here costs more than your rent. Worth it. ✈️",
    likes: "54.8K",
    comments: "4.1K",
    shares: "9.7K",
  },
  {
    sceneId: "crypto",
    persona: "WhaleWatcher",
    handle: "@whalewatcher",
    caption: "Just moved $12M to cold storage. The blockchain is my bank. No KYC needed. 🐋",
    likes: "112K",
    comments: "9.8K",
    shares: "24.5K",
  },
  {
    sceneId: "yacht",
    persona: "AquaAlpha",
    handle: "@aquaalpha",
    caption: "They said money can't buy happiness. They clearly haven't been on a yacht in Santorini. 🛥️🌅",
    likes: "78.3K",
    comments: "6.1K",
    shares: "15.8K",
  },
  {
    sceneId: "penthouse",
    persona: "UrbanKing",
    handle: "@urbanking",
    caption: "The view from the top is lonely. JK there's a rooftop pool and 3 hot tubs. 🏙️",
    likes: "91.4K",
    comments: "8.3K",
    shares: "20.2K",
  },
  {
    sceneId: "celeb",
    persona: "MainCharacter",
    handle: "@maincharacter",
    caption: "Paparazzi caught me leaving Nobu. I tipped the photographer. Gotta stay humble. 📸",
    likes: "134K",
    comments: "11.2K",
    shares: "28.9K",
  },
];
