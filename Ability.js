const abilities = [

        // Physical

        "Super Strength",
        "Superspeed",
        "Invulnerability",
        "Regeneration",
        "Immortality",
        "Shapeshifting",
        "Enhanced Senses",
        "Flight",
        "Invisibility",
        "Intangibility",

        // Psychic

        "Telepathy",
        "Telekinesis",
        "Mind Control",
        "Precognition",
        "Clairvoyance",
        "Empathy",
        "Illusion Casting",
        "Astral Projection",

        // Elemental //Flight //Empathy //Possession //Animal Communication

        "Pyrokinesis",
        "Cryokinesis",
        "Hydrokinesis",
        "Aerokinesis",
        "Geokinesis",
        "Electrokinesis",
        "Chlorokinesis",
        "Photokinesis",
        "Umbrakinesis",
        "Energy Projection",
        "Force Field Generation",

        // Mystic

        "Teleportation",
        "Time Manipulation",
        "Portal Creation",
        "Dimensional Travel",
        "Size Manipulation",

        // Life & Death

        "Necromancy",
        "Resurrection",
        "Biokinesis",
        "Possession",
        "Power Absorption",
        "Power Negation",
        "Animal Communication"
       
];

const abilityDescriptions = {

        // Physical

        "Super Strength":
            "Exert force far beyond normal human limits.",

        "Superspeed":
            "Move and react at extraordinary speeds.",

        "Invulnerability":
            "Resist physical damage and withstand powerful attacks.",

        "Regeneration":
            "Rapidly heal injuries and recover from wounds.",

        "Immortality":
            "Cannot die from age and possesses an endless lifespan.",

        "Shapeshifting":
            "Alter appearance or transform into different creatures.",

        "Enhanced Senses":
            "Possess heightened sight, hearing, smell, and awareness.",

        "Flight":
            "Defy gravity and travel freely through the air.",

        "Invisibility":
            "Become unseen by others at will.",

        "Intangibility":
            "Pass through solid objects without resistance.",

        // Psychic

        "Telepathy":
            "Read thoughts and communicate directly through the mind.",

        "Telekinesis":
            "Move and manipulate objects using mental power.",

        "Mind Control":
            "Influence or command the thoughts and actions of others.",

        "Precognition":
            "Witness possible future events before they occur.",

        "Clairvoyance":
            "Observe distant places and hidden events.",

        "Empathy":
            "Sense and influence the emotions of others.",

        "Illusion Casting":
            "Create realistic sensory illusions and false perceptions.",

        "Astral Projection":
            "Separate your spirit from your physical body.",

        // Elemental

        "Pyrokinesis":
            "Create, shape, and control fire.",

        "Cryokinesis":
            "Generate and manipulate ice and freezing temperatures.",

        "Hydrokinesis":
            "Control water and other liquids.",

        "Aerokinesis":
            "Command air currents, wind, and storms.",

        "Geokinesis":
            "Manipulate earth, stone, and terrain.",

        "Electrokinesis":
            "Generate and control electrical energy.",

        "Chlorokinesis":
            "Control plants and accelerate their growth.",

        "Photokinesis":
            "Create and manipulate light.",

        "Umbrakinesis":
            "Control shadows and darkness.",

        "Energy Projection":
            "Release concentrated blasts of magical energy.",

        "Force Field Generation":
            "Create protective barriers against attacks and hazards.",

        // Mystic

        "Teleportation":
            "Instantly travel from one location to another.",

        "Time Manipulation":
            "Slow, accelerate, or stop the flow of time.",

        "Portal Creation":
            "Open gateways connecting distant places.",

        "Dimensional Travel":
            "Move between worlds, dimensions, or planes of existence.",

        "Size Manipulation":
            "Increase or decrease physical size at will.",

        // Life & Death

        "Necromancy":
            "Command undead forces and commune with the dead.",

        "Resurrection":
            "Restore life to the deceased.",

        "Biokinesis":
            "Manipulate living organisms and biological functions.",

        "Possession":
            "Take control of another being's body.",

        "Power Absorption":
            "Steal, copy, or absorb the powers of others.",

        "Power Negation":
            "Suppress or disable supernatural abilities.",

        "Animal Communication":
            "Speak with, understand, and influence animals."

};

