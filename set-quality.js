async function setMaxQuality() {
    const videos = document.querySelectorAll("video")
    if (videos.length == 0) {
        console.log("YTFU: no video")
        return
    }
    video = videos[0]
    console.log("YTFU: found video")

    const player = video.closest(".html5-video-player:not(#inline-preview-player)")
    if (!player) {
        console.log("YTFU: no player")
        return
    }
    console.log("YTFU: found player")

    const settings = player.querySelector(".ytp-settings-button")
    if (!settings) {
        console.log("YTFU: no settings button")
        return
    }
    console.log("YTFU: found settings button")

    settings.click()

    const quality = player.querySelector(".ytp-settings-menu[data-layer] .ytp-menuitem:last-child")
    if (!quality) {
        console.log("YTFU: no quality button")
        return
    }
    console.log("YTFU: found quality button")

    quality.click()

    const topQuality = (() => {
        for (const e of player.querySelectorAll(".ytp-settings-menu[data-layer] .ytp-menuitem")) {
            if (e.textContent.match(/\d/) && (e.children.length <= 1))
                return e
        }
    })()
    if (!topQuality) {
        console.log("YTFU: no quality found")
        return
    }
    console.log("YTFU: found top quality: " + topQuality.textContent)

    topQuality.click()
}
async function main() {
    setMaxQuality()
    const video = document.querySelector("video")
    video.addEventListener("canplay", setMaxQuality)
    //const observer = new MutationObserver((l, _) => {
    //    console.log("YTFU: attributes changed:")
    //    for (const m of l) {
    //        console.log("YTFU: - " + m.attributeName + " => ")
    //        console.log(document.querySelector("video")[{"controlslist":"controlsList","tabindex":"tabIndex"}[m.attributeName]])
    //    }
    //    if (l.find((m) => m.attributeName == "src")) {
    //        console.log("YTFU: observed src attribute change")
    //        setTimeout(setMaxQuality, 100)
    //    }
    //})
    //observer.observe(video, {attributes: true})
}
main()
