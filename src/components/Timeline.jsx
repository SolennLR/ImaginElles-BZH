import { useState } from "react";

export default function Timeline() {
    const events = [
        { date: "2026-09", text: "Premières sorties et ateliers" },
        { date: "2026-06", text: "Création officielle de l’association" },
        { date: "2027-01", text: "Développement des activités" }
    ];

    const [ascending, setAscending] = useState(false);

    const sortedEvents = [...events].sort((
        a, b) => {
        return ascending ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date); }
    );

    const formatDate = (date) => {
        const [year, month] = date.split("-");
        const monthNames = [ "JANV", "FÉV", "MARS",
            "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT",
            "OCT", "NOV", "DÉC" ];
        return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    };

    return (
        <section className="py-20 px-6">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">
                Notre parcours
            </h2>

            {/* BOUTON DE TRI */}
            <div className="flex justify-center mb-12">
                <button
                    onClick={() => setAscending(!ascending)}
                    className=" px-5 py-2 rounded-full bg-purple-700 text-white hover:bg-purple-800 transition "
                >
                    {ascending
                        ? "Du plus ancien au plus récent ↑"
                        : "Du plus récent au plus ancien ↓"
                    }
                </button>
            </div>

            {/* TIMELINE */}
            <div className="max-w-3xl mx-auto">
                {sortedEvents.map((event,
                                   index) => {
                    const isLast = index === sortedEvents.length - 1;
                    return (
                        <div key={event.date + index}
                             className="flex gap-4" >

                            {/* DATE */}
                            <div className=" w-20 sm:w-24 shrink-0 text-right text-sm sm:text-base font-bold text-purple-700 pt-4 ">
                                {formatDate(event.date)}
                            </div>

                            {/* POINT + LIGNE */}
                            <div className=" flex flex-col items-center w-5 shrink-0 ">
                                {/* POINT */}
                                <div className=" w-4 h-4 rounded-full bg-purple-700 border-4 border-purple-200 shrink-0 mt-4 " />
                                {/* LIGNE */}
                                {!isLast && (
                                    <div className=" w-0.5 flex-1 bg-purple-200 mt-1 mb-1 " />
                                )}
                            </div>

                            {/* CONTENU */}
                            <div className=" bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow flex-1 mb-8 ">
                                {event.text}
                            </div>
                        </div> );
                })}
            </div>
        </section>
    );
}