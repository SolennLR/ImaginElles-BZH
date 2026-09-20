import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }) {
    const canonicalUrl = window.location.origin + window.location.pathname;

    return (
        <Helmet>
            <title>{title}</title>

            <meta
                name="description"
                content={description}
            />

            {/* URL canonique */}
            <link
                rel="canonical"
                href={canonicalUrl}
            />

            {/* Open Graph */}
            <meta
                property="og:title"
                content={title}
            />

            <meta
                property="og:description"
                content={description}
            />

            <meta
                property="og:type"
                content="website"
            />

            <meta
                property="og:url"
                content={canonicalUrl}
            />

            <meta
                property="og:site_name"
                content="Imagin’Elles"
            />

            <html lang="fr" />
        </Helmet>
    );
}