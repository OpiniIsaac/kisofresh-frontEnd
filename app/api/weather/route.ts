// // pages/api/fetch-weather.ts
// import axios from 'axios';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const apiKey = process.env.OPENWEATHER_API_KEY;

// const fetchWeather = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { city } = req.query;

//   if (!city) {
//     return res.status(400).json({ error: 'City is required' });
//   }

//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/forecast`,
//       {
//         params: {
//           q: city,
//           appid: apiKey,
//           units: 'metric',
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
// };

// export default fetchWeather;
