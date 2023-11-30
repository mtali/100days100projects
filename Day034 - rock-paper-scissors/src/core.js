const container = document.querySelector('.container'),
    userResult = document.querySelector('.user_result img'),
    cpuResult = document.querySelector('.cpu_result img'),
    result = document.querySelector('.result'),
    optionsImage = document.querySelectorAll('.option_image'),
    loading = 2500,
    cpuImages = ["../assets/rock.png", "../assets/paper.png", "../assets/scissors.png"],
    gestureLetters = ['R', 'P', 'S'],
    outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
    };

optionsImage.forEach((image, index) => {
    image.addEventListener('click', e => {
        image.classList.add('active');
        userResult.src = cpuResult.src = "../assets/rock.png";
        result.innerText = 'Wait ...';
        optionsImage.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove('active');
        });
        container.classList.add('start');

        setTimeout(() => {
            container.classList.remove('start');

            userResult.src = e.target.querySelector('img').src;

            console.log(userResult)

            // Generate a random number between 0 and 2
            let randomIndex = Math.floor(Math.random() * 3);
            cpuResult.src = cpuImages[randomIndex];

            // Results
            const cpuValue = gestureLetters[randomIndex];
            const userValue = gestureLetters[index];

            const outcomeValue = outcomes[userValue + cpuValue];

            result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!`;

        }, loading);
    })
})


