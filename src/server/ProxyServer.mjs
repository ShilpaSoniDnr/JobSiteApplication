import express from 'express';
import request from 'request';
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/proxy', (req, res) => {
  const url = `https://xtimesheet.com/DesktopModules/TimesheetAPI/API/Feature/UserLogin/?UserName=${req.query.user}&Password=${req.query.pass}`;
  request(url).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
