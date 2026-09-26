// Actor management
let actors = [];

function addActor() {
    const nameInput = document.getElementById('actorName');
    const roleInput = document.getElementById('actorRole');
    
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    
    if (!name || !role) {
        alert('Please enter both actor name and role');
        return;
    }
    
    actors.push({ name, role });
    renderActors();
    nameInput.value = '';
    roleInput.value = '';
    nameInput.focus();
}

function removeActor(index) {
    actors.splice(index, 1);
    renderActors();
}

function renderActors() {
    const list = document.getElementById('actorsList');
    list.innerHTML = '';
    
    actors.forEach((actor, index) => {
        const tag = document.createElement('div');
        tag.className = 'actor-tag';
        tag.innerHTML = `
            <span><strong>${actor.name}</strong> - ${actor.role}</span>
            <button onclick="removeActor(${index})">✕</button>
        `;
        list.appendChild(tag);
    });
}

// Form validation
function validateForm() {
    const storyIdea = document.getElementById('storyIdea').value.trim();
    const sceneTone = document.getElementById('sceneTone').value;
    const sceneLength = document.getElementById('sceneLength').value;
    const sceneLocation = document.getElementById('sceneLocation').value.trim();
    
    if (!storyIdea) {
        alert('Please enter a story or episode idea');
        return false;
    }
    if (!sceneTone) {
        alert('Please select a scene tone');
        return false;
    }
    if (!sceneLength) {
        alert('Please select a scene length');
        return false;
    }
    if (!sceneLocation) {
        alert('Please enter a scene location');
        return false;
    }
    if (actors.length === 0) {
        alert('Please add at least one actor');
        return false;
    }
    return true;
}

// Generate Scene Idea
function generateSceneIdea() {
    if (!validateForm()) return;
    
    const storyIdea = document.getElementById('storyIdea').value;
    const sceneTone = document.getElementById('sceneTone').value;
    const sceneLength = document.getElementById('sceneLength').value;
    const sceneLocation = document.getElementById('sceneLocation').value;
    
    const idea = mockGenerateSceneIdea(storyIdea, sceneTone, sceneLength, sceneLocation);
    
    const outputSection = document.getElementById('outputSection');
    const sceneIdeaOutput = document.getElementById('sceneIdeaOutput');
    const sceneIdeaText = document.getElementById('sceneIdeaText');
    const noDataMessage = document.getElementById('noDataMessage');
    
    sceneIdeaText.textContent = idea;
    sceneIdeaOutput.style.display = 'block';
    outputSection.style.display = 'flex';
    noDataMessage.style.display = 'none';
}

// Generate Full Script
function generateFullScript() {
    if (!validateForm()) return;
    
    const storyIdea = document.getElementById('storyIdea').value;
    const sceneTone = document.getElementById('sceneTone').value;
    const sceneLength = document.getElementById('sceneLength').value;
    const sceneLocation = document.getElementById('sceneLocation').value;
    
    const script = mockGenerateFullScript(storyIdea, sceneTone, sceneLength, sceneLocation);
    
    const outputSection = document.getElementById('outputSection');
    const scriptOutput = document.getElementById('scriptOutput');
    const scriptText = document.getElementById('scriptText');
    const editArea = document.getElementById('editArea');
    const editableScript = document.getElementById('editableScript');
    const noDataMessage = document.getElementById('noDataMessage');
    
    scriptText.textContent = script;
    editableScript.value = script;
    scriptOutput.style.display = 'block';
    editArea.style.display = 'block';
    outputSection.style.display = 'flex';
    noDataMessage.style.display = 'none';
}

