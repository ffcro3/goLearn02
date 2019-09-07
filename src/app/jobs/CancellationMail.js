import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    const dateFormatted = format(
      parseISO(appointment.date),
      "'dia' dd 'de' MMMM', às ' H:mm'h'",
      {
        locale: pt,
      }
    );

    console.log(
      `New Cancellation. From: ${appointment.user.name}, at: ${dateFormatted}. Provider name: ${appointment.provider.name}`
    );

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancelation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: dateFormatted,
      },
    });
  }
}

export default new CancellationMail();
