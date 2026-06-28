const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const center = canvas.width / 2;
const radius = 220;

let characterStats = {

    Strength: "-",
    Stamina: "-",
    Durability: "-",
    Endurance: "-",
    Agility: "-",
    Intelligence: "-",
    Perception: "-",
    Mastery: "-"
};

let currentOrigin = "";

let currentAbilities = [];

let originRerolls = 3;

let originLocked = false;
let isGeneratingOrigin = false;

let currentRace = "";

let raceRerolls = 3;

let raceLocked = false;

let currentOccupation = "";

let occupationRerolls = 3;

let occupationLocked = false;

let currentNarrativeFunction = "";
let currentMoralRole = "";
let currentAlignment = "";
let currentAmbition = "None";

let narrativeLocked = false;
let moralLocked = false;
let alignmentLocked = false;

let narrativeRerolls = 3;
let moralRerolls = 3;
let alignmentRerolls = 3;

const origins = [

    { name: "Farmer", weight: 30 },
    { name: "Hunter", weight: 25 },
    { name: "Fisherman", weight: 25 },
    { name: "Merchant", weight: 20 },

    { name: "Blacksmith Apprentice", weight: 18 },
    { name: "Temple Acolyte", weight: 18 },
    { name: "Scholar", weight: 15 },

    { name: "Guild Member", weight: 14 },
    { name: "Knight Squire", weight: 12 },

    { name: "Mercenary", weight: 10 },

    { name: "Noble", weight: 8 },
    { name: "Royal Guard", weight: 7 },

    { name: "Elite Mercenary", weight: 5 },
    { name: "Court Mage Apprentice", weight: 5 },

    { name: "Exiled Noble", weight: 3 },
    { name: "Lost Heir", weight: 3 },

    { name: "Ancient Bloodline", weight: 2 },

    { name: "Dragon Slayer Descendant", weight: 1 },
    { name: "Child of Prophecy", weight: 1 },
    { name: "Chosen of the Gods", weight: 1 },
    { name: "Reincarnated Hero", weight: 1 }

];

const races = [

    { name: "Human", weight: 50 },
    { name: "Demi-Human", weight: 25 },
    { name: "Monster", weight: 20 },
    { name: "Undead", weight: 12 },
    { name: "Demon", weight: 10 },
    { name: "Angel", weight: 6 },
    { name: "Godkin", weight: 2 }

];

const occupations = [

    { name: "Farmer", weight: 18 },
    { name: "Hunter", weight: 15 },
    { name: "Merchant", weight: 14 },
    { name: "Blacksmith", weight: 12 },
    { name: "Scholar", weight: 12 },
    { name: "Priest", weight: 10 },
    { name: "Knight", weight: 8 },
    { name: "Guard", weight: 8 },
    { name: "Mercenary", weight: 7 },
    { name: "Assassin", weight: 5 },
    { name: "Alchemist", weight: 5 },
    { name: "Explorer", weight: 4 },
    { name: "Guild Master", weight: 2 },
    { name: "Royal Advisor", weight: 2 },
    { name: "Court Mage", weight: 2 },
    { name: "General", weight: 1 },
    { name: "King", weight: 1 }

];

const narrativeFunctions = [

    { name: "Protagonist", weight: 20 },
    { name: "Antagonist", weight: 15 },
    { name: "Deuteragonist", weight: 15 },
    { name: "Mentor", weight: 10 },
    { name: "Rival", weight: 20 },
    { name: "Sidekick", weight: 20 }

];

const moralRoles = [

    { name: "Hero", weight: 40 },
    { name: "Anti-Hero", weight: 25 },
    { name: "Villain", weight: 20 },
    { name: "Anti-Villain", weight: 15 }

];

const ambitions = [

    "None",

    "Live a Peaceful Life",
    "Protect Family",
    "Find Happiness",
    "Self-Improvement",
    "Master My Craft",
    "Become Stronger",
    "Become Wealthy",
    "Become Famous",

    "Help Others",
    "Seek Justice",
    "Earn Respect",
    "Build a Legacy",
    "Lead a Guild",
    "Protect My Homeland",

    "Explore the World",
    "Discover Lost Knowledge",
    "Become the Greatest Adventurer",
    "Hunt Legendary Monsters",
    "Collect Ancient Artifacts",

    "Become a Noble",
    "Rule a Kingdom",
    "Unite Nations",
    "Overthrow the Government",
    "Start a Revolution",

    "Take Revenge",
    "Obtain Absolute Power",
    "Conquer the World",
    "Spread Chaos",
    "Destroy Civilization",

    "Become Immortal",
    "Ascend to Godhood",
    "Reshape Reality",
    "Break the Cycle of Fate",
    "Save the World"

];

const rankChances = {

    "SS": 2,
    "S": 5,
    "A+": 8,
    "A": 12,
    "B+": 14,
    "B": 16,
    "C+": 18,
    "C": 15,
    "D": 6,
    "E": 3,
    "F": 1

};

const rankValues = {

    "SS": 11,
    "S": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C+": 5,
    "C": 4,
    "D": 3,
    "E": 2,
    "F": 1

};

