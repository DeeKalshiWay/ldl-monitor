// Competitor intel - single source of truth for competitors.html and battlecard.html
// Regenerate by running the competitive-intelligence skill

const LAST_REFRESHED = "2026-05-13";
const COMPETITORS = [
  {
    tier: 1,
    name: "Power Service Products",
    parent: "Independent — Kramer family (founded 1956)",
    headquarters: "Weatherford, TX",
    website: "https://powerservice.com",
    flagship: "Diesel Kleen +Cetane Boost",
    treat_rate: "1:400 (1 oz / 3 gal)",
    pricing: "~$0.09-0.11 / gal treated. ~$25M revenue est.",
    public_pricing: true,
    positioning: "Used by more large fleets and fuel marketers than any other additive. Cetane-boost headline.",
    distribution: ["Walmart", "AutoZone", "O'Reilly", "Tractor Supply", "Fleet Farm", "Amazon", "1000+ distributors", "direct fleet contracts"],
    target_customers: ["Class 8 fleets", "fuel terminals", "ag", "construction/mining", "light-duty pickup"],
    certifications: ["Cummins L10 Superior (officially endorsed)", "GM-certified", "Detroit Diesel-certified", "ULSD compliant"],
    where_they_win: [
      "Distribution moat — on every shelf since the 1980s",
      "One of only TWO Cummins-endorsed additives (the other is Stanadyne)",
      "Full product family covers winter, summer, emergency rescue",
      "Lowest friction for fleet maintenance shops"
    ],
    where_ldl_wins: [
      "1:1,000 treat rate is 2.5x more concentrated than Diesel Kleen",
      "Direct from founder (Alan Epler) — no retail markup",
      "EPA-registered with claimed 10% fuel-economy gain",
      "Universal gas+diesel formula"
    ],
    recent_news: "Launched Diesel Injector & DPF Flush 2024-25 (Yahoo Finance press)",
    sentiment: "The default/baseline — works fine, considered safe but unremarkable. Forums say lubricity lags Opti-Lube; injector cleaning lags Hot Shot's."
  },
  {
    tier: 1,
    name: "Howes Products",
    parent: "Independent — Howes family (5th gen, founded 1920)",
    headquarters: "North Kingstown, RI",
    website: "https://howesproducts.com",
    flagship: "Howes Diesel Treat (anti-gel + lubricity)",
    treat_rate: "1:640 above 0°F, 1:320 below 0°F",
    pricing: "~$0.07-0.08 / gal treated (cheapest national brand)",
    public_pricing: true,
    positioning: "North America's #1 selling anti-gel. Alcohol-free, won't void warranties. Tow guarantee.",
    distribution: ["AutoZone", "Tractor Supply", "Walmart", "O'Reilly", "NAPA", "Pilot/Flying J/Love's truck stops", "Amazon"],
    target_customers: ["Cold-climate Class 8 trucking", "ag", "marine", "light-duty pickup", "generators"],
    certifications: ["ULSD compliant", "alcohol-free (warranty-safe)"],
    where_they_win: [
      "Dominant in winter / anti-gel niche",
      "Cheapest cost-per-treated-gallon of national brands",
      "Truck-stop placement — drivers buy on the road",
      "100+ year brand trust"
    ],
    where_ldl_wins: [
      "Year-round single-product simplicity vs Howes' summer/winter split",
      "Forum users report mpg drop with Howes (1-2 mpg) — LDL claims gain",
      "Heavier on lubricity vs Howes' middle-distillate (kerosene) base",
      "Tow guarantee reportedly difficult to claim — LDL trades on EPA registration"
    ],
    recent_news: "Active influencer marketing (Peterson Farm Brothers). No major launches.",
    sentiment: "Trucker-favorite for anti-gel; mixed for daily use — some report sluggishness."
  },
  {
    tier: 1,
    name: "Stanadyne Performance Formula",
    parent: "Cerberus Capital Management (acquired Aug 2023)",
    headquarters: "Windsor, CT",
    website: "https://www.stanadyne.com",
    flagship: "Stanadyne Performance Formula (year-round all-in-one)",
    treat_rate: "1:480 (4 oz / 15 gal)",
    pricing: "~$0.12-0.16 / gal treated (premium)",
    public_pricing: true,
    positioning: "Made by the people who make the injectors. Cleans to Cummins L10 Superior. Claims 9.6% MPG gain.",
    distribution: ["Tractor Supply", "AutoZone", "Amazon", "Thoroughbred Diesel", "Baldwin Filters channel"],
    target_customers: ["Owner-operators", "fleet maintenance shops", "OEM dealer service bays", "ag/heavy equipment"],
    certifications: ["GM-approved", "Ford-approved", "John Deere-approved", "Navistar-approved", "Caterpillar-approved", "VW-approved", "AM General-approved", "Volvo Penta-approved", "Cummins L10 Superior"],
    where_they_win: [
      "Strongest OEM portfolio in the category — unmatched",
      "Credibility from being the injection-component OEM itself",
      "Strong injector cleanliness performance in lab tests"
    ],
    where_ldl_wins: [
      "Premium-priced — LDL undercuts ~30-40% per gal treated",
      "9.6% MPG claim widely viewed as inflated — LDL's 10% is similar but priced for fleets",
      "Cerberus ownership creates strategic uncertainty",
      "Thinner retail distribution — easier to displace at fleet level"
    ],
    recent_news: "Sold to Cerberus-led investor group Aug 2023 with $35M capital injection.",
    sentiment: "Polarizing — loyalists cite GM approval; skeptics call MPG claims hype and switch to Power Service or AMSOIL."
  },
  {
    tier: 1,
    name: "Hot Shot's Secret",
    parent: "Gold Eagle Co. (acquired July 2022; also owns STA-BIL, HEET, 303)",
    headquarters: "Mt. Gilead, OH",
    website: "https://www.hotshotsecret.com",
    flagship: "Everyday Diesel Treatment (EDT)",
    treat_rate: "1:3,200 (1 oz / 25 gal) — extremely concentrated",
    pricing: "~$0.03-0.04 / gal treated (claims cheapest)",
    public_pricing: true,
    positioning: "6-in-1 multifunction with proprietary LX4 lubricity. Performance/horsepower angle. Pro Pulling League title sponsor.",
    distribution: ["Tractor Supply", "AutoZone", "O'Reilly", "Amazon", "Walmart", "30,000+ retail stores", "performance shops"],
    target_customers: ["Performance diesel pickup owners (Cummins/Powerstroke/Duramax)", "enthusiast/aftermarket", "light fleet"],
    certifications: ["EPA-registered", "ULSD compliant"],
    where_they_win: [
      "Lowest claimed $/gal-treated (1 oz per 25 gal)",
      "Strong digital marketing + influencer network",
      "Enthusiast brand cachet — Pro Pulling League sponsor",
      "Stiction Eliminator is category-leader in adjacent oil-additive niche"
    ],
    where_ldl_wins: [
      "Forum skeptics call EDT 'snake oil' — question how 1:3200 delivers benefits",
      "No OEM approvals — LDL has equal opportunity",
      "Light Class 8 fleet penetration — LDL's commercial focus is differentiated",
      "EDT positioned as preventative; LDL pitches measurable ROI"
    ],
    recent_news: "Gold Eagle merger (July 2022) being leveraged for retail expansion. New product guide 2024.",
    sentiment: "Divisive — pickup enthusiast community loyal; Class 8 trucking forums skeptical of dosing math."
  },
  {
    tier: 1,
    name: "Opti-Lube",
    parent: "Low Range Off-Road (private)",
    headquarters: "Orem, UT",
    website: "https://www.opti-lube.com",
    flagship: "Opti-Lube XPD (all-season all-in-one)",
    treat_rate: "1:512 above 32°F (1/4 oz per gal)",
    pricing: "~$0.12-0.14 / gal treated",
    public_pricing: true,
    positioning: "Lab-test winner. Sold to people who do their own research. Built on third-party wear-scar test results.",
    distribution: ["opti-lube.com direct", "Amazon", "Walmart.com", "Diesel Auto Power", "KC Turbos", "Underdog Diesel"],
    target_customers: ["Enthusiast diesel pickup owners (Powerstroke especially)", "small fleets prioritizing wear protection"],
    certifications: ["EPA-registered", "no OEM approvals advertised"],
    where_they_win: [
      "Best-in-class lubricity / wear-scar test performance",
      "Cult following — wins community lubricity polls",
      "Strong technical credibility with informed buyers"
    ],
    where_ldl_wins: [
      "Tiny company — no fleet contracts, no national retail moat",
      "Algae/biological growth reported in some DieselPlace forum threads — shelf-life concern",
      "Vulnerable if a larger competitor matches lubricity numbers",
      "Narrow distribution — LDL can win on procurement reliability"
    ],
    recent_news: "No M&A, no major launches. Continued lab-test marketing on diesel forums.",
    sentiment: "Highest forum-sentiment of Tier 1 among informed buyers; but reach is narrow."
  },
  {
    tier: 2,
    name: "Lucas Oil Products",
    parent: "Independent — Lucas family (Morgan & Katie Lucas)",
    headquarters: "Indianapolis, IN (moved 2024 from Corona, CA)",
    website: "https://www.lucasoil.com",
    flagship: "Lucas Anti-Gel Cold Weather Diesel Treatment",
    treat_rate: "1:240 (32 oz treats 150 gal)",
    pricing: "~$0.05 / gal treated (winter use). ~$157M revenue (2025).",
    public_pricing: true,
    positioning: "'Keep That Engine Alive!' Race-bred, all-purpose problem-solver. NASCAR primary sponsor, Lucas Oil Stadium.",
    distribution: ["Walmart", "AutoZone", "O'Reilly", "NAPA", "Advance", "Home Depot", "Tractor Supply", "Rural King", "Harbor Freight", "Summit Racing", "Amazon"],
    target_customers: ["DIY light-duty diesel pickup", "RVers", "agricultural retail", "powersports — NOT Class 8 fleet"],
    certifications: ["EPA/ULSD compliant", "no OEM endorsements for diesel additive"],
    where_they_win: [
      "Massive brand recognition + shelf ubiquity",
      "Race sponsorship halo (NASCAR, Indianapolis Colts)",
      "Deep SKU range drives cross-sell (oil, grease, fuel)"
    ],
    where_ldl_wins: [
      "Heavy-duty diesel community routinely dismisses Lucas additives as 'snake oil'",
      "Cummins forum recommends PS / Stanadyne / Opti-Lube over Lucas",
      "Not on Cummins' endorsed list",
      "Lucas is consumer-DIY; LDL targets fleet ROI math"
    ],
    recent_news: "Opened new Indianapolis global HQ Nov 2024. Renewed NASCAR primary sponsorship 2025.",
    sentiment: "Consumer reviews positive; heavy-duty diesel forums skeptical — 'won't hurt but won't do much'."
  },
  {
    tier: 2,
    name: "Schaeffer's Specialized Lubricants",
    parent: "Independent — family-owned 6th gen (founded 1839)",
    headquarters: "St. Louis, MO",
    website: "https://www.schaefferoil.com",
    flagship: "Diesel Treat 2000 Ultra Low Sulfur (#137)",
    treat_rate: "Summer 1:4,000 / Winter 1:1,000",
    pricing: "<$0.02 / gal treated (summer mode — cheapest in category)",
    public_pricing: true,
    positioning: "America's oldest oil company. Premium, technical, fleet-direct sale via 500+ commissioned reps.",
    distribution: ["500+ commissioned sales reps direct", "no mass retail", "limited online resale"],
    target_customers: ["Class 8 OTR fleets", "ag", "construction", "mining", "municipal fleets", "oilfield", "dealership service depts"],
    certifications: ["Cummins L-10 detergency pass", "N-14 injector corrosion pass", "Peugeot DW10", "exceeds EPA lubricity"],
    where_they_win: [
      "Direct-rep relationships create stickiness",
      "Concentrate format = lowest per-gal-treated cost in entire set",
      "Strongest forum reputation in Cummins/Duramax community",
      "Soy-based variants appeal to bio/sustainability buyers"
    ],
    where_ldl_wins: [
      "Premium upfront price — LDL is more accessible procurement-wise",
      "Not on a retail shelf — slower buying motion",
      "Rep coverage gaps by territory",
      "All-season blend criticized below -10°F — LDL claims broader operating window"
    ],
    recent_news: "Steady-state family operation. Continues CarbonTreat HPCR/DPF line expansion.",
    sentiment: "Strongly positive in Cummins/Duramax/Diesel Place forums — 'the additive a real fleet uses.'"
  },
  {
    tier: 2,
    name: "Penray",
    parent: "PLZ Corp / Pritzker Private Capital (acquired 2017)",
    headquarters: "Wheeling, IL",
    website: "https://penray.com",
    flagship: "Pow-R 365 5-in-1 All-Season Diesel Treatment",
    treat_rate: "1:256 (64 oz treats 250 gal)",
    pricing: "~$0.10-0.12 / gal treated. ~$41.6M revenue.",
    public_pricing: true,
    positioning: "'One Bottle, One Truck' — single-bottle simplicity for fleet drivers/maintenance techs. Fleet Doctor diagnostic program.",
    distribution: ["FleetPride", "Peterbilt dealers", "Kenworth", "Mack", "NAPA HD", "Arnold Motor Supply", "Home Depot"],
    target_customers: ["Class 8 trucking", "refrigerated transport", "construction", "ag", "generator/standby (biocide)", "municipal fleets"],
    certifications: ["Per TSB 99.004 — Cummins/Detroit/CAT/Navistar compatibility specs"],
    where_they_win: [
      "Fleet Doctor diagnostic-based selling is differentiated and sticky",
      "Strong HD truck-dealer channel (FleetPride, Peterbilt)",
      "Biocide line for stored-fuel customers fills competitor gap",
      "PLZ scale (2,500+ products) backs operations"
    ],
    where_ldl_wins: [
      "Lower consumer brand awareness vs Lucas/Sea Foam",
      "Not in mass retail — slower buying motion for SMB fleets",
      "Corporate-owned (PLZ/Pritzker) — less founder story than LDL",
      "Thinner forum buzz than Schaeffer's or Power Service"
    ],
    recent_news: "Continued Pow-R 365 rollout into refrigerated transport channel. Brand refresh 2024-25.",
    sentiment: "Fleet-positive in HD channels; nearly invisible on consumer review sites."
  },
  {
    tier: 2,
    name: "Star Tron (Star brite)",
    parent: "Recochem Inc. (acquired Feb 2026 for ~$50M from OneWater Marine)",
    headquarters: "Fort Lauderdale, FL",
    website: "https://www.starbrite.com",
    flagship: "Star Tron Enzyme Fuel Treatment — Diesel Auto Formula",
    treat_rate: "Initial 1:16, maintenance 1:32. Concentrate: 1:96.",
    pricing: "~$0.01-0.04 / gal treated at maintenance dose",
    public_pricing: true,
    positioning: "Enzyme-based — 'breaks down water and sludge so they burn through the engine.' Niche vs chemical detergents.",
    distribution: ["West Marine", "Defender", "Hamilton Marine", "Tractor Supply", "Home Depot", "Walmart", "Amazon", "AutoZone"],
    target_customers: ["Marine diesel (primary)", "RV", "generator/standby", "small-fleet ag/landscape"],
    certifications: ["EPA-registered", "no OEM endorsements"],
    where_they_win: [
      "Differentiated enzyme story (marketing angle)",
      "Dominant in marine category",
      "Strong concentrate value math",
      "New Recochem ownership brings international distribution muscle"
    ],
    where_ldl_wins: [
      "Persistent 'snake oil' skepticism in diesel-truck and motorsport forums",
      "SailNet has notable warning thread",
      "OWNERSHIP TURBULENCE — 2 changes in <4 years (OneWater→Recochem) disrupts fleet relationships",
      "Not viewed as serious Class 8 OTR additive"
    ],
    recent_news: "Sold to Recochem for ~$50M in Feb 2026 — biggest M&A event in the category. Integration disruption window for LDL to displace.",
    sentiment: "Strong marine following; diesel-truck forums skeptical or dismissive."
  },
  {
    tier: 2,
    name: "Sea Foam",
    parent: "Independent — Fred Fandrei founded 1942",
    headquarters: "Chaska, MN",
    website: "https://seafoamworks.com",
    flagship: "Sea Foam Motor Treatment (SF-16)",
    treat_rate: "Cleaning 1:1, maintenance 1:2 — heavy",
    pricing: "~$0.30-0.60 / gal treated (most expensive in set)",
    public_pricing: true,
    positioning: "'Multi-use, 100% petroleum-based, safe for any engine.' YouTube/mechanic-influencer ecosystem. Cult brand.",
    distribution: ["Walmart", "AutoZone", "O'Reilly", "NAPA", "Advance", "Tractor Supply", "Amazon"],
    target_customers: ["DIY mechanics", "light-duty diesel pickup", "marine", "small engines", "classic cars — minimal Class 8 presence"],
    certifications: ["EPA-registered", "no OEM endorsements"],
    where_they_win: [
      "Iconic brand + viral YouTube/mechanic-influencer ecosystem",
      "Trusted for one-time fixes (stuck rings, gummy carbs)",
      "Ubiquitous retail presence"
    ],
    where_ldl_wins: [
      "Multiple credible warnings against intake use on modern diesels — can damage DOC/DPF",
      "No cetane boost",
      "No anti-gel performance",
      "5-10x more expensive per gal treated than dedicated fleet products",
      "Heavy-duty diesel community considers it a 'feel-good cleaner' not a serious additive"
    ],
    recent_news: "Steady SKU expansion (High Mileage, Trans Tune). No major corporate news.",
    sentiment: "DIY/gas crowd loves it; HD diesel community skeptical for fleet use."
  },
  {
    tier: 3,
    name: "Bell Performance",
    parent: "Independent — family-owned (founded 1909)",
    headquarters: "Longwood, FL",
    website: "https://www.bellperformance.com",
    flagship: "Dee-Zol (full-strength diesel treatment, in production since 1954)",
    treat_rate: "Storage 1:8,000 (Dee-Zol Life). Standard treat rate not public.",
    pricing: "$22 / 16 oz direct. <$5M revenue est.",
    public_pricing: true,
    positioning: "World's first diesel additive — since 1954. Heritage/legacy story. Storage stability + fuel polishing focus.",
    distribution: ["shop.bellperformance.com direct", "Amazon", "Walmart.com", "some independent fuel distributors"],
    target_customers: ["Bulk fuel storage operators", "marinas", "generator/standby", "small-mid fleet", "ag", "home heating oil"],
    certifications: ["No published Cummins/Detroit/CAT/military approvals", "CA Prop 65 warning"],
    where_they_win: [
      "70+ years of formula heritage",
      "Strong storage/stability story for tank operators",
      "Multi-SKU breadth (storage, winter, marine, biodiesel)"
    ],
    where_ldl_wins: [
      "Small company with weak retail shelf presence",
      "No published OEM approvals",
      "Treat-rate transparency is poor — must hunt for it",
      "High price-per-oz vs mass-market brands"
    ],
    recent_news: "No major launches or M&A in 2025-26 search. Quiet news cycle.",
    sentiment: "Loyal niche following (legacy reputation); low share-of-voice in mainstream diesel forums."
  },
  {
    tier: 3,
    name: "FPPF Chemical Co.",
    parent: "Independent — Chris Lory founded 1975",
    headquarters: "Buffalo, NY",
    website: "https://fppf.com",
    flagship: "Total Power (year-round all-in-one)",
    treat_rate: "1:1,000 (32 oz treats 250 gal)",
    pricing: "~$0.09 / gal treated (cost-leader in Tier 3)",
    public_pricing: true,
    positioning: "'The Premium Additive Company.' Truckstop convenience + price-per-gallon math.",
    distribution: ["Virtually every truckstop in N. America", "O'Reilly Auto Parts", "XDP", "Pittsburgh Power", "Kennedy Diesel", "independent fuel jobbers (50 states + intl)"],
    target_customers: ["OTR trucking (primary)", "heating oil dealers", "marine", "ag", "construction", "bulk fuel jobbers", "generators"],
    certifications: ["Killem is EPA-registered biocide", "Fuel Power meets/exceeds Cummins standards"],
    where_they_win: [
      "Distributor depth — truckstop ubiquity",
      "Cost-per-gallon leader in Tier 3",
      "Broad SKU coverage",
      "EPA-registered biocide (Killem) is a real differentiator"
    ],
    where_ldl_wins: [
      "Lacks formal OEM certifications",
      "Workmanlike brand — not premium positioning",
      "Total Power label confuses summer/winter use",
      "Limited DTC/online marketing"
    ],
    recent_news: "No major M&A or product launches. Steady-state focus on distributor channel.",
    sentiment: "Owner-operators view as reliable 'set-and-forget' truckstop brand; less hyped on Reddit than Opti-Lube or Hot Shot's."
  },
  {
    tier: 3,
    name: "Lubrication Engineers",
    parent: "Aurora Capital Partners (acquired Sept 2023, $6B AUM PE)",
    headquarters: "Wichita, KS",
    website: "https://lelubricants.com",
    flagship: "Full Torque Diesel Fuel Improver 2411/2421",
    treat_rate: "Not publicly disclosed (login wall)",
    pricing: "Direct quote only — no published pricing",
    public_pricing: false,
    positioning: "Field-tested on Alaska ice roads. Engineered industrial-grade. Bundled with lubricant/grease portfolio.",
    distribution: ["Direct LE consultants only", "no Tractor Supply / Walmart / Amazon"],
    target_customers: ["Industrial fleets", "mining", "construction", "ag", "municipalities", "manufacturing plants"],
    certifications: ["ULSD and biodiesel compatible — no OEM approvals listed"],
    where_they_win: [
      "Consultative sales — sticky technical relationships",
      "Aurora Capital backing for acquisitions + growth",
      "Broad industrial lubricant portfolio for cross-sell",
      "75-year brand history"
    ],
    where_ldl_wins: [
      "Additive is a sub-line of a lubricant company — not the focus",
      "No retail presence — slow procurement for SMB",
      "Opaque pricing — friction for evaluation",
      "Small employee base limits sales coverage"
    ],
    recent_news: "ACQUIRED ROYAL PURPLE INDUSTRIAL FROM CALUMET APRIL 2025 ($110M). Also acquired RSC Bio Solutions + SWEPCO 2024-25. Aurora rolling LE into multi-brand specialty platform. THREAT — expect aggressive fleet expansion through 2026.",
    sentiment: "B2B brand — limited consumer chatter. Industrial customers cite reliability and tech-rep support."
  },
  {
    tier: 3,
    name: "AMSOIL",
    parent: "Independent — Amatuzio family (Alan Amatuzio CEO)",
    headquarters: "Superior, WI",
    website: "https://www.amsoil.com",
    flagship: "Diesel All-In-One (renamed Diesel 4-In-1 in April 2025)",
    treat_rate: "1:5 (1 oz / 5 gal) — heavy dose",
    pricing: "~$0.17 / gal treated (mid-tier)",
    public_pricing: true,
    positioning: "'Better than Howes by 32°F' cold-flow claim. Premium synthetic positioning. Modular product line.",
    distribution: ["Factory-direct + Preferred Customer + dealer network (MLM-style)", "Strong Amazon presence"],
    target_customers: ["Diesel pickup owners (Cummins/Powerstroke/Duramax)", "small fleets", "owner-operators", "ag", "marine"],
    certifications: ["No formal Cummins/Detroit/CAT approvals on additive line"],
    where_they_win: [
      "Premium brand halo from synthetic lubricants",
      "Modular line breadth — buy what you need",
      "Strong dealer evangelism",
      "Real cold-flow performance data"
    ],
    where_ldl_wins: [
      "Heavy 1:5 dose makes per-gallon cost high vs LDL's 1:1,000",
      "MLM dealer model can feel salesy",
      "No commercial fleet sales force at large-fleet scale",
      "No published OEM approvals"
    ],
    recent_news: "Renamed Diesel All-In-One to Diesel 4-In-1 (April 2025). Continued Signature Series oil releases.",
    sentiment: "Polarized — loyalists defend; cost-conscious owner-ops say Opti-Lube goes further per dollar."
  },
  {
    tier: 3,
    name: "Royal Purple (Max-Tane)",
    parent: "Calumet Specialty Products (CLMT) — consumer side only after April 2025 divestiture",
    headquarters: "Porter, TX",
    website: "https://www.royalpurple.com",
    flagship: "Max-Tane (cetane booster + injector cleaner)",
    treat_rate: "1:5 minimum, 1:2 max performance",
    pricing: "~$0.15-0.20 / gal treated",
    public_pricing: true,
    positioning: "'Total diesel performance.' Premium synthetic-brand halo. Marketed to performance-diesel enthusiasts.",
    distribution: ["Blain's Farm & Fleet", "AutoZone", "O'Reilly", "Advance", "Amazon", "Walmart", "JEGS", "specialty performance retailers"],
    target_customers: ["Light-duty diesel pickup owners (Cummins/Powerstroke/Duramax)", "enthusiast/performance", "casual DIY — NOT fleet"],
    certifications: ["ULSD and biodiesel compatible — no OEM approvals"],
    where_they_win: [
      "Premium brand recognition",
      "Shelf presence in farm/auto retail",
      "Distinctive purple packaging",
      "Enthusiast appeal"
    ],
    where_ldl_wins: [
      "Reviews call it overpriced — 'snake oil' per TDIClub forum",
      "Inconvenient metal-can dispenser",
      "No fleet sales motion",
      "STRATEGIC NARROWING — Calumet divested industrial side April 2025; consumer-only focus"
    ],
    recent_news: "Calumet sold Royal Purple industrial to LE for $110M (April 2025). Calumet retains consumer RP including Max-Tane.",
    sentiment: "Mixed — enthusiasts report MPG gains; cost-conscious diesel forum regulars view as overpriced."
  },
  {
    tier: 4,
    name: "Cenex (CHS Inc.)",
    parent: "CHS Inc. — Fortune 500 ag cooperative (CHSCP)",
    headquarters: "Inver Grove Heights, MN",
    website: "https://www.cenex.com",
    flagship: "Roadmaster XL (premium pump diesel) / Ruby Fieldmaster (premium off-road)",
    treat_rate: "Pre-additized at the pump (~6¢/gal premium)",
    pricing: "~$0.05-0.10 / gal spread vs base #2",
    public_pricing: true,
    positioning: "Seven-additive package with injection stabilizer. Pump convenience — no separate bottle. TOP TIER Diesel.",
    distribution: ["1,500+ Cenex c-stores/cardlocks", "19 Midwest/Western states", "230,000+ Cenex card locations"],
    target_customers: ["Class 8 long-haul fleets", "ag producers (corn/wheat belt)", "construction", "co-op members"],
    certifications: ["TOP TIER Diesel", "EPA-registered additive package", "no Cummins endorsement"],
    where_they_win: [
      "Pump convenience — no driver dosing required",
      "Co-op ownership creates fuel-buyer loyalty",
      "Large captive distribution + brand trust in farm country",
      "Aug 2025 reformulation keeps spec current"
    ],
    where_ldl_wins: [
      "Geographically constrained to Midwest/West co-op footprint",
      "Not a fit for fleets that fuel nationally at random terminals",
      "Premium-fuel-only model can't reach fleets running on cheapest diesel",
      "Aftermarket bottle is not their focus — LDL is purpose-built additive"
    ],
    recent_news: "Aug 2025 — CHS launched next-gen Cenex Premium Diesel with improved detergency + injection stabilizer.",
    sentiment: "Farm-side positive (loyal co-op base); Cummins forums mixed."
  },
  {
    tier: 4,
    name: "CleanBoost (Combustion Technologies USA)",
    parent: "Independent — privately held",
    headquarters: "Sandy, UT",
    website: "https://cleanboost.com",
    flagship: "CleanBoost Maxx (combustion catalyst, gas + diesel)",
    treat_rate: "1:3,840 (1 oz / 30 gal)",
    pricing: "~$0.07-0.09 / gal treated",
    public_pricing: true,
    positioning: "Combustion catalyst — claims 3-5% fuel economy gain. Demulsifies water (no alcohol). Works on multiple fuels (JP8/kerosene/gasoline/diesel).",
    distribution: ["cleanboost.com direct", "boostperformanceproducts.com", "Amazon", "fleet customers (Jubitz Portland, Safeway fleet)"],
    target_customers: ["Trucking fleets", "construction", "mining", "oil & gas", "marine", "power generation"],
    certifications: ["EPA-registered", "no Cummins/CAT/DD/military endorsements"],
    where_they_win: [
      "Genuine fleet wins reported in cold-weather operations",
      "Non-alcohol anti-gel is technically differentiated (alcohol strips lubricity)",
      "Concentrated treat rate competitive per gallon",
      "Multi-fuel flexibility for mixed fleets"
    ],
    where_ldl_wins: [
      "Mid-tier brand recognition vs Power Service / Stanadyne",
      "No OEM endorsement",
      "'Combustion catalyst' language draws skepticism on some forums",
      "Thin third-party review base"
    ],
    recent_news: "No major launches/M&A in 12-month window.",
    sentiment: "TruckersReport threads positive in cold-weather use; small sample size."
  },
  {
    tier: 4,
    name: "ValvTect Petroleum Products",
    parent: "RPM International (NYSE: RPM, ~$7.3B revenue parent)",
    headquarters: "Buffalo Grove, IL",
    website: "https://valvtect.com",
    flagship: "BioGuard Plus 6 (EPA-registered biocide + multi-functional)",
    treat_rate: "1:12 maintenance / 1:6 shock dose",
    pricing: "~$0.10-0.12 / gal treated",
    public_pricing: true,
    positioning: "Only EPA-registered diesel additive that combines a biocide with multi-functional package. Owns the marine 'bug' story.",
    distribution: ["~100 licensed distributors in 40+ states", "Hamilton Marine, West Marine, Defender", "Camping World", "Amazon", "branded ValvTect marina pumps"],
    target_customers: ["Marine (primary)", "seasonal-storage fuel users", "boats/generators/backup tanks", "truck fleets", "railroads", "terminals", "ag"],
    certifications: ["EPA-registered pesticide (biocide claim)", "RPM parent QA backing"],
    where_they_win: [
      "Owns the marine category",
      "Biocide claim is defensible and unique — most competitors only sell stabilizer/cetane",
      "RPM parent = financial stability + R&D resources",
      "Clean tech data sheets"
    ],
    where_ldl_wins: [
      "Marine-first brand image limits Class 8 OTR traction",
      "Premium-priced vs trucking-channel competitors",
      "Thinner Class 8 fleet contracts than Power Service or Cenex",
      "Marina-pump premium debated — 'Is ValvTect worth it?' recurrent on forums"
    ],
    recent_news: "BioGuard Plus 6 highlighted in superyacht trade press. No acquisitions in 12 months.",
    sentiment: "Boating forums favorable for water/bug control; trucking forums sparse — not default Class 8 pick."
  },
  {
    tier: 4,
    name: "D-A Lubricant Co. / PennGrade",
    parent: "Independent — family-owned (founded 1919)",
    headquarters: "Lebanon, IN",
    website: "https://www.dalube.com",
    flagship: "PennGrade Heavy Duty 15W-40 (engine oil — no flagship fuel additive)",
    treat_rate: "N/A — no flagship diesel fuel additive SKU",
    pricing: "N/A — fuel-additive line not a core focus",
    public_pricing: false,
    positioning: "'Proven on the track, trusted in your hauler.' Heritage racing oil reputation (Brad Penn lineage).",
    distribution: ["Bulk55 e-commerce", "regional jobber/distributor network in Midwest", "auto parts and race-shop channels"],
    target_customers: ["Race teams", "HD trucking fleets seeking premium oil", "vintage/muscle car owners", "Midwest ag/industrial"],
    certifications: ["API CK-4 for engine oil", "no fuel-additive certifications surfaced"],
    where_they_win: [
      "100+ year brand heritage",
      "PennGrade 1 oil has cult racing following",
      "Family-owned independence",
      "Quality reputation in engine oil category"
    ],
    where_ldl_wins: [
      "NOT a fuel-additive specialist — competing on diesel-additive shelf is not their game",
      "Limited consumer awareness outside racing/regional Midwest",
      "No mass retail for fuel additives",
      "No high-profile bottled fuel additive SKU"
    ],
    recent_news: "Continued PennGrade Heavy Duty marketing for trucking fleets. No acquisitions in 12 months.",
    sentiment: "Engine oil reviews strongly positive; very little fleet-driver chatter about a D-A fuel additive."
  },
  {
    tier: 4,
    name: "Archoil",
    parent: "Independent — privately held",
    headquarters: "Oxford, CT",
    website: "https://www.archoil.com",
    flagship: "AR6200 Fuel Treatment (gas + diesel fuel modification complex)",
    treat_rate: "1:128 standard (1 oz / 30 gal)",
    pricing: "~$0.07-0.09 / gal treated",
    public_pricing: true,
    positioning: "'Combustion modification technology.' Niche pitch around Ford 6.0/6.7 Power Stroke + Cummins enthusiasts. Reduces DPF regen.",
    distribution: ["archoil.com direct", "archoil.powerstrokehelp.com", "Amazon", "Walmart marketplace", "eBay", "specialty diesel performance shops"],
    target_customers: ["Light/medium-duty diesel pickup owners (Ford PS especially)", "diesel enthusiasts", "small fleets paying premium per-bottle"],
    certifications: ["Not on Cummins-endorsed list", "no OEM approvals surfaced"],
    where_they_win: [
      "Strong enthusiast loyalty in PowerStroke/Cummins pickup community",
      "DPF-regen reduction story resonates with 2007.5+ diesel pickup owners",
      "AR9100 oil additive has cult following that halos fuel products",
      "Concentrated dosage"
    ],
    where_ldl_wins: [
      "'Snake oil' accusations recurrent on Reddit and forums — reviews genuinely mixed",
      "No OEM endorsement",
      "Marginal mileage benefit acknowledged by some sellers themselves",
      "Limited fleet penetration — consumer/enthusiast brand, not commercial fleet"
    ],
    recent_news: "No acquisitions or major launches in 12 months. Product line stable.",
    sentiment: "Mixed-to-polarized — '1.5 MPG boost' reports and 'no perceived difference' reports coexist. Reddit skews skeptical."
  }
];
