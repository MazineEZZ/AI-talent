import { capitalize } from "../utils/utilities";
import avatarImg from "../../assets/images/avatar.jpeg";

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

    profileDetails.appendChild(avatar);
    profileDetails.appendChild(profileUsername);

    profile.appendChild(profileDetails);
    profile.appendChild(toggleSidebar);


    // Body
    const body = createDOMElement({name:"body"});

    const tabs = ["evaluation", "candidates"];

    tabs.forEach((tab) => {
        body.appendChild(createDOMElement({
            name: tab,
            classArr: ["tab"],
            text: capitalize(tab),
            id: `${tab}-tab`
        }))
    })


    // Footer
    const footer = createDOMElement({name:"footer"});

    const settingsTab = createDOMElement({
        name:"settings",
        classArr: ["tab"],
        text: "Settings",
        id: "settings-tab"
    })

    footer.appendChild(settingsTab);

    sidebarWrapper.appendChild(profile);
    sidebarWrapper.appendChild(body);
    sidebarWrapper.appendChild(footer);

    return sidebarWrapper;
}

export { renderSidebar, createDOMElement, createContentComp };