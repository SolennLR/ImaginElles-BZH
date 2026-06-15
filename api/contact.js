import Brevo from "@getbrevo/brevo";

export default async function handler(req, res) {
    const { nom, prenom, email, message } = req.body;

    try {
        // Configuration API
        const apiKey = process.env.BREVO_API_KEY;

        // Ajout du contact
        const contactsApi = new Brevo.ContactsApi();

        contactsApi.setApiKey(
            Brevo.ContactsApiApiKeys.apiKey,
            apiKey
        );

        await contactsApi.createContact({
            email,
            attributes: {
                FIRSTNAME: prenom,
                LASTNAME: nom,
            },
            listIds: [2], // ID de la liste Brevo
            updateEnabled: true,
        });

        // Envoi du mail
        const emailApi = new Brevo.TransactionalEmailsApi();

        emailApi.setApiKey(
            Brevo.TransactionalEmailsApiApiKeys.apiKey,
            apiKey
        );

        await emailApi.sendTransacEmail({
            sender: {
                name: "ImaginElles Bzh",
                email: "imaginelles-bzh@ikmail.com",
            },
            to: [
                {
                    email: "imaginelles-bzh@ikmail.com",
                },
            ],
            subject: "Nouvelle demande d'adhésion",
            htmlContent: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr />
        <p>${message}</p>
      `,
        });

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}