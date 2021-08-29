# Express + Typescript API Base <!-- omit in toc -->
Base code for an API based on Express + Typescript

# Local Setup
- Clone this repo
- Duplicate `.env.example` and rename it to `.env`. Update variables as you need
- Run the `run.sh` script from inside `docker/local` folder. This will build & start the API container (alongside with whatever containers you have defined in `docker-compose.yml`)
  ```sh
  cd docker/local && bash run.sh
  ```
- By default, the API is listening on port `8091`. You can change this in your `.env` file

# Running Tests
- **Unit**: `yarn test:unit`
- **Integration**: `cd docker/test-integration && bash run.sh`
