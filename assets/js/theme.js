let toggleTheme=e=>{setTheme("dark"==e?"light":"dark")},setTheme=e=>{transTheme(),setHighlight(e),e?document.documentElement.setAttribute("data-theme",e):document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme",e),"undefined"!=typeof medium_zoom&&medium_zoom.update({background:getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color")+"ee"})},setHighlight=e=>{"dark"==e?(document.getElementById("highlight_theme_light").media="none",document.getElementById("highlight_theme_dark").media=""):(document.getElementById("highlight_theme_dark").media="none",document.getElementById("highlight_theme_light").media="")},transTheme=()=>{document.documentElement.classList.add("transition"),window.setTimeout(()=>{document.documentElement.classList.remove("transition")},500)},initTheme=e=>{if(null==e){const t=window.matchMedia;e=(t&&t("(prefers-color-scheme: dark)").matches,"dark")}setTheme(e)};initTheme(localStorage.getItem("theme"));