const rankInfo = {

    "SS": {
        title: "Mythic",
        chance: "2%",
        description:
            "A level spoken of in stories and legends."
    },

    "S": {
        title: "Exceptional",
        chance: "5%",
        description:
            "Far beyond what most people can achieve."
    },

    "A+": {
        title: "Elite",
        chance: "8%",
        description:
            "Among the very best."
    },

    "A": {
        title: "Outstanding",
        chance: "12%",
        description:
            "Clearly superior to the average person."
    },

    "B+": {
        title: "Above Average",
        chance: "14%",
        description:
            "Reliable and noticeably capable."
    },

    "B": {
        title: "Competent",
        chance: "16%",
        description:
            "Solid and dependable."
    },

    "C+": {
        title: "Capable",
        chance: "18%",
        description:
            "Slightly above average."
    },

    "C": {
        title: "Average",
        chance: "15%",
        description:
            "Typical human capability."
    },

    "D": {
        title: "Below Average",
        chance: "6%",
        description:
            "Noticeably weaker than average."
    },

    "E": {
        title: "Poor",
        chance: "3%",
        description:
            "Significant shortcomings."
    },

    "F": {
        title: "Deficient",
        chance: "1%",
        description:
            "Severely lacking in this area."
    }

};

const attributeDescriptions = {

    Strength: {

    "SS": "Mythic physical power. Capable of feats that become legends and exceed normal human limitations.",

    "S": "Exceptional physical power. Can dominate nearly all trained individuals in contests of strength.",

    "A+": "Elite physical power. Stronger than the vast majority of people and capable of impressive feats.",

    "A": "Outstanding physical power. Can overpower most trained individuals through sheer strength.",

    "B+": "Above-average physical strength. Noticeably stronger than the typical person.",

    "B": "Competent physical strength. Reliable and capable in physically demanding situations.",

    "C+": "Slightly above-average strength. Better than most people but not remarkable.",

    "C": "Average human strength. Able to perform normal physical tasks without difficulty.",

    "D": "Below-average physical power. Struggles against stronger individuals.",

    "E": "Poor physical strength. Frequently finds demanding physical tasks difficult.",

    "F": "Severely deficient physical strength. Limited ability to exert force effectively."
    },

    Stamina: {

    "SS": "Legendary endurance reserves. Can sustain extreme activity for prolonged periods without noticeable fatigue.",

    "S": "Exceptional stamina. Performs at peak level for very long durations.",

    "A+": "Elite endurance capacity. Rarely becomes fatigued even under heavy exertion.",

    "A": "Outstanding stamina. Can maintain high activity for extended periods.",

    "B+": "Above-average stamina. Recovers quickly and sustains effort well.",

    "B": "Competent stamina. Can handle physical activity reliably.",

    "C+": "Slightly above average endurance. Handles moderate activity well.",

    "C": "Average stamina. Normal fatigue levels under standard effort.",

    "D": "Below-average stamina. Tires quicker than most people.",

    "E": "Poor stamina. Struggles with prolonged physical effort.",

    "F": "Severely limited endurance. Exhausts quickly even under light activity."
    },

    Durability: {

    "SS": "Near-indestructible physical resilience. Can withstand extreme force with minimal damage.",

    "S": "Extremely tough. Can endure heavy impacts and severe conditions.",

    "A+": "Elite durability. Highly resistant to injury.",

    "A": "Outstanding resilience. Can take significant punishment.",

    "B+": "Above-average toughness. Handles damage better than most.",

    "B": "Competent durability. Can withstand moderate harm.",

    "C+": "Slightly above average resistance to injury.",

    "C": "Average durability. Standard human resilience.",

    "D": "Below-average durability. More prone to injury.",

    "E": "Poor durability. Easily injured under stress.",

    "F": "Extremely fragile. Highly susceptible to damage."
    },

    Endurance: {

    "SS": "Unbreakable will and pain tolerance. Continues fighting under extreme suffering.",

    "S": "Exceptional grit. Pushes beyond normal human limits.",

    "A+": "Elite mental and physical persistence under pressure.",

    "A": "Outstanding determination. Rarely gives up.",

    "B+": "Strong resilience. Handles hardship well.",

    "B": "Reliable persistence under stress.",

    "C+": "Slightly above average mental toughness.",

    "C": "Average endurance under pressure.",

    "D": "Below-average tolerance to stress and pain.",

    "E": "Poor mental resilience. Breaks under pressure quickly.",

    "F": "Extremely fragile willpower. Gives up easily under strain."
    },

    Agility: {

    "SS": "Superhuman reflexes and movement precision. Near-instant reaction capability.",

    "S": "Exceptional speed and coordination.",

    "A+": "Elite agility. Extremely fast and precise movement.",

    "A": "Outstanding coordination and reflexes.",

    "B+": "Above-average mobility and reaction speed.",

    "B": "Competent agility. Reliable movement control.",

    "C+": "Slightly above average coordination.",

    "C": "Average agility. Normal human movement ability.",

    "D": "Below-average coordination. Noticeably slower reactions.",

    "E": "Poor agility. Slow and uncoordinated movements.",

    "F": "Severely limited mobility and reflex control."
    },

    Intelligence: {

    "SS": "Genius-level intellect beyond conventional human comprehension.",

    "S": "Exceptional intelligence. Extremely fast learning and reasoning.",

    "A+": "Elite cognitive ability. Excellent problem-solving skills.",

    "A": "Outstanding intelligence. Strong analytical thinking.",

    "B+": "Above-average reasoning ability.",

    "B": "Competent intelligence. Good understanding and learning speed.",

    "C+": "Slightly above average cognitive ability.",

    "C": "Average intelligence. Normal learning and reasoning.",

    "D": "Below-average analytical ability.",

    "E": "Poor cognitive performance. Struggles with complex thinking.",

    "F": "Severely limited reasoning and learning ability."
    },

    Perception: {

    "SS": "Superhuman awareness. Detects hidden details and subtle changes instantly.",

    "S": "Exceptional observational ability. Notices nearly everything.",

    "A+": "Elite awareness. Extremely sharp senses and detection.",

    "A": "Outstanding perception. Rarely misses important details.",

    "B+": "Above-average attention to detail.",

    "B": "Competent perception. Good situational awareness.",

    "C+": "Slightly above average observation skills.",

    "C": "Average perception. Normal awareness.",

    "D": "Below-average noticing ability. Misses details often.",

    "E": "Poor perception. Frequently overlooks obvious things.",

    "F": "Extremely limited awareness. Struggles to notice surroundings."
    },

    Mastery: {

    "SS": "Mythic talent. Learns and masters skills at a nearly supernatural rate.",

    "S": "Exceptional growth potential. Rapidly improves with training and experience.",

    "A+": "Elite talent. Learns new techniques much faster than most people.",

    "A": "Outstanding aptitude. Shows natural mastery over many disciplines.",

    "B+": "Above-average learning capability and adaptability.",

    "B": "Competent growth potential. Improves steadily through effort.",

    "C+": "Slightly above average ability to learn and develop skills.",

    "C": "Average talent and learning speed.",

    "D": "Below-average growth. Requires extra effort to improve.",

    "E": "Poor aptitude. Learns slowly and struggles with mastery.",

    "F": "Extremely limited growth potential. Improvement comes with great difficulty."
}
};

