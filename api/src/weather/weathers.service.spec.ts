import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Weather, WeatherSchema } from './schemas/weather.schema';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let weatherModel: Model<Weather>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    weatherModel = mongoConnection.model(Weather.name, WeatherSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: getModelToken(Weather.name), useValue: weatherModel },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });
  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });
  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
