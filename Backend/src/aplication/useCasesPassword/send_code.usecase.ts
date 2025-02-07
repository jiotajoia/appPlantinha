import { google } from "googleapis";
import * as nodemailer from "nodemailer";
import { db } from "../../persistence/firebase_config/firebase";
import { FieldValue } from "firebase-admin/firestore";




export class SendCodeUseCase {
  constructor() {}

  public create(): SendCodeUseCase {
    return new SendCodeUseCase();
  }

  async execute(email: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await db.collection("verificationCodes").doc(email).set({
      code: code,
      createdAt:  FieldValue.serverTimestamp(),
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID, // Client ID do OAuth
      process.env.GOOGLE_CLIENT_SECRET, // Client Secret do OAuth
      process.env.GOOGLE_REDIRECT_URI // URI de redirecionamento
    );
    http://localhost:3000/oauth2callback
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // O Refresh Token gerado
    });

    const accessToken = await oauth2Client.getAccessToken();

    // Configura o Nodemailer com OAuth2
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` para produção com STARTTLS ou 465 com SSL
      requireTLS: true, // Adicione esta linha para garantir o TLS
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as nodemailer.TransportOptions);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Seu código de verificação",
      text: `Seu código de verificação é: ${code}`,
    };

    await transporter.sendMail(mailOptions);
  }
}