const behaviorDescriptions = {

    "Lawful Good":
        "Guided by honor and compassion, this character believes justice exists to protect the innocent. They uphold laws when they are fair and willingly sacrifice personal gain to help others.",

    "Neutral Good":
        "Kindness is this character's greatest strength. They help others because it is the right thing to do, regardless of laws, authority, or personal reward.",

    "Chaotic Good":
        "Freedom and compassion guide this character. They challenge unjust authority without hesitation and will break rules whenever it means protecting others.",

    "Lawful Neutral":
        "Order, discipline, and duty define this character. They believe stability is more important than emotion and follow principles even when the outcome is difficult.",

    "True Neutral":
        "Practical and balanced, this character judges each situation individually rather than following strict ideals. Logic and necessity shape most of their decisions.",

    "Chaotic Neutral":
        "Independent and unpredictable, this character values personal freedom above rules or expectations. They dislike being controlled and follow their own path.",

    "Lawful Evil":
        "Disciplined and calculating, this character uses laws and authority as tools to gain influence and power. Honor exists only when it serves their ambitions.",

    "Neutral Evil":
        "Self-interest drives every decision. This character values power, survival, and personal success above morality, loyalty, or justice.",

    "Chaotic Evil":
        "Violence, domination, and destruction fuel this character's actions. They reject order entirely and pursue their desires without remorse."

};


function getWeightedWinner() {

    let totalChance = 0;

    for (const rank in rankChances) {

        totalChance += rankChances[rank];

    }

    let random =
        Math.random() * totalChance;

    for (let i = 0; i < options.length; i++) {

       random -= rankChances[options[i]] || 0;

        if (random <= 0) {

            return i;

        }
    }

    return 0;
}

let options = [

    "SS",
    "S",
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D",
    "E",
    "F"

];
let currentRotation = 0;
let isSpinning = false;
let history = [];
let recentWinners = [];
let rolledAttributes = [];

let rerollCharges = {
    Strength: 3,
    Stamina: 3,
    Durability: 3,
    Endurance: 3,
    Agility: 3,
    Intelligence: 3,
    Perception: 3,
    Mastery: 3
};

function loadOptions() {

    const input = document
        .getElementById("optionsInput")
        .value
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

    if (input.length < 2) {
        alert("Enter at least 2 options.");
        return;
    }

    options = input;

    drawWheel();
}

function generateOrigin() {

    const originBtn = document.getElementById("generateOriginBtn");

    if (originBtn.disabled) return;

    if (originLocked) {
        alert("Origin is locked!");
        return;
    }

    if (originRerolls <= 0) {
        alert("No rerolls remaining!");
        return;
    }

    originBtn.disabled = true;

    const selectedOrigins = [];

    while (selectedOrigins.length < 3) {

        const randomOrigin = getWeightedRandom(origins);

        if (!selectedOrigins.includes(randomOrigin)) {
            selectedOrigins.push(randomOrigin);
        }
    }

    originRerolls--;

    document.getElementById("originRerollCount").textContent =
        "Rerolls Remaining: " + originRerolls;

    document.getElementById("characterOrigin").innerHTML = `

        <b>Select Origin</b>

        <br><br>

        <button onclick="chooseOrigin('${selectedOrigins[0]}')">
            ${selectedOrigins[0]}
        </button>

        <br><br>

        <button onclick="chooseOrigin('${selectedOrigins[1]}')">
            ${selectedOrigins[1]}
        </button>

        <br><br>

        <button onclick="chooseOrigin('${selectedOrigins[2]}')">
            ${selectedOrigins[2]}
        </button>
    `;

    originBtn.disabled = false;
}

