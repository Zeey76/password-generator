const passwordValue = document.querySelector('.password-value');
const lengthValue = document.querySelector('.length-value');
const lengthSlider = document.querySelector('input');
const options = document.querySelectorAll('.password-contents');
const generatebtn = document.querySelector('button');
const strengthBox = document.querySelectorAll('.box');

let settings = {
    username: false,
    lowercase: false,
    numbers: false,
    symbols: false
};

lengthSlider.addEventListener('input', () => {
    lengthValue.innerHTML = lengthSlider.value;
    

    const percentage = ((lengthValue - lengthSlider.min) / (lengthSlider.max - lengthSlider.min)) * 100;

    lengthSlider.style.background = `linear-gradient(to right, hsl(127, 100%, 82%)${percentage}%, hsl(248, 11%, 15%)${percentage}%)`;
});

options.forEach((option) => {
    const key = option.dataset.option;
    const checkbox = option.querySelector('.checkbox');
    if (settings[key]) {
        checkbox.classList.add("active");
    }
    option.addEventListener("click", () => {
        settings[key] = !settings[key];
        checkbox.classList.toggle("active", settings[key]);
    });
});

generatebtn.addEventListener("click", () => {
    const length = parseInt(lengthSlider.value);
    if (length === 0) {
        alert("Please select character length");
        return;
    }
    const { uppercase, lowercase, numbers, symbols} = settings;

    const charsets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+{}[]|;:<>?"
    };
    let character = "";
    if (uppercase) {
        character += charsets.uppercase;
    };
    if (lowercase) {
        character += charsets.lowercase;
    };
    if (numbers) {
        character += charsets.numbers;
    };
    if (symbols) {
        character += charsets.symbols;
    };

    if (character === "") {
        alert("Please select at least one character type");
        return;
    };

    let password = "";

    for ( let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * character.length);
        password += character[random];
    }

    passwordValue.innerHTML = password;
    updateStrengthBox(length, uppercase, lowercase, numbers, symbols);

});

function updateStrengthBox(length, uppercase, lowercase, numbers, symbols) {
    let strength = 0;
    if (length >= 8) {
        strength++
    }
    if (length >= 12) {
        strength++
    }
    const variety = [uppercase, lowercase, numbers, symbols].filter(Boolean).length;
    if (variety >= 2) {
        strength++
    }
    if (variety >= 3) {
        strength++
    }
    strengthBox.forEach((box, index) => {
        if (index < strength) {
            box.classList.add("filled");
        } else {
            box.classList.remove("filled");
        }
    });
    if (strength === 1 || strength === 2) {
        document.querySelector('.strength-text').innerHTML = "Weak"
    } else if (strength === 3) {
        document.querySelector('.strength-text').innerHTML = "Medium"
    } else if(strength === 4) {
        document.querySelector('.strength-text').innerHTML = "Strong"
    } else {
        document.querySelector('.strength-text').innerHTML = "Too weak"
    }
}

lengthSlider.addEventListener("input", () => {
    
})

