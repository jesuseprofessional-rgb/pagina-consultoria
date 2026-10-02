
let preguntaActual = 0;
const respuestasUsuario = [];
const questionArea = document.getElementById("question-area");
const questionText = document.getElementById("question-text");

const answerA = document.getElementById("answer-a");
const answerB = document.getElementById("answer-b");
const answerC = document.getElementById("answer-c");
const answerD = document.getElementById("answer-d");

const nextButton = document.getElementById("next-button");

const progress = document.querySelector(".progress");
const progressNumber = document.querySelector(".progress-info span:last-child");

const preguntaNumero = document.querySelector(".progress-info span:first-child");


function mostrarPregunta() {

    const pregunta = preguntas[preguntaActual];

    questionArea.textContent = pregunta.area;

    questionText.textContent = pregunta.pregunta;

    answerA.textContent = pregunta.respuestas.A;
    answerB.textContent = pregunta.respuestas.B;
    answerC.textContent = pregunta.respuestas.C;
    answerD.textContent = pregunta.respuestas.D;

    document.querySelectorAll('input[name="respuesta"]').forEach(input => {
        input.checked = false;
    });

    const numero = preguntaActual + 1;
    const total = preguntas.length;

    preguntaNumero.textContent =
        `Pregunta ${numero} de ${total}`;

    const porcentaje = (numero / total) * 100;

    progress.style.width = `${porcentaje}%`;

    progressNumber.textContent =
        `${porcentaje}%`;

    if (numero === total) {
        nextButton.textContent = "Ver resultado →";
    } else {
        nextButton.textContent = "Siguiente →";
    }
}


nextButton.addEventListener("click", function () {

    const respuestaSeleccionada =
        document.querySelector('input[name="respuesta"]:checked');

    if (!respuestaSeleccionada) {

        alert("Selecciona una respuesta antes de continuar.");

        return;
    }

    respuestasUsuario[preguntaActual] =
        respuestaSeleccionada.value;


    if (preguntaActual < preguntas.length - 1) {

        preguntaActual++;

        mostrarPregunta();

    } else {

        calcularResultado();

    }

});


mostrarPregunta();
document.getElementById("restart-button").addEventListener("click", function () {

    preguntaActual = 0;

    respuestasUsuario.length = 0;

    document.getElementById("results-card").style.display = "none";

    document.querySelector(".question-card").style.display = "block";

    document.querySelector(".progress-section").style.display = "block";

    mostrarPregunta();

});
function calcularResultadosPorArea() {

    const resultados = {};

    preguntas.forEach((pregunta, indice) => {

        const area = pregunta.area;

        if (!resultados[area]) {

            resultados[area] = {
                total: 0,
                aciertos: 0
            };

        }

        resultados[area].total++;

        if (respuestasUsuario[indice] === pregunta.correcta) {

            resultados[area].aciertos++;

        }

    });

    Object.keys(resultados).forEach(area => {

        const resultado = resultados[area];

        resultado.porcentaje =
            (resultado.aciertos / resultado.total) * 100;
        const resultadosPorArea = calcularResultadosPorArea();

        console.log("Resultados por área:");
        console.log(resultadosPorArea);
    });

    return resultados;
}
function calcularResultado() {

    let aciertos = 0;

    preguntas.forEach((pregunta, indice) => {

        if (respuestasUsuario[indice] === pregunta.correcta) {

            aciertos++;

        }

    });

    const total = preguntas.length;

    const porcentaje = (aciertos / total) * 100;


    document.querySelector(".question-card").style.display = "none";

    document.querySelector(".progress-section").style.display = "none";


    document.getElementById("result-percentage").textContent =
        `${porcentaje}%`;

    document.getElementById("result-correct").textContent =
        `${aciertos} de ${total} correctas`;


    let mensaje = "";

    if (porcentaje >= 80) {

        mensaje =
            "Buen desempeño. Esta práctica muestra un buen dominio de los temas evaluados.";

    } else if (porcentaje >= 60) {

        mensaje =
            "Buen avance. Esta práctica puede ayudarte a identificar los temas que conviene seguir reforzando.";

    } else {

        mensaje =
            "Esta práctica puede servirte para identificar las áreas que requieren mayor preparación.";

    }


    document.getElementById("result-message").textContent = mensaje;

    document.getElementById("results-card").style.display = "block";

}