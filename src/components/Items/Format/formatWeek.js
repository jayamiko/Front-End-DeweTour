export default function formatWeek(date) {
    const newDate = new Date(date);
    return Intl.DateTimeFormat("id-ID", {
        weekday: "long",
    }).format(newDate);
}