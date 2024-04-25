const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createTerm, getTerms, deleteTerm,
} = require('../controllers/terms');

router.get('/', getTerms);
router.delete('/:termId', celebrate({
  params: Joi.object().keys({
    termId: Joi.string().length(24).hex().required(),
  }),
}), deleteTerm);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    /* chapter: Joi.string().required().min(2).max(30),
    topic: Joi.string().required().min(2).max(30),
    questions: Joi.string().required().min(2).max(30), */
  }),
}), createTerm);

module.exports = router;