function getWeightedRandom(list) {

    let totalWeight = 0;

    for (const item of list) {
        totalWeight += item.weight;
    }

    let random = Math.random() * totalWeight;

    for (const item of list) {

        if (random < item.weight) {
            return item.name; // ONLY STRING OUTPUT
        }

        random -= item.weight;
    }
}

function generateRace() {

    if (raceLocked) {
        alert("Race is locked!");
        return;
    }

    if (raceRerolls <= 0) {
        alert("No rerolls remaining!");
        return;
    }

    const selectedRaces = [];

    while (selectedRaces.length < 3) {

        const randomRace = getWeightedRandom(races); // returns STRING

        if (!selectedRaces.includes(randomRace)) {
            selectedRaces.push(randomRace);
        }
    }

    raceRerolls--;

    document.getElementById("raceRerollCount").textContent =
        "Rolls Remaining: " + raceRerolls;

    document.getElementById("characterRace").innerHTML = `
        <b>Select Race</b><br><br>

        <button onclick="chooseRace('${selectedRaces[0]}')">
            ${selectedRaces[0]}
        </button><br><br>

        <button onclick="chooseRace('${selectedRaces[1]}')">
            ${selectedRaces[1]}
        </button><br><br>

        <button onclick="chooseRace('${selectedRaces[2]}')">
            ${selectedRaces[2]}
        </button>
    `;
}

function generateOccupation() {

    if (occupationLocked) {
        alert("Occupation is locked!");
        return;
    }

    if (occupationRerolls <= 0) {
        alert("No rerolls remaining!");
        return;
    }

    const selectedOccupations = [];

    while (selectedOccupations.length < 3) {

        const randomOccupation =
            getWeightedRandom(occupations);

        if (!selectedOccupations.includes(randomOccupation)) {

            selectedOccupations.push(randomOccupation);

        }
    }

    occupationRerolls--;

    document.getElementById(
        "occupationRerollCount"
    ).textContent =
        "Rolls Remaining: " +
        occupationRerolls;

    document.getElementById(
        "characterOccupation"
    ).innerHTML = `

        <b>Select Occupation</b><br><br>

        <button onclick="chooseOccupation('${selectedOccupations[0]}')">
            ${selectedOccupations[0]}
        </button>

        <br><br>

        <button onclick="chooseOccupation('${selectedOccupations[1]}')">
            ${selectedOccupations[1]}
        </button>

        <br><br>

        <button onclick="chooseOccupation('${selectedOccupations[2]}')">
            ${selectedOccupations[2]}
        </button>
    `;
}

function chooseRace(race) {

    currentRace = race;

    document.getElementById(
        "characterRace"
    ).innerHTML =

        `
        Race:
        <b>${race}</b>
        `;
}

function chooseOccupation(occupation) {

    currentOccupation = occupation;

    document.getElementById(
        "characterOccupation"
    ).innerHTML =

        `Occupation:
        <b>${occupation}</b>`;
}

function lockRace() {

    if (
        currentRace === ""
    ) {

        alert(
            "Choose a race first!"
        );

        return;
    }

    raceLocked = true;

    alert(
        "Race Locked: " +
        currentRace
    );
}

function lockOccupation() {

    if (currentOccupation === "") {

        alert(
            "Choose an occupation first!"
        );

        return;
    }

    occupationLocked = true;

    alert(
        "Occupation Locked: " +
        currentOccupation
    );
}

function chooseOrigin(origin) {

    currentOrigin = origin;

    document.getElementById("characterOrigin").innerHTML = `
        Origin:
        <b>${origin}</b>
        `;
}

function lockOrigin() {

    if (currentOrigin === "") {

        alert(
            "Roll an origin first!"
        );

        return;
    }

    originLocked = true;

    alert(
        "Origin Locked: " +
        currentOrigin
    );
}

function generateNarrativeFunction() {

    if (narrativeLocked) {
        alert("Narrative Function is locked!");
        return;
    }

    if (narrativeRerolls <= 0) {
        alert("No rerolls remaining!");
        return;
    }

    currentNarrativeFunction =
        getWeightedRandom(
            narrativeFunctions
        );

    narrativeRerolls--;

    document.getElementById(
        "characterNarrative"
    ).innerHTML =
        "Narrative Function: <b>" +
        currentNarrativeFunction +
        "</b>";

    document.getElementById(
        "narrativeRerollCount"
    ).textContent =
        "Rolls Remaining: " +
        narrativeRerolls;
}

function lockNarrative() {

    if (!currentNarrativeFunction) {

        alert("Roll first!");

        return;
    }

    narrativeLocked = true;

    alert(
        "Locked: " +
        currentNarrativeFunction
    );
}

function generateMoralRole() {

    if (moralLocked) {
        alert("Moral Role is locked!");
        return;
    }

    if (moralRerolls <= 0) {
        alert("No rerolls remaining!");
        return;
    }

    currentMoralRole =
        getWeightedRandom(
            moralRoles
        );

    moralRerolls--;

    document.getElementById(
        "characterMoralRole"
    ).innerHTML =
        "Moral Role: <b>" +
        currentMoralRole +
        "</b>";

    document.getElementById(
        "moralRerollCount"
    ).textContent =
        "Rolls Remaining: " +
        moralRerolls;
}

function lockMoral() {

    if (!currentMoralRole) {

        alert("Roll first!");

        return;
    }

    moralLocked = true;

    alert(
        "Locked: " +
        currentMoralRole
    );
}

