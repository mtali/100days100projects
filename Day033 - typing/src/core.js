const phrases = [
    'digital magic.',
    'geek chic.',
    'tech poetry.',
    'creative clicks.',
    'problem-solving play.',
    'logic fun.',
    'debug dance.',
    'binary banter.',
    'bug bashing.',
    'code coffee.',
    'screen jazz.',
    'hack joy.',
    'pixel passion.',
    'nerd cool.',
    'byte banter.',
    'app fiesta.',
    'brain flex.',
    'giggle git.',
    'web vibe.',
    'byte bliss.'
];

window.addEventListener('load', () => {
    const dynamicEl = document.getElementById('dynamic-text');
    const speed = 80;
    let index = 0;
    let typingIndex = 0;
    let deleting = false;
    let hold = false;

    function typeWriter() {
        if (!hold) {
            const sentence = phrases[index];

            dynamicEl.innerText = sentence.substring(0, typingIndex + 1);

            if (!deleting) {
                typingIndex++;
                if (typingIndex > sentence.length) {
                    deleting = true;
                    hold = true
                    setTimeout(() => {
                        hold = false;
                        typingIndex--;
                    }, 1000);
                }
            } else {
                typingIndex--;
                if (typingIndex < 0) {
                    deleting = false;
                    index = (index + 1) % phrases.length;
                }
            }
        }
        setTimeout(typeWriter, speed);
    }

    typeWriter();
});
