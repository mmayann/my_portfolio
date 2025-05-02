import express from 'express';
import cors from 'cors';
import router from './routers';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;