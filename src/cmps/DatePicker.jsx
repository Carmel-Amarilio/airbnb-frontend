import React, { useState } from 'react';

export function DatePicker() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleDateClick = (day) => {
        if (!startDate) {
            setStartDate(day);
        } else if (!endDate) {
            if (day < startDate) {
                setEndDate(startDate);
                setStartDate(day);
            } else {
                setEndDate(day);
            }
        } else {
            setStartDate(day);
            setEndDate(null);
        }
    };

    const isInRange = (day) => {
        if (!startDate || !endDate) return false;
        return day >= startDate && day <= endDate;
    };

    const isFirstMonth = (date) => {
        return date.getMonth() === currentMonth.getMonth();
    };

    const isFirstMonthClass = (date) => {
        return isFirstMonth(date) ? 'first-month' : '';
    };

    const isStartDate = (day) => {
        return startDate && day.getDate() === startDate.getDate();
    };

    const isEndDate = (day) => {
        return endDate && day.getDate() === endDate.getDate();
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <section className="calendar">
            <div className="calendar-header">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate()))}>
                    &lt;
                </button>
                <h2>{currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate()))}>
                    &gt;
                </button>
            </div>
            <div className="calendar-grid">
                <div className="day">Sun</div>
                <div className="day">Mon</div>
                <div className="day">Tue</div>
                <div className="day">Wed</div>
                <div className="day">Thu</div>
                <div className="day">Fri</div>
                <div className="day">Sat</div>
                {Array.from({ length: firstDayOfMonth }, (_, i) =>
                    <div key={`empty-${i}`} className="empty"></div>
                )}
                {daysArray.map((day) =>
                    <div
                        key={day}
                        className={`date ${isStartDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)) ? 'start-date' : ''} ${isEndDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)) ? 'end-date' : ''} ${isInRange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)) ? 'selected' : ''} ${isFirstMonthClass(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}`}
                        onClick={() => handleDateClick(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    >
                        {day}
                    </div>
                )}
            </div>
        </section >
    );
}

// export default DatePicker;
