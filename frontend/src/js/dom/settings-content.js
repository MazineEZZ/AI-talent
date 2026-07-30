import { capitalize } from "../utils/utilities";
import { createDOMElement, createContentComp } from "./render-content";

export function renderSettingsContent() {
    const tabName = "settings";

    const { contentWrapper, header, body, footer } = createContentComp(tabName, capitalize(tabName));

    contentWrapper.appendChild(header);
    contentWrapper.appendChild(body);
    contentWrapper.appendChild(footer);

    return contentWrapper;
}
