export interface Booking {
  houseName: string;
  from: Date;
  to: Date;

}

export interface RawBooking extends Booking {
  id: number;
  status: string;
  userEmail: string;
  adminEmail: string;
}
