var abilities = ["Ability Thief", "Ace", "Adorable", "Aggressive", "Ambush", "Analyze", "Anomaly", "Applied Frustration", "Apprehension", "Aqua Body", "Awakening", "Baneful", "Bitter Touch",
                 "Bloodsucker", "Boast", "Brute Force", "Bug Fever", "Bully", "Burglar", "Bursting Seams", "Caddie", "Chaperone", "Chill", "Circadian", "Clingy", "Clutch", "Combative", "Combustible",
                 "Communication", "Compliant", "Confidence", "Contact Curse", "Coursing Venom", "Dawn", "Defensive Priority", "Devious", "Double Strike", "Drainage", "Driven", "Dusk", "Early Bird",
                 "Enchant", "Enchanted Coat", "Expertise", "Finesse", "Flutter", "Frail Armor", "Frenzy", "Glide", "Guardian", "Guru", "Handy", "Hard Candy", "Harmonize", "Hasty", "Heavy Fists",
                 "High Explosive", "Idiosyncratic", "Ignorant", "Illuminate", "Immunized", "Incandescent", "Lazy", "Life Force", "Lightning Rod", "Lucky", "Madcap", "Marksman", "Mean Spirited",
                 "Mysterious Cloak", "Mystery Toxins", "Neutralize", "Nightmarish", "Noxious Weeds", "Odd Husk", "Overcharged", "Overshadow", "Oxidize", "Parting Gift", "Pincer Trap", "Playful",
                 "Power Jaw", "Power Napper", "Premonition", "Prismatic", "Protective Shell", "Pyro", "Quick Recovery", "Radiance", "Raging Fire", "Razor Sharp", "Rechargeable", "Regift", "Replicate",
                 "Repugnant", "Resilience", "Rev Up", "Salvage", "Scorching Skin", "Shakedown", "Sharp Claws", "Sharp Edges", "Sharp Focus", "Slick Shell", "Slimy", "Sly", "Specialization", "Staunch",
                 "Sugar Rush", "Surrogate", "Swampy", "Sweet Aroma", "Sweet Touch", "Tank", "Temper", "Terrifying", "Territorial", "Thriving Pace", "Tone Deaf", "Total Eclipse", "Toxic Filter",
                 "Toxic Spines", "Toxic Touch", "Trash Armor", "Turbulent", "Ungracious Host", "Vengeance", "Vigilant", "Vigorous", "Virtuoso", "Vivid Sight", "Volcanic", "Watcher", "Webbing",
                 "Woodsman", "Two Face", "Insulated", "Wise", "Malware", "Fanning Flame", "Appetite", "Gummy", "Viscid", "Glutton", "Resentful", "Pitch-Black", "Master", "Reverberate", "Mystic Tone",
                 "Dauntless", "Festive Spirit", "Vicious", "Reaper", "Captivating", "Forge", "Blistering Heat", "Herd Behavior", "Regurgitate", "Wholesome", "Pyro Pro", "Persistence", "One of Many",
                 "Mesmerizing", "Hydrate", "Railgun", "Spine Break", "Sponge", "Burning Rage", "Third-Degree Burn", "Deep Frostbite", "Chilling Passion", "Obsidian Heart", "Luck Of The Sea", "Intern",
                 "Partnership", "Rush Hour", "Trader", "Safety Pot", "Gloomy", "Mimic", "Reflective", "Hag", "Foresight", "Demanding", "Ravenous", "Designated Chompers", "Battle Armor", "Mask Swap",
                 "Facade", "Party Trick", "Do or Die", "Wildfire", "Sendoff", "Hydro Vortex", "Motivational", "Soul Siphon", "Pluvial", "Petrifying", "Tumultuous", "Venomous", "Brutal Wrath",
                 "Sky-Borne", "Land-Borne", "Depths-Borne", "All Seeing", "Rain Rush", "Triumph", "Royal Decree", "Thunder Summon", "Recurrent", "Charged Arc","Adaptable", "Heat Summon",
                 "Rain Summon", "Fog Summon", "Wind Summon", "Inferno", "Cosmic Pressure", "Conspire", "Metamorphosis", "Sob", "Wail", "Seize", "Assertive", "Berserk", "Disenchant", "Impose", "Gorge",
                 "Carol", "Fortissimo", "Elusive", "Upper Hand", "Effulgent", "Dummy", "Puncture", "Toxic Sac", "Hover", "Eager", "Reign", "Overclock", "Prowler", "Hotfoot", "Mycotic", "Remorseless",
                 "Night Light", "Intensify", "Power Claw", "Medic", "Boneheaded"];

