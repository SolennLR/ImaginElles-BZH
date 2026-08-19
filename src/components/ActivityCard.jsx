export default function ActivityCard({
                                         title,
                                         date,
                                         description,
                                         color,
                                         image,
                                         onClick,
                                     }) {

    const formattedDate = new Date(date).toLocaleDateString('fr-FR');

    return (
        <div onClick={onClick} className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg p-6 cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                {/* IMAGE BLOCK */}
                <div className="relative">

                    <img
                        src={image}
                        alt={title}
                        className="w-full aspect-[4/3] object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10"/>

                    <div
                        className="absolute bottom-0 left-0 right-0 h-2"
                        style={{backgroundColor: color}}
                    />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                    {/* Badge */}
                    <div
                        className="inline-block mb-3 text-white text-sm px-3 py-1 rounded-full"
                        style={{ backgroundColor: color }} >
                        📅 {formattedDate}
                    </div>

                    <h3
                        className="text-xl font-bold mb-2"
                        style={{color}}
                    >
                        {title}
                    </h3>

                    <p className="leading-relaxed whitespace-pre-line text-justify">
                        {description}
                    </p>
                </div>
            </div>

            );
            }