const VIEWS = window.COCINA_VIEWS;
const AUTO_ADVANCE_MS = 5200;
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ui = {
    sidebarViewButtons: [...document.querySelectorAll(".primary-nav [data-view]")],
    sensorTabs: document.getElementById("sensor-tabs"),
    sensorTabButtons: [...document.querySelectorAll(".sensor-tab[data-view]")],
    mobileSectionButtons: [...document.querySelectorAll(".mobile-nav-item[data-section]")],
    brandButton: document.querySelector(".brand"),

    viewer: document.getElementById("viewer"),
    image: document.getElementById("viewer-image"),
    title: document.getElementById("view-title"),
    description: document.getElementById("view-description"),

    previousButton: document.getElementById("previous-step"),
    nextButton: document.getElementById("next-step"),
    playbackButton: document.getElementById("toggle-sequence"),
    playbackLabel: document.getElementById("play-label"),
    playbackSymbol: document.getElementById("play-symbol"),

    stepKicker: document.getElementById("step-kicker"),
    stepTitle: document.getElementById("step-title"),
    stepDescription: document.getElementById("step-description"),
    stepState: document.getElementById("step-state"),

    sequencePanel: document.getElementById("sequence-panel"),
    progressFill: document.getElementById("progress-fill"),
    progressSteps: [...document.querySelectorAll(".progress-step")]
};

const state = {
    view: "inicio",
    step: 0,
    playing: !REDUCED_MOTION,
    timerId: null,
    lastSensorView: "proximidad"
};

function getActiveView() {
    return VIEWS[state.view];
}

function isSensorView(viewName = state.view) {
    return VIEWS[viewName]?.mode === "sequence";
}

function stopAutoAdvance() {
    if (state.timerId === null) return;

    window.clearTimeout(state.timerId);
    state.timerId = null;
}

function startAutoAdvance() {
    stopAutoAdvance();

    const view = getActiveView();
    if (view.mode !== "sequence" || !state.playing || document.hidden) return;

    state.timerId = window.setTimeout(() => {
        showStep(state.step + 1);
    }, AUTO_ADVANCE_MS);
}

function updateNavigation() {
    const sensorActive = isSensorView();

    ui.sidebarViewButtons.forEach((button) => {
        const selected = button.dataset.view === state.view;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });

    ui.sensorTabButtons.forEach((button) => {
        const selected = button.dataset.view === state.view;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });

    ui.mobileSectionButtons.forEach((button) => {
        const section = button.dataset.section;
        const selected =
            (section === "inicio" && state.view === "inicio") ||
            (section === "sensores" && sensorActive) ||
            (section === "topologia" && state.view === "topologia");

        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });

    ui.sensorTabs.hidden = !sensorActive;
    document.body.dataset.viewSection = sensorActive ? "sensores" : state.view;
}

function updatePlaybackButton() {
    const paused = !state.playing;

    ui.playbackButton.setAttribute("aria-pressed", String(paused));
    ui.playbackButton.setAttribute(
        "aria-label",
        paused ? "Reanudar secuencia" : "Pausar secuencia"
    );
    ui.playbackLabel.textContent = paused ? "Reanudar secuencia" : "Pausar secuencia";
    ui.playbackSymbol.textContent = paused ? "▶" : "⏸";
}

function updateProgress(totalSteps) {
    const lastStep = totalSteps - 1;
    const percentage = lastStep > 0 ? (state.step / lastStep) * 100 : 0;

    ui.progressFill.style.width = `${percentage}%`;

    ui.progressSteps.forEach((button, index) => {
        button.classList.toggle("is-active", index === state.step);
        button.classList.toggle("is-complete", index < state.step);

        if (index === state.step) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
    });
}

function setImage(src, alt) {
    ui.image.alt = alt;

    if (ui.image.getAttribute("src") === src && ui.image.complete) {
        ui.viewer.classList.remove("is-loading", "is-switching");
        return;
    }

    ui.viewer.classList.add("is-loading", "is-switching");
    ui.image.src = src;
}

function renderStep(view) {
    const step = view.steps[state.step];

    ui.stepKicker.textContent = `Paso ${state.step + 1} de ${view.steps.length}`;
    ui.stepTitle.textContent = step.title;
    ui.stepDescription.textContent = step.description;

    const stateAddsInformation = step.state.trim().toLocaleLowerCase() !== step.title.trim().toLocaleLowerCase();
    ui.stepState.hidden = !stateAddsInformation;
    ui.stepState.textContent = step.state;
    ui.stepState.dataset.tone = step.tone;

    updateProgress(view.steps.length);
    setImage(step.src, `${view.title}. ${step.title}.`);
}

function showStep(index) {
    const view = getActiveView();
    if (view.mode !== "sequence") return;

    state.step = (index + view.steps.length) % view.steps.length;
    renderStep(view);
    startAutoAdvance();
}

function renderView(viewName) {
    state.view = Object.hasOwn(VIEWS, viewName) ? viewName : "inicio";
    state.step = 0;
    state.playing = !REDUCED_MOTION;
    stopAutoAdvance();

    if (isSensorView()) state.lastSensorView = state.view;

    const view = getActiveView();

    ui.viewer.dataset.mode = view.mode;
    ui.title.textContent = view.title;
    ui.description.textContent = view.description;

    updateNavigation();

    if (view.mode === "sequence") {
        ui.sequencePanel.hidden = false;
        updatePlaybackButton();
        renderStep(view);
        startAutoAdvance();
        return;
    }

    ui.sequencePanel.hidden = true;
    setImage(view.src, view.alt);
}

function navigateToSection(section) {
    if (section === "inicio") renderView("inicio");
    else if (section === "topologia") renderView("topologia");
    else if (section === "sensores") renderView(state.lastSensorView);
}

ui.image.addEventListener("load", () => {
    ui.viewer.classList.remove("is-loading", "is-switching");
});

ui.image.addEventListener("error", () => {
    ui.viewer.classList.remove("is-loading", "is-switching");
    ui.description.textContent = "No fue posible cargar esta visualización.";
});

ui.previousButton.addEventListener("click", () => showStep(state.step - 1));
ui.nextButton.addEventListener("click", () => showStep(state.step + 1));

ui.playbackButton.addEventListener("click", () => {
    state.playing = !state.playing;
    updatePlaybackButton();

    if (state.playing) startAutoAdvance();
    else stopAutoAdvance();
});

ui.progressSteps.forEach((button) => {
    button.addEventListener("click", () => {
        const requestedStep = Number(button.dataset.step);
        if (Number.isInteger(requestedStep)) showStep(requestedStep);
    });
});

[...ui.sidebarViewButtons, ...ui.sensorTabButtons].forEach((button) => {
    button.addEventListener("click", () => renderView(button.dataset.view));
});

ui.mobileSectionButtons.forEach((button) => {
    button.addEventListener("click", () => navigateToSection(button.dataset.section));
});

ui.brandButton.addEventListener("click", () => renderView("inicio"));

document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoAdvance();
    else startAutoAdvance();
});

renderView("inicio");
