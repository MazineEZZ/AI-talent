import { createDOMElement, createContentComp } from "./render-content";
import { appState } from "../global/state";

function createTable(results, tableCols) {
    const table = createDOMElement({
        type: "table",
    })

    const rowHeader = createDOMElement({
        type: "tr"
    });

    tableCols.forEach((col) => {
        const tableHeader = createDOMElement({
            type: "th",
            text: col
        })
        rowHeader.appendChild(tableHeader);
    });

    table.appendChild(rowHeader);

    results.forEach((candidate) => {
        const tableRow = createDOMElement({
            type: "tr"
        })
        tableCols.forEach((col) => {
            const tableCell = createDOMElement({
                type: "td",
                text: candidate[col]
            })
            tableRow.appendChild(tableCell);
        })
        table.appendChild(tableRow);
    })

    return table;
}

export function renderCandidatesContent() {
    const tabName = "candidates"
    
    const { contentWrapper, header, body, footer } = createContentComp(tabName, "Candidates List");
    
    // Body
    if (appState.results) {
        const tableCols = ["percentage", "role", "programming_language", "experience_years"];

        const table = createTable(appState.results, tableCols)

        body.appendChild(table);
    } else {
        const message = createDOMElement({
            text: "No evaluation found"
        })

        body.appendChild(message);
    }

    contentWrapper.appendChild(header);
    contentWrapper.appendChild(body);
    contentWrapper.appendChild(footer);
    
    return contentWrapper;
}