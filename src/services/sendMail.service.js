import nodemailer from "nodemailer";
import dotenv from "dotenv";
import tokenService from "../services/token.service.js";

dotenv.config();

const sendMailService = (email, id) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const token = tokenService.generateToken(id);

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
    <p style="margin-top: 20px;">The above token expires in 15 minutes!</p>
  </div>
`;

  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Token para recuperacao de senha",
      html: emailHtml,
    },
    (error, info) => {
      if (error) {
        console.log("Erro ao enviar email: ", error);
      } else {
        console.log("Email enviado: ", info.response);
      }
    }
  );
};

export default {sendMailService};

