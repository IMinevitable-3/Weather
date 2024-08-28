import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CoordSchema = new Schema({
  lon: { type: Number, required: true },
  lat: { type: Number, required: true },
});

const WeatherSchema = new Schema({
  id: { type: Number, required: true },
  main: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const MainSchema = new Schema({
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  temp_min: { type: Number, required: true },
  temp_max: { type: Number, required: true },
  pressure: { type: Number, required: true },
  humidity: { type: Number, required: true },
  sea_level: { type: Number },
  grnd_level: { type: Number },
});

const WindSchema = new Schema({
  speed: { type: Number, required: true },
  deg: { type: Number, required: true },
  gust: { type: Number },
});

const RainSchema = new Schema({
  "1h": { type: Number },
});

const CloudsSchema = new Schema({
  all: { type: Number, required: true },
});

const SysSchema = new Schema({
  type: { type: Number },
  id: { type: Number },
  country: { type: String, required: true },
  sunrise: { type: Number, required: true },
  sunset: { type: Number, required: true },
});

const WeatherDataSchema = new Schema(
  {
    coord: { type: CoordSchema, required: true },
    weather: { type: [WeatherSchema], required: true },
    base: { type: String, required: true },
    main: { type: MainSchema, required: true },
    visibility: { type: Number, required: true },
    wind: { type: WindSchema, required: true },
    rain: { type: RainSchema },
    clouds: { type: CloudsSchema, required: true },
    dt: { type: Number, required: true },
    sys: { type: SysSchema, required: true },
    timezone: { type: Number, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true },
    cod: { type: Number, required: true },
    city_name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: "1h" } },
  },
  { timestamps: true }
);

const WeatherData = mongoose.model("WeatherData", WeatherDataSchema);

export default WeatherData;
