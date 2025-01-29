import express, { Request, Response } from 'express';
import { UserRoutes } from "./presentation/routes/user_routes";
import { QuizRoutes } from "./presentation/routes/quiz_routes";
import { ResultadoRoutes } from "./presentation/routes/resultado_routes";
import { ImagemRoutes } from "./presentation/routes/imagem_routes";
import { HistoricoRoutes } from "./presentation/routes/historico_routes";
import admin from 'firebase-admin';
import nodemailer, { TransportOptions } from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(require('../teste-key.json')),
});

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.post('/reset-password', async (req: Request, res: Response) => {
  const {email, newPassword, confirmPassword} = req.body;

  if (!email || !newPassword || !confirmPassword) {
  }

  const regex = new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$');

  if (!regex.test(newPassword)) {
       res.status(400).json({ error: 'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.' });
  }      

  if(newPassword !== confirmPassword){
       res.status(400).json({ error: 'As senhas não conferem.' });
  }

  try {
      const user = await admin.auth().getUserByEmail(email);
      await admin.auth().updateUser(user.uid, {
          password: newPassword
      });

       res.status(200).json({ success: true, message: 'Senha alterada com sucesso!' });
  } catch (error) {
      console.error('Erro ao alterar senha:', error);
       res.status(500).json({ error: 'Erro ao alterar senha.' });
  }
});

app.post('/verify-code', async (req: Request, res: Response) => {
  const { email, code } = req.body;
  
  if (!email || !code) {
       res.status(400).json({ error: 'E-mail e código são obrigatórios.' });
  }
  
  try {
      const db = admin.firestore();
      const doc = await db.collection('verificationCodes').doc(email).get();
      const savedCode = doc.data()?.code;
  
      if (!savedCode) {
       res.status(404).json({ error: 'Código não encontrado.' });
      }
  
      if (savedCode !== code) {
       res.status(403).json({ error: 'Código inválido.' });
      }
  
       res.status(200).json({ success: true, message: 'Código verificado com sucesso!' });
  } catch (error) {
      console.error('Erro ao verificar código:', error);
       res.status(500).json({ error: 'Erro ao verificar código de verificação.' });
  }
});

app.post('/send-code', async (req: Request, res: Response) => {
const { email } = req.body;

if (!email) {
   res.status(400).json({ error: 'O e-mail é obrigatório.' });
}

try {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const db = admin.firestore();
  await db.collection('verificationCodes').doc(email).set({
    code: code,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,    // Client ID do OAuth
    process.env.GOOGLE_CLIENT_SECRET, // Client Secret do OAuth
    process.env.GOOGLE_REDIRECT_URI  // URI de redirecionamento
  );
  http://localhost:3000/oauth2callback
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // O Refresh Token gerado
  });

  const accessToken = await oauth2Client.getAccessToken();

  // Configura o Nodemailer com OAuth2
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use `true` para produção com STARTTLS ou 465 com SSL
      requireTLS: true, // Adicione esta linha para garantir o TLS
      auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
          accessToken: accessToken.token,
      },
  } as TransportOptions);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${code}`,
  };

  await transporter.sendMail(mailOptions);

   res.status(200).json({ success: true, message: 'Código enviado com sucesso!' });
} catch (error) {
  console.error('Erro ao enviar código:', error);
   res.status(500).json({ error: 'Erro ao enviar código de verificação.' });
}
});

new UserRoutes(app);
new QuizRoutes(app);
new ResultadoRoutes(app);
new HistoricoRoutes(app);
new ImagemRoutes(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});