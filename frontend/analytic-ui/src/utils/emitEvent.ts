export const emitAnalyticsEvent = async (data: {
    eventType: string;
    userId?: string;
    timestamp?: string;
    course: {
        id: string;
        title: string;
        description: string;
    };
}) => {
    try {
        await fetch("http://localhost:8080/producer/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(), // Add timestamp
            }),
        });
    } catch (error) {
        console.error("Failed to emit analytics event:", error);
    }
};