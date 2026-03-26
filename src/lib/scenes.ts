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
      "standing casually with one hand resting on the roof of a matte black Lamborghini Urus parked in the circular driveway of a sprawling modern mansion with floor-to-ceiling glass walls, mature palm trees lining the drive, a travertine stone fountain running in the background, golden hour sunlight casting long warm shadows across the pavement, their reflection visible in the car's glossy paint, wearing a fitted designer t-shirt and slim joggers with white sneakers, relaxed confident posture like they just got home",
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
      "sitting in a high-back ergonomic chair at a professional trading desk with six 34-inch curved ultrawide monitors arranged in a 3x2 grid, all screens showing bright green candlestick charts with massive upward spikes, one monitor showing a crypto portfolio with a seven-figure USD balance, dark room illuminated only by the blue-green glow of the screens, two crumpled Monster Energy cans on the desk beside a mechanical keyboard with RGB lighting, the person leaning back slightly with arms behind their head in a power pose, screen reflections visible on their face, ambient blue light casting shadows across the room",
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
      "relaxing in the cabin of a Gulfstream G650 private jet, sunk into a wide cream leather seat with gold stitching, holding a crystal champagne flute of Dom Pérignon with visible bubbles, a cashmere blanket draped over one leg, the oval window beside them showing a vivid orange and pink sunset above a sea of clouds at 40000 feet, warm recessed cabin lighting casting a soft glow, a MacBook Pro open on the walnut side table next to a leather passport holder, wearing a crisp white linen shirt with sleeves rolled up, looking relaxed and slightly smug",
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
      "sitting in a minimalist home office with polished concrete floors and a large abstract painting on the wall, facing a 32-inch Apple Studio Display showing a Phantom wallet interface with a balance of 47 million USD across multiple tokens including SOL ETH and BTC, the person has a subtle knowing smirk, wearing a plain black hoodie, a cold hardware wallet (Ledger Nano) sits on the white oak desk beside an espresso cup, soft diffused natural light from a large window to the left casting gentle shadows, the overall mood is quiet wealth and understated confidence",
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
      "standing on the teak aft deck of a 140-foot Benetti superyacht anchored in crystal turquoise Mediterranean water off the Amalfi coast, Italian cliffside villages visible in the far background, three bottles of Veuve Clicquot in a silver ice bucket on a white marble table, plush cream sunbed cushions nearby, the person wearing designer swim trunks and an open linen shirt billowing slightly in the sea breeze, warm golden hour light reflecting off the water surface creating shimmering caustic patterns on the hull, hair slightly tousled by wind, genuine relaxed expression",
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
      "a medium close-up shot from chest level, sitting in the rear passenger seat of a Rolls Royce Phantom with quilted dark navy leather interior and lambswool headliner visible, casually adjusting a Patek Philippe Nautilus 5711 on their left wrist — the watch dial catching a glint of natural daylight streaming through the tinted window, wearing a tailored charcoal cashmere sweater with the sleeve pushed up to show the watch, the person glancing down at the timepiece with a slight smile, shallow depth of field blurring the Rolls Royce Spirit of Ecstasy emblem embroidered in the headrest behind them",
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
      "standing barefoot on heated marble floors in a luxury penthouse apartment, leaning one shoulder against floor-to-ceiling glass windows that stretch 12 feet high, holding a ceramic mug of black coffee with steam visibly rising, panoramic nighttime city skyline behind them — thousands of twinkling lights from skyscrapers and streets below on the 73rd floor, the interior is modern minimalist with a long white Italian leather sectional sofa and a single large Basquiat painting on the far wall, recessed warm LED lighting in the ceiling casting a soft amber glow, wearing grey sweatpants and a plain white tee looking completely at home, their reflection ghosted in the window glass",
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
      "walking confidently down a red carpet at a Hollywood premiere event, wearing a perfectly tailored slim-fit black Tom Ford suit with a satin lapel, crisp white dress shirt unbuttoned at the collar with no tie, polished black Oxford shoes, multiple bright camera flashes from paparazzi creating starburst lens flares in the background, velvet rope barriers with gold stanchions on either side, blurred photographers with long telephoto lenses visible behind the ropes, a large illuminated movie poster display to the right, the red carpet has a slight sheen from the lights, the person mid-stride with a natural charismatic smile — not posed but caught in motion like a real paparazzi shot",
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
