async function checkUnreadMessages() {
    try {
        const response = await fetch('/employees/notifications');
        const data = await response.json();

        const bell = document.querySelector('.note');
        if (data.unreadCount > 0) {
            bell.classList.add('unread');
        } else {
            bell.classList.remove('unread');
        }
    } catch (error) {
        console.error('Failed to fetch unread messages:', error);
    }
}

// Check every 10 seconds
setInterval(checkUnreadMessages, 10000);

// Run on page load
checkUnreadMessages();
