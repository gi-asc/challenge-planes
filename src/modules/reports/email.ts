import fs from 'fs';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class Email {
  async sendEmail(mailOptions: Mail.Options): Promise<void> {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: 'testesapiplanes@gmail.com',
        pass: 'testandoapi',
      },
      port: 587,
    });
    transport.sendMail(mailOptions);
  }
}

export class ReportEmail extends Email {
  mailOptions: Mail.Options;
  constructor(emails: string[], filename: string, path: string) {
    super();
    fs.readFile(path, error => {
      if (error) {
        throw error;
      }
    });
    this.mailOptions = {
      from: '"Reports day" <noreply@reports.com.br>',
      to: emails,
      subject: 'report of ' + new Date(),
      attachments: [{ filename: filename, path: path }],
    };
  }
}
