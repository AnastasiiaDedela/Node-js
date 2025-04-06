const express = require('express');
const app = express();

app.use(express.json());

let notes = [
  { id: 1, text: 'Learn Node.js' },
  { id: 2, text: 'Practice Express routes' }
];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const newNote = {
    id: Date.now(),
    text: req.body.text
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.patch('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  note.text = req.body.text || note.text;
  res.json(note);
});

app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === noteId);

  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const deleted = notes.splice(index, 1);
  res.json({ message: 'Note deleted', deleted });
});


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
