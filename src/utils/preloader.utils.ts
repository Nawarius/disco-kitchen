
export function writePercentage (percents: number) {
    displayPreloader(true)

    const preloaderProgress = document.getElementById('preloader_progress')
    if (preloaderProgress) preloaderProgress.innerHTML = `${percents.toFixed(0)}mb loaded`
}

export function displayPreloader (bool: boolean) {
    const preloaderWrap = document.getElementById('preloader_wrap')
    if (preloaderWrap) preloaderWrap.style.display = bool ? 'flex' : 'none'
}