const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createQuestion, getQuestions, deleteQuestion,
} = require('../controllers/questions');

router.get('/', getQuestions);
router.delete('/:questionId', celebrate({
  params: Joi.object().keys({
    questionId: Joi.string().length(24).hex().required(),
  }),
}), deleteQuestion);
router.post('/', celebrate({
  body: Joi.object().keys({
    question: Joi.string().required().min(2).max(100),
    answer: Joi.string().required().min(2).max(500),
    term: Joi.string().required().min(2).max(30),
    /* chapter: Joi.string().required().min(2).max(30),
    topic: Joi.string().required().min(2).max(30),
     */
  }),
}), createQuestion);

module.exports = router;