function lockAlignment() {

    if (!currentAlignment) {

        alert("Roll first!");

        return;
    }

    alignmentLocked = true;

    alert(
        "Locked: " +
        currentAlignment
    );
}

function drawWheel() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (options.length === 0) return;

    const slice = (2 * Math.PI) / options.length;

    options.forEach((item, i) => {

        const start = i * slice - Math.PI / 2;
        const end = start + slice;

        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, start, end);
        ctx.closePath();

        ctx.fillStyle =
            i % 2 === 0
                ? "#c89b3c"
                : "#8b5e34";

        ctx.fill();

        ctx.stroke();

        ctx.save();

        ctx.translate(center, center);
        ctx.rotate(start + slice / 2);

        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";

        ctx.fillText(
            item,
            radius - 15,
            5
        );

        ctx.restore();
    });
}
function renderHistory() {

    const historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    history.forEach((item, index) => {

        const li =
            document.createElement("li");

        li.className =
            "history-item";

        li.innerHTML = `
            <span>${item}</span>

            <div class="history-buttons">

                <button onclick="editHistory(${index})">
                    Edit
                </button>

                <button onclick="deleteHistory(${index})">
                    Delete
                </button>

            </div>
        `;

        historyList.appendChild(li);
    });
}

function addToHistory(result) {

    history.unshift(result);

    renderHistory();
}

function deleteHistory(index) {

    history.splice(index, 1);

    renderHistory();
}

function editHistory(index) {

    const updated =
        prompt(
            "Edit entry:",
            history[index]
        );

    if (updated !== null &&
        updated.trim() !== "") {

        history[index] =
            updated.trim();

        renderHistory();
    }
}

function clearHistory() {

    if (history.length === 0) {
        alert("History is already empty.");
        return;
    }

    if (!confirm("Clear all history?")) {
        return;
    }

    history = [];
    renderHistory();
}

function saveCharacter() {
   const saveData = {
        characterStats,
        currentOrigin,
        currentRace,
        currentOccupation,
        currentNarrativeFunction,
        currentMoralRole,
        currentAlignment,
        rerollCharges,
        rolledAttributes,
        history,
        characterName: document.getElementById("characterName").value,
        characterAge: document.getElementById("characterAge").value,
        characterHeight: document.getElementById("characterHeight").value
    };

    localStorage.setItem("characterSave", JSON.stringify(saveData));
}

function loadCharacter() {

    const save =
        localStorage.getItem("characterSave");

    if (!save) return;

    const data = JSON.parse(save);

    characterStats =
        data.characterStats || characterStats;

    currentOrigin =
        data.currentOrigin || "";

    currentRace =
        data.currentRace || "";

    currentOccupation =
        data.currentOccupation || "";

    currentNarrativeFunction =
        data.currentNarrativeFunction || "";

    currentMoralRole =
        data.currentMoralRole || "";

    currentAlignment =
        data.currentAlignment || "";

    rerollCharges =
        data.rerollCharges || rerollCharges;

    rolledAttributes =
        data.rolledAttributes || [];

    history =
        data.history || [];

    document.getElementById("characterName").value =
        data.characterName || "";

    document.getElementById("characterAge").value =
        data.characterAge || "";

    document.getElementById("characterHeight").value =
        data.characterHeight || "";
}

function updateRerollDisplay() {

    const selectedAttribute =
        document.getElementById(
            "attributeSelect"
        ).value;

    document.getElementById(
        "rerollCount"
    ).textContent =
        "Rerolls Remaining: " +
        rerollCharges[
            selectedAttribute
        ];
}

function spinWheel() {

    if (isSpinning) return;

    const selectedAttribute =
    document.getElementById(
        "attributeSelect"
    ).value;

    if (
    rolledAttributes.includes(
        selectedAttribute
    )
) {

    alert(
        selectedAttribute +
        " is locked."
    );

    return;
}

    if (options.length < 2) {
        alert("Load options first.");
        return;
    }

    isSpinning = true;

    const spinBtn = document.getElementById("spinBtn");
    const rerollBtn = document.getElementById("rerollBtn");
    const result = document.getElementById("result");

    spinBtn.disabled = true;
    rerollBtn.disabled = true;
    result.textContent = "Spinning...";

    // Prevent last 3 results repeating

    let winnerIndex;

    do {

    winnerIndex =
        getWeightedWinner();

    } while (

    recentWinners.includes(
        winnerIndex
    ) &&

    options.length > 3


    );

    recentWinners.push(
    winnerIndex
    );

    if (
    recentWinners.length > 3
    )  {

    recentWinners.shift();

    }

    const sliceAngle =
        360 / options.length;

    // Center of winning slice
    const winnerCenter =
        winnerIndex * sliceAngle +
        sliceAngle / 2;

    // Pointer is at top
    const targetRotation =
        360 - winnerCenter;

    const extraSpins =
        (5 + Math.floor(Math.random() * 3)) * 360;

    currentRotation =
    currentRotation +extraSpins +
    ((targetRotation - (currentRotation % 360) + 360) % 360);

    canvas.style.transition =
        "transform 6s cubic-bezier(0.17, 0.67, 0.12, 0.99)";

    canvas.style.transform =
        `rotate(${currentRotation}deg)`;

    const handler = () => {

    const finalResult =
    options[winnerIndex];

    result.textContent =
    `Result: ${finalResult}`;

    addToHistory(finalResult);
    
    
    const selectedAttribute =
        document.getElementById(
        "attributeSelect"
    ).value;

    const targetCell =
        document.getElementById(
        selectedAttribute.toLowerCase() +
        "Result"
    );

    targetCell.textContent = finalResult;
        const info =
    rankInfo[finalResult];

    characterStats[selectedAttribute] = finalResult;
    const attributeInfo =
    attributeDescriptions[
        selectedAttribute
    ];

    document.getElementById(
    "rankTitle"
    ).textContent =
    "Title: " +
    info.title;

    document.getElementById(
    "rankChance"
    ).textContent =
    "Chance: " +
    info.chance;


    let specificDescription =
    info.description;

    if  (
    attributeInfo &&
    attributeInfo[finalResult]
)   {

    specificDescription =
        attributeInfo[
            finalResult
        ];
    }

    document.getElementById(
    "rankDescription"
    ).textContent =
    "Description: " +
    specificDescription;

    rolledAttributes.push(
        selectedAttribute
);

        spinBtn.disabled = false;
        rerollBtn.disabled = false;
        isSpinning = false;

        canvas.removeEventListener(
            "transitionend",
            handler
        );
    };

    canvas.addEventListener(
        "transitionend",
        handler
    );
}

