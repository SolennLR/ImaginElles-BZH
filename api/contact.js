export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }


    const { nom, prenom, email, message } = req.body;

    try {
        // Configuration API
        const apiKey = process.env.BREVO_API_KEY;
        console.log("BREVO_API_KEY présente :", !!apiKey);
        console.log("Longueur de la clé :", apiKey ? apiKey.length : 0);

        const response = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",
                headers: {
                    "api-key": apiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    sender: {
                        name: "ImaginElles Bzh",
                        email: "lerouzicsolenn32@gmail.com",
                    },

                    to: [
                        {
                            email: "imaginelles-bzh@ikmail.com",
                            name: "ImaginElles Bzh",
                        },
                    ],

                    replyTo: {
                        email: email,
                        name: `${prenom} ${nom}`,
                    },

                    subject: "Nouvelle demande d'adhésion",

                    htmlContent: `
                        <h2>Nouvelle demande d'adhésion</h2>

                        <p>
                            <strong>Nom :</strong> ${nom}
                        </p>

                        <p>
                            <strong>Prénom :</strong> ${prenom}
                        </p>

                        <p>
                            <strong>Email :</strong> ${email}
                        </p>

                        <hr>

                        <p>
                            ${message}
                        </p>
                    `,
                }),
            }
        );


        if (!response.ok) {

            const error = await response.text();

            console.error(
                "Erreur Brevo :",
                error
            );

            return res.status(500).json({
                success: false,
                message: error,
            });
        }


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