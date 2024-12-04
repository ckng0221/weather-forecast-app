import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ILocation } from '../dto/create-weather.dto';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Weather {
  @Prop({
    type: {
      location_id: { type: String },
      location_name: { type: String },
    },
  })
  location: ILocation;

  @Prop()
  date: Date;

  @Prop()
  morning_forecast: string;

  @Prop()
  afternoon_forecast: string;

  @Prop()
  evening_forecast: string;

  @Prop()
  summary_forecast: string;

  @Prop()
  summary_when: string;

  @Prop()
  max_temp: number;

  @Prop()
  min_temp: number;

  @Prop({ default: 1 })
  version: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
