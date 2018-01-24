# Tweet.ly

Client-facing Twitter clone proxy microservice to analyze user behaviors

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Usage

Install dependencies
```npm install```

Start Redis
```npm run cache```

Start Cassandra
```npm run database```

Start Node Server
```npm start```

## Requirements

- Node 9.4.x
- Redis 4.0.x
- Cassandra 3.11.x

## Other Information

![Tweet.ly Proxy Server Architecture](https://user-images.githubusercontent.com/26525656/35350160-dfaa1142-00f1-11e8-9c80-70c7d5eaef35.png)

![Tweet.ly Service Architecture](https://user-images.githubusercontent.com/26525656/35350190-ff83709e-00f1-11e8-90ab-e9c0962e118e.png)