const abilityRarities = {

        // COMMON

        "Enhanced Senses": "Common",
        "Animal Communication": "Common",

        // UNCOMMON

        "Super Strength": "Uncommon",
        "Superspeed": "Uncommon",
        "Invulnerability": "Uncommon",
        "Flight": "Uncommon",
        "Invisibility": "Uncommon",
        "Telepathy": "Uncommon",
        "Telekinesis": "Uncommon",
        "Empathy": "Uncommon",
        "Chlorokinesis": "Uncommon",

        // RARE

        "Regeneration": "Rare",
        "Shapeshifting": "Rare",
        "Intangibility": "Rare",
        "Precognition": "Rare",
        "Clairvoyance": "Rare",
        "Illusion Casting": "Rare",
        "Pyrokinesis": "Rare",
        "Cryokinesis": "Rare",
        "Hydrokinesis": "Rare",
        "Aerokinesis": "Rare",
        "Geokinesis": "Rare",
        "Electrokinesis": "Rare",
        "Photokinesis": "Rare",
        "Umbrakinesis": "Rare",
        "Energy Projection": "Rare",
        "Force Field Generation": "Rare",

        // EPIC

        "Astral Projection": "Epic",
        "Mind Control": "Epic",
        "Teleportation": "Epic",
        "Biokinesis": "Epic",
        "Power Negation": "Epic",
        "Possession": "Epic",
        "Size Manipulation": "Epic",

        // LEGENDARY

        "Necromancy": "Legendary",
        "Resurrection": "Legendary",
        "Portal Creation": "Legendary",
        "Dimensional Travel": "Legendary",
        "Power Absorption": "Legendary",

        // MYTHIC

        "Immortality": "Mythic",
        "Time Manipulation": "Mythic"

};
        const rarityPools = {

        
        "Common": [],
        "Uncommon": [],
        "Rare": [],
        "Epic": [],
        "Legendary": [],
        "Mythic": []
        

        };

        for (const ability in abilityRarities) {

        
        const rarity =
            abilityRarities[ability];

        rarityPools[rarity].push(
            ability
        );
}

let abilityRerolls = 30;

        function rollRarity() {

        const roll =
            Math.random() * 100;

        if (roll < 40) {

            return "Common";
        }

        if (roll < 70) {

            return "Uncommon";
        }

        if (roll < 88) {

            return "Rare";
        }

        if (roll < 96) {

            return "Epic";
        }

        if (roll < 99) {

            return "Legendary";
        }

        return "Mythic";


}




function rollAbilityCount() {

    const roll =
        Math.random() * 100;

    if (roll < 70) {

        return 0;
    }

    if (roll < 90) {

        return 1;
    }

    if (roll < 98) {

        return 2;
    }

    return 3;
}

function generateAbilities() {

    if (abilityRerolls <= 0) {
        alert("No rerolls remaining! (Maximum 30 rolls)");
        return;
    }

    const count = rollAbilityCount();

    document.getElementById("abilityCount").textContent = "Ability Count: " + count;

    const results = document.getElementById("abilityResults");
    results.innerHTML = "";

    let selectedAbilities = [];

    if (count === 0) {
        results.innerHTML = "<h2>No Ability</h2>";
    } else {
        selectedAbilities = [];

        while (selectedAbilities.length < count) {
            const rarity = rollRarity();
            const pool = rarityPools[rarity];
            const randomAbility = pool[Math.floor(Math.random() * pool.length)];

            if (!selectedAbilities.includes(randomAbility)) {
                selectedAbilities.push(randomAbility);
            }
        }

        selectedAbilities.forEach(ability => {
            const card = document.createElement("div");
            card.style.margin = "10px";
            card.style.padding = "15px";
            card.style.border = "1px solid gold";
            card.style.borderRadius = "8px";

            const description = abilityDescriptions[ability] || "No description available.";
            const rarity = abilityRarities[ability] || "Unknown";

            card.innerHTML = `
                <h3>${ability}</h3>
                <p>Rarity: ${rarity}</p>
                <p>${description}</p>
            `;

            results.appendChild(card);
        });
    }

    localStorage.setItem("characterAbilities", JSON.stringify(selectedAbilities));

    // Always count as 1 roll, even if 0 abilities
    abilityRerolls--;
    document.getElementById("abilityRerollCount").textContent = 
        "Rerolls Remaining: " + abilityRerolls;
}

document.getElementById(
    "rollAbilityBtn"
).addEventListener(
    "click",
    generateAbilities
);

