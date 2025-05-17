export function timeAgo(date: string) {
    const dateInst = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateInst.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths =
        now.getMonth() - dateInst.getMonth() +
        12 * (now.getFullYear() - dateInst.getFullYear());
    const diffYears = now.getFullYear() - dateInst.getFullYear();

    if (diffYears > 0) {
        return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
    } else if (diffMonths > 0) {
        return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    } else if (diffWeeks > 0) {
        return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
        return "Just now";
    }

}