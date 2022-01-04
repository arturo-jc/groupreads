import {
    MODAL_OPEN,
    MODAL_CLOSED
} from "./types";

// set alert/ Should I make it async even though I'm not using await? We'll see
export const openModal = () => {
    document.body.classList.add("modal-open")
    return {type: MODAL_OPEN }
}

export const closeModal = () => {
    document.body.classList.remove("modal-open")
    return {type: MODAL_CLOSED}
}