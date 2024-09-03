document.addEventListener("DOMContentLoaded", function() {
    const voiceSelect = document.getElementById('voiceSelect');
    const speakButton = document.getElementById('speakButton');
    const textarea = document.getElementById('textarea');

    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();

        voiceSelect.innerHTML = '';
        voices.forEach((voice, i) => {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    speakButton.addEventListener('click', function() {
        const utterance = new SpeechSynthesisUtterance(textarea.value);
        const selectedVoice = voices[voiceSelect.value];
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        speechSynthesis.speak(utterance);
    });
});
