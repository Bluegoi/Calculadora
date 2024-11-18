function addToDisplay(value) {
    const display = document.getElementById('display');
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(lastChar)) {
        display.value = "Erro: Operadores seguidos!";
        return;
    }
    if (display.value === "Erro: Operadores seguidos!" || display.value.startsWith("Erro:")) {
        display.value = "";
    }
    display.value += value;
}
function clearDisplayAll() {
    document.getElementById('display').value = '';
}
function clearValue() {
    const display = document.getElementById('display');
    const valor = display.value;
    const lastIndex = Math.max(
        valor.lastIndexOf('+'),
        valor.lastIndexOf('-'),
        valor.lastIndexOf('*'),
        valor.lastIndexOf('/')
    );
    if (lastIndex !== -1) {
        display.value = valor.substring(0, lastIndex + 1);
    } else {
        display.value = '';
    }
}
function clearOne() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        if (!/^[0-9+\-*/.]+$/.test(expression)) {
            throw new Error("Erro: Entrada inválida!");
        }

        const result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Erro no cálculo!");
        }

        display.value = result;
    } catch (e) {
        display.value = e.message;
    }
}
$(document).ready(function () {
    const colorThemes = {
        red: { background: "#ffcccc", border: "#cc0000", text: "#660000" },
        yellow: { background: "#fffacd", border: "#ffcc00", text: "#cc9900" },
        green: { background: "#ccffcc", border: "#008000", text: "#004d00" },
        orange: { background: "#ffe5cc", border: "#ff6600", text: "#cc5200" },
        blue: { background: "#cce5ff", border: "#0a2a7f", text: "#0a2a7f" },
        white: { background: "#ffffff", border: "#cccccc", text: "#000000" },
        black: { background: "#333333", border: "#000000", text: "#ffffff" },
        pink: { background: "#ffe6f2", border: "#ff66b2", text: "#cc0066" },
        purple: { background: "#e6ccff", border: "#800080", text: "#4d004d" },
        brown: { background: "#f2e6d9", border: "#663300", text: "#4d2600" },
        teal: { background: "#58bc9c", border: "#469f84", text: "#2f6d55" },
    };
    $(".color-btn").click(function () {
        const color = $(this).data("color");
        const theme = colorThemes[color];
        $("body").css("background", theme.background);
        $(".calculadora").css({
            "background-color": theme.background,
            "border-color": theme.border,
        });
        $("input[type='button']").css({
            "background-color": theme.background,
            "color": theme.text,
            "border-color": theme.border,
        });
        $("input[type='button'][value='=']").css({
            "background-color": theme.border,
            "color": theme.text,
        });
        $("#display").css({
            "background-color": theme.background,
            "border-color": theme.border,
            "color": theme.text,
        });
    });
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const display = document.getElementById('display');
        if (event.key === "Shift" || event.key === "Alt" || event.key === "Control") {
            return;
        }
        if (/\d/.test(key) || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === 'Enter' || key === 'Backspace') {
            handleKeyPress(key);
        }
    });
    function handleKeyPress(key) {
        const display = document.getElementById('display');
        if (key === 'Enter') {
            try {
                const result = eval(display.value);
                if (isNaN(result) || !isFinite(result)) {
                    display.value = "Erro no cálculo!";
                } else {
                    display.value = result;
                }
            } catch (e) {
                display.value = "Erro: Entrada inválida!";
            }
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else {
            addToDisplay(key);
        }
    }
});
