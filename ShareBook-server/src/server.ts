import server from './main';
// import { sequelize } from '../models';

const PORT: number = Number(process.env.PORT) || 4000;
// sequelize.sync();
server.listen(PORT, () => {
  console.log(`Server listen on PORT ${PORT}`);
});