document
    .getElementById("spinBtn")
    .addEventListener("click", spinWheel);
    drawWheel();

    function rerollAttribute() {

    const selectedAttribute =
        document.getElementById(
            "attributeSelect"
        ).value;

    if (
        characterStats[selectedAttribute] === "-"
    ) 
    {

        alert(
            "Roll this attribute first."
        );

        return;
    }

    if (
        rerollCharges[selectedAttribute] <= 0
    ) {

        alert(
            "No rerolls remaining."
        );

        return;
    }

    rerollCharges[selectedAttribute]--;
    updateRerollDisplay();

    rolledAttributes =
        rolledAttributes.filter(
            attr =>
                attr !== selectedAttribute
        );

    spinWheel();
    }

    function generateCharacterSummary() {

    currentAbilities =
    JSON.parse(
        localStorage.getItem("characterAbilities")
        ) || [];

    currentAlignment =
    localStorage.getItem("characterAlignment") || "";

    const stats = characterStats;

    for (const attr in stats) {

    if (stats[attr] === "-") {

        return "Incomplete character. Roll all 8 attributes first.";
    }
    }


    console.log("Occupation:", currentOccupation);
    console.log("Narrative:", currentNarrativeFunction);
    console.log("Moral:", currentMoralRole);
    console.log("Alignment:", currentAlignment);

    if (
    
    currentOccupation === "" ||
    currentNarrativeFunction === "" ||
    currentMoralRole === "" ||
    currentAlignment === ""

    ) {

        return "Generate Narrative Function, Moral Role, and Alignment first.";
    }

    let strengths = [];
    let weaknesses = [];
    let average = [];

    for (const attr in stats) {

        const value = stats[attr];

        if (
            value === "SS" ||
            value === "S" ||
            value === "A+" ||
            value === "A"
        ) {

            strengths.push(attr);

        }
        else if (
            value === "D" ||
            value === "E" ||
            value === "F"
        ) {

            weaknesses.push(attr);

        }
        else {

            average.push(attr);

        }
    }

    const characterName =
    document.getElementById(
        "characterName"
    ).value || "Unknown Character";

    const characterAge =
    document.getElementById(
        "characterAge"
    ).value || "Unknown";

    const characterHeight =
    document.getElementById(
        "characterHeight"
    ).value || "Unknown";

    let summary = "";

    summary +=
    "=== " +
    characterName.toUpperCase() +
    " ===\n\n";

    summary +=
    "Age: " +
    characterAge +
    "\n";

    summary +=
    "Height: " +
    characterHeight +
    " cm\n\n";

    summary +=
    "Origin: " +
    (currentOrigin || "Not Generated") +
    "\n";

    summary +=
    "Race: " +
    (currentRace || "Not Selected") +
    "\n";

    summary +=
    "Occupation: " +
    (currentOccupation || "Not Assigned") +
    "\n\n";

    summary +=
    "Character Role\n";

    summary +=
    "- Narrative Function: " +
    (currentNarrativeFunction || "Not Assigned") +
    "\n";

    summary +=
    "- Moral Role: " +
    (currentMoralRole || "Not Assigned") +
    "\n";

    summary += "- Alignment: " +
    (currentAlignment || "Not Evaluated") +
    "\n";

    summary += "Abilities:\n";

if (currentAbilities.length === 0) {

    summary +=
        "None\n\n";

}
else {

    currentAbilities.forEach(
        ability => {

            summary +=
                "- " +
                ability +
                "\n";

        }
    );

    summary += "\n";
}

    summary += "Strong Attributes: " +
        (strengths.length ? strengths.join(", ") : "None") + "\n";

    summary += "Average Attributes: " +
        (average.length ? average.join(", ") : "None") + "\n";

    summary += "Weak Attributes: " +
        (weaknesses.length ? weaknesses.join(", ") : "None") + "\n\n";

    summary += "Suggested Role: ";
    
        if (
        stats.Mastery === "SS" ||
        stats.Mastery === "S"
    ) {

        summary +=
            "Prodigy / Chosen Talent";

    }
        else if (
        stats.Strength === "S" ||
        stats.Strength === "A+"
    ) {

        summary +=
            "Frontline Fighter / Tank";

    }
        else if (
        stats.Agility === "S" ||
        stats.Agility === "A+"
    ) {

        summary +=
            "Assassin / Scout";

    }
        else if (
        stats.Intelligence === "SS" ||
        stats.Intelligence === "S" ||
        stats.Intelligence === "A+"
    ) {

        summary +=
            "Strategist / Scholar";

    }
        else {
        summary +=
            "Balanced / Survivor";
    }

    return summary;
}