var typeModAbilities = {
    coursingVenom: {
        name: "Coursing Venom",
        typeModifier: { type: "Toxic", modifier: 0 },
        powerMod: false
    },
    
    lightningRod: {
        name: "Lightning Rod",
        typeModifier: { type: "Electric", modifier: 0 },
        powerMod: false
    },
    
    prismatic: {
        name: "Prismatic",
        typeModifier: { type: "Light", modifier: 0 },
        powerMod: false
    },

    hover: {
        name: "Hover",
        typeModifier: { type: "Earth", modifier: 0 },
        powerMod: false
    },

    reflective: {
        name: "Reflective",
        typeModifier: { type: "Light", modifier: 0 },
        powerMod: false
    },
    
    woodsman: {
        name: "Woodsman",
        typeModifier: { type: "Plant", modifier: 0 },
        powerMod: false
    },
    
    combustible: {
        name: "Combustible",
        typeModifier: { type: "Fire", modifier: 0 },
        powerMod: false
    },
    
    noxiousWeeds: {
        name: "Noxious Weeds",
        typeModifier: { type: "Plant", modifier: 0 },
        powerMod: false
    },
    
    pyro: {
        name: "Pyro",
        typeModifier: { type: "Fire", modifier: 1.25 },
        powerMod: true
    },

    pyroPro: {
        name: "Pyro Pro",
        typeModifier: { type: "Fire", modifier: 1.25 },
        powerMod: true
    },
    
    volcanic: {
        name: "Volcanic",
        typeModifier: { type: "Fire", modifier: 2 },
        powerMod: true
    },

    ragingFire: {
        name: "Raging Fire",
        typeModifier: { type: "Fire", modifier: 0},
        powerMod: false
    },
    
    rechargeable: {
        name: "Rechargeable",
        typeModifier: { type: "Electric", modifier: 0},
        powerMod: false
    },

    totalEclipse: {
        name: "Total Eclipse",
        typeModifier: { type: "Light", type2: "Dark", modifier: 0},
        powerMod: false
    },

    toxicFilter: {
        name: "Toxic Filter",
        typeModifier: { type: "Toxic", modifier: 0},
        powerMod: false
    },

    aquaBody: {
        name: "Aqua Body",
        typeModifier: { type: "Fire", modifier: 0.5},
        powerMod: false
    },

    hardCandy: {
        name: "Hard Candy",
        typeModifier: { type: "Water", modifier: 2},
        powerMod: false
    },

    incandescent: {
        name: "Incandescent",
        typeModifier: { type: "Light", modifier: 1.25},
        powerMod: true
    },

    'pitch-black': {
        name: "Pitch-Black",
        typeModifier: { type: "Dark", modifier: 1.25},
        powerMod: true
    },

    insulated: {
        name: "Insulated",
        typeModifier: { type: "Fire", type2: "Ice", modifier: 0.5},
        powerMod: false
    },

    fanningTheFlame: {
        name: "Fanning Flame",
        typeModifier: { type: "Air", modifier: 0.5},
        powerMod: false
    },

    forge: {
        name: "Forge",
        typeModifier: { type: "Fire", modifier: 0.5},
        powerMod: false
    },

    wholesome: {
        name: "Wholesome",
        typeModifier: { type: "Brawler", type2: "Mind", modifier: 0.5},
        powerMod: false
    },

    hydrate: {
        name: "Hydrate",
        typeModifier: { type: "Water", modifier: 0},
        powerMod: false
    },

    sponge: {
        name: "Sponge",
        typeModifier: { type: "Water", modifier: 0},
        powerMod: false
    },

    hydroVortex: {
        name: "Hydro Vortex",
        typeModifier: { type: "Water", modifier: 0},
        powerMod: false
    },

    railgun: {
        name: "Railgun",
        typeModifier: { type: "Electric", modifier: 1.5},
        powerMod: true
    },

    burningRage: {
        name: "Burning Rage",
        typeModifier: { type: "Fire", modifier: 1.25},
        powerMod: true
    },

    chillingPassion: {
        name: "Chilling Passion",
        typeModifier: { type: "Ice", modifier: 1.25},
        powerMod: true
    },

    obsidianHeart: {
        name: "Obsidian Heart",
        typeModifier: { type: "Ancient", modifier: 1.5},
        powerMod: true
    },

    'sky-borne': {
        name: "Sky-Borne",
        typeModifier: { type: "Air", modifier: 1.25},
        powerMod: true
    },

    'land-borne': {
        name: "Land-Borne",
        typeModifier: { type: "Earth", modifier: 1.25},
        powerMod: true
    },

    'depths-borne': {
        name: "Depths-Borne",
        typeModifier: { type: "Water", modifier: 1.25},
        powerMod: true
    },
}