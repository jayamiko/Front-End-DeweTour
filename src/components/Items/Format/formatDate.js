export default function formatDate(date) {
    const newDate = new Date(date);
    return Intl.DateTimeFormat("id-ID", {
        dateStyle: "long",
    }).format(newDate);
}