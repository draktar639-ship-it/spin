let currentQuestion = 0;
let behaviorFinished = false;

let behaviorScores = {
    Honor: 0,
    Compassion: 0,
    Aggression: 0,
    Ambition: 0,
    Loyalty: 0,
    Pragmatism: 0,
    Mercy: 0,
    Courage: 0,
    Patience: 0,
    Curiosity: 0
};

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function resetBehaviorScores() {
    for (const stat in behaviorScores) {
        behaviorScores[stat] = 0;
    }
}

const behaviorQuestions = [

/* Question 1 */
{
    question: "A starving father steals medicine for his dying daughter. The law demands execution. If you spare him, others may begin stealing as well.",

    choices: [
        "Carry out the execution.",
        "Arrest him but provide medicine for his daughter.",
        "Secretly let him escape.",
        "Publicly pardon him.",
        "Punish the corrupt officials who caused the famine."
    ]
},

/* Question 2 */
{
    question: "Your closest friend betrays your kingdom to save their own family.",

    choices: [
        "Execute them for treason.",
        "Arrest them but spare their family.",
        "Help them escape.",
        "Forgive them completely.",
        "Join them against the kingdom."
    ]
},

/* Question 3 */
{
    question: "A plague spreads. You possess enough medicine to save only one city.",

    choices: [
        "Save the capital.",
        "Save the poorest city.",
        "Save the city with the most children.",
        "Divide the medicine equally.",
        "Keep it for your own people."
    ]
},

/* Question 4 */
{
    question: "A peaceful dictator has ended war, famine, and crime—but freedom no longer exists.",

    choices: [
        "Support the ruler.",
        "Work to reform the government.",
        "Lead a rebellion.",
        "Leave the nation.",
        "Take the throne yourself."
    ]
},

/* Question 5 */
{
    question: "A dangerous criminal possesses information that could save thousands.",

    choices: [
        "Execute them immediately.",
        "Offer a reduced sentence.",
        "Free them for the information.",
        "Torture them if necessary.",
        "Refuse to bargain."
    ]
},

/* Question 6 */
{
    question: "An ancient dragon protects a sacred forest but regularly destroys nearby villages.",

    choices: [
        "Kill the dragon.",
        "Relocate the villagers.",
        "Negotiate peace.",
        "Help the dragon defend the forest.",
        "Do nothing."
    ]
},

/* Question 7 */
{
    question: "A sacred relic grants unlimited power but slowly corrupts its owner.",

    choices: [
        "Claim it.",
        "Hide it forever.",
        "Destroy it.",
        "Study it carefully.",
        "Give it to someone stronger."
    ]
},

/* Question 8 */
{
    question: "Your king orders the massacre of innocent civilians to end a rebellion quickly.",

    choices: [
        "Obey the order.",
        "Refuse openly.",
        "Secretly warn the civilians.",
        "Assassinate the king.",
        "Delay until another solution appears."
    ]
},

/* Question 9 */
{
    question: "A thief steals from corrupt nobles and gives everything to starving villagers.",

    choices: [
        "Arrest them.",
        "Ignore them.",
        "Secretly help them.",
        "Turn them into a royal hero.",
        "Steal the wealth yourself."
    ]
},

/* Question 10 */
{
    question: "A rival army invades. You can burn your own farms to stop them, but your people will starve.",

    choices: [
        "Burn everything.",
        "Defend the farms.",
        "Evacuate civilians first.",
        "Negotiate with the enemy.",
        "Sacrifice only part of the harvest."
    ]
},

/* Question 11 */
{
    question: "You discover that your religion has hidden the truth from the people for centuries.",

    choices: [
        "Reveal everything.",
        "Keep the secret.",
        "Reveal only part of it.",
        "Destroy the evidence.",
        "Use the knowledge for yourself."
    ]
},

/* Question 12 */
{
    question: "A child accidentally kills someone while defending their family.",

    choices: [
        "Punish them equally.",
        "Show mercy.",
        "Blame the parents.",
        "Hide the incident.",
        "Teach them and let them go."
    ]
},

/* Question 13 */
{
    question: "Your greatest enemy saves your life during battle.",

    choices: [
        "Honor the debt.",
        "Remain enemies.",
        "Form an alliance.",
        "Kill them while they're vulnerable.",
        "Walk away."
    ]
},

/* Question 14 */
{
    question: "A magical artifact can permanently eliminate evil—but it also removes free will.",

    choices: [
        "Use it.",
        "Destroy it.",
        "Seal it away.",
        "Study it.",
        "Entrust it to another guardian."
    ]
},

/* Question 15 */
{
    question: "You can become immortal, but everyone you love will eventually die while you continue living.",

    choices: [
        "Accept immortality.",
        "Reject it.",
        "Accept it to protect future generations.",
        "Destroy the offer.",
        "Search endlessly for another way."
    ]
},

/* Question 16 */
{
    question: "A neighboring kingdom offers lasting peace if you surrender a small border town that has always been part of your homeland.",

    choices: [
        "Accept the treaty.",
        "Refuse and prepare for war.",
        "Let the townspeople decide.",
        "Offer a different compromise.",
        "Secretly evacuate the town and destroy it."
    ]
},

/* Question 17 */
{
    question: "A brilliant scientist creates a weapon that could end all future wars through fear alone.",

    choices: [
        "Use it.",
        "Destroy it.",
        "Seal it away.",
        "Continue researching it.",
        "Share it with every nation equally."
    ]
},

/* Question 18 */
{
    question: "A corrupt official has done terrible things, but exposing them will plunge the kingdom into civil war.",

    choices: [
        "Expose them immediately.",
        "Keep the secret.",
        "Gather more allies first.",
        "Force them to resign quietly.",
        "Blackmail them into serving the people."
    ]
},

/* Question 19 */
{
    question: "A notorious assassin offers to eliminate every tyrant in the world, but innocent people may die in the process.",

    choices: [
        "Accept the offer.",
        "Refuse completely.",
        "Help choose the targets carefully.",
        "Capture the assassin.",
        "Become the assassin's partner."
    ]
},

/* Question 20 */
{
    question: "You inherit a throne, but another claimant has the stronger legal right.",

    choices: [
        "Keep the throne.",
        "Give it to them.",
        "Challenge them in honorable combat.",
        "Rule together.",
        "Manipulate the nobles to support you."
    ]
},

/* Question 21 */
{
    question: "Your army can win the war by attacking during a sacred holiday when the enemy is unprepared.",

    choices: [
        "Attack immediately.",
        "Wait until the holiday ends.",
        "Warn the enemy first.",
        "Challenge them openly.",
        "Search for another strategy."
    ]
},

/* Question 22 */
{
    question: "A criminal confesses to dozens of murders but sincerely wishes to spend the rest of their life helping others.",

    choices: [
        "Execute them.",
        "Sentence them to life imprisonment.",
        "Allow them to redeem themselves.",
        "Exile them forever.",
        "Let the victims' families decide."
    ]
},

/* Question 23 */
{
    question: "A powerful spirit offers to erase everyone's painful memories, creating a peaceful world without suffering.",

    choices: [
        "Accept.",
        "Reject.",
        "Erase only the worst memories.",
        "Ask each person individually.",
        "Destroy the spirit."
    ]
},

/* Question 24 */
{
    question: "You discover your kingdom's greatest hero secretly committed terrible crimes decades ago.",

    choices: [
        "Reveal the truth.",
        "Hide it forever.",
        "Reveal it after they die.",
        "Confront them privately.",
        "Use the secret to control them."
    ]
},

/* Question 25 */
{
    question: "A starving nation begs for your food reserves, but helping them may cause shortages in your own kingdom.",

    choices: [
        "Give everything.",
        "Refuse.",
        "Share equally.",
        "Trade fairly.",
        "Offer military protection instead."
    ]
},

/* Question 26 */
{
    question: "You can prevent a catastrophic future by sacrificing your own memories forever.",

    choices: [
        "Accept the sacrifice.",
        "Refuse.",
        "Find another solution.",
        "Ask someone else to volunteer.",
        "Delay until more information is available."
    ]
},

/* Question 27 */
{
    question: "Your sibling attempts to overthrow the throne because they believe they would rule better than you.",

    choices: [
        "Execute them.",
        "Imprison them.",
        "Forgive them.",
        "Abdicate peacefully.",
        "Challenge them to prove themselves."
    ]
},

/* Question 28 */
{
    question: "A village worships a harmless monster that everyone else fears.",

    choices: [
        "Kill the monster.",
        "Protect it.",
        "Relocate it.",
        "Study it first.",
        "Leave the village alone."
    ]
},

/* Question 29 */
{
    question: "A magical portal allows you to escape all responsibility and live a perfect life forever.",

    choices: [
        "Enter the portal.",
        "Destroy it.",
        "Seal it away.",
        "Study it.",
        "Leave it for someone else to discover."
    ]
},

/* Question 30 */
{
    question: "At the end of your life, history will remember only one thing about you. Which legacy do you choose?",

    choices: [
        "A just ruler.",
        "A liberator of the oppressed.",
        "The most powerful conqueror.",
        "The greatest scholar.",
        "The one who preserved peace at any cost."
    ]
}
];

