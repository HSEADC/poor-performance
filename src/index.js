import './index.css'
import jpg from './images/image.jpg'

let audioContext = null;
let brownNoiseNode = null;
let gainNode = null;
let isPlaying = false;

// Функция для создания коричневого шума
function createBrownNoise(audioCtx) {
    const bufferSize = 4096;
    const node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
    let lastOut = 0.0;

    node.onaudioprocess = function (e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1; // Генерация белого шума
            output[i] = (lastOut + 0.03 * white) / 1.03; // Преобразование в коричневый шум
            lastOut = output[i];
            output[i] *= 2; // Увеличение громкости
        }
    };
    return node;
}

// Функция плавного изменения громкости
function fadeVolume(targetVolume, duration) {
    if (gainNode) {
        const currentTime = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
        gainNode.gain.linearRampToValueAtTime(targetVolume, currentTime + duration);
    }
}

// Функция для управления шумом
function toggleNoise() {
    const noiseButton = document.getElementById("noiseButton");

    if (!isPlaying) {
        // Включение звука
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (!brownNoiseNode) {
            brownNoiseNode = createBrownNoise(audioContext);
        }

        if (!gainNode) {
            gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Начальная громкость = 0
            brownNoiseNode.connect(gainNode).connect(audioContext.destination);
        }

        // Плавное увеличение громкости до 1 за 2 секунды
        fadeVolume(1, 0.4);
        noiseButton.textContent = "выключить звук";
    } else {
        // Выключение звука
        fadeVolume(0, 0.4); // Плавное уменьшение громкости до 0 за 2 секунды
        setTimeout(() => {
            if (brownNoiseNode) brownNoiseNode.disconnect();
            if (gainNode) gainNode.disconnect();
            gainNode = null;
            brownNoiseNode = null;
        }, 2000); // Отключаем узлы после завершения затухания
        noiseButton.textContent = "включить звук";
    }

    isPlaying = !isPlaying;
}

// Привязываем обработчик событий к кнопке
document.addEventListener("DOMContentLoaded", () => {
    const noiseButton = document.getElementById("noiseButton");
    noiseButton.addEventListener("click", toggleNoise);
});
