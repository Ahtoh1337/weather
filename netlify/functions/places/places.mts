import { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    const response = await fetch(`https://${Netlify.env.get("GEODB_API_HOST")}/v1/geo/places${context.url.search}`, {
        headers: {
            "x-rapidapi-host": Netlify.env.get("GEODB_API_HOST") ?? "",
            "x-rapidapi-key": Netlify.env.get("GEODB_API_KEY") ?? "",
        }
    });

    return new Response(response.body, { status: response.status });
}