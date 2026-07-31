import { capitalize } from "../utils/utilities";
import avatarImg from "../../assets/images/avatar.jpeg";
import { ChartCandlestick, createElement, PanelLeft, Settings, Table} from "lucide";

function createDOMElement({type="div", kind="", name = "", text = "", classArr = [], id = ""}) {
    const element = document.createElement(type);
    classArr.forEach((className) => {
        element.classList.add(className);
    })
    
    if (kind) {
        element.type = kind;
    }

    if (name) {
        element.classList.add(name);
    }
    
    if (id) {
        element.id = id;
    }

    if (text) {
        element.textContent = text;
    }

    return element
}

function createContentComp(tabName, contentTitle) {
    const contentWrapper = createDOMElement({
        name:"content-wrapper", 
        id:"content"
    });

    // Header
    const header = createDOMElement({name:"header"});
    
    const title = createDOMElement({
        name: `${tabName}-title`,
        text: contentTitle,
        classArr: ["title"]
    });

    header.appendChild(title);

    // Body
    const body = createDOMElement({name:"body"});

    // Footer
    const footer = createPageFooter();

    return { contentWrapper, header, body, footer };
}

function createPageFooter() {
    const footer = createDOMElement({name:"footer"});

    const credits = createDOMElement({
        name:"credits",
        text: "credits"
    });

    footer.appendChild(credits);

    return footer;
}

function renderSidebar() {
    const sidebarWrapper = createDOMElement({
        name: "sidebar-wrapper",
        id: "sidebar"
    });

    // Header
    const profile = createDOMElement({name:"profile"});
    
    const profileDetails = createDOMElement({name:"details"});

    const avatar = createDOMElement({type: "img"});
    avatar.src = avatarImg;

    const profileUsername = createDOMElement({
        type: "p",
        id: "username",
        text: "Mazine"
    })

    const toggleSidebar = createDOMElement({
        type: "button",
        id: "toggle-sidebar"
    })

    toggleSidebar.appendChild(createElement(PanelLeft))

    profileDetails.appendChild(avatar);
    profileDetails.appendChild(profileUsername);

    profile.appendChild(profileDetails);
    profile.appendChild(toggleSidebar);


    // Body
    const body = createDOMElement({name:"body"});

    const tabs = {"evaluation": ChartCandlestick, "candidates": Table};

    for (const tab in tabs) {
        const tabContainer = createDOMElement({
            name: tab,
            classArr: ["tab"],
            id: `${tab}-tab`
        });

        const tabTitle = createDOMElement({
            name: tab + "-title",
            text: capitalize(tab)
        })

        const tabIcon = createElement(tabs[tab]);
        
        tabContainer.appendChild(tabIcon);
        tabContainer.appendChild(tabTitle);

        body.appendChild(tabContainer)
    }    

    // Footer
    const footer = createDOMElement({name:"footer"});

    const settingsTabContainer = createDOMElement({
        name:"settings",
        classArr: ["tab"],
        id: "settings-tab"
    })

    const settingsTabTitle = createDOMElement({
        name:"settings-title",
        text: "Settings"
    })

    const settingsTabIcon = createElement(Settings);

    settingsTabContainer.appendChild(settingsTabIcon);
    settingsTabContainer.appendChild(settingsTabTitle);

    footer.appendChild(settingsTabContainer);

    sidebarWrapper.appendChild(profile);
    sidebarWrapper.appendChild(body);
    sidebarWrapper.appendChild(footer);

    return sidebarWrapper;
}

export { renderSidebar, createDOMElement, createContentComp };