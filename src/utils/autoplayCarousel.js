// Shared autoplay/pause/resume timer logic for carousels: advances on its
// own every `autoplayDelayMs`, and any interaction (arrow/tab/dot click)
// should call registerInteraction() to pause it, resuming automatically
// after `resumeDelayMs` of no further interaction.
export function createAutoplayController(
    advance,
    { autoplayDelayMs = 4000, resumeDelayMs = 20000 } = {}
) {
    let intervalId = null;
    let resumeTimeoutId = null;

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function start() {
        stop();
        intervalId = setInterval(advance, autoplayDelayMs);
    }

    function registerInteraction() {
        stop();
        clearTimeout(resumeTimeoutId);
        resumeTimeoutId = setTimeout(start, resumeDelayMs);
    }

    function reset() {
        stop();
        clearTimeout(resumeTimeoutId);
        resumeTimeoutId = null;
    }

    return { start, stop, registerInteraction, reset };
}
