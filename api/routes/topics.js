const express = require('express');
const {
  readAllTopics,
  readOneTopic,
  createOneTopic,
  deleteOneTopic,
  updatePartiallyOneTopic,
  updateFullyOneTopicOrCreateOneTopic,
} = require('../models/topics');

const router = express.Router();

// Read all the topics
router.get('/', (req, res) => {
  const allTopics = readAllTopics();

  if (allTopics === undefined) return res.sendStatus(400);

  return res.json(allTopics);
});

// Read a topics from its id in the menu
router.get('/:id', (req, res) => {
  const foundTopic = readOneTopic(req?.params?.id);

  if (!foundTopic) return res.sendStatus(404);

  return res.json(foundTopic);
});

// Create a topic
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  // eslint-disable-next-line max-len
  const description = req?.body?.description?.trim()?.length !== 0 ? req.body.description : undefined;
  const image = req?.body?.image?.trim()?.length !== 0 ? req.body.image : undefined;

  if (!title || !description || !image) {
    console.log('Validation failed. Sending 400 error.');
    return res.sendStatus(400);
  }

  const createdTopic = createOneTopic(title, description, image);
  return res.json(createdTopic);
});

// Delete a topic
router.delete('/:id', (req, res) => {
  const deletedTopic = deleteOneTopic(req?.params?.id);

  if (!deletedTopic) return res.sendStatus(404);

  return res.json(deletedTopic);
});

// Update one or more properties of a topic identified by its id
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const description = req?.body?.description;
  const image = req?.body?.image;

  if (
    !req.body
    || (title !== undefined && !title.trim())
    || (description !== undefined && !description.trim())
    || image !== undefined
  ) return res.sendStatus(400);

  const updatedFilm = updatePartiallyOneTopic(req?.params?.id, req?.body);

  if (!updatedFilm) return res.sendStatus(404);

  return res.json(updatedFilm);
});

// eslint-disable-next-line max-len
// Update a topic only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const image = req?.body?.image;

  if (
    !req.body
    || !title
    || !title.trim()
    || !link
    || !link.trim()
    || image !== undefined
  ) return res.sendStatus(400);

  const updatedFilmOrNewFilm = updateFullyOneTopicOrCreateOneTopic(req?.params?.id, req?.body);

  return res.json(updatedFilmOrNewFilm);
});

module.exports = router;
