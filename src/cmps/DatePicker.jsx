import React, { useEffect, useState } from 'react';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';

export function DatePicker({ setDates, checkIn, checkOut }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handleDateClick = (day) => {
        if (!checkIn) {
            setDates(prev => ({ ...prev, checkIn: day}))
        } else if (!checkOut) {
            if (day < checkIn) {
                setDates(prev => ({ ...prev, checkIn: day, checkOut: checkIn}))
            } else {
                setDates(prev => ({ ...prev, checkOut: day}))
            }
        } else {
            setDates(prev => ({ ...prev, checkIn: day, checkOut: null}))

        }
    };

    const isInRange = (day) => {
        if (!checkIn || !checkOut) return false;
        return day >= checkIn && day <= checkOut;
    };

    const isFirstMonth = (date) => {
        return date.getMonth() === currentMonth.getMonth();
    };

    const isFirstMonthClass = (date) => {
        return isFirstMonth(date) ? 'first-month' : '';
    };

    const isStartDate = (day) => {
        return checkIn && day.getDate() === checkIn.getDate() && day.getMonth() === checkIn.getMonth() && day.getFullYear() === checkIn.getFullYear();
    };

    const isEndDate = (day) => {
        return checkOut && day.getDate() === checkOut.getDate() && day.getMonth() === checkOut.getMonth() && day.getFullYear() === checkOut.getFullYear();
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const nextMonthDaysInMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
    const nextMonthFirstDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).getDay();
    const nextMonthDaysArray = Array.from({ length: nextMonthDaysInMonth }, (_, i) => i + 1);

    return (
        <section className="calendar flex column">
            <div className="calendar-header flex align-center space-between">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, currentMonth.getDate()))}>
                    <KeyboardArrowLeftSharpIcon />
                </button>
                <h2>{currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <h2>{nextMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate()))}>
                    <KeyboardArrowRightSharpIcon />
                </button>
            </div>
            <article className='calendar-container flex'>
                <div className="calendar-grid">
                    <div className="day">Su</div>
                    <div className="day">Mo</div>
                    <div className="day">Tu</div>
                    <div className="day">We</div>
                    <div className="day">Th</div>
                    <div className="day">Fr</div>
                    <div className="day">Sa</div>
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

                <div className="calendar-grid">
                    <div className="day">Su</div>
                    <div className="day">Mo</div>
                    <div className="day">Tu</div>
                    <div className="day">We</div>
                    <div className="day">Th</div>
                    <div className="day">Fr</div>
                    <div className="day">Sa</div>
                    {Array.from({ length: nextMonthFirstDay }, (_, i) =>
                        <div key={`empty-${i}`} className="empty"></div>
                    )}
                    {nextMonthDaysArray.map((day) =>
                        <div
                            key={day}
                            className={`date ${isStartDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)) ? 'start-date' : ''} ${isEndDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)) ? 'end-date' : ''} ${isInRange(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)) ? 'selected' : ''}`}
                            onClick={() => handleDateClick(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day))}
                        >
                            {day}
                        </div>
                    )}
                </div>
            </article>
        </section >
    );
}
