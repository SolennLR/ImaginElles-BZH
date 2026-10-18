
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function SupabaseTest() {
    const [result, setResult] = useState("Test en cours...");

    useEffect(() => {
        async function testConnection() {
            const { data, error } = await supabase
                .from("activities")
                .select("id, title, status")
                .in("status", ["draft", "published", "archived"])
                .limit(20);

            if (error) {
                setResult(`Erreur : ${error.message}`);
                console.error("Erreur Supabase :", error);
                return;
            }

            console.table(data);

            const draftsVisible = data.some(
                (activity) => activity.status === "draft"
            );

            setResult(
                draftsVisible
                    ? "ALERTE : des brouillons sont visibles."
                    : `Test réussi : aucun brouillon visible parmi les ${data.length} activité(s) retournée(s).`
            );
        }

        testConnection();
    }, []);

    return (
        <div style={{ padding: "20px", margin: "20px", border: "1px solid #ccc" }}>
            <h2>Test de connexion Supabase</h2>
            <p>{result}</p>
        </div>
    );
}