const behaviorAnswers = [

/* Question 1 */
[
    // Execute him
    { Honor: 2, Loyalty: 2, Compassion: -2, Mercy: -2 },

    // Arrest but save daughter
    { Honor: 2, Compassion: 2, Loyalty: 1 },

    // Secretly let him escape
    { Compassion: 2, Mercy: 2, Honor: -1 },

    // Publicly pardon
    { Compassion: 2, Mercy: 2, Courage: 1 },

    // Punish corrupt officials
    { Honor: 2, Courage: 2, Pragmatism: 1 }
],

/* Question 2 */
[
    // Execute friend
    { Honor: 2, Loyalty: 2, Mercy: -2 },

    // Arrest, spare family
    { Honor: 2, Compassion: 1, Loyalty: 2 },

    // Help them escape
    { Loyalty: 2, Compassion: 2, Honor: -2 },

    // Forgive completely
    { Mercy: 2, Compassion: 2, Honor: -1 },

    // Join them
    { Ambition: 2, Loyalty: -2, Honor: -2 }
],

/* Question 3 */
[
    // Save capital
    { Pragmatism: 2, Loyalty: 1 },

    // Save poorest
    { Compassion: 2, Mercy: 2 },

    // Save children
    { Compassion: 2, Mercy: 2, Courage: 1 },

    // Divide equally
    { Honor: 2, Compassion: 1 },

    // Keep it
    { Ambition: 2, Compassion: -2 }
],

/* Question 4 */
[
    // Support dictator
    { Loyalty: 2, Honor: 1, Compassion: -1 },

    // Reform
    { Honor: 2, Patience: 2 },

    // Rebellion
    { Courage: 2, Honor: 1, Aggression: 1 },

    // Leave
    { Pragmatism: 2 },

    // Take throne
    { Ambition: 2, Pragmatism: 1, Honor: -1 }
],

/* Question 5 */
[
    // Execute
    { Honor: 1, Aggression: 2, Mercy: -2 },

    // Reduced sentence
    { Honor: 2, Compassion: 1 },

    // Free them
    { Mercy: 2, Compassion: 2, Honor: -1 },

    // Torture
    { Pragmatism: 2, Aggression: 2, Mercy: -2 },

    // Refuse bargain
    { Honor: 2, Loyalty: 1 }
],

/* Question 6 */
[
    // Kill dragon
    { Courage: 2, Aggression: 2 },

    // Relocate villagers
    { Compassion: 2, Pragmatism: 2 },

    // Negotiate
    { Compassion: 2, Honor: 2 },

    // Help dragon
    { Curiosity: 2, Compassion: 1, Honor: -1 },

    // Do nothing
    { Patience: 1 }
],

/* Question 7 */
[
    // Claim relic
    { Ambition: 2, Curiosity: 1 },

    // Hide forever
    { Honor: 2, Patience: 2 },

    // Destroy
    { Honor: 2, Courage: 2 },

    // Study
    { Curiosity: 2, Pragmatism: 2 },

    // Give away
    { Compassion: 1, Honor: 1 }
],

/* Question 8 */
[
    // Obey
    { Loyalty: 2, Honor: -1, Compassion: -2 },

    // Refuse
    { Honor: 2, Courage: 2 },

    // Warn civilians
    { Compassion: 2, Courage: 2 },

    // Kill king
    { Aggression: 2, Courage: 2, Honor: -1 },

    // Delay
    { Patience: 2, Pragmatism: 2 }
],

/* Question 9 */
[
    // Arrest
    { Honor: 2, Loyalty: 1 },

    // Ignore
    { Pragmatism: 1 },

    // Help thief
    { Compassion: 2, Mercy: 2 },

    // Make hero
    { Compassion: 2, Courage: 1 },

    // Steal wealth
    { Ambition: 2, Honor: -2 }
],

/* Question 10 */
[
    // Burn farms
    { Pragmatism: 2, Compassion: -2 },

    // Defend farms
    { Courage: 2, Loyalty: 2 },

    // Evacuate civilians
    { Compassion: 2, Honor: 2 },

    // Negotiate
    { Patience: 2, Compassion: 1 },

    // Burn part
    { Pragmatism: 2, Honor: 1 }
],

/* Question 11 */
[
    // Reveal everything
    { Honor: 2, Courage: 2 },

    // Keep the secret
    { Loyalty: 2, Patience: 1 },

    // Reveal only part
    { Pragmatism: 2, Honor: 1 },

    // Destroy evidence
    { Loyalty: 1, Honor: -2 },

    // Use knowledge yourself
    { Ambition: 2, Curiosity: 1 }
],

/* Question 12 */
[
    // Punish equally
    { Honor: 2, Compassion: -1 },

    // Show mercy
    { Mercy: 2, Compassion: 2 },

    // Blame parents
    { Pragmatism: 1, Honor: -1 },

    // Hide incident
    { Compassion: 1, Honor: -2 },

    // Teach and release
    { Compassion: 2, Honor: 2 }
],

/* Question 13 */
[
    // Honor the debt
    { Honor: 2, Loyalty: 1 },

    // Remain enemies
    { Loyalty: 2, Aggression: 1 },

    // Form alliance
    { Compassion: 2, Pragmatism: 2 },

    // Kill them
    { Aggression: 2, Honor: -2 },

    // Walk away
    { Patience: 1, Pragmatism: 1 }
],

/* Question 14 */
[
    // Use artifact
    { Pragmatism: 2, Compassion: 1, Honor: -2 },

    // Destroy
    { Honor: 2, Courage: 2 },

    // Seal away
    { Patience: 2, Honor: 2 },

    // Study
    { Curiosity: 2, Pragmatism: 1 },

    // Entrust guardian
    { Loyalty: 2, Honor: 1 }
],

/* Question 15 */
[
    // Accept immortality
    { Ambition: 2, Courage: 1 },

    // Reject
    { Compassion: 2, Honor: 2 },

    // Protect future generations
    { Courage: 2, Compassion: 2 },

    // Destroy offer
    { Honor: 2, Courage: 1 },

    // Seek another way
    { Curiosity: 2, Patience: 2 }
],

/* Question 16 */
[
    // Accept treaty
    { Pragmatism: 2, Compassion: 1 },

    // Refuse
    { Loyalty: 2, Courage: 2 },

    // Let people decide
    { Honor: 2, Compassion: 2 },

    // Offer compromise
    { Pragmatism: 2, Honor: 1 },

    // Evacuate and destroy
    { Pragmatism: 2, Aggression: 1 }
],

/* Question 17 */
[
    // Use weapon
    { Pragmatism: 2, Ambition: 1 },

    // Destroy
    { Honor: 2, Courage: 2 },

    // Seal away
    { Patience: 2, Honor: 2 },

    // Continue research
    { Curiosity: 2, Pragmatism: 2 },

    // Share with everyone
    { Honor: 1, Compassion: 1, Curiosity: 1 }
],

/* Question 18 */
[
    // Expose immediately
    { Honor: 2, Courage: 2 },

    // Keep secret
    { Loyalty: 2, Compassion: -1 },

    // Gather allies
    { Patience: 2, Honor: 2 },

    // Quiet resignation
    { Pragmatism: 2, Compassion: 1 },

    // Blackmail
    { Pragmatism: 2, Ambition: 1, Honor: -2 }
],

/* Question 19 */
[
    // Accept
    { Pragmatism: 2, Aggression: 1 },

    // Refuse
    { Honor: 2, Compassion: 2 },

    // Choose targets
    { Pragmatism: 2, Honor: 1 },

    // Capture assassin
    { Honor: 2, Courage: 2 },

    // Become partner
    { Aggression: 2, Ambition: 2 }
],

/* Question 20 */
[
    // Keep throne
    { Ambition: 2, Loyalty: 1 },

    // Give throne
    { Honor: 2, Compassion: 1 },

    // Honorable duel
    { Honor: 2, Courage: 2 },

    // Rule together
    { Compassion: 2, Pragmatism: 2 },

    // Manipulate nobles
    { Ambition: 2, Honor: -2 }
],

/* Question 21 */
[
    // Attack immediately
    { Pragmatism: 2, Aggression: 1 },

    // Wait until holiday ends
    { Honor: 2, Patience: 2 },

    // Warn the enemy
    { Compassion: 2, Honor: 2 },

    // Challenge openly
    { Courage: 2, Honor: 2 },

    // Another strategy
    { Pragmatism: 2, Curiosity: 1 }
],

/* Question 22 */
[
    // Execute
    { Honor: 2, Mercy: -2 },

    // Life imprisonment
    { Honor: 2, Pragmatism: 1 },

    // Redemption
    { Compassion: 2, Mercy: 2 },

    // Exile
    { Pragmatism: 2, Mercy: 1 },

    // Victims decide
    { Honor: 1, Compassion: 1 }
],

/* Question 23 */
[
    // Accept
    { Compassion: 2, Honor: -2 },

    // Reject
    { Honor: 2, Courage: 1 },

    // Worst memories only
    { Pragmatism: 2, Compassion: 1 },

    // Ask each person
    { Honor: 2, Compassion: 2 },

    // Destroy spirit
    { Courage: 2, Honor: 2 }
],

/* Question 24 */
[
    // Reveal truth
    { Honor: 2, Courage: 2 },

    // Hide forever
    { Loyalty: 2, Honor: -2 },

    // Reveal later
    { Patience: 2, Honor: 1 },

    // Confront privately
    { Compassion: 2, Honor: 1 },

    // Blackmail
    { Ambition: 2, Pragmatism: 2, Honor: -2 }
],

/* Question 25 */
[
    // Give everything
    { Compassion: 2, Mercy: 2 },

    // Refuse
    { Loyalty: 2, Pragmatism: 1 },

    // Share equally
    { Honor: 2, Compassion: 2 },

    // Trade fairly
    { Pragmatism: 2, Honor: 1 },

    // Military protection
    { Courage: 2, Loyalty: 2 }
],

/* Question 26 */
[
    // Accept sacrifice
    { Courage: 2, Compassion: 2 },

    // Refuse
    { Ambition: 1, Loyalty: 1 },

    // Another solution
    { Curiosity: 2, Patience: 2 },

    // Ask volunteer
    { Honor: 2, Compassion: 1 },

    // Delay
    { Patience: 2, Pragmatism: 2 }
],

/* Question 27 */
[
    // Execute sibling
    { Honor: 1, Loyalty: 2, Mercy: -2 },

    // Imprison
    { Honor: 2, Loyalty: 2 },

    // Forgive
    { Compassion: 2, Mercy: 2 },

    // Abdicate
    { Honor: 2, Compassion: 1 },

    // Prove themselves
    { Courage: 2, Honor: 2 }
],

/* Question 28 */
[
    // Kill monster
    { Courage: 2, Aggression: 2 },

    // Protect monster
    { Compassion: 2, Courage: 1 },

    // Relocate
    { Pragmatism: 2, Compassion: 1 },

    // Study first
    { Curiosity: 2, Patience: 2 },

    // Leave alone
    { Patience: 1, Pragmatism: 1 }
],

/* Question 29 */
[
    // Enter portal
    { Ambition: 2, Compassion: -2 },

    // Destroy
    { Honor: 2, Courage: 2 },

    // Seal away
    { Honor: 2, Patience: 2 },

    // Study
    { Curiosity: 2, Pragmatism: 2 },

    // Leave it
    { Pragmatism: 1, Honor: -1 }
],

/* Question 30 */
[
    // Just ruler
    { Honor: 2, Loyalty: 2 },

    // Liberator
    { Courage: 2, Compassion: 2 },

    // Conqueror
    { Ambition: 2, Aggression: 2 },

    // Scholar
    { Curiosity: 2, Patience: 2 },

    // Peace at any cost
    { Pragmatism: 2, Compassion: 1 }
]

];

