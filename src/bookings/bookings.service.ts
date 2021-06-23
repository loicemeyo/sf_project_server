import { bookingResource } from "./bookings.resource";
import { RawBooking, Booking } from "./bookings.types";

class BookingService {
  public async newBooking(booking: Booking): Promise<RawBooking>{
    const newBooking = await bookingResource.newBooking(booking);
    return newBooking;
  }

  public async getUpComingBookings(): Promise<RawBooking[]>{
    const upComingBookings = await bookingResource.getUpComingBookings();
    return upComingBookings;
  }

  public async getPendingBookings(): Promise<RawBooking[]>{
    const pendingBookings = await bookingResource.getPendingBookings();
    return pendingBookings;
  }

  public async getOneBooking(bookingId: number): Promise<RawBooking>{
    const currentBooking = await bookingResource.getOneBooking(bookingId);
    return currentBooking;
  }

  public async updateBooking(bookingId: number, booking: RawBooking): Promise<RawBooking>{
    const updatedBooking = await bookingResource.updateBooking(bookingId, booking);
    return updatedBooking;
  }

  public async deleteBooking(bookingId: number): Promise<Number>{
    const numOfDelBooking = await bookingResource.deleteBooking(bookingId);
    return numOfDelBooking;
  }

}
export const bookingService = new BookingService();
