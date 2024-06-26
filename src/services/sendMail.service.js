import dotenv from "dotenv";
import { Recipient, EmailParams, MailerSend, Sender } from "mailersend";
import tokenService from "../services/token.service.js";

dotenv.config();

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sendMailService = async (email) => {
  try {
    const token = tokenService.generateToken();

    const tokenHtml = token
      .split("")
      .map(
        (digit) => `
    <div style="display: inline-block; border: 1px solid #ccc; padding: 10px; margin: 2px; font-size: 24px;">
      ${digit}
    </div>
  `
      )
      .join("");

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h1 style="color: gray;">Token</h1>
      <div style="display: inline-block;">
        ${tokenHtml}
      </div>
      <p style="margin-top: 20px;">O token acima expira em 15 minutos!</p>
    </div>
  `;

    const recipients = [new Recipient(email, "Recipient")];
    const sender = new Sender(process.env.EMAIL_USER, "No reply");

    const emailParams = new EmailParams();
    emailParams.setFrom(sender);
    emailParams.setTo(recipients);
    emailParams.setSubject("Token para recuperação de senha");
    emailParams.setHtml(emailHtml);
    emailParams.setText(`Seu token de recuperação é: ${token}`);

    const response = await mailersend.email.send(emailParams);
    console.log("Email enviado com sucesso", response);
  } catch (error) {
    console.log(error)
    console.error("Erro ao enviar email: ", error);
  }
};

export default { sendMailService };