function startBehaviorAssessment() {

    currentQuestion = 0;

    behaviorFinished = false;

    document.getElementById(
        "startBehaviorBtn"
    ).style.display = "none";

    resetBehaviorScores();
    loadBehaviorQuestion();

}

function loadBehaviorQuestion() {

if (currentQuestion >= behaviorQuestions.length) {
        finishBehaviorAssessment();
        return;
    }

    if (!behaviorQuestions[currentQuestion] || !behaviorAnswers[currentQuestion]) {
        console.error("Broken question/answer at index:", currentQuestion);
        finishBehaviorAssessment();
        return;
    }

    document.getElementById("behaviorProgress").textContent =
        "Question " + (currentQuestion + 1) + " / " + behaviorQuestions.length;

    document.getElementById("behaviorQuestion").textContent =
        behaviorQuestions[currentQuestion].question;

    const container = document.getElementById("behaviorChoices");
    container.innerHTML = "";

    if (behaviorQuestions[currentQuestion].choices.length !== behaviorAnswers[currentQuestion].length) {
    console.error("❌ MISMATCH at question:", currentQuestion + 1);
    finishBehaviorAssessment();
    return;
    }

    behaviorQuestions[currentQuestion].choices.forEach((choice, index) => {

        const button = document.createElement("button");
        button.textContent = choice;

        button.onclick = () => chooseBehavior(index);

        container.appendChild(button);
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
    });
}


