# NASA Mission Control

Space exploration project. Find your favorite planet from the list of habitable planets, schedule your trip and have fun.

## Tools

- Client is implemented in `react.js`
- Uses `Arwes` Futuristic Sci-Fi UI Web Framework
- Server is implemented in `Express.js`
- `pm2` for process management

## Running the Project

1. In the terminal, run: npm run deploy
2. Browse to the mission control frontend at localhost:8000 and schedule an interstellar launch!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run docker build -t nasa-project .
3. Run docker run -it -p 8000:8000 nasa-project

## Running the Tests

To run any automated tests, run npm test. This will:

- Run all the client-side tests: npm test --prefix client
- Run all the server-side tests: npm test --prefix server

### Links

- [Lucidchart](https://www.lucidchart.com/pages/)
- [ARWES](https://github.com/arwes/arwes)
- [cors package](https://www.npmjs.com/package/cors)
- [Streams Promises API](https://nodejs.org/api/stream.html#stream_streams_promises_api)
- [concurrent scripts](https://www.coreycleary.me/how-to-run-more-than-one-command-as-part-of-a-npm-script)
- [Separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [Separation of Concerns in Software Design](https://nalexn.github.io/separation-of-concerns/)
- [Layered Architecture to Design iOS Apps](https://www.vadimbulavin.com/layered-architecture-ios/)
- [Web Workers API](https://nodejs.org/api/worker_threads.html)
- [Worker threads](https://nodejs.org/api/worker_threads.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