// Mock Scene Idea Generator
function mockGenerateSceneIdea(storyIdea, tone, length, location) {
    const actorList = actors.map(a => `${a.name} (${a.role})`).join(', ');
    
    const toneDescriptions = {
        mysterious: 'mysterious and suspenseful atmosphere with hidden clues',
        comedic: 'lighthearted and humorous tone with funny misunderstandings',
        dramatic: 'intense and emotional moments with high stakes',
        tense: 'fast-paced action with rising tension and conflict',
        emotional: 'heartfelt and introspective moments between characters',
        action: 'dynamic action sequences with excitement and danger'
    };
    
    const lengthDescriptions = {
        short: '1-2 minutes of screen time',
        medium: '2-4 minutes of screen time',
        long: '4+ minutes with multiple segments'
    };
    
    return `SCENE CONCEPT
================

📍 Location: ${location}
🎭 Characters: ${actorList}
🎬 Tone: ${toneDescriptions[tone]}
⏱️ Duration: ${lengthDescriptions[length]}

PREMISE:
${storyIdea}

SCENE SETUP:
${generateSceneSetup(tone, location)}

KEY PLOT POINTS:
${generatePlotPoints(storyIdea, tone)}

CHARACTER ARCS:
${generateCharacterArcs(tone)}

VISUAL DIRECTION:
${generateVisualDirection(location, tone)}`;
}

// Mock Full Script Generator
function mockGenerateFullScript(storyIdea, tone, length, location) {
    const actorList = actors.map(a => a.name).join(', ');
    
    return `SPARK SMP - SCENE SCRIPT
================================

📹 Scene Title: ${generateSceneTitle(storyIdea)}
📍 Location: ${location}
🎭 Cast: ${actorList}
🎬 Tone: ${tone.charAt(0).toUpperCase() + tone.slice(1)}

---

${generateDialogueSequence(location, tone)}

---

SCENE NOTES:
- Camera work should emphasize the ${tone} mood
- Use ${location} landmarks for visual interest
- Allow for ${tone} comedic timing if needed
- Wrap-up dialogue should reference the main story: "${storyIdea.substring(0, 60)}..."`;
}

// Helper functions for content generation
function generateSceneSetup(tone, location) {
    const setups = {
        mysterious: `A cloaked figure awaits in ${location}. Strange markings appear on nearby blocks. The air feels tense and foreboding.`,
        comedic: `Everyone gathers in ${location}, ready for an important meeting. Chaos immediately ensues as plans go hilariously wrong.`,
        dramatic: `The team convenes at ${location} to discuss serious matters. Emotions run high as truth reveals come to light.`,
        tense: `Action erupts in ${location} as unexpected enemies appear. The team must work together to survive.`,
        emotional: `A quiet moment unfolds in ${location} where feelings are shared and vulnerabilities are exposed.`,
        action: `Combat breaks out in ${location}. The team scrambles to defend their base and allies.`
    };
    return setups[tone] || setups.mysterious;
}

function generatePlotPoints(story, tone) {
    const points = [
        '1. Unexpected revelation that changes the situation',
        '2. Character conflict that must be resolved',
        '3. A choice that affects the story moving forward',
        `4. Resolution that ties back to: "${story.substring(0, 50)}..."`
    ];
    return points.join('\n');
}

function generateCharacterArcs(tone) {
    const arcs = actors.map((actor, i) => {
        const positions = ['leads the charge', 'provides comic relief', 'reveals hidden knowledge', 'makes a sacrifice'];
        return `${actor.name} (${actor.role}): ${positions[i % positions.length]}`;
    }).join('\n');
    return arcs || 'Character moments to be determined based on actors';
}

function generateVisualDirection(location, tone) {
    const directions = {
        mysterious: 'Use shadows, fog effects, and dramatic lighting. Include zoomed-in shots of mysterious details.',
        comedic: 'Use exaggerated expressions and awkward camera angles for comedic timing.',
        dramatic: 'Use cinematic angles and slow-motion for emotional impact.',
        tense: 'Quick cuts, rapid camera movement, intense lighting changes.',
        emotional: 'Soft focus, warm lighting, close-up shots of faces.',
        action: 'Dynamic cuts, wide shots showing the scale, first-person POV moments.'
    };
    return directions[tone] || directions.mysterious;
}

function generateSceneTitle(story) {
    const words = story.split(' ').slice(0, 4).join(' ');
    return `${words}...`;
}

