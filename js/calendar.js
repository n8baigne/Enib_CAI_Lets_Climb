function getCalendarEvent() {
    let tmpList = userPropositions.concat(userRequests);
    tmpList.forEach((item, index) => {
        let date = item.date.toISOString();
        if (item.totalParticipants === item.participants && !(item.type == ClimbEvents.ASKED || item.type == ClimbEvents.SUGGESTED)) {
            if (!checkDuplicateForADate(date, 'green')) {
                eventList.push({
                    title: '',
                    start: date,
                    backgroundColor: 'green',
                    allDay: true
                })
            }
        }

        if (item.totalParticipants != item.participants && !(item.type == ClimbEvents.ASKED || item.type == ClimbEvents.SUGGESTED)) {
            if (!checkDuplicateForADate(date, 'red')) {
                eventList.push({
                    title: '',
                    start: date,
                    backgroundColor: 'red',
                    allDay: true
                })
            }
        }

        if (item.type == ClimbEvents.ASKED) {
            if (!checkDuplicateForADate(date, 'black')) {
                eventList.push({
                    title: '',
                    start: date,
                    backgroundColor: 'black',
                    allDay: true
                })
            }
        }

        if (item.type == ClimbEvents.SUGGESTED) {
            if (!checkDuplicateForADate(date, 'cyan')) {
                eventList.push({
                    title: '',
                    start: date,
                    backgroundColor: 'cyan',
                    allDay: true
                })
            }
        }

    });
    return eventList;
}

function checkDuplicateForADate(date, backgroundColor) {
    if (eventList.some(e => (e.backgroundColor === backgroundColor) && (e.start === date))) {
        return true;
    } else {
        return false;
    }
}