# JWT Demo

This is a small demo of JWT behavior built on the [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Getting started
It's fairly straightforward. You only need [Node](https://nodejs.org/) and either a git CLI or GUI to get started.

### Preparing the project
1. Clone the project in the desired folder: `git clone https://github.com/Charlis70/jwt-demo.git`
2. Inside the project's folder, install the dependencies with `npm i`

### Configuring the environment variables
  1. Duplicate the `.env.example` file and rename the duplicate to `.env`
  2. Choose the secret with which to sign JWT tokens by setting the `JWT_SECRET` environment variable to your desired value
  3. If you are running this on a separate domain from the one the site will be accessed on, you'll want to set the `PUBLIC_ORIGIN` environment variable by following this structure: `SUBDOMAINS.DOMAIN.EXTENSION`

### Running the project
- Dev mode: `npm run dev`
- Prod mode:
  ```
  npm run build
  npm run start
  ```
