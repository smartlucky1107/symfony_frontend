export function ChangeTabs(e, refTabs, refTabsContent) {
    let tabs = refTabs.current.childNodes;
    tabs = tabs[0].childNodes;
    let tabsContent = refTabsContent.current.childNodes;
    let dataTab;
    let allowedTabs = [];

    if (e.currentTarget) {
        dataTab = e.currentTarget.dataset.tab;
    } else {
        dataTab = e;
    }

    for (let i = 0; i < tabs.length; i++) {
        allowedTabs.push(tabs[i].dataset?.tab);
        if (tabs[i].classList) {
            tabs[i].classList.remove("active");
        }
    }

    for (let i = 0; i < tabsContent.length; i++) {
        if (tabsContent[i].classList) {
            tabsContent[i].classList.remove("active");
        }
        if (tabsContent[i].dataset?.tab === dataTab) {
            tabsContent[i].classList.add("active");
        } else {
            // Sprawdzanie czy dataTab można przypisać do tabów
            if (allowedTabs.indexOf(dataTab) === -1) {
                if (tabsContent[0].classList) {
                    tabsContent[0].classList.add("active");
                }
            }
        }
    }

    refTabs.current.classList.remove("show");

    if (e.currentTarget) {
        e.currentTarget.classList.add("active");

        window.history.pushState({}, null, `?${dataTab}`);
    } else {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].dataset?.tab === dataTab) {
                tabs[i].classList.add("active");
                window.history.pushState({}, null, `?${dataTab}`);
            } else {
                // Sprawdzanie czy dataTab można przypisać do tabów
                if (allowedTabs.indexOf(dataTab) === -1) {
                    if (tabs[0].classList) {
                        tabs[0].classList.add("active");
                    }
                }
            }
        }
    }
}

export function ShowTabs(ref) {
    ref.current.classList.toggle("show");
}

export default ChangeTabs;