function generatePowerScore() {

    const stats = characterStats;

    let totalScore = 0;

    for (const attribute in characterStats) {

        const rank =
            characterStats[attribute];

        if (attribute === "Mastery") {
        totalScore +=
            rankValues[rank];
    }
        else {
            totalScore +=
                rankValues[rank];
            }
    }
    let rating = "";

    if (totalScore >= 80) {

        rating = "Catastrophic Threat";

    }
    else if (totalScore >= 70) {

        rating = "National Threat";

    }
    else if (totalScore >= 60) {

        rating = "Regional Threat";

    }
    else if (totalScore >= 50) {

        rating = "City Threat";

    }
    else if (totalScore >= 40) {

        rating = "Local Threat";

    }
    else if (totalScore >= 30) {

        rating = "Minor Threat";

    }
    else {

        rating = "Harmless";

    }

    let characterClass = "Adventurer";

    const attributeScores = {

    Strength:
        rankValues[stats.Strength],

    Stamina:
        rankValues[stats.Stamina],

    Durability:
        rankValues[stats.Durability],

    Endurance:
        rankValues[stats.Endurance],

    Agility:
        rankValues[stats.Agility],

    Intelligence:
        rankValues[stats.Intelligence],

    Perception:
        rankValues[stats.Perception],

    Mastery:
        rankValues[stats.Mastery]

};

let highestAttribute =
Object.keys(attributeScores)
.reduce((a, b) =>
attributeScores[a] >
attributeScores[b]
? a
: b);

switch (highestAttribute) {

    case "Strength":
        characterClass =
        "Warrior";
        break;

    case "Stamina":
        characterClass =
        "Vanguard";
        break;

    case "Durability":
        characterClass =
        "Guardian";
        break;

    case "Endurance":
        characterClass =
        "Survivor";
        break;

    case "Agility":
        characterClass =
        "Assassin";
        break;

    case "Intelligence":
        characterClass =
        "Scholar";
        break;

    case "Perception":
        characterClass =
        "Ranger";
        break;

    case "Mastery":
        characterClass =
        "Prodigy";
        break;
    }

    document.getElementById(
    "powerScore"
    ).textContent =
        "Power Score: " +
        totalScore +
        " / 99";

    document.getElementById(
        "powerRating"
    ).textContent =
        "Threat Level: " +
        rating;

    document.getElementById(
        "powerClass"
    ).textContent =
        "Class: " +
        characterClass;

    const alignment =
    localStorage.getItem("characterAlignment") || "-";

let behaviorDescription = "";

switch (alignment) {

    case "Lawful Good":
        behaviorDescription = "Honorable protector who always follows justice, law, and compassion.";
        break;

    case "Neutral Good":
        behaviorDescription = "Kind-hearted helper who does what is right, regardless of rules.";
        break;

    case "Chaotic Good":
        behaviorDescription = "Freedom-loving hero who fights injustice by any means necessary.";
        break;

    case "Lawful Neutral":
        behaviorDescription = "Values order, discipline, and duty above personal feelings.";
        break;

    case "True Neutral":
        behaviorDescription = "Maintains balance and acts according to the situation without strong bias.";
        break;

    case "Chaotic Neutral":
        behaviorDescription = "Independent spirit who values freedom and follows their own path.";
        break;

    case "Lawful Evil":
        behaviorDescription = "Uses rules, authority, and discipline to achieve selfish ambitions.";
        break;

    case "Neutral Evil":
        behaviorDescription = "Self-serving opportunist who pursues personal gain above all else.";
        break;

    case "Chaotic Evil":
        behaviorDescription = "Unpredictable destroyer driven by violence, hatred, and selfish desires.";
        break;

    default:
        behaviorDescription = "-";
}

    const behaviorEl = document.getElementById("behaviorAssessment");
    if (behaviorEl) {
        behaviorEl.textContent = "Behavior Assessment: " + behaviorDescription;
    }

    const alignmentEl = document.getElementById("characterAlignment");
    if (alignmentEl) {
        alignmentEl.innerHTML = "Alignment: <b>" + alignment + "</b>";
    }

    const titleEl = document.getElementById("powerTitle");
    if (titleEl) {
        titleEl.textContent = "Title: Not Assigned";
    }
}
    function resetCharacter() {

    localStorage.removeItem("characterAlignment");
    localStorage.removeItem("characterAbilities");

    if (!confirm("Reset entire character?")) return;
    
        isSpinning = false;
        recentWinners = [];
        history = [];

        rerollCharges = {
        Strength: 3,
        Stamina: 3,
        Durability: 3,
        Endurance: 3,
        Agility: 3,
        Intelligence: 3,
        Perception: 3,
        Mastery: 3
};
        characterStats = {
        Strength: "-",
        Stamina: "-",
        Durability: "-",
        Endurance: "-",
        Agility: "-",
        Intelligence: "-",
        Perception: "-",
        Mastery: "-"
    };
    rolledAttributes = [];
    currentAbilities = [];

    currentOrigin = "";
    currentRace = "";
    currentOccupation = "";

    currentNarrativeFunction = "";
    currentMoralRole = "";
    currentAlignment = "";

    originLocked = false;
    raceLocked = false;
    occupationLocked = false;

    originRerolls = 3;
    raceRerolls = 3;
    occupationRerolls = 3;

    isSpinning = false;
    
        // 🔥 RESET UI VALUES
    document.getElementById("characterName").value = "";
    document.getElementById("characterAge").value = "";
    document.getElementById("characterHeight").value = "";

    document.getElementById("characterOrigin").textContent =
        "Origin: Not Generated";

    document.getElementById("characterRace").textContent =
        "Race: Not Selected";

    document.getElementById("characterOccupation").textContent =
        "Occupation: Not Assigned";

    document.getElementById("characterSummary").textContent =
        "Roll all attributes first...";

    document.getElementById("powerScore").textContent =
        "Power Score: -";

    document.getElementById("behaviorAssessment").textContent =
        "Behavior Assessment: -";

    document.getElementById("powerRating").textContent =
        "Threat Level: -";

    document.getElementById("powerClass").textContent =
        "Class: -";

    // Reset Alignment UI
    document.getElementById("characterAlignment").innerHTML =
        "Alignment: Not Evaluated";

    // Remove saved behavior assessment

    localStorage.removeItem("characterAlignment");
    currentAlignment = "";

    localStorage.removeItem("characterAbilities");
    currentAbilities = [];

    console.log(localStorage.getItem("characterAbilities"));

    const abilityEl = document.getElementById("characterAbility");

    if (abilityEl) {
        abilityEl.textContent = "Ability: None";
    }

    // 🔥 RESET TABLE
    const resultCells = [
        "strengthResult",
        "staminaResult",
        "durabilityResult",
        "enduranceResult",
        "agilityResult",
        "intelligenceResult",
        "perceptionResult",
        "masteryResult"
    ];

    resultCells.forEach(id => {
    const cell = document.getElementById(id);
    if (cell) cell.textContent = "-";
    });

    // Reset reroll display
    document.getElementById("attributeSelect").value =
        "Strength";

    alert("Character Reset Complete!");
}

