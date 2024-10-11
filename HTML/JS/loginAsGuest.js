function enterAsGuest() {

    const guestId = 'guest_' + Math.floor(Math.random() * 100000);

    window.location.href = `CHAT.html?guestId=${guestId}`;
}
