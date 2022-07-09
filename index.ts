import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'reflect-metadata';
import { AppDataSource } from './src/data-source';
import { Note } from './src/entity/note';

dotenv.config();

AppDataSource.initialize()
  .then(() => console.log('db initialized'))
  .catch((err) => console.log('error initializing db', err));


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.all('/*', (req: Request, res: Response, next) => {
  console.log('request=', req.body);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/notes', async (req: Request, res: Response) => {
  const allNotes = await AppDataSource.getRepository(Note).find();
  res.status(200).send(allNotes);
});

app.post('/notes', async (req: Request, res: Response) => {
  console.log('POST, req=', req.params);
  try {
    const note = req.body as Note;
    const saved = await AppDataSource.getRepository(Note).save(note);
    console.log('saved with save=', saved);
    res.status(201).send(saved);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.patch('/notes', async (req: Request, res: Response) => {
  const note = req.body as Note;
  const saved = await AppDataSource.getRepository(Note).save(note);
  res.status(200).send(saved);
});

app.delete('/notes/:noteId', async (req: Request, res: Response) => {
  const noteId = Number(req.params.noteId);
  const toDelete = await AppDataSource.getRepository(Note).findOneBy({ id: noteId });
  if (toDelete) {
    const deleted = await AppDataSource.getRepository(Note).delete(toDelete);
    if (deleted.affected === 1) {
      res.status(200).send(toDelete);
      return;
    }
  }
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});