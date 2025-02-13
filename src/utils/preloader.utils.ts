
export function writePercentage (percents: number) {
    const preloaderProgress = document.getElementById('preloader_progress')
    if (preloaderProgress) preloaderProgress.innerHTML = `${percents.toFixed(0)}%`
}

export function hidePreloader () {
    const preloaderWrap = document.getElementById('preloader_wrap')
    if (preloaderWrap) preloaderWrap.style.display = 'none'
}