document.getElementById("generateSummaryBtn")
.addEventListener("click", () => {

    currentAlignment =
    localStorage.getItem("characterAlignment") || "";

    const output =
    generateCharacterSummary();

    document.getElementById(
        "characterSummary"
    ).textContent = output;

    if (
        output !==
        "Incomplete character. Roll all 8 attributes first."
    ) {
        generatePowerScore();
    }
});

document.getElementById(
    "lockOriginBtn"
).addEventListener(
    "click",
    lockOrigin
);

document.getElementById(
    "generateRaceBtn"
).addEventListener(
    "click",
    generateRace
);

document.getElementById(
    "lockRaceBtn"
).addEventListener(
    "click",
    lockRace
);
document.getElementById(
    "resetCharacterBtn"
).addEventListener(
    "click",
    resetCharacter
);
document.getElementById("rerollBtn")
.addEventListener(
    "click",
    rerollAttribute
);
document.getElementById("attributeSelect")
.addEventListener(
    "change",
    updateRerollDisplay
);

updateRerollDisplay();

document.getElementById(
    "generateNarrativeBtn"
).addEventListener(
    "click",
    generateNarrativeFunction
);

document.getElementById(
    "lockNarrativeBtn"
).addEventListener(
    "click",
    lockNarrative
);

document.getElementById(
    "generateMoralBtn"
).addEventListener(
    "click",
    generateMoralRole
);

document.getElementById(
    "lockMoralBtn"
).addEventListener(
    "click",
    lockMoral
);

document.getElementById(
    "generateOccupationBtn"
).addEventListener(
    "click",
    generateOccupation
);

document.getElementById("lockOccupationBtn").addEventListener
("click",lockOccupation

);

document.getElementById("generateAbilityBtn").addEventListener("click", () => {
    localStorage.setItem("lastPage", "wheel");
    window.location.href = "Ability.html";   // Change if your file name is different
}
);

document.getElementById("behaviorAssessmentBtn")
.addEventListener("click", () => {

    saveCharacter();
    localStorage.setItem("lastPage", "wheel");

    window.location.href = "Behavior.html";
}
);

const savedBehavior = localStorage.getItem("characterAlignment");

if (savedBehavior) {

    currentAlignment = savedBehavior;

    document.getElementById("characterAlignment").innerHTML =
        "Alignment: <b>" + savedBehavior + "</b>";
}

const clearBtn = document.getElementById("clearHistoryBtn");
if (clearBtn) {
    clearBtn.onclick = clearHistory;
}

window.addEventListener("DOMContentLoaded", () => {
    loadCharacter();
    updateRerollDisplay();
    drawWheel();

// Load All Abilities
    const savedAbilities = JSON.parse(localStorage.getItem("characterAbilities")) || [];
    const abilityEl = document.getElementById("characterAbility");

    if (savedAbilities.length > 0) {
        let abilitiesText = savedAbilities.join(" | ");
        abilityEl.innerHTML = `Ability: <b>${abilitiesText}</b>`;
    } else {
        abilityEl.textContent = "Ability: None";
    }
});


    
