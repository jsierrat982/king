document.addEventListener('DOMContentLoaded', () => {
    const scoreInputs = document.querySelectorAll('.score-input');
    const playerNameInputs = document.querySelectorAll('.player-name-input');
    const resetScoresBtn = document.getElementById('reset-scores-btn');
    const resetAllBtn = document.getElementById('reset-all-btn');
    const dollarInput = document.getElementById('dollar-value-input');

    // ... (Mantén tu código exacto de Wake Lock aquí) ...

    const multipliers = { 1: -20, 2: -20, 3: -30, 4: -50, 5: -160, 6: -90, 7: 25, 8: 25, 9: 25, 10: 25 };
    const roundMaxValues = { 1: 13, 2: 13, 3: 8, 4: 4, 5: 1, 6: 2, 7: 13, 8: 13, 9: 13, 10: 13 };

    // --- NUEVO: Funciones de Persistencia ---
    function saveData() {
        const state = {
            players: {},
            scores: {},
            dollarValue: dollarInput ? dollarInput.value : 0
        };
        
        playerNameInputs.forEach(input => state.players[input.id] = input.value);
        scoreInputs.forEach(input => state.scores[input.id] = input.value);
        
        localStorage.setItem('kingGameState', JSON.stringify(state));
    }

    function loadData() {
        const saved = localStorage.getItem('kingGameState');
        if (saved) {
            const state = JSON.parse(saved);
            
            if (dollarInput && state.dollarValue) dollarInput.value = state.dollarValue;
            
            playerNameInputs.forEach(input => {
                if (state.players[input.id]) input.value = state.players[input.id];
            });
            
            scoreInputs.forEach(input => {
                if (state.scores[input.id]) input.value = state.scores[input.id];
            });
        }
    }

    function calculateScores() {
        // ... (Mantén tu código exacto de cálculo de scores y colores aquí) ...
        
        // Al final de calcular, guardamos automáticamente
        saveData();
    }

    function updatePlayerHeaders() {
        // ... (Mantén tu código exacto aquí) ...
        saveData(); // Guardamos cuando cambia un nombre
    }

    function resetScoresOnly() {
        if (!confirm('¿Mantener nombres y borrar SOLO los puntos?')) return;
        scoreInputs.forEach(input => input.value = '0');
        calculateScores();
    }

    function resetAll() {
        if (!confirm('¿BORRAR TODO? Se perderán nombres y configuraciones.')) return;
        scoreInputs.forEach(input => input.value = '0');
        playerNameInputs.forEach(input => input.value = '');
        if(dollarInput) dollarInput.value = '';
        
        // Limpiamos el localStorage al borrar todo
        localStorage.removeItem('kingGameState');
        
        calculateScores();
        updatePlayerHeaders();
    }

    // Listeners
    scoreInputs.forEach(input => input.addEventListener('change', calculateScores));
    playerNameInputs.forEach(input => input.addEventListener('input', updatePlayerHeaders));
    resetScoresBtn.addEventListener('click', resetScoresOnly);
    resetAllBtn.addEventListener('click', resetAll);
    if (dollarInput) dollarInput.addEventListener('input', calculateScores);

    // Init: PRIMERO cargamos datos, LUEGO calculamos y actualizamos la UI
    loadData();
    calculateScores();
    updatePlayerHeaders();
});
