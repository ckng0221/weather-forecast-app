import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { Weather, WeatherSchema } from './schemas/weather.schema';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let weatherModel: Model<Weather>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;

    weatherModel = mongoConnection.model(Weather.name, WeatherSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        WeatherService,
        { provide: getModelToken(Weather.name), useValue: weatherModel },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();
    weatherController = app.get<WeatherController>(WeatherController);
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
    expect(weatherController).toBeDefined();
  });
});
