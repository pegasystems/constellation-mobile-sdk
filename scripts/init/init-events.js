import { bridge } from "../bridge/native-bridge.js";

const TAG = "[Events]";

export function subscribeForEvents(rootComponent) {
    PCore.getPubSubUtils().subscribe(
        "assignmentFinished",
        (message) => {
            console.log(TAG, `Assignment finished, message: ${message}`);
            rootComponent.destroy();
            bridge.onFinished(message);
        },
        "assignmentFinished"
    );

    PCore.getPubSubUtils().subscribe(
        PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
        () => {
            console.log(TAG, "Assignment canceled");
            rootComponent.destroy();
            bridge.onCancelled();
        },
        "cancelAssignment"
    );
}