function chooseBehavior(choiceIndex) {

    const answers = behaviorAnswers[currentQuestion];

    if (!answers) {
        console.error("❌ Missing answer mapping at question:", currentQuestion + 1);
        finishBehaviorAssessment();
        return;
    }

    const score = answers[choiceIndex];

    if (!score) {
        console.error("❌ Missing choice mapping:", choiceIndex);
        return;
    }

    for (const stat in score) {
    behaviorScores[stat] = clamp(
        behaviorScores[stat] + score[stat],
        -50,
        50
    );
}

    currentQuestion++;
    loadBehaviorQuestion();
}

function finishBehaviorAssessment() {

    const behaviorSummary = generateBehaviorAssessment();

    localStorage.setItem(
        "behaviorAssessment",
        behaviorSummary
    );

    const finalAlignment = determineAlignment();

    localStorage.setItem("characterAlignment", finalAlignment);
    localStorage.setItem("behaviorDone", "true");

    document.getElementById("behaviorProgress").style.display = "none";
    document.getElementById("behaviorQuestion").style.display = "none";
    document.getElementById("behaviorChoices").style.display = "none";

    document.getElementById("behaviorResult").style.display = "block";
    document.getElementById("finalAlignment").textContent = finalAlignment;

    console.log("FINAL SCORES:");
    console.table(behaviorScores);
    console.log("ALIGNMENT:", finalAlignment);
}

