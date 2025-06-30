import { OverlayTrigger, Tooltip } from "react-bootstrap";

// Function to shorten text and show full text in tooltip
export const truncateText = (text, limit) => {
    if (text && text.length > limit) {
        return (
            <>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip">{text}</Tooltip>}
                >
                    <span className="text-muted"> {text.slice(0, limit)}...</span>
                </OverlayTrigger>
            </>
        );
    } else {
        return text;
    }
};

const helpers = { truncateText };

export default helpers