import { MatDateFormats } from '@angular/material';

export interface ReservationDto {
    id: string
    reservationTime: string
    reservationDate: string
    tableSize: number
    userId: string
    userFirstName: string
    userEmail: string
    amountSpent: string
    isCheckedIn: boolean
    userPriorityStatus: string
}