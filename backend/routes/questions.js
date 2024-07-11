const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createQuestion, getQuestions, deleteQuestion, getQuestionsForRepeat, setQuestionDone,
} = require('../controllers/questions');

router.get('/', getQuestions);
router.get('/repeat', getQuestionsForRepeat);
router.delete('/:questionId', celebrate({
  params: Joi.object().keys({
    questionId: Joi.string().length(24).hex().required(),
  }),
}), deleteQuestion);
router.post('/', celebrate({
  body: Joi.object().keys({
    question: Joi.string().required().min(2).max(100),
    answer: Joi.array().items(Joi.object({
      type: Joi.string().required().min(2).max(30),
      text: Joi.string().required().min(2).max(500),
    })),
    term: Joi.string().required().min(2).max(30),
    /* chapter: Joi.string().required().min(2).max(30),
    topic: Joi.string().required().min(2).max(30),
     */
  }),
}), createQuestion);
router.patch('/repeat/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), setQuestionDone);

module.exports = router;
