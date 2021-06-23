import {Request, Response, Router} from "express";
import { bookingService } from "./bookings.service";

export function getBookingsRouter(): Router {
  const bookingRouter =  Router();
  bookingRouter.post('/', async (req: Request, res: Response) => {
    try{
      const payload = {...req.body, userEmail: req.currentUser.email}
      const addedBooking = await bookingService.newBooking(payload)
      res.status(201).json({message: 'success', addedBooking})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  bookingRouter.get('/up-coming', async (req: Request, res: Response) => {
    try{
      const upComingBookings = await bookingService.getUpComingBookings()
      res.status(200).json({message: 'success', upComingBookings})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  bookingRouter.get('/pending', async (req: Request, res: Response) => {
    try{
      const pendingBookings = await bookingService.getPendingBookings()
      res.status(200).json({message: 'success', pendingBookings})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  bookingRouter.get('/:id', async (req: Request, res: Response) => {
    try{
      const currentBooking = await bookingService.getOneBooking(parseInt(req.params.id))
      currentBooking
      ? res.status(200).json({message: 'success', currentBooking})
      : res.status(404).json({message: 'booking not found'})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  bookingRouter.patch('/:id', async (req: Request, res: Response) => {
    try{
      const updatedBooking = await bookingService.updateBooking(
        parseInt(req.params.id), req.body
      )
      updatedBooking
      ? res.status(200).json({message: 'success', updatedBooking})
      : res.status(404).json({message: 'booking not found'})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  bookingRouter.delete('/:id', async (req: Request, res: Response) => {
    try{
      const addedBooking = await bookingService.deleteBooking(parseInt(req.params.id))
      addedBooking > 0
      ? res.status(200).json({message: 'successfully deleted'})
      : res.status(404).json({message: 'booking not found'})
    } catch (error){
      res.status(500).json({message: error.message})
    }
  })

  return bookingRouter;
}
