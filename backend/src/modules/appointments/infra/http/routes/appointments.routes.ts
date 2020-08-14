import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import enrureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(enrureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
  //   const appointments = await appointmentsRepository.find();

  //   return response.json(appointments);
  // })

  appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date)

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })

  return response.json(appointment);
});

export default appointmentsRouter
