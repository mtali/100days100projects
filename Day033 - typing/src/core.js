const codingIsContinuation = [
    "machine language",
    "ideas to code",
    "solve with syntax",
    "creativity's bridge",
    "learning journey",
    "digital backbone",
    "future code craft",
    "tech poetry",
    "innovation skill",
    "limitless key",
    "code blueprint",
    "algo's life",
    "computer symphony",
    "digital wizardry",
    "imagine, code, transform",
    "logic dance",
    "software heartbeat",
    "digital DNA",
    "silent tech chat",
    "tech foundation"
];

window.addEventListener('load', () => {
    const dynamicEl = document.getElementById('dynamic-text');
    const speed = 150;
    let index = 0;
    let typingIndex = 0;
    let deleting = false;

    function typeWriter() {
        const sentence = codingIsContinuation[index];

        dynamicEl.innerText = sentence.substring(0, typingIndex + 1);

        if (!deleting) {
            typingIndex++;
            if (typingIndex > sentence.length) {
                deleting = true;
                typingIndex--;
            }
        } else {
            typingIndex--;
            if (typingIndex < 0) {
                deleting = false;
                index = (index + 1) % codingIsContinuation.length;
            }
        }
        setTimeout(typeWriter, speed);
    }

    typeWriter();
});
