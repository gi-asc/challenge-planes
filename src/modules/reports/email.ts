import fs from 'fs';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class Email {
  async sendEmail(mailOptions: Mail.Options): Promise<void> {
    const testAccount = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      auth: testAccount,
    });
    transport.sendMail(mailOptions);
  }
}

export class ReportEmail extends Email {
  mailOptions: Mail.Options;
  constructor(email: string, filename: string, path: string) {
    super();
    fs.readFile(path, error => {
      if (error) {
        throw error;
      }
    });
    this.mailOptions = {
      from: '"Reports day" <noreply@reports.com.br>',
      to: email,
      subject: 'report of ' + new Date(),
      attachments: [{ filename: filename, path: path }],
    };
  }
}
