import {bookingsTable } from "../database/constants";
import {knexInstance} from "../database/knexInstance";
import { RawBooking, Booking } from "./bookings.types";

class BookingResource {

  public async newBooking(booking: Booking): Promise<RawBooking>{
    const query =  knexInstance<RawBooking>(bookingsTable).insert(booking, '*');
    const addedBooking = await query;
    return addedBooking[0];
  }

  public async getUpComingBookings(): Promise<RawBooking[]>{
    const query = knexInstance<RawBooking>(bookingsTable).where({ 
      status: "accepted" 
    }).select().then(result => result);
    const upComingBookings = await query;
    return upComingBookings;
  }

  public async getPendingBookings(): Promise<RawBooking[]>{
    const query = knexInstance<RawBooking>(bookingsTable).where({ 
      status: "pending" 
    }).select().then(result => result);
    const pendingBookings = await query;
    return pendingBookings;
  }

  public async getOneBooking(bookingId: number): Promise<RawBooking>{
    const query = knexInstance<RawBooking>(bookingsTable).where( 'id', bookingId ).select().then(result => result[0]);
    const currentBooking = await query;
    return currentBooking;
  }

  public async updateBooking(bookingId: number, booking: RawBooking): Promise<RawBooking>{
    const query = knexInstance<RawBooking>(bookingsTable).where('id', bookingId ).update(booking, '*');
    const updatedBooking = await query;
    return updatedBooking[0];
  }

  public async deleteBooking(bookingId: number): Promise<number>{
    const query = knexInstance<RawBooking>(bookingsTable).where('id', bookingId).del();
    const numOfDelBooking = await query;
    return numOfDelBooking;
  }
}

export const bookingResource = new BookingResource();

