import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // ou 'outlook', 'yahoo', ou un SMTP personnalisé
    auth: {
        user: 'ydays696@gmail.com',
        pass: 'rbex fwqh mmun ekkt', // ⚠️ Utilise un mot de passe d’application, pas ton vrai mot de passe Gmail !
    },
});

export async function sendMail({ to, subject, html }) {
    try {
        const info = await transporter.sendMail({
            from: '"Gest Local" <ydays696@gmail.com>',
            to,
            subject,
            html,
        });
        console.log('Email envoyé :', info.response);
    } catch (error) {
        console.error('Erreur envoi email :', error);
    }
}