function generateDialogueSequence(location, tone) {
    const sequences = {
        mysterious: `[Scene opens in ${location}. Eerie ambiance. A player walks cautiously.]

${actors[0]?.name || 'Player 1'}: "Did you see that? Something's not right here..."
${actors[1]?.name || 'Player 2'}: "I thought I heard something... over there!"

[Suspicious noises. The team regroups.]

${actors[0]?.name || 'Player 1'}: "We need to figure out what's happening. Stay sharp."

[A mystery unfolds...]`,

        comedic: `[Scene opens in ${location}. Everyone looks confident.]

${actors[0]?.name || 'Player 1'}: "Alright team, the plan is simple. We just—"
${actors[1]?.name || 'Player 2'}: "Wait, did you bring the supplies?"
${actors[0]?.name || 'Player 1'}: "Oh... supplies. Right. I forgot those."

[Everyone facepalms]

${actors[1]?.name || 'Player 2'}: "How do you forget supplies?!"

[Chaos ensues in the most hilarious way possible]`,

        dramatic: `[Scene opens in ${location}. A tense silence fills the air.]

${actors[0]?.name || 'Player 1'}: "I have something to tell you all... something I should have said a long time ago."
${actors[1]?.name || 'Player 2'}: "What is it?"

[A moment of hesitation]

${actors[0]?.name || 'Player 1'}: "I'm leaving the server."

[Shock and emotion ripple through the group]

${actors[1]?.name || 'Player 2'}: "But... why?"`,

        tense: `[Explosions rock ${location}. The team takes defensive positions.]

${actors[0]?.name || 'Player 1'}: "They're attacking! TAKE COVER!"
${actors[1]?.name || 'Player 2'}: "I've got the east side! Watch your backs!"

[Combat intensifies. Blocks crumble. Projectiles fly.]

${actors[0]?.name || 'Player 1'}: "Don't let them breach the inner wall!"

[The battle rages on...]`,

        emotional: `[Scene opens in ${location}. Soft music plays. Two players sit together.]

${actors[0]?.name || 'Player 1'}: "Thank you for being here. Through everything."
${actors[1]?.name || 'Player 2'}: "Always. We're in this together."

[A moment of genuine connection]

${actors[0]?.name || 'Player 1'}: "I don't say it enough, but... I'm really grateful for you."

[The moment speaks volumes]`,

        action: `[${location} erupts into chaos. Everyone is in motion.]

${actors[0]?.name || 'Player 1'}: "Incoming! All units engage!"
${actors[1]?.name || 'Player 2'}: "I'm flanking left! Cover me!"

[Weapons fire. Swift movements. Adrenaline pumping]

${actors[0]?.name || 'Player 1'}: "Push forward! We can take them!"

[The action builds to a crescendo...]`
    };
    return sequences[tone] || sequences.mysterious;
}

// Copy to clipboard
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy to clipboard');
        console.error(err);
    });
}

// Save edited script
function saveEdit() {
    const editedScript = document.getElementById('editableScript').value;
    const scriptText = document.getElementById('scriptText');
    scriptText.textContent = editedScript;
    alert('✓ Script updated!');
}

// Reset form
function resetForm() {
    document.getElementById('storyIdea').value = '';
    document.getElementById('sceneTone').value = '';
    document.getElementById('sceneLength').value = '';
    document.getElementById('sceneLocation').value = '';
    document.getElementById('actorName').value = '';
    document.getElementById('actorRole').value = '';
    
    actors = [];
    renderActors();
    
    document.getElementById('outputSection').style.display = 'none';
    document.getElementById('sceneIdeaOutput').style.display = 'none';
    document.getElementById('scriptOutput').style.display = 'none';
    document.getElementById('editArea').style.display = 'none';
    document.getElementById('noDataMessage').style.display = 'block';
    
    document.getElementById('storyIdea').focus();
}

// Allow Enter key to add actors
document.addEventListener('DOMContentLoaded', () => {
    const actorRoleInput = document.getElementById('actorRole');
    if (actorRoleInput) {
        actorRoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addActor();
            }
        });
    }
});
