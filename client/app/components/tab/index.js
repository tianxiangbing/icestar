
import { OPENTAB, CLOSETAB } from "./actionTypes";
import store from "store/store";

const Tab = {
    to({ to, title, prop }) {
        store.dispatch({
            type: OPENTAB,
            to,
            title,
            prop
        });
    },
    close() {
        store.dispatch({
            type: CLOSETAB
        });
    }
}

export default Tab;