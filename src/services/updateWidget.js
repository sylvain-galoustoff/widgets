import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

async function updateWidget(widgetId, newData) {

    try {
        await setDoc(doc(db, 'widgets', widgetId), newData, { merge: true })
    } catch (error) {
        return error
    }

}

export default updateWidget
