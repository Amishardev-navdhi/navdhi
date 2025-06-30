# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Deploying to Netlify

1. **Connect your repository to Netlify** at https://app.netlify.com/ and select this project.
2. Netlify will automatically detect the `netlify.toml` file and use the following settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
3. Make sure to set any required environment variables in the Netlify dashboard (e.g., variables starting with `NEXT_PUBLIC_` or `NODE_ENV`).
4. For local testing with Netlify CLI, run:
   ```sh
   npm install -g netlify-cli
   netlify dev
   ```
5. For more details, see the [Netlify Next.js documentation](https://docs.netlify.com/integrations/frameworks/next-js/).