function determineAlignment() {

    const good =
    behaviorScores.Honor +
    behaviorScores.Compassion +
    Math.max(behaviorScores.Mercy, 0);

    const evil =
    behaviorScores.Aggression +
    behaviorScores.Ambition +
    Math.max(-behaviorScores.Mercy, 0);

    const law =
        behaviorScores.Honor +
        behaviorScores.Loyalty +
        behaviorScores.Patience;

    const chaos =
        behaviorScores.Curiosity +
        behaviorScores.Ambition +
        behaviorScores.Aggression;

    const moralDifference = good - evil;
    const orderDifference = law - chaos;

    let moral;
    let order;

    // MORAL
    if (moralDifference >= 5)
        moral = "Good";
    else if (moralDifference <= -5)
        moral = "Evil";
    else
        moral = "Neutral";

    // ORDER
    if (orderDifference >= 5)
        order = "Lawful";
    else if (orderDifference <= -5)
        order = "Chaotic";
    else
        order = "Neutral";

    // Classic D&D name
    if (order === "Neutral" && moral === "Neutral")
        return "True Neutral";

    return order + " " + moral;
}

function generateBehaviorAssessment() {

    const entries = Object.entries(behaviorScores);

    // Highest → Lowest
    entries.sort((a, b) => b[1] - a[1]);

    const highest = entries[0][0];
    const second = entries[1][0];

    let intro = "";
    let personality = [];
    let flaws = [];

    // Highest Trait
    switch (highest) {

        case "Honor":
            intro = "Honorable";
            break;

        case "Compassion":
            intro = "Compassionate";
            break;

        case "Aggression":
            intro = "Ruthless";
            break;

        case "Ambition":
            intro = "Ambitious";
            break;

        case "Loyalty":
            intro = "Loyal";
            break;

        case "Pragmatism":
            intro = "Practical";
            break;

        case "Mercy":
            intro = "Merciful";
            break;

        case "Courage":
            intro = "Fearless";
            break;

        case "Patience":
            intro = "Patient";
            break;

        case "Curiosity":
            intro = "Curious";
            break;
    }

    // Second Highest Trait

    switch (second) {

        case "Honor":
            personality.push("guided by principles");

            break;

        case "Compassion":
            personality.push("cares deeply for others");

            break;

        case "Aggression":
            personality.push("acts decisively in conflict");

            break;

        case "Ambition":
            personality.push("always seeks greater achievement");

            break;

        case "Loyalty":
            personality.push("stands by trusted allies");

            break;

        case "Pragmatism":
            personality.push("prefers practical solutions");

            break;

        case "Mercy":
            personality.push("believes everyone deserves another chance");

            break;

        case "Courage":
            personality.push("never backs down from danger");

            break;

        case "Patience":
            personality.push("waits for the right opportunity");

            break;

        case "Curiosity":
            personality.push("constantly searches for knowledge");

            break;
    }

    // Major Negative Traits

    if (behaviorScores.Mercy <= -8)
        flaws.push("shows little mercy.");

    if (behaviorScores.Honor <= -8)
        flaws.push("often ignores moral principles.");

    if (behaviorScores.Compassion <= -8)
        flaws.push("rarely lets emotions influence decisions.");

    if (behaviorScores.Loyalty <= -8)
        flaws.push("trusts very few people.");

    if (behaviorScores.Aggression >= 12)
        flaws.push("can become violent when pushed.");

    if (behaviorScores.Ambition >= 12)
        flaws.push("power often tempts them.");

    if (behaviorScores.Pragmatism >= 12)
        flaws.push("believes results matter more than ideals.");

    if (behaviorScores.Curiosity >= 12)
        flaws.push("is willing to risk danger for knowledge.");

    if (behaviorScores.Patience >= 12)
        flaws.push("rarely rushes important decisions.");

    if (behaviorScores.Courage >= 12)
        flaws.push("faces danger without hesitation.");

    let summary =
        intro +
        ", " +
        personality.join(", ");

    if (flaws.length > 0)
        summary += ". " + flaws.join(" ");

    return summary;
}


document.getElementById("startBehaviorBtn").addEventListener("click", startBehaviorAssessment);
