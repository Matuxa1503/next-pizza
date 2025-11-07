import { ReactNode } from 'react';
import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, template: ReactNode | Promise<ReactNode>) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  // если template — Promise, дождёмся; если нет — Promise.resolve вернёт его как есть
  const resolvedTemplate = await Promise.resolve(template);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    react: resolvedTemplate,
  });

  if (error) {
    throw error;
  }

  return data;
};
